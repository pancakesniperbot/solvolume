import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Check, Diamond, Rocket, Crown, Zap, HelpCircle, Flame, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { SiSolana } from "react-icons/si";
import { useState } from "react";

interface PricingPlanProps {
  name: string;
  price: number;
  description: string;
  features: {
    text: string;
    included: boolean;
    highlight?: boolean;
  }[];
  isPopular?: boolean;
  isTrial?: boolean;
  icon: React.ReactNode;
  color: string;
  delay: number;
}

const PricingPlan = ({ 
  name, 
  price, 
  description, 
  features, 
  isPopular = false,
  isTrial = false,
  icon,
  color,
  delay
}: PricingPlanProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.15 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`${isPopular ? 'z-10' : ''} ${isTrial ? 'lg:col-span-3 md:col-span-2 mb-8' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className={`
        relative overflow-hidden rounded-2xl 
        border border-gray-800 dark:border-gray-800 
        backdrop-blur-sm
        transition-all duration-500
        flex flex-col h-full
        ${isPopular ? 'shadow-xl shadow-purple-500/10' : 'hover:shadow-lg hover:shadow-purple-500/5'}
        ${isHovered ? 'transform scale-[1.02]' : ''}
        ${isTrial ? 'border-2 border-[#14F195]/50' : ''}
      `}>
        {/* Card Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute top-0 right-0 w-60 h-60 rounded-full opacity-10 filter blur-3xl -translate-y-1/2 translate-x-1/2 bg-gradient-to-r ${color}`}></div>
        </div>

        {/* Badge */}
        {(isPopular || isTrial) && (
          <div className="absolute -top-1 -right-1 z-20">
            <div className={`bg-gradient-to-r ${color} px-6 py-1 text-white font-medium text-xs rounded-bl-lg rounded-tr-xl shadow-lg transform rotate-0 select-none`}>
              {isTrial ? 'FREE TRIAL' : 'MOST POPULAR'}
            </div>
          </div>
        )}

        <CardHeader className={`p-6 border-b border-gray-800/20 relative z-10 ${isTrial || isPopular ? 'bg-gradient-to-b from-card to-transparent' : ''}`}>
          <div className="flex items-center mb-3">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r ${color} mr-3 shadow-lg`}>
              {icon}
            </div>
            <h3 className="text-xl font-bold">{name}</h3>
          </div>

          <div className="flex items-baseline mb-2">
            {isTrial ? (
              <div className="flex items-center">
                <span className="text-4xl font-bold text-[#14F195]">FREE</span>
                <span className="text-lg ml-1 text-gray-400">for 7 days</span>
              </div>
            ) : (
              <div className="flex items-center">
                <SiSolana className="mr-1 text-[#00FFA3] h-5 w-5" />
                <span className="text-4xl font-bold">{price}</span>
                <span className="text-lg ml-1 text-gray-400">/month</span>
              </div>
            )}
          </div>
          
          <p className="text-gray-400 text-sm">{description}</p>
        </CardHeader>

        <CardContent className={`p-6 flex-grow relative z-10 ${isTrial ? 'md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3' : ''}`}>
          <ul className={`space-y-4 ${isTrial ? 'md:col-span-2 lg:col-span-3 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 md:space-y-0' : ''}`}>
            {features.map((feature, index) => (
              <li key={index} className={`flex items-start ${!feature.included ? 'text-gray-500' : ''}`}>
                {feature.included ? (
                  <Check className={`h-5 w-5 ${feature.highlight ? 'text-[#DC1FFF]' : 'text-[#00FFA3]'} mr-3 mt-0.5 flex-shrink-0`} />
                ) : (
                  <div className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                )}
                <span className={feature.highlight ? 'font-medium' : ''}>{feature.text}</span>
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className="p-6 relative z-10">
          <Button 
            className={`
              w-full py-6 rounded-xl font-bold
              shadow-lg transition-all duration-300
              ${isTrial 
                ? 'bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white hover:shadow-lg hover:shadow-[#14F195]/20' 
                : isPopular 
                  ? 'bg-gradient-to-r from-[#00FFA3] to-[#DC1FFF] text-white hover:shadow-lg hover:shadow-purple-500/20' 
                  : 'bg-card border border-gray-800 hover:border-gray-700 hover:bg-card/80'
              }
            `}
            onClick={() => {
              console.log(`${name} plan selected`);
              // Scroll to contact section for sign-up
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <span className="flex items-center">
              {isTrial ? <Moon className="mr-2 h-5 w-5 text-white" /> : isPopular && <Flame className="mr-2 h-4 w-4" />}
              {isTrial ? 'Start Your Moon Shot' : `Start ${name} Plan`}
            </span>
          </Button>

          {isTrial && (
            <div className="mt-3 text-center">
              <span className="text-sm text-[#14F195]">Your meme token deserves a Moon Shot!</span>
            </div>
          )}
          
          {isPopular && !isTrial && (
            <div className="mt-3 text-center">
              <span className="text-xs text-gray-400">7-day free trial available</span>
            </div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const allFeatures = [
  "Automated Activity Distribution",
  "Parallel Transaction Processing",
  "Wallet Rotation System",
  "Custom Activity Patterns",
  "Visibility Analytics Dashboard",
  "Trending Status Monitoring",
  "DEX Platform Integration",
  "Priority Support Access",
  "Advanced Distribution Patterns",
  "Custom Scheduling Options",
  "Activity Controls",
  "Natural Pattern Technology"
];

const pricingPlans = [
  {
    name: "Free Trial",
    price: 0,
    description: "Manual moon shots are fun... but bots do it better. Try 7 days free!",
    icon: <Moon className="h-5 w-5 text-white" />,
    color: "from-[#9945FF] to-[#14F195]",
    features: [
      { text: "12 Parallel Processors", included: true, highlight: true },
      { text: "35 Rotating Wallets", included: true },
      { text: "25 transactions/minute", included: true },
      { text: "Full Visibility Dashboard", included: true },
      { text: "Standard Support", included: true },
      { text: "All DEX Integrations", included: true },
      { text: "Custom Activity Patterns", included: true },
      { text: "Distribution Controls", included: true },
      { text: "7 Days Free, Full Access", included: true, highlight: true },
      { text: "Moon Shot Analytics", included: true, highlight: true },
    ],
    isPopular: true,
    isTrial: true
  },
  {
    name: "Startup",
    price: 9,
    description: "Perfect for new tokens looking to build initial momentum",
    icon: <Rocket className="h-5 w-5 text-white" />,
    color: "from-blue-400 to-blue-600",
    features: [
      { text: "5 Parallel Processors", included: true },
      { text: "15 Rotating Wallets", included: true },
      { text: "10 transactions/minute", included: true },
      { text: "Basic Visibility Dashboard", included: true },
      { text: "Standard Support", included: true },
      { text: "DEXTools Integration", included: true },
      { text: "Custom Activity Patterns", included: false },
      { text: "Advanced Distribution Model", included: false },
      { text: "Distribution Controls", included: false },
    ]
  },
  {
    name: "Accelerate",
    price: 19,
    description: "For projects seeking enhanced visibility across platforms",
    icon: <Flame className="h-5 w-5 text-white" />,
    color: "from-[#00FFA3] to-[#DC1FFF]",
    features: [
      { text: "12 Parallel Processors", included: true, highlight: true },
      { text: "35 Rotating Wallets", included: true, highlight: true },
      { text: "25 transactions/minute", included: true },
      { text: "Advanced Visibility Dashboard", included: true },
      { text: "Priority Support", included: true },
      { text: "All DEX Integrations", included: true },
      { text: "Custom Activity Patterns", included: true, highlight: true },
      { text: "Distribution Controls", included: true },
      { text: "Advanced Distribution Model", included: false },
    ]
  },
  {
    name: "Dominate",
    price: 49,
    description: "Maximum token discoverability across DEX platforms",
    icon: <Crown className="h-5 w-5 text-white" />,
    color: "from-amber-400 to-orange-600",
    features: [
      { text: "25 Parallel Processors", included: true },
      { text: "50+ Rotating Wallets", included: true },
      { text: "40 transactions/minute", included: true },
      { text: "Premium Visibility Dashboard", included: true },
      { text: "24/7 VIP Support", included: true },
      { text: "All DEX Integrations", included: true },
      { text: "Custom Activity Patterns", included: true },
      { text: "Distribution Controls", included: true },
      { text: "Advanced Distribution Model", included: true, highlight: true },
    ]
  }
];

export function PricingSection() {
  const [isMonthly, setIsMonthly] = useState(true);

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 -right-40 w-80 h-80 bg-[#DC1FFF] rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#00FFA3] rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex flex-col items-center justify-center text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 mb-4 rounded-full bg-card/40 backdrop-blur-sm border border-gray-800 shadow-lg">
              <Diamond className="mr-2 h-4 w-4 text-[#00FFA3]" />
              <span className="text-xs font-medium">Flexible Plans</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00FFA3] via-blue-400 to-[#DC1FFF]">
              Choose Your Volume Bot Plan
            </h2>
            
            <p className="max-w-2xl text-gray-400 md:text-lg mb-10">
              Select the perfect Solana Volume Bot plan to boost your token's visibility on Pump.fun, DEXTools, and Dexscreener
            </p>

            {/* Toggle for Monthly/Annual */}
            <div className="flex items-center space-x-3 bg-card/60 p-1 rounded-full border border-gray-800 mb-5">
              <button 
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${isMonthly ? 'bg-[#00FFA3]/20 text-[#00FFA3]' : 'text-gray-400 hover:text-gray-300'}`}
                onClick={() => setIsMonthly(true)}
              >
                Monthly
              </button>
              <button 
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${!isMonthly ? 'bg-[#00FFA3]/20 text-[#00FFA3]' : 'text-gray-400 hover:text-gray-300'}`}
                onClick={() => setIsMonthly(false)}
              >
                Annual <span className="text-xs bg-[#DC1FFF]/20 text-[#DC1FFF] px-2 py-0.5 rounded-full ml-1">Save 20%</span>
              </button>
            </div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-10 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <PricingPlan
              key={index}
              name={plan.name}
              price={isMonthly ? plan.price : Math.round(plan.price * 0.8 * 12)}
              description={plan.description}
              features={plan.features}
              isPopular={plan.isPopular}
              isTrial={plan.isTrial}
              icon={plan.icon}
              color={plan.color}
              delay={index}
            />
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-gray-800 bg-card/60 backdrop-blur-sm">
            <HelpCircle className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-300">Need a custom plan? <a href="#contact" className="text-[#00FFA3] hover:underline">Contact us</a></span>
          </div>
          
          <div className="mt-8">
            <p className="max-w-3xl mx-auto text-sm text-gray-500 mb-4">
              All plans include: Secure SOL transaction distribution, natural pattern technology, automatic renewal, 
              and access to our dedicated support team. Cancel anytime, no questions asked.
            </p>
            
            <div className="max-w-3xl mx-auto bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mt-8 text-amber-100">
              <p className="text-center text-sm">
                <strong>Notice:</strong> Solana Volume Bot is a technical tool for increasing token visibility through on-chain activity distribution. 
                It is not a trading service and does not guarantee financial outcomes. Results depend on your token's parameters 
                and overall market conditions. Please use responsibly.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
