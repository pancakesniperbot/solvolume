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
import { Loader2, Mail, AlertCircle, ArrowRight, X, Zap } from 'lucide-react';
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
      <DialogContent className="sm:max-w-md bg-[#02010a]/95 backdrop-blur-md border border-[#14235A] rounded-xl overflow-hidden p-0 shadow-[0_0_25px_rgba(20,89,226,0.3)]">
        {/* Close button in top-right corner */}
        <button 
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 z-10"
        >
          <X className="h-4 w-4 text-gray-400" />
          <span className="sr-only">Close</span>
        </button>
        
        <div className="bg-gradient-to-r from-[#131E4A] to-[#1F2B5B] p-6 border-b border-[#263678]">
          <div className="flex items-center justify-center mb-4">
            <div className="h-12 w-12 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-full flex items-center justify-center">
              <Mail className="h-6 w-6 text-white" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold text-white text-center">
            Get Your Free 7-Day License
          </DialogTitle>
          <DialogDescription className="text-gray-300 text-center mt-2">
            Enter your email to receive your free license for the Solana Volume Bot.
          </DialogDescription>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div className="space-y-4 p-6 bg-[#0C1127]/50">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-200 flex items-center mb-2">
                Email Address
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0C1632] border-[#263678] text-white placeholder-gray-500 pl-10"
                  required
                  aria-describedby="email-error"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[#9945FF]" />
                </div>
              </div>
              {error && (
                <div className="flex items-center mt-2 text-red-400 text-sm">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <p id="email-error">{error}</p>
                </div>
              )}
            </div>
            
            <div className="rounded-lg p-4 bg-gradient-to-r from-[#131E4A]/50 to-[#1C294F]/50 border border-[#263678]">
              <h4 className="font-semibold text-[#14F195] mb-3 flex items-center">
                <Zap className="h-4 w-4 mr-2" /> What you'll get:
              </h4>
              <ul className="space-y-2.5">
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-gradient-to-r from-[#9945FF] to-[#14F195] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-black">✓</span>
                  </div>
                  <span className="text-gray-300 ml-2.5">Full access to Solana Volume Bot for 7 days</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-gradient-to-r from-[#9945FF] to-[#14F195] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-black">✓</span>
                  </div>
                  <span className="text-gray-300 ml-2.5">Ready-to-use volume generation strategies</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-gradient-to-r from-[#9945FF] to-[#14F195] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-black">✓</span>
                  </div>
                  <span className="text-gray-300 ml-2.5">Free upgrades during trial period</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="text-xs text-gray-400 text-center">
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
            className="w-full h-12 bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-[#8035E5] hover:to-[#05E286] text-black font-bold hover:shadow-[0_0_15px_rgba(20,241,149,0.5)] transition-all duration-300"
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
              className="border-[#263678] hover:bg-[#1E2C4A]/70 text-gray-400 hover:text-white"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}