import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CopyIcon, DownloadIcon, CheckIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LicenseData {
  license: string;
  email: string;
  primaryUrl: string;
  backupUrl: string;
  updatedDate: string;
}

interface LicenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  licenseData: LicenseData | null;
}

export function LicenseModal({ isOpen, onClose, licenseData }: LicenseModalProps) {
  const { toast } = useToast();
  const [copied, setCopied] = React.useState(false);

  const handleCopyLicense = () => {
    if (!licenseData) return;
    
    navigator.clipboard.writeText(licenseData.license);
    setCopied(true);
    
    toast({
      title: 'License copied',
      description: 'The license key has been copied to your clipboard.',
      variant: 'default',
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!licenseData) return;
    
    // Create license file content
    const content = `Solana Volume Bot License
=============================
License Key: ${licenseData.license}
Email: ${licenseData.email}
Issue Date: ${licenseData.updatedDate}
Primary URL: ${licenseData.primaryUrl}
Backup URL: ${licenseData.backupUrl}

This license grants you the right to use Solana Volume Bot 
according to our Terms of Service. Do not share this license key.

FULL VOLUME CO. UK. LTD (Company Number: 05551974)
Address: 15 Birchgreen Close, Maltby, Rotherham, South Yorkshire, S66 8RP
solanavolumebot.io
`;
    
    // Create blob and download link
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'solana-volume-bot-license.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: 'License downloaded',
      description: 'Your license file has been downloaded.',
      variant: 'default',
    });
  };

  if (!licenseData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between text-xl">
            <span>Your Solana Volume Bot License</span>
            <Badge variant="outline" className="bg-green-900/30 text-green-400 border-green-400/30">
              Active
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="mb-6">
            <p className="text-sm text-gray-400 mb-1">License Key</p>
            <div className="flex items-center gap-2">
              <div className="bg-black/50 border border-gray-700 rounded p-2 text-sm font-mono overflow-x-auto flex-1">
                {licenseData.license}
              </div>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleCopyLicense}
                className="h-9 w-9 shrink-0"
              >
                {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">Email</p>
              <p className="text-sm">{licenseData.email}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-400 mb-1">Issue Date</p>
              <p className="text-sm">{licenseData.updatedDate}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-400 mb-1">Download URLs</p>
              <div className="space-y-2">
                <a 
                  href={licenseData.primaryUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block text-sm text-blue-400 hover:underline truncate"
                >
                  {licenseData.primaryUrl}
                </a>
                <a 
                  href={licenseData.backupUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block text-sm text-blue-400 hover:underline truncate"
                >
                  {licenseData.backupUrl}
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="mr-2"
          >
            Close
          </Button>
          <Button
            onClick={handleDownload}
            className="bg-gradient-to-r from-[#14F195] to-[#9945FF] text-black"
          >
            <DownloadIcon className="mr-2 h-4 w-4" />
            Download License
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}