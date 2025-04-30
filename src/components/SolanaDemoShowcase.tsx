import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { CtaButton } from "@/components/CtaButton";

export function SolanaDemoShowcase() {
  
  // Demo steps showing how the Solana Volume Bot works
  const steps = [
    {
      title: "Solana Volume Bot: SOL Volume Bot - Pump Fun Volume Bot",
      description: "Easily connect your Solana token by providing the contract address",
      icon: "🔌",
      color: "#9945FF"
    },
    {
      title: "Solana Volume Bot: SOL Volume Bot - Pump Fun Volume Bot",
      description: "Set your desired volume levels and trading patterns for realistic activity",
      icon: "⚙️",
      color: "#14F195"
    },
    {
      title: "Solana Volume Bot: SOL Volume Bot - Pump Fun Volume Bot",
      description: "Our AI-powered bots start generating volume across multiple DEXs",
      icon: "🚀",
      color: "#03E1FF"
    },
    {
      title: "Solana Volume Bot: SOL Volume Bot - Pump Fun Volume Bot",
      description: "Watch your token climb the trending charts in real-time",
      icon: "📈",
      color: "#DC1FFF"
    }
  ];
  
  return (
    <section className="py-20 bg-[#070710] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#9945FF] opacity-[0.03] blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-[#14F195] opacity-[0.025] blur-[80px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="mb-2">
            <span className="inline-block px-3 py-1 bg-[#14F195]/10 text-[#14F195] text-sm rounded-full border border-[#14F195]/20 mb-3">#1 Solana Volume Bot</span>
          </div>
          <h2 className="text-5xl font-bold mb-6 text-white">
            Boost Your Token's <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-[#14F195] to-white">Visibility</span>
            <span className="block mt-2">with Enhanced <span className="text-[#9945FF]">Volume</span></span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg mb-8">
            Increase your Solana token's discoverability through intelligent volume distribution across multiple DEXs. Get your token noticed on Pump.fun, DEXTools, and Dexscreener trending lists.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {/* Left side - Interactive Dashboard */}
          <div className="w-full lg:w-3/5 relative">
            <div className="relative rounded-xl overflow-hidden border border-gray-800 shadow-[0_0_40px_rgba(20,241,149,0.1)]">
              {/* Interactive dashboard visualization */}
              <div className="relative aspect-video bg-[#0D0D15]">
                <img 
                  src="/images/solana-logo.png" 
                  alt="Volume Bot Demo Thumbnail" 
                  className="absolute inset-0 w-full h-full object-contain opacity-10"
                />
                
                {/* Enhanced realistic Solana Volume Bot UI mockup */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[90%] h-[90%] bg-[#0a0a14] rounded-lg border border-[#1e2035] shadow-xl p-0 flex flex-col overflow-hidden"
                    style={{
                      boxShadow: '0 0 30px rgba(0,0,0,0.5), 0 0 15px rgba(20, 241, 149, 0.1)'
                    }}
                  >
                    {/* Dashboard top bar with app controls */}
                    <div className="h-8 bg-[#14141e] flex items-center px-3 border-b border-[#1e2035]">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <div className="absolute left-1/2 transform -translate-x-1/2 text-white/70 text-xs flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#14F195]"></div>
                        Solana Volume Bot Control Panel
                      </div>
                    </div>
                    
                    {/* Main dashboard interface */}
                    <div className="flex flex-1">
                      {/* Left sidebar navigation */}
                      <div className="w-[60px] bg-[#0D1117]/80 border-r border-[#1e2035] flex flex-col items-center py-3 space-y-4">
                        {/* App logo */}
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#9945FF] to-[#14F195] mb-4 flex items-center justify-center">
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="black" strokeWidth="2.5" className="transform rotate-90">
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                          </svg>
                        </div>
                        
                        {/* Nav items - active first item */}
                        <div className="w-9 h-9 rounded-lg bg-[#14F195]/20 border border-[#14F195]/30 flex items-center justify-center cursor-pointer">
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#14F195" strokeWidth="2">
                            <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                            <line x1="9" y1="3" x2="9" y2="21"></line>
                          </svg>
                        </div>
                        
                        {/* Other nav items */}
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer text-white/40">
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="3"></circle>
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                          </svg>
                        </div>
                        
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer text-white/40">
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 20v-6M6 20V10M18 20V4"></path>
                          </svg>
                        </div>
                        
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer text-white/40">
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                          </svg>
                        </div>
                      </div>
                      
                      {/* Main content area */}
                      <div className="flex-1 p-3 overflow-hidden">
                        {/* Top action bar */}
                        <div className="flex justify-between items-center mb-3">
                          <div className="text-white font-medium text-sm">Dashboard Overview</div>
                          <div className="flex items-center space-x-1.5">
                            <div className="px-2 py-1 bg-[#14F195]/10 rounded text-[#14F195] text-xs border border-[#14F195]/20">
                              Active
                            </div>
                            <div className="w-7 h-7 rounded-full bg-[#14141E] border border-[#1e2035] flex items-center justify-center text-xs text-white/60">
                              +
                            </div>
                          </div>
                        </div>
                        
                        {/* Dashboard overview stat cards */}
                        <div className="grid grid-cols-3 gap-2 mb-3">
                          <div className="bg-[#0D1117] border border-[#1e2035] rounded-lg p-2 flex flex-col">
                            <div className="text-xs text-white/50 mb-1">24h Volume</div>
                            <div className="text-sm font-bold text-white flex items-center gap-1">
                              $247,891
                              <span className="text-[#14F195] text-xs">+24.3%</span>
                            </div>
                          </div>
                          
                          <div className="bg-[#0D1117] border border-[#1e2035] rounded-lg p-2 flex flex-col">
                            <div className="text-xs text-white/50 mb-1">Active Tokens</div>
                            <div className="text-sm font-bold text-white flex items-center gap-1">
                              4
                              <span className="text-[#14F195] text-xs">+1 today</span>
                            </div>
                          </div>
                          
                          <div className="bg-[#0D1117] border border-[#1e2035] rounded-lg p-2 flex flex-col">
                            <div className="text-xs text-white/50 mb-1">TX Count</div>
                            <div className="text-sm font-bold text-white flex items-center gap-1">
                              2,481
                              <span className="text-[#14F195] text-xs">+125/hr</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Volume chart */}
                        <div className="bg-[#0D1117] border border-[#1e2035] rounded-lg p-2 mb-3 relative overflow-hidden">
                          <div className="flex justify-between items-center mb-2">
                            <div className="text-white text-xs font-medium">Volume Distribution</div>
                            <div className="flex space-x-1">
                              <div className="px-1.5 py-0.5 rounded text-[#14F195] bg-[#14F195]/10 text-[10px] border border-[#14F195]/10">24h</div>
                              <div className="px-1.5 py-0.5 rounded text-white/40 hover:text-white/60 transition-colors text-[10px] cursor-pointer">7d</div>
                              <div className="px-1.5 py-0.5 rounded text-white/40 hover:text-white/60 transition-colors text-[10px] cursor-pointer">30d</div>
                            </div>
                          </div>
                          
                          {/* Chart grid lines */}
                          <div className="absolute inset-0 mt-6">
                            <div className="border-t border-dashed border-[#1e2035]/30 w-full h-1/4"></div>
                            <div className="border-t border-dashed border-[#1e2035]/30 w-full h-1/4"></div>
                            <div className="border-t border-dashed border-[#1e2035]/30 w-full h-1/4"></div>
                            <div className="border-t border-dashed border-[#1e2035]/30 w-full h-1/4"></div>
                          </div>
                          
                          {/* Volume bars - static but styled to look active */}
                          <div className="h-24 flex items-end justify-between px-1 relative">
                            {Array.from({ length: 24 }).map((_, i) => {
                              // Create a more natural pattern that resembles trading volume
                              let height;
                              if (i < 8) height = 20 + i * 6; // Rising
                              else if (i < 12) height = 60 - (i - 8) * 5; // Falling
                              else if (i < 16) height = 40 + (i - 12) * 4; // Rising
                              else if (i < 20) height = 55 + (i - 16) * 7; // Strongly rising
                              else height = 85 - (i - 20) * 3; // Trailing off
                              
                              const colors = [
                                'rgba(20, 241, 149, 0.8)',
                                'rgba(20, 241, 149, 0.7)',
                                'rgba(20, 241, 149, 0.9)',
                                'rgba(20, 241, 149, 0.75)'
                              ];
                              
                              return (
                                <div 
                                  key={i}
                                  className="w-[3%] rounded-t"
                                  style={{ 
                                    height: `${height}%`,
                                    backgroundColor: colors[i % 4],
                                    marginLeft: '1px',
                                    marginRight: '1px'
                                  }}
                                />
                              );
                            })}
                            
                            {/* Gradient overlay for depth */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/30 to-transparent pointer-events-none"></div>
                          </div>
                          
                          {/* Time indicators */}
                          <div className="flex justify-between text-[8px] text-white/30 px-1 mt-1">
                            <div>00:00</div>
                            <div>06:00</div>
                            <div>12:00</div>
                            <div>18:00</div>
                            <div>00:00</div>
                          </div>
                        </div>
                        
                        {/* Active tokens table */}
                        <div className="bg-[#0D1117] border border-[#1e2035] rounded-lg overflow-hidden">
                          <div className="bg-[#14141e] text-white/70 text-xs px-3 py-1.5 border-b border-[#1e2035] flex justify-between">
                            <span>Active Tokens</span>
                            <span className="text-[#14F195] cursor-pointer">View All</span>
                          </div>
                          
                          {/* Token entries */}
                          <div className="divide-y divide-[#1e2035]/50">
                            <div className="flex items-center px-3 py-2">
                              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#9945FF] to-[#14F195] mr-2 flex items-center justify-center text-black text-xs font-bold">S</div>
                              <div>
                                <div className="text-white text-xs">Solana</div>
                                <div className="text-white/40 text-[10px]">DEXTools, PUMP.FUN</div>
                              </div>
                              <div className="ml-auto flex items-center">
                                <div className="text-xs font-medium text-[#14F195] mr-3">+18.2%</div>
                                <div className="text-[10px] text-white/50 bg-white/5 px-1.5 py-0.5 rounded">Active</div>
                              </div>
                            </div>
                            
                            <div className="flex items-center px-3 py-2">
                              <div className="w-6 h-6 rounded-full bg-[#9945FF]/30 mr-2 flex items-center justify-center text-white text-xs font-bold">B</div>
                              <div>
                                <div className="text-white text-xs">BONK</div>
                                <div className="text-white/40 text-[10px]">DEXScreener</div>
                              </div>
                              <div className="ml-auto flex items-center">
                                <div className="text-xs font-medium text-[#14F195] mr-3">+9.4%</div>
                                <div className="text-[10px] text-white/50 bg-white/5 px-1.5 py-0.5 rounded">Active</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced 3D Free Trial CTA overlay */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300 hover:bg-black/70"
                  style={{
                    perspective: '1000px',
                    cursor: 'pointer'
                  }}
                >
                  {/* Interface elements that suggest a real application - keep as background */}
                  <div className="absolute inset-0 overflow-hidden opacity-30">
                    <div className="absolute top-4 left-4 right-4 h-8 flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      <div className="ml-6 h-5 w-40 bg-white/20 rounded"></div>
                    </div>
                    
                    <div className="absolute top-16 left-4 w-40 bottom-4 bg-[#121225]/80 rounded-lg border border-[#1E293B]/30"></div>
                    <div className="absolute top-16 left-48 right-4 bottom-4 bg-[#0D1117]/80 rounded-lg border border-[#1E293B]/30">
                      <div className="m-3 h-3 w-3/4 bg-white/10 rounded"></div>
                      <div className="mx-3 my-2 h-2 w-1/2 bg-white/10 rounded"></div>
                      <div className="m-3 h-20 w-full bg-[#14F195]/5 rounded"></div>
                    </div>
                  </div>
                  
                  {/* Futuristic Free Trial button */}
                  <div className="relative group transform hover:scale-105 transition-transform duration-300 z-10">
                    <CtaButton
                      variant="primary"
                      size="lg" 
                      className="px-8 py-4 rounded-xl text-black font-bold text-lg bg-gradient-to-r from-[#14F195] to-[#9945FF] hover:opacity-90 transition-all"
                      icon={<ArrowRight className="ml-2 h-5 w-5" />}
                    >
                      Start Your Free Trial
                    </CtaButton>
                    
                    {/* Button glow effect */}
                    <div 
                      className="absolute -inset-2 rounded-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                      style={{
                        background: 'linear-gradient(45deg, rgba(153, 69, 255, 0.4), rgba(20, 241, 149, 0.4))',
                        filter: 'blur(20px)',
                        transform: 'translateZ(-10px)'
                      }}
                    ></div>
                  </div>
                  
                  {/* Features list in cyberpunk style */}
                  <div className="mt-8 flex flex-wrap justify-center gap-4">
                    {["No coding required", "5-minute setup", "Cancel anytime"].map((feature, i) => (
                      <div 
                        key={i}
                        className="px-3 py-1.5 bg-black/50 border border-[#1e2035]/80 rounded-lg backdrop-blur-md flex items-center gap-2"
                      >
                        <div className="w-4 h-4 rounded-full bg-[#14F195]/20 flex items-center justify-center">
                          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#14F195" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span className="text-white/70 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - How it works steps */}
          <div className="w-full lg:w-2/5">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">How It Works</h3>
              
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex gap-4"
                >
                  <div 
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl"
                    style={{ background: `linear-gradient(135deg, ${step.color}, #14141E)` }}
                  >
                    {step.icon}
                  </div>
                  
                  <div>
                    <h4 className="text-white font-bold mb-1">{step.title}</h4>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>
              ))}
              
              <div className="pt-4">
                <CtaButton 
                  variant="primary" 
                  size="lg"
                  className="px-8 py-4 rounded-xl text-black font-bold text-lg bg-gradient-to-r from-[#14F195] to-[#9945FF] hover:opacity-90 transition-all"
                  icon={<ArrowRight className="ml-2 h-5 w-5" />}
                >
                  Start Your Free Trial
                </CtaButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}