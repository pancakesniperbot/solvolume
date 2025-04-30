import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, BarChart3 } from "lucide-react";
import { CtaButton } from "@/components/CtaButton";
// Animation imports
import { SolanaFloatingBadge, Solana3DCard, Solana3DButton, SolanaFloatingStatCard, SolanaGlowText } from "./ui/solana-ui";

export function SolanaHeroSection() {
  const [hasStarted, setHasStarted] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Perfectly positioned bubbles - exact match to screenshot
  const bubblePositions = [
    // DEGEN bubble - left top
    { name: "DEGEN", color: "#6F4BF2", x: 6, y: 22, size: windowWidth > 1200 ? 65 : windowWidth > 768 ? 50 : 40, delay: 0.3 },
    // BONK bubble - right top
    { name: "BONK", color: "#F0B90B", x: 88, y: 22, size: windowWidth > 1200 ? 65 : windowWidth > 768 ? 50 : 40, delay: 0.4 },
    // MOON bubble - right bottom (only on larger screens)
    ...(windowWidth > 768 ? [{ name: "MOON", color: "#62DE6C", x: 92, y: 80, size: windowWidth > 1200 ? 65 : 50, delay: 0.5 }] : []),
    // BOOK bubble - left bottom (only on larger screens)
    ...(windowWidth > 768 ? [{ name: "BOOK", color: "#FF433D", x: 8, y: 80, size: windowWidth > 1200 ? 60 : 45, delay: 0.6 }] : [])
  ];

  // Stats card positions
  const statsCardPositions = [
    {
      icon: <BarChart3 className="h-5 w-5 text-green-400" />,
      value: "+1324%",
      label: "Visibility Increase",
      delay: 0.6,
      position: { top: "22%", right: "20%" },
      color: "green"
    },
    {
      value: "#1",
      label: "DEXTools Discoverability",
      delay: 0.7,
      position: { bottom: "20%", right: "12%" },
      color: "purple"
    },
    {
      value: "1,246",
      label: "24h Transactions",
      delay: 0.8,
      position: { bottom: "35%", left: "12%" },
      color: "blue"
    }
  ];

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Enhanced 3D animated background with Solana-themed elements */}
      <AnimatedBackground3D 
        density={15} 
        colorScheme="solana" 
        intensity="medium" 
        enableParallax={true}
      />

      {/* Token bubbles with enhanced 3D effect */}
      {bubblePositions.map((bubble, index) => (
        <div
          key={index}
          className="absolute z-10"
          style={{ 
            left: `${bubble.x}%`, 
            top: `${bubble.y}%`,
          }}
        >
          <ParallaxWrapper
            strength={5}
            mouseMovement={true}
            mouseStrength={15}
            delay={bubble.delay}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                y: [0, -8, 0, 8, 0] 
              }}
              transition={{
                opacity: { duration: 0.7 },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              {/* Enhanced 3D glow effect */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: bubble.size * 1.5,
                  height: bubble.size * 1.5,
                  background: `radial-gradient(circle at 35% 35%, ${bubble.color}30 0%, transparent 70%)`,
                  filter: "blur(10px)",
                  left: -bubble.size * 0.25,
                  top: -bubble.size * 0.25
                }}
                animate={{ 
                  opacity: [0.5, 0.9, 0.5],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
              />
              
              {/* Token bubble with 3D depth effect */}
              <motion.div
                className="rounded-full flex items-center justify-center font-semibold text-sm"
                style={{
                  width: bubble.size,
                  height: bubble.size,
                  background: `radial-gradient(circle at 30% 30%, ${bubble.color}, ${bubble.color}90)`,
                  boxShadow: `
                    0 10px 30px rgba(0,0,0,0.4),
                    inset 0 -2px 6px rgba(0,0,0,0.2),
                    inset 0 2px 5px rgba(255,255,255,0.1)
                  `,
                  color: "white",
                  transformStyle: "preserve-3d",
                  perspective: "500px"
                }}
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: `
                    0 15px 40px rgba(0,0,0,0.5),
                    inset 0 -2px 6px rgba(0,0,0,0.2),
                    inset 0 2px 5px rgba(255,255,255,0.1)
                  `
                }}
              >
                {/* 3D layered text effect */}
                <span style={{ transform: "translateZ(5px)" }}>
                  {bubble.name}
                </span>
                
                {/* Inner highlight for 3D effect */}
                <div className="absolute inset-x-[25%] top-[20%] h-[1px] w-[50%] bg-white/30 rounded-full"/>
              </motion.div>
            </motion.div>
          </ParallaxWrapper>
        </div>
      ))}

      {/* Main content with parallax effects */}
      <div className="relative z-20 container mx-auto px-4 pt-24 pb-16">
        <div className="flex flex-col items-center min-h-screen justify-center text-center max-w-4xl mx-auto">
          {/* Solana Volume Bot Badge with enhanced floating effect */}
          <div className="mb-8">
            <ParallaxWrapper strength={10} mouseStrength={15} delay={0.1}>
              <SolanaFloatingBadge 
                variant="gradient" 
                size="md"
              >
                <a href="https://solanavolumebot.io" rel="dofollow" className="hover:underline">
                  #1 Solana Volume Bot
                </a>
              </SolanaFloatingBadge>
            </ParallaxWrapper>
          </div>

          {/* Heading with parallax effect */}
          <div className="mb-6 relative">
            <ParallaxWrapper 
              strength={15} 
              direction="up" 
              mouseMovement={true} 
              mouseStrength={15}
              delay={0.2}
            >
              {/* 3D background glow for text */}
              <div className="absolute inset-0 bg-black/60 blur-xl rounded-3xl transform scale-110 -z-10"></div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1]">
                <div className="block mb-2">Boost Your Token's</div>
                <SolanaGlowText color="green" intensity="medium" as="div" className="mb-2 inline-block">
                  Visibility
                </SolanaGlowText>
                <div className="block">
                  with Enhanced <SolanaGlowText color="gradient" intensity="high" as="span">Volume</SolanaGlowText>
                </div>
              </h1>
            </ParallaxWrapper>
          </div>

          {/* Description with subtle parallax */}
          <div className="mb-12 max-w-2xl">
            <ParallaxWrapper 
              strength={10} 
              mouseMovement={true} 
              mouseStrength={10} 
              delay={0.3}
            >
              <p className="text-lg text-white/80 leading-relaxed">
                Increase your Solana token's discoverability with our <a href="https://solanavolumebot.io" rel="dofollow" className="text-[#14F195] hover:underline">SOL Volume Bot</a>. 
                Get your token noticed on <a href="https://solanavolumebot.io" rel="dofollow" className="text-[#9945FF] hover:underline">Pump Fun Trending Bot</a>, 
                DEXTools, and Dexscreener through intelligent volume distribution.
              </p>
            </ParallaxWrapper>
          </div>

          {/* Feature Box with 3D card effect */}
          <div className="w-full max-w-xl mb-10">
            <ParallaxWrapper 
              strength={20} 
              mouseMovement={true} 
              mouseStrength={15} 
              rotateOnMouse={true} 
              rotateStrength={2}
              delay={0.4}
            >
              <div className="hover-glow multi neon-border cyberpunk-grid">
                <Solana3DCard 
                  glowColor="multi" 
                  depth="medium"
                  className="p-5 scan-line"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="bg-gradient-to-r from-[#9945FF] to-[#14F195] p-2 rounded-lg shadow-md pulse">
                      <Zap size={24} className="text-black" />
                    </div>
                    <h3 className="text-lg font-semibold text-white cyber-text multi">Advanced Visibility Enhancement</h3>
                  </div>
                  <p className="text-white/70 ml-12">
                    Our <a href="https://solanavolumebot.io" rel="dofollow" className="text-[#14F195] hover:underline">Solana Market Maker Bot</a> provides continuous transaction activity 
                    distribution to maintain your token's presence on trending lists
                  </p>
                  
                  {/* Futuristic highlight line */}
                  <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#14F195]/30 to-transparent"></div>
                  
                  {/* Digital noise overlay */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
                    <div className="w-full h-full bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 200 200%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.65%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url%28%23noiseFilter%29%27/%3E%3C/svg%3E')]"></div>
                  </div>
                </Solana3DCard>
              </div>
            </ParallaxWrapper>
          </div>

          {/* CTA Button with 3D effects - Free Trial Only */}
          <div id="free-trial" className="w-full flex justify-center mb-8 hero-cta free-trial-section">
            <div className="max-w-xl w-full mx-auto">
              <ParallaxWrapper
                strength={20}
                mouseMovement={true}
                delay={0.5}
              >
                <div className="click-ripple hover-glow multi haptic-feedback">
                  {/* Start Free Trial - Enhanced for better visibility */}
                  <CtaButton
                    variant="primary"
                    size="lg"
                    className="px-8 py-6 text-lg font-bold rounded-xl free-trial-button w-full bg-gradient-to-r from-[#14F195] to-[#9945FF] text-black hover:opacity-90 transition-all"
                    icon={<ArrowRight className="ml-2 h-5 w-5" />}
                  >
                    Start Your Free Trial
                  </CtaButton>
                </div>
              </ParallaxWrapper>
            </div>
          </div>

          {/* Features Checkmarks */}
          <div className="mb-16">
            <ParallaxWrapper
              strength={15}
              mouseMovement={true}
              delay={0.6}
            >
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
                <div className="flex items-center">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-green-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-white/70 text-sm">No coding required</span>
                </div>
                <div className="flex items-center">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-green-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-white/70 text-sm">5-minute setup</span>
                </div>
                <div className="flex items-center">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-green-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-white/70 text-sm">Cancel anytime</span>
                </div>
              </div>
            </ParallaxWrapper>
          </div>

          {/* Trusted logos with subtle animation */}
          <div className="mt-auto">
            <ParallaxWrapper
              strength={10}
              mouseMovement={true}
              delay={0.7}
            >
              <div className="text-xs uppercase tracking-wider text-white/40 mb-3">
                Trusted by token creators worldwide
              </div>
              <div className="flex items-center justify-center gap-6">
                <motion.img 
                  src="https://cryptologos.cc/logos/dextools-dext-logo.png?v=026" 
                  alt="DEXTools" 
                  className="h-5 opacity-60 hover:opacity-100 transition-opacity" 
                  whileHover={{ scale: 1.15, y: -3 }}
                />
                <motion.img 
                  src="https://cryptologos.cc/logos/solana-sol-logo.png?v=026" 
                  alt="Solana" 
                  className="h-5 opacity-60 hover:opacity-100 transition-opacity" 
                  whileHover={{ scale: 1.15, y: -3 }}
                />
                <motion.img 
                  src="https://cryptologos.cc/logos/raydium-ray-logo.png?v=026" 
                  alt="Raydium" 
                  className="h-5 opacity-60 hover:opacity-100 transition-opacity" 
                  whileHover={{ scale: 1.15, y: -3 }}
                />
              </div>
            </ParallaxWrapper>
          </div>
        </div>
      </div>

      {/* Enhanced 3D Stat cards with parallax effects */}
      {windowWidth > 768 && (
        <>
          {statsCardPositions.map((stat, index) => {
            return (
              <div 
                key={index}
                className="absolute z-30"
                style={stat.position}
              >
                <ParallaxWrapper
                  strength={20}
                  mouseMovement={true}
                  mouseStrength={30}
                  rotateOnMouse={true}
                  rotateStrength={10}
                  delay={stat.delay}
                >
                  <SolanaFloatingStatCard
                    value={stat.value}
                    label={stat.label}
                    icon={stat.icon}
                    iconColor={stat.color as any}
                    valueSize="lg"
                  />
                </ParallaxWrapper>
              </div>
            );
          })}
        </>
      )}
    </section>
  );
}