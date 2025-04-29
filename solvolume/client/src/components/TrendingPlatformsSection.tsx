import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CyberpunkBackground } from "./CyberpunkBackground";

// Platform interface
interface Platform {
  name: string;
  icon: string;
  color: string;
  description: string;
}

export function TrendingPlatformsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('trending-platforms');
      if (section) {
        const rect = section.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom >= 0;
        setIsVisible(isInViewport);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Platform data with uniform SVG icons for better display
  const platforms: Platform[] = [
    {
      name: "DEXTools",
      icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2312B0DE' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'%3E%3C/path%3E%3Cpolyline points='9 22 9 12 15 12 15 22'%3E%3C/polyline%3E%3C/svg%3E",
      color: "#12B0DE",
      description: "Get featured on DEXTools hot pairs and gain visibility among active users."
    },
    {
      name: "Pump.Fun",
      icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2314F195' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='2' y='7' width='20' height='15' rx='2' ry='2'%3E%3C/rect%3E%3Cpolyline points='17 7 12 2 7 7'%3E%3C/polyline%3E%3Cline x1='12' y1='2' x2='12' y2='15'%3E%3C/line%3E%3Cpath d='M5 15h14'%3E%3C/path%3E%3C/svg%3E",
      color: "#14F195",
      description: "Appear in Pump.Fun trending section to attract memecoin enthusiasts and early adopters."
    },
    {
      name: "DEXScreener",
      icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23FFDE59' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect width='18' height='18' x='3' y='3' rx='2' ry='2'%3E%3C/rect%3E%3Cline x1='3' x2='21' y1='9' y2='9'%3E%3C/line%3E%3Cline x1='3' x2='21' y1='15' y2='15'%3E%3C/line%3E%3Cline x1='9' x2='9' y1='3' y2='21'%3E%3C/line%3E%3Cline x1='15' x2='15' y1='3' y2='21'%3E%3C/line%3E%3C/svg%3E",
      color: "#FFDE59",
      description: "Climb DEXScreener charts to capture attention from technical analysts and cryptocurrency users."
    },
    {
      name: "CoinGecko",
      icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23FFDE59' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cpath d='M12 16a4 4 0 0 0 4-4'%3E%3C/path%3E%3Cpath d='M8 12a4 4 0 0 0 8 0'%3E%3C/path%3E%3Ccircle cx='9' cy='9' r='1'%3E%3C/circle%3E%3Ccircle cx='15' cy='9' r='1'%3E%3C/circle%3E%3C/svg%3E",
      color: "#FFDE59",
      description: "Get your token listed and trending on CoinGecko to reach mainstream crypto investors."
    },
    {
      name: "Jupiter",
      icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23A56BFF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cpath d='M8 14s1.5 2 4 2 4-2 4-2'%3E%3C/path%3E%3Cline x1='9' x2='9.01' y1='9' y2='9'%3E%3C/line%3E%3Cline x1='15' x2='15.01' y1='9' y2='9'%3E%3C/line%3E%3C/svg%3E",
      color: "#A56BFF",
      description: "Appear in Jupiter's trending swaps to capture attention from the largest Solana DEX aggregator users."
    },
    {
      name: "Birdeye",
      icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%234169E1' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'%3E%3C/path%3E%3Cpolyline points='22,6 12,13 2,6'%3E%3C/polyline%3E%3C/svg%3E",
      color: "#4169E1",
      description: "Get visible in Birdeye's most viewed and highest volume lists for maximum exposure."
    },
    {
      name: "CoinMarketCap",
      icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%233861FB' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 2a8 8 0 1 1-8 8 8 8 0 0 1 8-8zm-3.5 8a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5zm7 0a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5zm-8 4h7a2.5 2.5 0 0 1-7 0z'%3E%3C/path%3E%3C/svg%3E",
      color: "#3861FB",
      description: "Reach the top gainers list on CoinMarketCap to gain credibility with institutional investors."
    }
  ];

  return (
    <section 
      id="trending-platforms" 
      className="py-20 relative overflow-hidden"
    >
      {/* Cyberpunk background */}
      <CyberpunkBackground variant="dark" withGrid withGlitch />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-white">Get Your Token </span>
            <span className="text-[#14F195]">Trending</span>
            <span className="text-white"> On All Major Platforms</span>
          </h2>
          <p className="text-white/70 max-w-3xl mx-auto text-lg">
            Our volume bot ensures your token gains visibility across all key platforms where users discover new gems. Targeted volume means higher ranking on trending lists.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 md:gap-4 justify-center text-center relative">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative group" 
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div 
                className="flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300"
                style={{
                  background: activeIndex !== null && activeIndex === index 
                    ? `linear-gradient(to bottom, rgba(10,10,20,0.8), rgba(10,10,20,0.6))` 
                    : 'transparent',
                  backdropFilter: activeIndex !== null && activeIndex === index ? 'blur(10px)' : 'none',
                  border: activeIndex !== null && activeIndex === index ? `1px solid ${platform.color}30` : '1px solid transparent',
                  transform: activeIndex !== null && activeIndex === index ? 'translateY(-5px)' : 'none',
                  boxShadow: activeIndex !== null && activeIndex === index ? `0 10px 25px rgba(0,0,0,0.2), 0 0 15px ${platform.color}30` : 'none'
                }}
              >
                {/* Platform Icon - 3D Style with consistent sizing */}
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 relative transform hover:rotate-6 transition-transform duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${platform.color}30, rgba(10,10,20,0.9))`,
                    boxShadow: `0 10px 20px rgba(0,0,0,0.2), 0 0 15px ${platform.color}30, inset 0 1px 1px rgba(255,255,255,0.1)`,
                    transform: `perspective(800px) rotateX(10deg)`,
                    transformStyle: 'preserve-3d',
                    overflow: 'hidden'
                  }}
                >
                  {/* Top highlight edge */}
                  <div 
                    className="absolute inset-x-0 top-0 h-[1px] rounded-t-xl"
                    style={{ background: `linear-gradient(to right, transparent, ${platform.color}60, transparent)` }}
                  />
                  
                  {/* Left highlight edge */}
                  <div 
                    className="absolute inset-y-0 left-0 w-[1px] rounded-l-xl"
                    style={{ background: `linear-gradient(to bottom, transparent, ${platform.color}60, transparent)` }}
                  />
                  
                  {/* Icon with 3D effect */}
                  <div className="relative transform translate-y-[-2px] hover:translate-y-[-4px] transition-transform duration-300">
                    <img 
                      src={platform.icon} 
                      alt={platform.name} 
                      className="w-6 h-6 object-contain" 
                      style={{ 
                        filter: "brightness(1.5) contrast(1.2) drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
                        maxWidth: "100%"
                      }}
                    />
                    
                    {/* Subtle icon shadow */}
                    <div 
                      className="absolute -inset-2 opacity-30 blur-md -z-10 rounded-full"
                      style={{ background: platform.color, filter: 'blur(8px)' }}
                    />
                  </div>
                </div>
                
                {/* Platform Name */}
                <span className="text-white text-sm font-medium">{platform.name}</span>
                
                {/* Platform Description - only visible on hover */}
                <div 
                  className="absolute top-full left-0 right-0 bg-[#0A0A14]/95 backdrop-blur-md text-white/80 text-xs p-3 rounded-lg opacity-0 pointer-events-none transition-all duration-300 z-10 mt-2 shadow-lg border border-[#1e2035]"
                  style={{ 
                    opacity: activeIndex !== null && activeIndex === index ? 1 : 0,
                    transform: activeIndex !== null && activeIndex === index ? 'translateY(0)' : 'translateY(-10px)',
                    maxWidth: '200px'
                  }}
                >
                  {platform.description}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#0A0A14] border-t border-l border-[#1e2035] rotate-45"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Animated indicator dots for platforms */}
        <div className="flex justify-center mt-10 gap-1">
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-white/20"
              animate={{ 
                backgroundColor: activeIndex !== null && i === activeIndex % 7 ? platforms[i % 7].color : 'rgba(255,255,255,0.2)',
                scale: activeIndex !== null && i === activeIndex % 7 ? 1.2 : 1
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
        
        {/* Highlighted feature box */}
        <motion.div 
          className="mt-16 max-w-3xl mx-auto bg-gradient-to-r from-[#0A0A14]/90 to-[#0A0A14]/80 border border-[#1e2035] rounded-2xl p-6 shadow-lg backdrop-blur-md"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="bg-gradient-to-br from-[#9945FF] to-[#14F195] p-4 rounded-xl shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">Multi-Platform Visibility Strategy</h3>
              <p className="text-white/70">
                Our intelligent volume distribution algorithm ensures your token appears on multiple platforms simultaneously, maximizing exposure to different user communities. This cross-platform approach generates compounding visibility effects.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}