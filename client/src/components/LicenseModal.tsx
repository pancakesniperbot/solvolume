import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CopyIcon, 
  DownloadIcon, 
  CheckIcon, 
  ClockIcon, 
  LockIcon,
  PartyPopper,
  FileText,
  XIcon,
  SendIcon,
  Globe
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LicenseData {
  license: string;
  email: string;
  primaryUrl: string;
  backupUrl: string;
  updatedDate: string;
  timestamp?: string;
}

interface LicenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  licenseData: LicenseData | null;
}

export function LicenseModal({ isOpen, onClose, licenseData }: LicenseModalProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [passwordCopied, setPasswordCopied] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState(7);
  const [zipPassword, setZipPassword] = useState("2025"); // Default password
  const [trackingAction, setTrackingAction] = useState(false);
  
  // Calculate days remaining in trial
  useEffect(() => {
    if (licenseData && licenseData.timestamp) {
      try {
        const issueDate = new Date(licenseData.timestamp);
        const endDate = new Date(issueDate);
        endDate.setDate(endDate.getDate() + 7); // 7-day trial
        
        const today = new Date();
        const diffTime = endDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        setDaysRemaining(Math.max(0, diffDays));
      } catch (error) {
        console.error("Error calculating days remaining:", error);
        setDaysRemaining(7);
      }
    }
  }, [licenseData]);

  // Track event
  const trackEvent = async (action: string, source: string = "", method: string = "", state: string = "") => {
    if (trackingAction) return; // Prevent duplicate calls
    
    setTrackingAction(true);
    try {
      const params = new URLSearchParams({
        action,
        license: licenseData?.license || "",
        email: licenseData?.email || "",
        source,
        method,
        state,
        timestamp: new Date().toISOString()
      });
      
      await fetch(`/api/track?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error("Error tracking event:", error);
    } finally {
      setTrackingAction(false);
    }
  };

  const handleCopyLicense = () => {
    if (!licenseData) return;
    
    navigator.clipboard.writeText(licenseData.license);
    setCopied(true);
    
    // Track copy action
    trackEvent('license_copy', 'license_modal', 'clipboard');
    
    toast({
      title: 'License copied',
      description: 'The license key has been copied to your clipboard.',
      variant: 'default',
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(zipPassword);
    setPasswordCopied(true);
    
    toast({
      title: 'Password copied',
      description: 'The ZIP file password has been copied to your clipboard.',
      variant: 'default',
    });
    
    setTimeout(() => setPasswordCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!licenseData) return;
    
    // Track download click
    trackEvent('download_click', 'license_modal_button');
    
    // Redirect to the download URL
    window.open(licenseData.primaryUrl, '_blank');
    
    toast({
      title: 'Download started',
      description: 'Your download should begin shortly. The ZIP password is: ' + zipPassword,
      variant: 'default',
    });
  };

  const handleSupportClick = () => {
    // Track support click
    trackEvent('support_click', 'license_modal');
    window.open('https://t.me/thebotdevsupport', '_blank');
  };

  // When modal opens, track view
  useEffect(() => {
    if (isOpen && licenseData) {
      trackEvent('license_modal_view');
    }
  }, [isOpen, licenseData]);

  // When modal closes
  const handleClose = () => {
    // Track modal closed
    if (licenseData) {
      trackEvent('modal_closed', 'license_modal');
    }
    onClose();
  };

  if (!licenseData) return null;

  // Format for better UI presentation
  const formattedLicense = licenseData.license.replace(/(.{4})/g, "$1-").slice(0, -1);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-md bg-[#0A1939] border-[#243976] rounded-xl shadow-[0_0_30px_rgba(20,57,148,0.2)]">
        <DialogHeader className="bg-gradient-to-r from-[#131E4A] to-[#172559] p-6 -mx-6 -mt-6 rounded-t-xl border-b border-[#263678]">
          <div className="flex items-center justify-center mb-3">
            <PartyPopper className="text-[#14F195] h-7 w-7 mr-2" />
            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#14F195] to-[#9945FF]">Hurray!</span>
          </div>
          <DialogTitle className="text-2xl font-bold text-white text-center">
            Your License is Ready
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-6 space-y-6">
          <div className="bg-[#131E4A] border border-[#263678] rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-200 flex items-center">
                <FileText className="h-4 w-4 mr-2 text-[#9945FF]" /> License Key
              </label>
              <Badge 
                variant="outline" 
                className="bg-[#143154]/60 text-[#14F195] border-[#14F195]/30 font-medium"
              >
                <ClockIcon className="mr-1 h-3 w-3" /> {daysRemaining} days left
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-[#0C1632] border border-[#263678] rounded-md p-3 text-sm font-mono overflow-x-auto flex-1 text-white">
                {formattedLicense}
              </div>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleCopyLicense}
                className="h-10 w-10 shrink-0 border-[#263678] hover:bg-[#1E2C4A]/70 bg-[#131E4A]"
              >
                {copied ? 
                  <CheckIcon size={18} className="text-green-400" /> : 
                  <CopyIcon size={18} className="text-gray-400" />
                }
              </Button>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Your unique license key. Store it in a safe place for future reference.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#131E4A] border border-[#263678] rounded-lg p-4">
              <label className="text-sm font-medium text-gray-200 flex items-center mb-2">
                <Globe className="h-4 w-4 mr-2 text-[#9945FF]" /> Email Address
              </label>
              <div className="bg-[#0C1632] border border-[#263678] rounded-md p-3 text-sm text-white font-mono">
                {licenseData.email}
              </div>
            </div>
            
            <div className="bg-[#131E4A] border border-[#263678] rounded-lg p-4">
              <label className="text-sm font-medium text-gray-200 flex items-center mb-2">
                <LockIcon className="h-4 w-4 mr-2 text-[#9945FF]" /> ZIP Password
              </label>
              <div className="flex items-center gap-2">
                <div className="bg-[#0C1632] border border-[#263678] rounded-md p-3 text-sm text-white font-mono flex-1">
                  {zipPassword}
                </div>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={handleCopyPassword}
                  className="h-10 w-10 shrink-0 border-[#263678] hover:bg-[#1E2C4A]/70 bg-[#131E4A]"
                >
                  {passwordCopied ? 
                    <CheckIcon size={18} className="text-green-400" /> : 
                    <CopyIcon size={18} className="text-gray-400" />
                  }
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-[#131E4A] border border-[#263678] rounded-lg p-4">
            <Button
              onClick={handleDownload}
              className="w-full bg-gradient-to-r from-[#14F195] to-[#9945FF] text-black font-bold hover:from-[#14F195]/90 hover:to-[#9945FF]/90 py-6"
            >
              <DownloadIcon className="mr-2 h-5 w-5" />
              Click here to download the bot files
            </Button>
            
            <div className="mt-3 text-xs text-gray-400 text-center">
              Latest Bot update: {licenseData.updatedDate}
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-4 py-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSupportClick}
              className="border-[#263678] hover:bg-[#1E2C4A]/70 bg-[#131E4A]"
            >
              <SendIcon className="mr-2 h-4 w-4 text-[#14F195]" />
              Need help? Telegram support
            </Button>
          </div>
        </div>
        
        <DialogFooter className="flex sm:justify-between pt-2 border-t border-[#263678]">
          <Button
            variant="outline"
            onClick={handleClose}
            className="border-[#263678] hover:bg-[#1E2C4A]/70 bg-[#131E4A]"
          >
            <XIcon className="mr-2 h-4 w-4" />
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}