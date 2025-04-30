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
  Globe,
  ArrowRight,
  ChevronDown,
  ChevronUp
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
  const [showInstructions, setShowInstructions] = useState(false);
  
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

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
    trackEvent('instructions_toggle', 'license_modal', '', showInstructions ? 'closed' : 'opened');
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
      <DialogContent className="sm:max-w-lg md:max-w-xl bg-[#02010a]/95 backdrop-blur-md border border-[#14235A] rounded-xl overflow-hidden p-0 shadow-[0_0_25px_rgba(20,89,226,0.3)]">
        {/* Close button in top-right corner */}
        <button 
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 z-10"
        >
          <XIcon className="h-4 w-4 text-gray-400" />
          <span className="sr-only">Close</span>
        </button>
        
        <div className="bg-gradient-to-r from-[#131E4A] to-[#1F2B5B] p-6 border-b border-[#263678]">
          <div className="flex items-center justify-center mb-3">
            <div className="h-16 w-16 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-full flex items-center justify-center">
              <PartyPopper className="h-8 w-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold text-white text-center">
            Hurray! Your License is Ready
          </DialogTitle>
          <p className="text-[#14F195] text-center mt-2 font-medium">
            Get started with Solana Volume Bot in minutes
          </p>
        </div>
        
        <div className="p-6 bg-[#0C1127]/50 space-y-6">
          {/* License Key Section */}
          <div className="bg-gradient-to-r from-[#131E4A]/80 to-[#1C294F]/80 rounded-lg border border-[#263678] p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-[#9945FF] mr-2" /> 
                <label className="text-sm font-medium text-white">Your License Key</label>
              </div>
              <Badge 
                variant="outline" 
                className="bg-[#143154]/60 text-[#14F195] border-[#14F195]/30 font-medium text-xs"
              >
                <ClockIcon className="mr-1 h-3 w-3" /> {daysRemaining} days left
              </Badge>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="bg-[#0C1127] border border-[#263678] rounded-md p-3 text-sm font-mono overflow-x-auto flex-1 text-[#14F195]">
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
              Your unique license key. You'll need this to activate the software.
            </p>
          </div>
          
          {/* Download Section */}
          <div className="bg-gradient-to-r from-[#131E4A]/80 to-[#1C294F]/80 rounded-lg border border-[#263678] p-4">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <DownloadIcon className="h-5 w-5 text-[#14F195] mr-2" /> 
                <label className="text-sm font-medium text-white">Download & Install</label>
              </div>
              <div className="px-2 py-1 rounded text-xs bg-[#14F195]/10 text-[#14F195] border border-[#14F195]/20">
                {licenseData.updatedDate}
              </div>
            </div>
            
            <Button
              onClick={handleDownload}
              className="w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-[#8035E5] hover:to-[#05E286] text-black font-bold py-6 hover:shadow-[0_0_15px_rgba(20,241,149,0.2)] transition-all duration-300"
            >
              Download Solana Volume Bot <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <div className="mt-3 flex gap-4">
              <div className="flex-1">
                <label className="text-xs text-gray-400 mb-1 block">ZIP Password</label>
                <div className="flex items-center gap-2">
                  <div className="bg-[#0C1127] border border-[#263678] rounded-md p-2 text-sm font-mono text-white flex-1 flex items-center">
                    <LockIcon className="h-3.5 w-3.5 text-[#9945FF] mr-2" />
                    {zipPassword}
                  </div>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={handleCopyPassword}
                    className="h-9 w-9 shrink-0 border-[#263678] hover:bg-[#1E2C4A]/70 bg-[#131E4A]"
                  >
                    {passwordCopied ? 
                      <CheckIcon size={16} className="text-green-400" /> : 
                      <CopyIcon size={16} className="text-gray-400" />
                    }
                  </Button>
                </div>
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-400 mb-1 block">Registered Email</label>
                <div className="bg-[#0C1127] border border-[#263678] rounded-md p-2 text-sm text-white overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {licenseData.email}
                </div>
              </div>
            </div>
          </div>
          
          {/* Installation Instructions Toggle */}
          <div>
            <Button
              onClick={toggleInstructions}
              variant="outline"
              className="w-full flex justify-between items-center border-[#263678] hover:bg-[#1E2C4A]/70 bg-[#131E4A] text-white"
            >
              <span className="flex items-center">
                <FileText className="h-4 w-4 mr-2 text-[#14F195]" />
                Installation Instructions
              </span>
              {showInstructions ? (
                <ChevronUp className="h-4 w-4 text-gray-400" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-400" />
              )}
            </Button>
            
            {showInstructions && (
              <div className="mt-3 bg-[#131E4A]/50 border border-[#263678] rounded-lg p-4 text-sm text-gray-300">
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Download the Solana Volume Bot using the button above</li>
                  <li>Extract the ZIP file using the password provided</li>
                  <li>Run the installer and follow the on-screen instructions</li>
                  <li>When prompted, enter your license key to activate</li>
                  <li>Configure your bot settings and start generating volume</li>
                </ol>
                <div className="mt-3 p-2 bg-[#0C1127] rounded border border-[#263678] text-xs">
                  <div className="flex items-start">
                    <span className="text-[#9945FF] mr-2">Note:</span>
                    <span>For detailed instructions, please refer to the README.txt file included in the download package.</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="p-6 bg-[#0C1127]/50 border-t border-[#263678]">
          <DialogFooter className="flex justify-between p-4 border-t border-[#263678] bg-[#0C1127]/50">
            <Button
              variant="outline"
              onClick={handleSupportClick}
              className="border-[#263678] hover:bg-[#1E2C4A]/70 bg-[#131E4A] text-white"
            >
              <SendIcon className="mr-2 h-4 w-4 text-[#14F195]" />
              Telegram Support
            </Button>
            
            <Button
              variant="outline"
              onClick={handleClose}
              className="border-[#263678] hover:bg-[#1E2C4A]/70 bg-[#131E4A] text-white"
            >
              Close Window
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}