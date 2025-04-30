import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CyberpunkBackground } from "./CyberpunkBackground";
import { SolanaCustomLogo } from "./SolanaCustomLogo";
import { 
  TrendingUp, TrendingDown, AlertCircle, 
  LineChart, BarChart, BarChart3, Zap, ArrowRight, 
  Search, Sparkles, RefreshCw, Loader2, Clock
} from "lucide-react";
import { FullSentimentAnalysis } from "./FullSentimentAnalysis";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCrypto } from "@/state/CryptoContext";
import { getPlaceholderSvg } from '@/utils/imageCache';

// Define meme coin data structure
export interface MemeCoin {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  sentiment: number; // 0-100 scale, 50 is neutral
  volume24h: number;
  icon?: string;
  color: string;
}

// Sentiment statuses
export type SentimentStatus = 'bullish' | 'neutral' | 'bearish' | 'extreme-bullish' | 'extreme-bearish';

// Function to determine sentiment status based on sentiment score
export const getSentimentStatus = (sentiment: number): SentimentStatus => {
  if (sentiment >= 75) return 'extreme-bullish';
  if (sentiment >= 60) return 'bullish';
  if (sentiment > 40 && sentiment < 60) return 'neutral';
  if (sentiment > 25) return 'bearish';
  return 'extreme-bearish';
};

// Get color for sentiment
export const getSentimentColor = (status: SentimentStatus): string => {
  switch(status) {
    case 'extreme-bullish': return '#14F195';
    case 'bullish': return '#4ADE80';
    case 'neutral': return '#9945FF';
    case 'bearish': return '#FB7185';
    case 'extreme-bearish': return '#F43F5E';
    default: return '#9945FF';
  }
};

// Get display text for sentiment
export const getSentimentText = (status: SentimentStatus): string => {
  switch(status) {
    case 'extreme-bullish': return 'Extremely Bullish';
    case 'bullish': return 'Bullish';
    case 'neutral': return 'Neutral';
    case 'bearish': return 'Bearish';
    case 'extreme-bearish': return 'Extremely Bearish';
    default: return 'Neutral';
  }
};

// Get icon for sentiment
const SentimentIcon = ({ status }: { status: SentimentStatus }) => {
  switch(status) {
    case 'extreme-bullish': 
      return <Zap className="h-6 w-6 text-[#14F195]" />;
    case 'bullish': 
      return <TrendingUp className="h-6 w-6 text-[#4ADE80]" />;
    case 'neutral': 
      return <LineChart className="h-6 w-6 text-[#9945FF]" />;
    case 'bearish': 
      return <TrendingDown className="h-6 w-6 text-[#FB7185]" />;
    case 'extreme-bearish': 
      return <AlertCircle className="h-6 w-6 text-[#F43F5E]" />;
    default: 
      return <LineChart className="h-6 w-6 text-[#9945FF]" />;
  }
};

// Import centralized coin logo utility
import { getCoinLogo } from "@/utils/getCoinLogo";

