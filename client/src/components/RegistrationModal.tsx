import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Mail, AlertCircle, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { generateLicense } from '@/lib/licenseService';

// Define the shape of the form data
const emailSchema = z.object({
  email: z.string()
    .email({ message: 'Please enter a valid email address' })
    .min(5, { message: 'Email must be at least 5 characters' })
    .max(100, { message: 'Email must be less than 100 characters' })
});

type LicenseData = {
  license: string;
  email: string;
  primaryUrl: string;
  backupUrl: string;
  updatedDate: string;
  timestamp?: string;
};

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  setLicenseData: (data: LicenseData | null) => void;
  openLicenseModal: () => void;
}

export function RegistrationModal({
  isOpen,
  onClose,
  setLicenseData,
  openLicenseModal
}: RegistrationModalProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trackingAction, setTrackingAction] = useState(false);
  const { toast } = useToast();

  // Track event
  const trackEvent = async (action: string, source: string = "", method: string = "", state: string = "") => {
    if (trackingAction) return; // Prevent duplicate calls
    
    setTrackingAction(true);
    try {
      const params = new URLSearchParams({
        action,
        email: email || "",
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

  // Track when modal is opened
  React.useEffect(() => {
    if (isOpen) {
      trackEvent('registration_modal_opened');
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validate the email
    const result = emailSchema.safeParse({ email });
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }
    
    setIsSubmitting(true);
    
    // Track form submission
    trackEvent('registration_form_submit');
    
    try {
      // Call the license generation API
      const licenseData = await generateLicense(email);
      
      // Store the license data
      setLicenseData(licenseData);
      
      // Close this modal and open the license modal
      onClose();
      openLicenseModal();
      
      toast({
        title: "Registration successful",
        description: "Your license has been generated successfully.",
        variant: "default",
      });
    } catch (err) {
      console.error('License generation error:', err);
      toast({
        title: "Registration failed",
        description: "There was an error generating your license. Please try again.",
        variant: "destructive",
      });
      setError('Failed to generate license. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    trackEvent('modal_closed', 'registration_form');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-md bg-[#0A1939] border-[#243976] rounded-xl shadow-[0_0_30px_rgba(20,57,148,0.2)]">
        <DialogHeader className="bg-gradient-to-r from-[#131E4A] to-[#172559] p-6 -mx-6 -mt-6 rounded-t-xl border-b border-[#263678]">
          <DialogTitle className="text-2xl font-bold text-white text-center">
            Get Your Free 7-Day License
          </DialogTitle>
          <DialogDescription className="text-gray-300 text-center mt-2">
            Enter your email to receive your free license for the Solana Volume Bot.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-6">
          <div className="space-y-4">
            <div className="bg-[#131E4A] border border-[#263678] rounded-lg p-4">
              <Label htmlFor="email" className="text-sm font-medium text-gray-200 flex items-center mb-2">
                <Mail className="h-4 w-4 mr-2 text-[#9945FF]" /> Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0C1632] border-[#263678] text-white placeholder-gray-500"
                required
                aria-describedby="email-error"
              />
              {error && (
                <div className="flex items-center mt-2 text-red-400 text-sm">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <p id="email-error">{error}</p>
                </div>
              )}
            </div>
            
            <div className="text-sm text-gray-400 bg-[#131E4A] border border-[#263678] rounded-lg p-4">
              <p className="mb-2 font-medium text-gray-300">What you'll get:</p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#14F195] mr-2"></div>
                  <span>Full access to Solana Volume Bot for 7 days</span>
                </li>
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#14F195] mr-2"></div>
                  <span>Ready-to-use volume generation strategies</span>
                </li>
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#14F195] mr-2"></div>
                  <span>Free upgrades during trial period</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="text-sm text-gray-400 text-center">
            By registering, you agree to our{' '}
            <a 
              href="#terms"
              className="text-[#14F195] hover:underline"
              onClick={(e) => {
                e.preventDefault();
                window.document.getElementById('terms')?.scrollIntoView({behavior: 'smooth'});
              }}
            >
              Terms of Service
            </a>{' '}
            and{' '}
            <a 
              href="#privacy"
              className="text-[#14F195] hover:underline"
              onClick={(e) => {
                e.preventDefault();
                window.document.getElementById('privacy')?.scrollIntoView({behavior: 'smooth'});
              }}
            >
              Privacy Policy
            </a>.
          </div>
          
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-6 bg-gradient-to-r from-[#14F195] to-[#9945FF] text-black font-bold hover:from-[#14F195]/90 hover:to-[#9945FF]/90"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Get Free License <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
          
          <div className="flex justify-center">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="border-[#263678] hover:bg-[#1E2C4A]/70 bg-[#131E4A]"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}