import { Card, CardContent } from "./ui/card";
import { BarChart2, Rocket, Target, Users, Clock, Shield, Award, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { SiSolana } from "react-icons/si";
import { useState } from "react";
import { FeatureDetailModal } from "./FeatureDetailModal";
import { 
  automatedTradesContent,
  attractHoldersContent,
  createFOMOContent,
  performanceAnalyticsContent,
  volumeDistributionContent,
  tradingParametersContent,
  antiDetectionTechnologyContent,
  automatedOperationContent,
  solArchitectureContent
} from "@/lib/featureDetailsContent";

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  delay: number;
  onLearnMore: () => void;
}

const FeatureCard = ({ title, description, icon, gradient, delay, onLearnMore }: FeatureProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: delay * 0.1 }}
    viewport={{ once: true, margin: "-100px" }}
  >
    <Card className="relative overflow-hidden border border-gray-800 bg-card/60 backdrop-blur-sm hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 h-full">
      <div className={`absolute top-0 right-0 h-48 w-48 opacity-20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 ${gradient}`}></div>
      
      <CardContent className="p-6 relative z-10">
        <div className="mb-6">
          <div className={`flex items-center justify-center w-16 h-16 rounded-2xl ${gradient} p-0.5 shadow-lg`}>
            <div className="bg-card/90 w-full h-full rounded-xl flex items-center justify-center">
              {icon}
            </div>
          </div>
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">{description}</p>
        
        <button 
          onClick={onLearnMore}
          className="flex items-center text-sm font-medium text-[#00FFA3] hover:text-[#14F195] transition-colors duration-200"
          aria-label={`Learn more about ${title}`}
        >
          Learn more
          <ArrowRight className="ml-1 h-4 w-4" />
        </button>
      </CardContent>
    </Card>
  </motion.div>
);

const features = [
  {
    title: "Automated Multithreaded Trades",
    description: "Advanced algorithms create natural trading patterns that mimic real user activity, avoiding detection while maximizing impact.",
    icon: <BarChart2 className="text-[#00FFA3] h-6 w-6" strokeWidth={1.5} />,
    gradient: "bg-gradient-to-r from-[#00FFA3] to-[#00FFA3]/60",
    modalContent: automatedTradesContent
  },
  {
    title: "Attract New Holders & Whales",
    description: "Increased volume and trending status attract new investors looking for the next big opportunity in the Solana ecosystem.",
    icon: <Users className="text-[#DC1FFF] h-6 w-6" strokeWidth={1.5} />,
    gradient: "bg-gradient-to-r from-[#DC1FFF] to-[#DC1FFF]/60",
    modalContent: attractHoldersContent
  },
  {
    title: "Create FOMO & Trending Status",
    description: "Generate excitement as your token climbs charts and reaches trending status on DEXTools, Pump.Fun & Dexscreener.",
    icon: <Target className="text-[#00FFA3] h-6 w-6" strokeWidth={1.5} />,
    gradient: "bg-gradient-to-r from-[#00FFA3] to-[#DC1FFF]",
    modalContent: createFOMOContent
  },
  {
    title: "Real-Time Performance Analytics",
    description: "Monitor your token's performance metrics with detailed analytics dashboards and real-time reporting.",
    icon: <BarChart2 className="text-blue-400 h-6 w-6" strokeWidth={1.5} />,
    gradient: "bg-gradient-to-r from-blue-400 to-blue-600",
    modalContent: performanceAnalyticsContent
  },
  {
    title: "Strategic Volume Distribution",
    description: "Optimize trading patterns across multiple DEXs to maximize visibility and create organic market dynamics.",
    icon: <Rocket className="text-[#DC1FFF] h-6 w-6" strokeWidth={1.5} />,
    gradient: "bg-gradient-to-r from-[#DC1FFF] to-purple-700",
    modalContent: volumeDistributionContent
  },
  {
    title: "Customizable Trading Parameters",
    description: "Fine-tune volume, timing, and trading strategies to perfectly align with your token's specific goals.",
    icon: <Clock className="text-amber-400 h-6 w-6" strokeWidth={1.5} />,
    gradient: "bg-gradient-to-r from-amber-400 to-orange-600",
    modalContent: tradingParametersContent
  },
  {
    title: "Anti-Detection Technology",
    description: "Proprietary algorithms ensure trading patterns appear natural and pass exchange monitoring systems.",
    icon: <Shield className="text-green-400 h-6 w-6" strokeWidth={1.5} />,
    gradient: "bg-gradient-to-r from-green-400 to-emerald-600",
    modalContent: antiDetectionTechnologyContent
  },
  {
    title: "24/7 Automated Operation",
    description: "Set your campaign parameters once and let our bot work continuously, monitoring and adjusting to market conditions.",
    icon: <Award className="text-blue-400 h-6 w-6" strokeWidth={1.5} />,
    gradient: "bg-gradient-to-r from-blue-400 to-indigo-600",
    modalContent: automatedOperationContent
  },
  {
    title: "SOL-Optimized Architecture",
    description: "Purpose-built for the Solana ecosystem, taking advantage of low fees and high transaction speeds.",
    icon: <SiSolana className="text-[#00FFA3] h-6 w-6" />,
    gradient: "bg-gradient-to-r from-[#00FFA3] to-[#DC1FFF]",
    modalContent: solArchitectureContent
  }
];

export function FeaturesSection() {
  // State for tracking which feature's modal is open
  const [activeFeatureModal, setActiveFeatureModal] = useState<string | null>(null);

  // Handle opening a specific feature modal
  const openFeatureModal = (title: string) => {
    setActiveFeatureModal(title);
  };

  // Handle closing the feature modal
  const closeFeatureModal = () => {
    setActiveFeatureModal(null);
  };

  // Find the active feature for the modal
  const activeFeature = features.find(feature => feature.title === activeFeatureModal);

  return (
    <section id="features" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#DC1FFF] rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute top-60 -right-20 w-80 h-80 bg-[#00FFA3] rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex flex-col items-center justify-center text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 mb-4 rounded-full bg-card/40 backdrop-blur-sm border border-gray-800 shadow-lg">
              <Zap className="mr-2 h-4 w-4 text-[#00FFA3]" />
              <span className="text-xs font-medium">Industry-Leading Technology</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00FFA3] via-blue-400 to-[#DC1FFF]">
              Why Our Volume Bot Works
            </h2>
            
            <p className="max-w-3xl text-gray-400 md:text-lg mb-8">
              Harness the power of advanced algorithmic trading to enhance your token's market presence through our expertly crafted Solana volume optimization system.
            </p>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              gradient={feature.gradient}
              delay={index}
              onLearnMore={() => openFeatureModal(feature.title)}
            />
          ))}
        </div>

        {/* Feature Detail Modal */}
        {activeFeature && (
          <FeatureDetailModal
            isOpen={!!activeFeatureModal}
            onClose={closeFeatureModal}
            content={{
              title: activeFeature.title,
              description: activeFeature.modalContent.description,
              icon: activeFeature.icon,
            }}
          />
        )}
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-[#00FFA3]/10 to-[#DC1FFF]/10 rounded-lg border border-gray-800 shadow-lg backdrop-blur-sm">
            <p className="text-gray-300">
              <SiSolana className="inline mr-2 text-[#00FFA3]" /> 
              <span className="font-semibold">Solana-powered</span> for lightning-fast transactions with minimal fees
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