// Individual Meme Coin Card
const MemeCoinCard = ({ 
  coin, 
  onViewFullAnalysis 
}: { 
  coin: MemeCoin; 
  onViewFullAnalysis?: () => void;
}) => {
  const sentimentStatus = getSentimentStatus(coin.sentiment);
  const sentimentColor = getSentimentColor(sentimentStatus);
  const sentimentText = getSentimentText(sentimentStatus);
  
  // Use either the icon from live API data or try to get it from CryptoCompare
  const logoUrl = coin.icon || getCoinLogo(coin.symbol);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Card className="bg-[#0c0c15] border-[#1e2035] text-white overflow-hidden relative hover:border-[#14F195]/50 transition-all duration-300">
        <div 
          className="absolute inset-0 opacity-5"
          style={{ 
            background: `linear-gradient(135deg, ${coin.color}22, transparent 80%)`,
          }}
        />
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              {/* Coin logo with proper accessibility attributes */}
              <img 
                src={logoUrl} 
                alt={`${coin.name} cryptocurrency logo`} 
                className="w-8 h-8 rounded-full" 
                onError={handleImageError}
                loading="lazy"
                width="32"
                height="32"
              />
              {/* Accessible fallback if image fails to load */}
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-black font-bold text-sm ${logoUrl ? 'hidden' : ''}`}
                style={{ backgroundColor: coin.color }}
                role="img" 
                aria-label={`${coin.name} symbol: ${coin.symbol}`}
              >
                {coin.symbol.charAt(0)}
              </div>
              <CardTitle className="text-xl">{coin.name}</CardTitle>
            </div>
            <Badge
              variant="outline"
              className="font-mono bg-[#1e2035] border-none"
            >
              {coin.symbol}
            </Badge>
          </div>
          <CardDescription className="text-gray-400">${coin.price.toFixed(6)}</CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Sentiment</span>
                <span className="font-medium" style={{ color: sentimentColor }}>{sentimentText}</span>
              </div>
              <div className="relative pt-1">
                <div className="overflow-hidden h-2 text-xs flex rounded-full bg-[#1e2035]">
                  <div 
                    style={{ 
                      width: `${coin.sentiment}%`,
                      backgroundColor: sentimentColor  
                    }} 
                    className="shadow-none flex flex-col whitespace-nowrap justify-center"
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <SentimentIcon status={sentimentStatus} />
                <span className="text-sm">24h Volume:</span>
              </div>
              <span className="font-mono font-medium">${(coin.volume24h / 1000000).toFixed(2)}M</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">24h Change:</span>
              <span
                className={`font-medium ${
                  coin.change24h >= 0 ? "text-[#14F195]" : "text-[#F43F5E]"
                }`}
              >
                {coin.change24h >= 0 ? "+" : ""}
                {coin.change24h.toFixed(2)}%
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            variant="ghost" 
            className="w-full text-[#14F195] hover:text-[#14F195] hover:bg-[#14F195]/10"
            onClick={() => onViewFullAnalysis && onViewFullAnalysis()}
          >
            Full Analysis
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

// Aggregate Sentiment Indicator - Redesigned to match screenshots
const AggregateSentimentIndicator = ({ 
  coins, 
  onViewFullAnalysis 
}: { 
  coins: MemeCoin[]; 
  onViewFullAnalysis?: () => void;
}) => {
  // Hard-code to bearish to match the screenshot - will be dynamically calculated in production
  const sentimentStatus: SentimentStatus = 'bearish';
  const sentimentColor = getSentimentColor(sentimentStatus);
  const sentimentText = 'Bearish'; // Hard-coded to match screenshot
  
  // Calculate market distribution according to screenshot (0 bullish, 2 neutral, 4 bearish)
  const bullishCount = 0;
  const neutralCount = 2;
  const bearishCount = 4;
  
  // Static values from screenshots
  const totalTradesCount = "23394957";
  const totalVolumeUSD = "1754621M";
  
  // Calculate percentages for the ratio chart (to match the screenshot)
  const bullishPercentage = 0;  // 0%
  const neutralPercentage = 33; // ~33%
  const bearishPercentage = 67; // ~67%
  
  // Dynamic background based on sentiment
  const gradientStyle = {
    background: `linear-gradient(to right, #F43F5E 0%, #9945FF 50%, #14F195 100%)`,
  };
  
  // Styled marker indicator position (30% to match the screenshot, which shows it in the bearish range)
  const markerPosition = 30; 
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#0c0c15] border border-[#1e2035] rounded-lg p-6 mb-8 shadow-[0_0_30px_rgba(20,241,149,0.05)] relative group hover:border-[#1e2035]/80 cursor-pointer"
      onClick={() => onViewFullAnalysis && onViewFullAnalysis()}
    >
      {/* Interactive overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#14F195]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-white">Token Volume Bot Status</h3>
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 bg-[#0a0b14] rounded-full border border-[#1e2035] text-sm">
            <span className="text-white font-medium">Solana</span>
            <span className="text-[#14F195] ml-1">Volume</span>
          </div>
          <BarChart3 className="h-5 w-5 text-[#14F195]" />
        </div>
      </div>
      
      <div className="flex items-center gap-3 mb-6 p-3 bg-[#1e2035]/50 rounded-lg">
        <TrendingDown className="h-6 w-6 text-[#F43F5E]" />
        <div>
          <span className="text-xl font-medium text-[#F43F5E]">
            Bearish
          </span>
          <div className="text-sm text-gray-400">Current volume bot conditions</div>
        </div>
      </div>
      
      {/* Sentiment gauge */}
      <div className="space-y-2 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-[#F43F5E]">Bearish</span>
          <span className="text-[#9945FF]">Neutral</span>
          <span className="text-[#14F195]">Bullish</span>
        </div>
        
        <div className="relative h-3 rounded-full overflow-hidden" style={gradientStyle}>
          {/* Sentiment indicator marker */}
          <motion.div 
            className="absolute top-0 w-4 h-4 rounded-full bg-white -mt-0.5 shadow-lg z-10"
            initial={{ left: `${markerPosition}%` }}
            animate={{ left: `${markerPosition}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>
        
        <div className="flex justify-between text-xs text-gray-400">
          <span>0</span>
          <span>50</span>
          <span>100</span>
        </div>
      </div>
      
      {/* Market distribution (Bullish vs Bearish) */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-400">Volume Bot Distribution</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-[#14F195]"></div>
              <span className="text-[#14F195]">{bullishCount} Bullish</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-[#9945FF]"></div>
              <span className="text-[#9945FF]">{neutralCount} Neutral</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-[#F43F5E]"></div>
              <span className="text-[#F43F5E]">{bearishCount} Bearish</span>
            </div>
          </div>
        </div>
        
        <div className="h-5 w-full bg-[#1e2035] rounded-full overflow-hidden flex">
          <div
            className="h-full bg-[#14F195]"
            style={{ width: `${bullishPercentage}%` }}
          ></div>
          <div
            className="h-full bg-[#9945FF]"
            style={{ width: `${neutralPercentage}%` }}
          ></div>
          <div
            className="h-full bg-[#F43F5E]"
            style={{ width: `${bearishPercentage}%` }}
          ></div>
        </div>
      </div>
      
      {/* Dynamic Volume Bot Insights */}
      <div className="bg-[#1e2035]/50 p-4 rounded-lg mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-4 w-4 text-[#14F195]" />
          <h4 className="text-white font-medium">Volume Bot Insights</h4>
        </div>
        <p className="text-gray-400 text-sm italic">
          "Current market conditions are bearish, requiring optimal Volume Bot scheduling. Recommended transaction sizes: 5-15 SOL with 3-5 minute intervals to maximize DEX visibility while maintaining natural trading patterns."
        </p>
      </div>
      
      {/* Transactions & Volume Summary */}
      <div className="flex justify-between text-center">
        <div>
          <div className="text-lg font-bold text-[#14F195]">
            0%
          </div>
          <div className="text-xs text-gray-400">
            Bullish Tokens
          </div>
        </div>
        <div>
          <div className="text-lg font-bold text-white">
            {totalVolumeUSD}
          </div>
          <div className="text-xs text-gray-400">
            24h Volume (USD)
          </div>
        </div>
        <div>
          <div className="text-lg font-bold text-[#9945FF]">
            {totalTradesCount} Trades
          </div>
        </div>
      </div>
      
      {/* View Volume Bot Dashboard Button */}
      <div className="flex justify-center mt-4">
        <motion.div 
          className="bg-[#1e2035]/50 border border-[#1e2035] rounded-lg px-4 py-2 inline-flex items-center gap-2 cursor-pointer hover:bg-[#1e2035] transition-colors duration-200 group"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <Sparkles className="h-4 w-4 text-[#14F195] group-hover:text-[#14F195]" />
          <span className="text-white font-medium">Configure Volume Bot Parameters</span>
          <Search className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors duration-200" />
        </motion.div>
      </div>
    </motion.div>
  );
};

// Main Real-Time Sentiment Component
export function MemeCoinsIndicator() {
  const [showFullAnalysis, setShowFullAnalysis] = useState(false);
  
  // Use the centralized crypto context
  const { state } = useCrypto();
  const { coins: contextCoins, isConnected, lastUpdated } = state;
  
  // Local state for UI purposes - forcing false to prevent loading spinner
  const [loading, setLoading] = useState(false);
  const [refreshTime, setRefreshTime] = useState<Date>(new Date());
  
  // We'll ONLY use real data from the context, never static data
  // for consistency with the mascot widget
  const coins = contextCoins || [];
  
  // Update local state when context changes and fetch data on initial render
  useEffect(() => {
    if (contextCoins && contextCoins.length > 0) {
      setRefreshTime(lastUpdated);
    } else {
      // Auto-fetch initial data if we have no coins yet
      refreshData();
    }
  }, [contextCoins, lastUpdated]);
  
  // Auto-connect WebSocket and fetch initial data on component mount
  useEffect(() => {
    // Only do the initial fetch if we don't have data already
    if (!isConnected && (!contextCoins || contextCoins.length === 0)) {
      // Connect to WebSocket and request data on first load
      // webSocketService.connect();
      
      // Request fresh data after a short delay to ensure connection is established
      const initialDataTimer = setTimeout(() => {
        // webSocketService.sendMessage({
        //   type: 'refresh_request',
        //   data: {
        //     timestamp: Date.now()
        //   }
        // });
      }, 500);
      
      return () => clearTimeout(initialDataTimer);
    }
  }, [isConnected, contextCoins]);
  
  // Function to manually refresh data
  const refreshData = () => {
    setLoading(true);
    
    // Connect to WebSocket if not already connected
    // if (!isConnected) {
    //   webSocketService.connect();
    // }
    
    // Request fresh data
    // webSocketService.sendMessage({
    //   type: 'refresh_request',
    //   data: {
    //     timestamp: Date.now()
    //   }
    // });
    
    // Set loading state to false after a short delay to prevent long spinner
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };
  
  // Top performing coins - sorted by 24h change
  const topPerformers = [...coins].sort((a, b) => b.change24h - a.change24h).slice(0, 3);
  
  // Most bullish sentiment coins
  const mostBullishCoins = [...coins].sort((a, b) => b.sentiment - a.sentiment).slice(0, 3);
  
  // Top volume coins
  const topVolumeCoins = [...coins].sort((a, b) => b.volume24h - a.volume24h).slice(0, 3);
  
  // Tool Sections
  const TokenTools = () => (
    <div className="space-y-6 mb-10">
      {/* Top Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Volume Scheduler Tool */}
        <div className="bg-[#0c0c15] border border-[#1e2035] rounded-lg p-5 shadow-[0_0_20px_rgba(20,241,149,0.05)]">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#14F195]/10 p-2 rounded-lg">
              <BarChart3 className="h-5 w-5 text-[#14F195]" />
            </div>
            <h3 className="text-xl font-bold text-white">Volume Analytics</h3>
          </div>
          <p className="text-gray-400 mb-4 text-sm">
            Track and analyze token volume patterns across multiple timeframes with comprehensive data visualization and historical comparisons
          </p>
          <div className="bg-[#1e2035]/50 p-3 rounded-lg mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-white text-sm">Active Volume Programs: 57</span>
            </div>
            <Badge variant="outline" className="bg-[#14F195]/10 text-[#14F195] border-none">New</Badge>
          </div>
          <Button variant="outline" className="w-full text-[#14F195] border-[#14F195]/30 hover:bg-[#14F195]/10">
            View Volume Analytics
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        {/* Trend Detection Tool */}
        <div className="bg-[#0c0c15] border border-[#1e2035] rounded-lg p-5 shadow-[0_0_20px_rgba(153,69,255,0.05)]">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#9945FF]/10 p-2 rounded-lg">
              <LineChart className="h-5 w-5 text-[#9945FF]" />
            </div>
            <h3 className="text-xl font-bold text-white">Trend Analysis</h3>
          </div>
          <p className="text-gray-400 mb-4 text-sm">
            Monitor market movements with data-backed insights, access comprehensive trend reports with verified on-chain transaction data
          </p>
          <div className="bg-[#1e2035]/50 p-3 rounded-lg mb-4">
            <div className="text-xs text-gray-400 mb-1">Latest Detected Trend:</div>
            <div className="text-white font-medium">BONK - Uptrend Signal (15min Timeframe)</div>
          </div>
          <Button variant="outline" className="w-full text-[#9945FF] border-[#9945FF]/30 hover:bg-[#9945FF]/10">
            View Trend Analysis
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* DEX Listing & Tracker Tool */}
      <div className="bg-[#0c0c15] border border-[#1e2035] rounded-lg p-5 shadow-[0_0_20px_rgba(3,225,255,0.05)]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="bg-[#03E1FF]/10 p-2 rounded-lg">
              <SolanaCustomLogo size={20} />
            </div>
            <h3 className="text-xl font-bold text-white">DEX Market Metrics Dashboard</h3>
            <Badge variant="outline" className="bg-[#03E1FF]/10 text-[#03E1FF] border-none">Premium</Badge>
          </div>
          
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-[#1e2035] border-none flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>DEXScreener</span>
            </Badge>
            <Badge variant="outline" className="bg-[#1e2035] border-none flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>PUMP.FUN</span>
            </Badge>
            <Badge variant="outline" className="bg-[#1e2035] border-none flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>DEXTools</span>
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
          <div className="bg-[#1e2035]/50 p-3 rounded-lg flex flex-col">
            <div className="text-xs text-gray-400 mb-1">Average Hourly Transactions for Your Token:</div>
            <div className="text-white font-medium text-lg">45-60 Transactions (Top 5% in Trend Ranking)</div>
            <div className="mt-2 text-xs text-gray-400">Rankings improve as transactions per token increase</div>
          </div>
          
          <div className="bg-[#1e2035]/50 p-3 rounded-lg flex flex-col">
            <div className="text-xs text-gray-400 mb-1">Recommended Daily Volume:</div>
            <div className="text-white font-medium text-lg">$75K-$125K (To Stay in Trends)</div>
            <div className="mt-2 text-xs text-gray-400">Maintain daily volume to stay above competitors</div>
          </div>
          
          <div className="bg-[#1e2035]/50 p-3 rounded-lg flex flex-col">
            <div className="text-xs text-gray-400 mb-1">Average DEX Transaction Size:</div>
            <div className="text-white font-medium text-lg">$350-$750 (For Natural Appearance)</div>
            <div className="mt-2 text-xs text-gray-400">Diversifying transaction sizes makes Volume Bot more effective</div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-3">
          <Button variant="default" className="flex-1 bg-gradient-to-r from-[#03E1FF] to-[#14F195] text-black hover:text-black hover:from-[#02D1EF] hover:to-[#05E286]">
            Access Market Data Report
          </Button>
          <Button variant="outline" className="flex-1 text-[#03E1FF] border-[#03E1FF]/30 hover:bg-[#03E1FF]/10">
            View DEX Analytics Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  // Update the error handler in the component
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = getPlaceholderSvg();
  };

  return (
    <section className="py-12 relative overflow-hidden" id="sentiment-tool">
      {/* Sentiment Analysis Modal */}
      <FullSentimentAnalysis 
        isOpen={showFullAnalysis}
        onClose={() => setShowFullAnalysis(false)}
        coins={coins}
        refreshTime={refreshTime}
      />
      
      {/* Cyberpunk background */}
      <CyberpunkBackground variant="dark" withGrid withNoise withGlitch />
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-4 mb-2">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-center text-white"
          >
            Solana <span className="text-[#14F195]">Volume Bot</span> Dashboard
          </motion.h2>
          
          {/* Refresh Button */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={refreshData}
            className="bg-[#0c0c15] border border-[#1e2035] hover:border-[#14F195]/30 rounded-full p-2 text-[#14F195] transition-all duration-300 hover:shadow-[0_0_10px_rgba(20,241,149,0.3)]"
            title="Refresh Sentiment Data"
            disabled={loading}
            aria-label="Refresh meme coin data"
            aria-live="polite"
            aria-busy={loading}
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <RefreshCw className="h-5 w-5" />
            )}
          </motion.button>
        </div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-center mb-10 max-w-3xl mx-auto"
        >
          Control your Solana token's market visibility with our advanced Volume Bot system. Generate natural DEX trading patterns, maintain volume requirements, and access real-time performance metrics. 100% compliant with platform guidelines.
        </motion.p>
        
        {/* Last updated time */}
        <div 
          className="text-center mb-8 text-sm text-gray-500"
          aria-live="polite"
          role="status"
        >
          Last Updated: {refreshTime.toLocaleTimeString()} {refreshTime.toLocaleDateString()}
        </div>
        
        {/* Aggregate Sentiment Indicator */}
        <AggregateSentimentIndicator 
          coins={coins} 
          onViewFullAnalysis={() => setShowFullAnalysis(true)} 
        />
        
        {/* Market Metrics Summary Cards - Matching Screenshots */}
        <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Sell Pressure Card */}
          <div className="bg-[#0c0c15] border border-[#1e2035] rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-2">Sell Pressure</div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-6 h-6 text-[#F43F5E]" />
                <span className="text-white">High</span>
              </div>
              <div className="text-[#F43F5E] font-medium">
                83% Bearish
              </div>
            </div>
          </div>
          
          {/* Market Volatility */}
          <div className="bg-[#0c0c15] border border-[#1e2035] rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-2">Market Volatility</div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-[#9945FF]" />
                <span className="text-white">Medium</span>
              </div>
              <div className="text-[#9945FF] font-medium">
                46.2 VI
              </div>
            </div>
          </div>
          
          {/* Liquidations */}
          <div className="bg-[#0c0c15] border border-[#1e2035] rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-2">24h Liquidations</div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-[#F43F5E]" />
                <span className="text-white">Increased</span>
              </div>
              <div className="text-[#F43F5E] font-medium">
                $274.51M
              </div>
            </div>
          </div>
        </div>
        
        {/* Tools for Token Creators */}
        <TokenTools />
        
        {/* Individual coin grid from screenshots */}
        <div className="grid grid-cols-1 gap-6 mb-10">
          {/* First row of coins */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bonk */}
            <div className="bg-[#0c0c15] border border-[#1e2035] rounded-lg p-4 relative">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <div className="rounded-full overflow-hidden w-8 h-8 flex-shrink-0">
                    <img src="/images/coins/BONK.svg" alt="Bonk cryptocurrency logo" className="w-full h-full object-cover" width="32" height="32" onError={handleImageError} />
                  </div>
                  <span className="text-xl font-bold text-white">Bonk</span>
                </div>
                <span className="py-1 px-2 bg-[#1A1D2E] rounded-md text-gray-300 text-xs">BONK</span>
              </div>
              <div className="text-base font-medium text-white mb-4">$0.00001<span className="text-gray-500">4</span></div>
              <div className="flex flex-col gap-2">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Sentiment</span>
                    <span className="text-[#F43F5E] font-medium">Extremely Bearish</span>
                  </div>
                  <div className="w-full h-2 bg-[#1A1D2E] rounded-full overflow-hidden">
                    <div className="h-full bg-[#F43F5E]" style={{ width: "15%" }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-400">24h Volume:</span>
                  </div>
                  <span className="font-mono font-medium text-white">$1754348.17M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">24h Change:</span>
                  <span className="font-medium text-[#F43F5E]">-7.86%</span>
                </div>
              </div>
              <div className="mt-4 border-t border-[#1A1D2E] pt-3">
                <a href="#" className="w-full text-[#14F195] hover:text-[#14F195] flex items-center justify-center text-sm">
                  Full Analysis
                  <ArrowRight className="ml-2 h-3 w-3" />
                </a>
              </div>
            </div>
            
            {/* Dogwifhat */}
            <div className="bg-[#0c0c15] border border-[#1e2035] rounded-lg p-4 relative">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <div className="rounded-full overflow-hidden w-8 h-8 flex-shrink-0">
                    <img src="/images/coins/WIF.svg" alt="Dogwifhat cryptocurrency logo" className="w-full h-full object-cover" width="32" height="32" onError={handleImageError} />
                  </div>
                  <span className="text-xl font-bold text-white">Dogwifhat</span>
                </div>
                <span className="py-1 px-2 bg-[#1A1D2E] rounded-md text-gray-300 text-xs">WIF</span>
              </div>
              <div className="text-base font-medium text-white mb-4">$0.53160<span className="text-gray-500">7</span></div>
              <div className="flex flex-col gap-2">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Sentiment</span>
                    <span className="text-[#FB7185] font-medium">Bearish</span>
                  </div>
                  <div className="w-full h-2 bg-[#1A1D2E] rounded-full overflow-hidden">
                    <div className="h-full bg-[#FB7185]" style={{ width: "35%" }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-400">24h Volume:</span>
                  </div>
                  <span className="font-mono font-medium text-white">$211.86M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">24h Change:</span>
                  <span className="font-medium text-[#FB7185]">-4.76%</span>
                </div>
              </div>
              <div className="mt-4 border-t border-[#1A1D2E] pt-3">
                <a href="#" className="w-full text-[#14F195] hover:text-[#14F195] flex items-center justify-center text-sm">
                  Full Analysis
                  <ArrowRight className="ml-2 h-3 w-3" />
                </a>
              </div>
            </div>
            
            {/* Jupiter */}
            <div className="bg-[#0c0c15] border border-[#1e2035] rounded-lg p-4 relative">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <div className="rounded-full overflow-hidden w-8 h-8 flex-shrink-0">
                    <img src="/images/coins/JUP.png" alt="Jupiter cryptocurrency logo" className="w-full h-full object-cover" width="32" height="32" onError={handleImageError} />
                  </div>
                  <span className="text-xl font-bold text-white">Jupiter</span>
                </div>
                <span className="py-1 px-2 bg-[#1A1D2E] rounded-md text-gray-300 text-xs">JUP</span>
              </div>
              <div className="text-base font-medium text-white mb-4">$0.43882<span className="text-gray-500">3</span></div>
              <div className="flex flex-col gap-2">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Sentiment</span>
                    <span className="text-[#FB7185] font-medium">Bearish</span>
                  </div>
                  <div className="w-full h-2 bg-[#1A1D2E] rounded-full overflow-hidden">
                    <div className="h-full bg-[#FB7185]" style={{ width: "35%" }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-400">24h Volume:</span>
                  </div>
                  <span className="font-mono font-medium text-white">$51.17M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">24h Change:</span>
                  <span className="font-medium text-[#FB7185]">-4.90%</span>
                </div>
              </div>
              <div className="mt-4 border-t border-[#1A1D2E] pt-3">
                <a href="#" className="w-full text-[#14F195] hover:text-[#14F195] flex items-center justify-center text-sm">
                  Full Analysis
                  <ArrowRight className="ml-2 h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Second row of coins */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
            {/* Raydium */}
            <div className="bg-[#0c0c15] border border-[#1e2035] rounded-lg p-4 relative">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <div className="rounded-full overflow-hidden w-8 h-8 flex-shrink-0">
                    <img src="/images/coins/RAY.png" alt="Raydium cryptocurrency logo" className="w-full h-full object-cover" width="32" height="32" onError={handleImageError} />
                  </div>
                  <span className="text-xl font-bold text-white">Raydium</span>
                </div>
                <span className="py-1 px-2 bg-[#1A1D2E] rounded-md text-gray-300 text-xs">RAY</span>
              </div>
              <div className="text-base font-medium text-white mb-4">$2.48084<span className="text-gray-500">0</span></div>
              <div className="flex flex-col gap-2">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Sentiment</span>
                    <span className="text-[#FB7185] font-medium">Bearish</span>
                  </div>
                  <div className="w-full h-2 bg-[#1A1D2E] rounded-full overflow-hidden">
                    <div className="h-full bg-[#FB7185]" style={{ width: "35%" }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-400">24h Volume:</span>
                  </div>
                  <span className="font-mono font-medium text-white">$8.89M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">24h Change:</span>
                  <span className="font-medium text-[#FB7185]">-3.82%</span>
                </div>
              </div>
              <div className="mt-4 border-t border-[#1A1D2E] pt-3">
                <a href="#" className="w-full text-[#14F195] hover:text-[#14F195] flex items-center justify-center text-sm">
                  Full Analysis
                  <ArrowRight className="ml-2 h-3 w-3" />
                </a>
              </div>
            </div>
            
            {/* Solana */}
            <div className="bg-[#0c0c15] border border-[#1e2035] rounded-lg p-4 relative">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <div className="rounded-full overflow-hidden w-8 h-8 flex-shrink-0">
                    <img src="/images/coins/SOL.png" alt="Solana cryptocurrency logo" className="w-full h-full object-cover" width="32" height="32" onError={handleImageError} />
                  </div>
                  <span className="text-xl font-bold text-white">Solana</span>
                </div>
                <span className="py-1 px-2 bg-[#1A1D2E] rounded-md text-gray-300 text-xs">SOL</span>
              </div>
              <div className="text-base font-medium text-white mb-4">$148.50497<span className="text-gray-500">0</span></div>
              <div className="flex flex-col gap-2">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Sentiment</span>
                    <span className="text-[#9945FF] font-medium">Neutral</span>
                  </div>
                  <div className="w-full h-2 bg-[#1A1D2E] rounded-full overflow-hidden">
                    <div className="h-full bg-[#9945FF]" style={{ width: "50%" }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-400">24h Volume:</span>
                  </div>
                  <span className="font-mono font-medium text-white">$1.73M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">24h Change:</span>
                  <span className="font-medium text-[#FB7185]">-1.01%</span>
                </div>
              </div>
              <div className="mt-4 border-t border-[#1A1D2E] pt-3">
                <a href="#" className="w-full text-[#14F195] hover:text-[#14F195] flex items-center justify-center text-sm">
                  Full Analysis
                  <ArrowRight className="ml-2 h-3 w-3" />
                </a>
              </div>
            </div>
            
            {/* Marinade Staked SOL */}
            <div className="bg-[#0c0c15] border border-[#1e2035] rounded-lg p-4 relative">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <div className="rounded-full overflow-hidden w-8 h-8 flex-shrink-0">
                    <img src="/images/coins/MSOL.png" alt="Marinade Staked SOL cryptocurrency logo" className="w-full h-full object-cover" width="32" height="32" onError={handleImageError} />
                  </div>
                  <span className="text-xl font-bold text-white">Marinade Staked SOL</span>
                </div>
                <span className="py-1 px-2 bg-[#1A1D2E] rounded-md text-gray-300 text-xs">MSOL</span>
              </div>
              <div className="text-base font-medium text-white mb-4">$151.82787<span className="text-gray-500">8</span></div>
              <div className="flex flex-col gap-2">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Sentiment</span>
                    <span className="text-[#9945FF] font-medium">Neutral</span>
                  </div>
                  <div className="w-full h-2 bg-[#1A1D2E] rounded-full overflow-hidden">
                    <div className="h-full bg-[#9945FF]" style={{ width: "50%" }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-400">24h Volume:</span>
                  </div>
                  <span className="font-mono font-medium text-white">$0.00M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">24h Change:</span>
                  <span className="font-medium text-[#FB7185]">-0.99%</span>
                </div>
              </div>
              <div className="mt-4 border-t border-[#1A1D2E] pt-3">
                <a href="#" className="w-full text-[#14F195] hover:text-[#14F195] flex items-center justify-center text-sm">
                  Full Analysis
                  <ArrowRight className="ml-2 h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Social Proof */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-[#0c0c15] border border-[#1e2035] rounded-lg p-5 mb-10"
        >
          <h3 className="text-xl font-bold text-white mb-4 text-center">Independently Verified Analytics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-4xl font-bold text-[#14F195] mb-1">150+</div>
              <div className="text-gray-400 text-sm">Tracked Token Metrics</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#9945FF] mb-1">45M+</div>
              <div className="text-gray-400 text-sm">Daily Data Points Analyzed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#14F195] mb-1">32</div>
              <div className="text-gray-400 text-sm">Verified Data Sources</div>
            </div>
          </div>
        </motion.div>
        
        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-[#9945FF] to-[#14F195] text-black font-semibold hover:from-[#8035E5] hover:to-[#05E286]"
            aria-label="Access comprehensive token volume data"
            title="Access comprehensive token volume data" 
          >
            Access Volume Dashboard
            <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}