import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';
import { ThreeDBackground } from '@/components/3DParticleBackground';
import { Rocket, CheckCircle2, ArrowRight, Zap } from 'lucide-react';

export default function FreeTrial() {
  const [formState, setFormState] = useState({
    email: '',
    walletAddress: '',
    tokenSymbol: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [, navigate] = useLocation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Simple validation
    if (!formState.email || !formState.email.includes('@')) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    if (!formState.walletAddress) {
      setError('Solana wallet address is required');
      setLoading(false);
      return;
    }

    // Simulated API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Solana Volume Bot: SOL Volume Bot - Pump Fun Volume Bot",
        description: "Welcome to Solana Volume Bot! Details have been sent to your email address.",
        variant: "default",
      });
      
      // Navigate to dashboard or confirmation page
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-black flex flex-col relative">
      {/* Background animation */}
      <ThreeDBackground />
      
      {/* Foreground content */}
      <div className="container mx-auto px-4 py-16 relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900/80 backdrop-blur-md rounded-3xl border border-[#9945FF] p-6 md:p-10 w-full max-w-3xl"
        >
          <div className="text-center mb-8">
            <div className="inline-flex justify-center items-center p-3 bg-[#9945FF]/20 rounded-xl mb-4">
              <Rocket className="h-8 w-8 text-[#9945FF]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Solana Volume Bot Free Trial
            </h1>
            <p className="text-gray-400">
              Start your custom 7-day free trial for your token
            </p>
          </div>

          {/* Trial benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            {[
              { icon: <Zap className="h-5 w-5 text-[#14F195]" />, text: "Up to 30% daily volume increase" },
              { icon: <CheckCircle2 className="h-5 w-5 text-[#14F195]" />, text: "Full access to volume bots" },
              { icon: <CheckCircle2 className="h-5 w-5 text-[#14F195]" />, text: "Basic analytics dashboard" },
              { icon: <CheckCircle2 className="h-5 w-5 text-[#14F195]" />, text: "No crypto investment required" },
            ].map((item, i) => (
              <div key={i} className="flex items-center px-4 py-3 bg-gray-800/50 rounded-lg border border-gray-700">
                <div className="mr-3 flex-shrink-0">{item.icon}</div>
                <span className="text-sm text-gray-300">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleInputChange}
                placeholder="example@mail.com"
                className="bg-gray-800/50 border-gray-700 text-white"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="walletAddress" className="text-gray-300">Solana Wallet Address</Label>
              <Input
                id="walletAddress"
                name="walletAddress"
                value={formState.walletAddress}
                onChange={handleInputChange}
                placeholder="Your Solana wallet address"
                className="bg-gray-800/50 border-gray-700 text-white"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tokenSymbol" className="text-gray-300">Token Symbol (optional)</Label>
              <Input
                id="tokenSymbol"
                name="tokenSymbol"
                value={formState.tokenSymbol}
                onChange={handleInputChange}
                placeholder="E.g. BONK, WIF, or your own token"
                className="bg-gray-800/50 border-gray-700 text-white"
              />
            </div>
            
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-12 mt-6 bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white font-medium rounded-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              )}
            </Button>
            
            <p className="text-xs text-gray-500 text-center mt-4">
              By signing up, you agree to our <a href="#" className="text-[#14F195] hover:underline">Terms of Service</a> and 
              <a href="#" className="text-[#14F195] hover:underline"> Privacy Policy</a>.
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}