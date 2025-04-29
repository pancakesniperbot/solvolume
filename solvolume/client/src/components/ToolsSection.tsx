import { useState } from "react";
import { motion } from "framer-motion";
import { Code, ArrowRight, BarChart3, Zap, LineChart, PieChart, Activity, RefreshCw, Wrench } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CyberpunkBackground } from "./CyberpunkBackground";
import { CtaButton } from "@/components/CtaButton";

export function ToolsSection() {
  const [activeTab, setActiveTab] = useState("volume-bots");
  
  return (
    <section id="tools" className="py-20 relative overflow-hidden">
      {/* Cyberpunk background */}
      <CyberpunkBackground variant="dark" withGrid withGlitch />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <div className="bg-[#00FFA3]/10 p-3 rounded-full">
              <Wrench className="h-8 w-8 text-[#00FFA3]" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Powerful <span className="text-[#00FFA3]">Trading Tools</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Our comprehensive suite of Solana volume generation tools designed to help your token gain maximum visibility on all major DEX platforms.
          </p>
        </motion.div>
        
        <Tabs defaultValue="volume-bots" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-[#1e2035]/50 border border-[#1e2035] p-1">
              <TabsTrigger 
                value="volume-bots" 
                className="data-[state=active]:bg-[#00FFA3] data-[state=active]:text-black"
              >
                Volume Bots
              </TabsTrigger>
              <TabsTrigger 
                value="analytics" 
                className="data-[state=active]:bg-[#00FFA3] data-[state=active]:text-black"
              >
                Analytics
              </TabsTrigger>
              <TabsTrigger 
                value="trading" 
                className="data-[state=active]:bg-[#00FFA3] data-[state=active]:text-black"
              >
                Trading
              </TabsTrigger>
              <TabsTrigger 
                value="monitoring" 
                className="data-[state=active]:bg-[#00FFA3] data-[state=active]:text-black"
              >
                Monitoring
              </TabsTrigger>
            </TabsList>
          </div>
          
          {/* Volume Bot Tools */}
          <TabsContent value="volume-bots" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Pump.fun Volume Bot */}
              <Card className="bg-[#0c0c15] border-[#1e2035] hover:border-[#00FFA3]/50 transition-all shadow-lg">
                <CardHeader>
                  <div className="bg-[#00FFA3]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                    <BarChart3 className="h-6 w-6 text-[#00FFA3]" />
                  </div>
                  <CardTitle className="text-white">Pump.fun Volume Bot</CardTitle>
                  <CardDescription className="text-gray-400">
                    Optimized for Pump.fun trending visibility
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-gray-400">
                  <p>Our specialized Pump.fun Volume Bot is designed to help your token appear on Pump.fun trending lists through strategic volume generation patterns. This tool simulates natural trading activities across multiple wallets with varying transaction sizes and timing patterns.</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#00FFA3]"></span>
                      <span>Pump.fun-specific algorithm</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#00FFA3]"></span>
                      <span>Volume depth customization</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#00FFA3]"></span>
                      <span>Anti-detection technology</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <div className="flex justify-center w-full">
                    <Button 
                      className="w-full bg-gradient-to-r from-[#00FFA3] to-[#9945FF] text-black hover:from-[#05E286] hover:to-[#8035E5]"
                      onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Try Pump.fun Bot
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
              
              {/* DEXTools Volume Bot */}
              <Card className="bg-[#0c0c15] border-[#1e2035] hover:border-[#00FFA3]/50 transition-all shadow-lg">
                <CardHeader>
                  <div className="bg-[#9945FF]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                    <LineChart className="h-6 w-6 text-[#9945FF]" />
                  </div>
                  <CardTitle className="text-white">DEXTools Volume Bot</CardTitle>
                  <CardDescription className="text-gray-400">
                    Designed for DEXTools hot pairs visibility
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-gray-400">
                  <p>The DEXTools Volume Bot is specifically engineered to enhance your token's visibility on DEXTools' Hot Pairs section. It creates the optimal volume pattern recognized by DEXTools' algorithms while maintaining natural-looking trading activity.</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#9945FF]"></span>
                      <span>DEXTools trending algorithm</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#9945FF]"></span>
                      <span>Pair-specific optimization</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#9945FF]"></span>
                      <span>24/7 activity scheduling</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <div className="flex justify-center w-full">
                    <Button 
                      className="w-full bg-gradient-to-r from-[#9945FF] to-[#00FFA3] text-black hover:from-[#8035E5] hover:to-[#05E286]"
                      onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Try DEXTools Bot
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
              
              {/* Solana Volume Bot */}
              <Card className="bg-[#0c0c15] border-[#1e2035] hover:border-[#00FFA3]/50 transition-all shadow-lg">
                <CardHeader>
                  <div className="bg-[#DC1FFF]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                    <Activity className="h-6 w-6 text-[#DC1FFF]" />
                  </div>
                  <CardTitle className="text-white">Solana Volume Bot</CardTitle>
                  <CardDescription className="text-gray-400">
                    Complete multi-platform volume solution
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-gray-400">
                  <p>Our flagship Solana Volume Bot is a comprehensive solution that distributes strategic volume across multiple DEX platforms simultaneously. This all-in-one tool ensures maximum visibility across the entire Solana DEX ecosystem.</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#DC1FFF]"></span>
                      <span>Multi-platform optimization</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#DC1FFF]"></span>
                      <span>Advanced distribution logic</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#DC1FFF]"></span>
                      <span>Market impact neutralization</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <div className="flex justify-center w-full">
                    <Button 
                      className="w-full bg-gradient-to-r from-[#DC1FFF] to-[#00FFA3] text-black hover:from-[#C01EE5] hover:to-[#05E286]"
                      onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Try Solana Volume Bot
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          {/* Analytics Tools */}
          <TabsContent value="analytics" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Market Analysis Tool */}
              <Card className="bg-[#0c0c15] border-[#1e2035] hover:border-[#00FFA3]/50 transition-all shadow-lg">
                <CardHeader>
                  <div className="bg-[#00FFA3]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                    <PieChart className="h-6 w-6 text-[#00FFA3]" />
                  </div>
                  <CardTitle className="text-white">Market Analysis</CardTitle>
                  <CardDescription className="text-gray-400">
                    Comprehensive market insights
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-gray-400">
                  <p>Our Market Analysis tool provides detailed insights into your token's performance, market sentiment, and competitive positioning. Track volume patterns, price movements, and market trends.</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#00FFA3]"></span>
                      <span>Real-time volume tracking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#00FFA3]"></span>
                      <span>Liquidity analysis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#00FFA3]"></span>
                      <span>Competitor benchmarking</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-gradient-to-r from-[#00FFA3] to-[#9945FF] text-black hover:from-[#05E286] hover:to-[#8035E5]"
                    onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Try Market Analysis
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Portfolio Tracker */}
              <Card className="bg-[#0c0c15] border-[#1e2035] hover:border-[#00FFA3]/50 transition-all shadow-lg">
                <CardHeader>
                  <div className="bg-[#9945FF]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                    <Activity className="h-6 w-6 text-[#9945FF]" />
                  </div>
                  <CardTitle className="text-white">Portfolio Tracker</CardTitle>
                  <CardDescription className="text-gray-400">
                    Monitor all your tokens in one place
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-gray-400">
                  <p>Track multiple tokens and their performance metrics in a single dashboard. Our Portfolio Tracker gives you a comprehensive overview of your entire Solana token portfolio.</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#9945FF]"></span>
                      <span>Multi-token dashboard</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#9945FF]"></span>
                      <span>Performance comparison</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#9945FF]"></span>
                      <span>Historical data visualization</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-gradient-to-r from-[#9945FF] to-[#00FFA3] text-black hover:from-[#8035E5] hover:to-[#05E286]"
                    onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Try Portfolio Tracker
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Sentiment Analyzer */}
              <Card className="bg-[#0c0c15] border-[#1e2035] hover:border-[#00FFA3]/50 transition-all shadow-lg">
                <CardHeader>
                  <div className="bg-[#DC1FFF]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                    <BarChart3 className="h-6 w-6 text-[#DC1FFF]" />
                  </div>
                  <CardTitle className="text-white">Sentiment Analyzer</CardTitle>
                  <CardDescription className="text-gray-400">
                    Social media and market sentiment tracking
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-gray-400">
                  <p>Monitor social media activity, forum discussions, and market sentiment metrics for your token. Our Sentiment Analyzer helps you understand market perception and community engagement.</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#DC1FFF]"></span>
                      <span>Social media monitoring</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#DC1FFF]"></span>
                      <span>Sentiment score tracking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#DC1FFF]"></span>
                      <span>Trend identification</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-gradient-to-r from-[#DC1FFF] to-[#00FFA3] text-black hover:from-[#C01EE5] hover:to-[#05E286]"
                    onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Try Sentiment Analyzer
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          {/* Trading Tools */}
          <TabsContent value="trading" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Volume Simulator */}
              <Card className="bg-[#0c0c15] border-[#1e2035] hover:border-[#00FFA3]/50 transition-all shadow-lg">
                <CardHeader>
                  <div className="bg-[#00FFA3]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                    <Zap className="h-6 w-6 text-[#00FFA3]" />
                  </div>
                  <CardTitle className="text-white">Volume Simulator</CardTitle>
                  <CardDescription className="text-gray-400">
                    Test different volume strategies
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-gray-400">
                  <p>Our Volume Simulator allows you to test different volume patterns and strategies before deploying them. See how different approaches might affect your token's visibility and market perception.</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#00FFA3]"></span>
                      <span>Strategy simulation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#00FFA3]"></span>
                      <span>Impact prediction</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#00FFA3]"></span>
                      <span>Parameter optimization</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-gradient-to-r from-[#00FFA3] to-[#9945FF] text-black hover:from-[#05E286] hover:to-[#8035E5]"
                    onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Try Volume Simulator
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Trading Calendar */}
              <Card className="bg-[#0c0c15] border-[#1e2035] hover:border-[#00FFA3]/50 transition-all shadow-lg">
                <CardHeader>
                  <div className="bg-[#9945FF]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                    <RefreshCw className="h-6 w-6 text-[#9945FF]" />
                  </div>
                  <CardTitle className="text-white">Trading Calendar</CardTitle>
                  <CardDescription className="text-gray-400">
                    Schedule and coordinate trading activities
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-gray-400">
                  <p>Plan and schedule your volume generation activities with our Trading Calendar. Coordinate volume spikes with marketing events, community activities, and other important milestones.</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#9945FF]"></span>
                      <span>Event coordination</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#9945FF]"></span>
                      <span>Volume scheduling</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#9945FF]"></span>
                      <span>Strategy timeline</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-gradient-to-r from-[#9945FF] to-[#00FFA3] text-black hover:from-[#8035E5] hover:to-[#05E286]"
                    onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Try Trading Calendar
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
              
              {/* SOL Volume Manager */}
              <Card className="bg-[#0c0c15] border-[#1e2035] hover:border-[#00FFA3]/50 transition-all shadow-lg">
                <CardHeader>
                  <div className="bg-[#DC1FFF]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                    <Code className="h-6 w-6 text-[#DC1FFF]" />
                  </div>
                  <CardTitle className="text-white">SOL Volume Manager</CardTitle>
                  <CardDescription className="text-gray-400">
                    Advanced volume pattern control
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-gray-400">
                  <p>Our SOL Volume Manager provides precise control over volume patterns, transaction sizes, and timing. This advanced tool lets you customize every aspect of your volume generation strategy.</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#DC1FFF]"></span>
                      <span>Pattern customization</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#DC1FFF]"></span>
                      <span>Transaction distribution</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#DC1FFF]"></span>
                      <span>Real-time adjustments</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-gradient-to-r from-[#DC1FFF] to-[#00FFA3] text-black hover:from-[#C01EE5] hover:to-[#05E286]"
                    onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Try Sol Volume Manager
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          {/* Monitoring Tools */}
          <TabsContent value="monitoring" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Trending Monitor */}
              <Card className="bg-[#0c0c15] border-[#1e2035] hover:border-[#00FFA3]/50 transition-all shadow-lg">
                <CardHeader>
                  <div className="bg-[#00FFA3]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                    <Activity className="h-6 w-6 text-[#00FFA3]" />
                  </div>
                  <CardTitle className="text-white">Trending Monitor</CardTitle>
                  <CardDescription className="text-gray-400">
                    Track trending status across platforms
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-gray-400">
                  <p>Our Trending Monitor keeps track of your token's position on trending lists across Pump.fun, DEXTools, and other platforms. Receive alerts when your token enters or leaves trending lists.</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#00FFA3]"></span>
                      <span>Multi-platform tracking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#00FFA3]"></span>
                      <span>Position notifications</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#00FFA3]"></span>
                      <span>Historical rank analysis</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-gradient-to-r from-[#00FFA3] to-[#9945FF] text-black hover:from-[#05E286] hover:to-[#8035E5]"
                    onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Try Trending Monitor
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Volume Alert System */}
              <Card className="bg-[#0c0c15] border-[#1e2035] hover:border-[#00FFA3]/50 transition-all shadow-lg">
                <CardHeader>
                  <div className="bg-[#9945FF]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                    <Zap className="h-6 w-6 text-[#9945FF]" />
                  </div>
                  <CardTitle className="text-white">Volume Alert System</CardTitle>
                  <CardDescription className="text-gray-400">
                    Real-time volume anomaly detection
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-gray-400">
                  <p>Get notified of unusual volume patterns, sudden spikes or drops, and other significant volume events. Our Volume Alert System helps you stay informed about important changes in trading activity.</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#9945FF]"></span>
                      <span>Real-time monitoring</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#9945FF]"></span>
                      <span>Customizable thresholds</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#9945FF]"></span>
                      <span>Multi-channel notifications</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-gradient-to-r from-[#9945FF] to-[#00FFA3] text-black hover:from-[#8035E5] hover:to-[#05E286]"
                    onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Try Volume Alert System
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Performance Dashboard */}
              <Card className="bg-[#0c0c15] border-[#1e2035] hover:border-[#00FFA3]/50 transition-all shadow-lg">
                <CardHeader>
                  <div className="bg-[#DC1FFF]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                    <LineChart className="h-6 w-6 text-[#DC1FFF]" />
                  </div>
                  <CardTitle className="text-white">Performance Dashboard</CardTitle>
                  <CardDescription className="text-gray-400">
                    Comprehensive token performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-gray-400">
                  <p>Our Performance Dashboard provides a comprehensive view of your token's performance metrics, including volume statistics, visibility metrics, and trend data. Monitor the effectiveness of your volume strategy in real-time.</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#DC1FFF]"></span>
                      <span>Unified metrics view</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#DC1FFF]"></span>
                      <span>Custom reporting</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#DC1FFF]"></span>
                      <span>Strategy effectiveness tracking</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-gradient-to-r from-[#DC1FFF] to-[#00FFA3] text-black hover:from-[#C01EE5] hover:to-[#05E286]"
                    onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Try Performance Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-16 text-center">
          <p className="text-gray-400 max-w-3xl mx-auto mb-8">
            All tools in our ecosystem are designed to work seamlessly together, providing a comprehensive solution for your Solana token's market visibility needs.
          </p>
          <div className="flex justify-center">
            <CtaButton 
              variant="primary"
              size="lg"
              className="px-8 py-4 text-lg font-bold rounded-xl bg-gradient-to-r from-[#14F195] to-[#9945FF] text-black hover:opacity-90 transition-all max-w-xl"
              icon={<ArrowRight className="ml-2 h-5 w-5" />}
            >
              Try All Tools with Free Trial
            </CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}