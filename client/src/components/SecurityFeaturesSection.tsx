import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Link2, 
  Wallet, 
  Key, 
  Clock, 
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CyberpunkBackground } from "./CyberpunkBackground";

export function SecurityFeaturesSection() {
  const securityFeatures = [
    {
      icon: <Key className="h-8 w-8 text-[#14F195]" />,
      title: "Solana Volume Bot: SOL Volume Bot - Pump Fun Volume Bot",
      description: "Our system never requires access to your private keys, keeping your crypto assets completely secure and under your control."
    },
    {
      icon: <Link2 className="h-8 w-8 text-[#14F195]" />,
      title: "Solana Volume Bot: SOL Volume Bot - Pump Fun Volume Bot",
      description: "No need to connect your wallet to our platform. We operate without requiring any direct connection to your cryptocurrency wallets."
    },
    {
      icon: <Wallet className="h-8 w-8 text-[#14F195]" />,
      title: "Solana Volume Bot: SOL Volume Bot - Pump Fun Volume Bot",
      description: "We use token address based identification which eliminates the need for passwords and reduces security risks associated with credential theft."
    },
    {
      icon: <Clock className="h-8 w-8 text-[#14F195]" />,
      title: "Solana Volume Bot: SOL Volume Bot - Pump Fun Volume Bot",
      description: "Complete flexibility with our service. Start or stop your volume campaigns instantly with no long-term commitment required."
    }
  ];
  
  return (
    <section id="security" className="py-20 relative overflow-hidden">
      {/* Cyberpunk background */}
      <CyberpunkBackground variant="dark" withGrid withNoise withGlitch />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-4">
            <div className="bg-[#14F195]/10 p-3 rounded-full">
              <ShieldCheck className="h-8 w-8 text-[#14F195]" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Security <span className="text-[#14F195]">First Approach</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Our Solana Volume Bot is built with security as the top priority, ensuring your tokens and assets remain safe while boosting your market visibility.
          </p>
        </motion.div>

        {/* Security Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#0c0c15] border border-[#1e2035] rounded-lg p-6 shadow-[0_0_30px_rgba(20,241,149,0.05)] hover:border-[#14F195]/30 transition-all duration-300"
            >
              <div className="bg-[#14F195]/10 p-3 rounded-lg inline-block mb-4">
                {feature.icon}
              </div>
              <h3 className="text-white text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Quick Setup Box */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#0c0c15] border border-[#1e2035] rounded-lg p-8 mb-8 max-w-4xl mx-auto shadow-[0_0_30px_rgba(20,241,149,0.05)]"
        >
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="bg-[#14F195]/10 p-4 rounded-full shrink-0">
              <CheckCircle2 className="h-10 w-10 text-[#14F195]" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">Token Visibility System</h3>
              <p className="text-gray-400 mb-0">
                Simply enter your token address and start boosting your volume visibility on decentralized exchanges.
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-[#9945FF] to-[#14F195] text-black font-semibold hover:from-[#8035E5] hover:to-[#05E286]"
          >
            Get Started Securely
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}