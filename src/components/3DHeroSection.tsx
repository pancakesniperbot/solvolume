import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap } from "lucide-react";
import { CyberpunkHeroBackground } from "@/components/CyberpunkHeroBackground";
import { CtaButton } from "@/components/CtaButton";
import { ThreeDScene } from "./3DScene";
import solanaMascotImage from "../assets/SOLANA-VOLUME-BOT-MASCOTTE.png";
import { getCoinLogo } from "@/utils/getCoinLogo";

// Meme coin data with sentiment information
const memeCoinsData = [
  {
    name: "BONK",
    symbol: "BONK",
    color: "#F7A44C",
    imageUrl: getCoinLogo("BONK"),
    position: [-2.5, 1, 0] as [number, number, number],
    scale: 0.8,
    speed: 1.0,
    sentiment: 78,
    volume24h: 92932723
  },
  {
    name: "WIF",
    symbol: "WIF",
    color: "#B1B549",
    imageUrl: getCoinLogo("WIF"), 
    position: [2.5, 0.5, 0.5] as [number, number, number],
    scale: 0.7,
    speed: 1.2,
    sentiment: 65,
    volume24h: 126653448
  },
  {
    name: "POPCAT",
    symbol: "POPCAT",
    color: "#FF5D8F",
    imageUrl: getCoinLogo("POPCAT"),
    position: [-1.8, -1.5, 0.2] as [number, number, number],
    scale: 0.7,
    speed: 0.8,
    sentiment: 42,
    volume24h: 7500000
  },
  {
    name: "BOOK",
    symbol: "BOOK",
    color: "#14F195",
    imageUrl: getCoinLogo("BOOK"),
    position: [2, -1, -0.5] as [number, number, number],
    scale: 0.9,
    speed: 1.5,
    sentiment: 71,
    volume24h: 12000000
  },
  {
    name: "MOCHI",
    symbol: "MOCHI",
    color: "#E95F98",
    imageUrl: getCoinLogo("MOCHI"),
    position: [0, 2, 0.3] as [number, number, number],
    scale: 0.85,
    speed: 1.1,
    sentiment: 85,
    volume24h: 9500000
  },
  {
    name: "BODEN",
    symbol: "BODEN",
    color: "#5DADE2",
    imageUrl: getCoinLogo("BODEN"),
    position: [-3, -0.2, -0.3] as [number, number, number],
    scale: 0.75,
    speed: 0.9,
    sentiment: 34,
    volume24h: 5800000
  }
];

export function ThreeDHeroSection() {
  const [coinData, setCoinData] = useState(memeCoinsData);
  const mascotRef = useRef<HTMLDivElement>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const fetchCoinData = async () => {
    setIsRefreshing(true);
    try {
      const memeCoinsService = await import('@/services/memeCoinsService');
      const latestCoins = await memeCoinsService.getMemeCoins();
      
      if (latestCoins?.length) {
        const updatedCoinData = memeCoinsData.map((coin, index) => {
          const matchedCoin = latestCoins.find((c: any) => c.symbol === coin.symbol) || 
                             latestCoins[index % latestCoins.length];
          
          return matchedCoin ? {
            ...coin,
            sentiment: matchedCoin.sentiment,
            imageUrl: matchedCoin.icon || coin.imageUrl
          } : coin;
        });
        
        setCoinData(updatedCoinData);
      }
    } catch (error) {
      console.error("Error fetching real-time coin data:", error);
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };
  
  useEffect(() => {
    fetchCoinData();
  }, []);
  
  return (
    <section className="min-h-screen relative overflow-hidden bg-black">
      <CyberpunkHeroBackground intensity={8} />
      
      <div className="absolute inset-0 -z-10">
        <ThreeDScene coinData={coinData} />
      </div>
      
      <div className="absolute left-10 bottom-40 z-10 hidden lg:block" ref={mascotRef}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ 
            opacity: 1, 
            x: 0,
            y: [0, -15, 0],
            transition: {
              x: { duration: 0.7, delay: 0.5 },
              opacity: { duration: 0.7, delay: 0.5 },
              y: { 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut",
                repeatType: "reverse" 
              }
            }
          }}
        >
          <img 
            src={solanaMascotImage} 
            alt="Solana Volume Bot Mascot" 
            className="h-[400px] object-contain"
            style={{ 
              filter: 'drop-shadow(0 0 25px rgba(20, 241, 149, 0.6))',
              transform: 'rotate(5deg)'
            }}
          />
        </motion.div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-20">
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Badge className="mb-6 px-4 py-1.5 text-lg bg-gradient-to-r from-[#9945FF] to-[#14F195] border-none">
              #1 Solana Volume Bot
            </Badge>
            
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-[#14F195] to-[#9945FF]">
              Solana Volume Bot: SOL Volume Bot - Pump Fun Volume Bot
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Solana Volume Bot is the #1 platform for boosting your token's visibility and ranking on DEXSCREENER, PUMP.FUN, and DEXTOOLS through strategic volume distribution and natural transaction patterns.
            </p>
            
            <div className="bg-[#0c0c15]/80 backdrop-blur-md rounded-xl p-5 mb-8 max-w-2xl mx-auto">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-gradient-to-r from-[#9945FF] to-[#14F195] p-2 rounded-lg">
                  <Zap size={24} className="text-black" />
                </div>
                <h3 className="text-xl font-semibold text-white">Strategic Solana Token Volume Bot to Boost SOL Volume</h3>
              </div>
              <p className="text-gray-300 ml-12">
                Enhance token visibility through strategic volume generation with compliant, natural-looking transaction patterns
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
              <div className="flex justify-center max-w-xl w-full mx-auto">
                <CtaButton 
                  size="lg" 
                  variant="primary"
                  className="text-lg px-10 py-6 relative z-20 w-full"
                  icon={<ArrowRight className="ml-2 h-5 w-5" />}
                >
                  Click here to start your 7-day free trial.
                </CtaButton>
              </div>
            </div>
            
            <div className="mt-10 max-w-2xl mx-auto bg-gradient-to-r from-[#0f0f1a]/60 to-[#131325]/60 backdrop-blur-sm p-6 rounded-xl border border-[#9945FF]/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-[#9945FF] text-xl">🔐</span>
                  <span className="text-white">No private key</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#14F195] text-xl">🔗</span>
                  <span className="text-white">No wallet connection</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#03E1FF] text-xl">🛡️</span>
                  <span className="text-white">No password required</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-400 text-xl">✅</span>
                  <span className="text-white">Simply enter token address</span>
                </div>
              </div>
              <p className="text-center text-gray-300 text-sm mt-2">
                Enter your token address to start boosting your token's visibility through strategic volume distribution
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}