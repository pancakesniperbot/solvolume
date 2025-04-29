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
import { Loader2 } from 'lucide-react';
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
  const { toast } = useToast();

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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Register for Solana Volume Bot</DialogTitle>
          <DialogDescription>
            Enter your email to get your free license for the Solana Volume Bot.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-200">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
              required
              aria-describedby="email-error"
            />
            {error && (
              <p id="email-error" className="text-red-500 text-sm mt-1">{error}</p>
            )}
          </div>
          
          <div className="text-sm text-gray-400">
            By registering, you agree to our{' '}
            <button 
              type="button" 
              onClick={() => window.document.getElementById('terms')?.scrollIntoView({behavior: 'smooth'})}
              className="text-blue-400 hover:underline"
            >
              Terms of Service
            </button>{' '}
            and{' '}
            <button
              type="button"
              onClick={() => window.document.getElementById('privacy')?.scrollIntoView({behavior: 'smooth'})}
              className="text-blue-400 hover:underline"
            >
              Privacy Policy
            </button>.
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-[#14F195] to-[#9945FF] text-black"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Get Free License'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}