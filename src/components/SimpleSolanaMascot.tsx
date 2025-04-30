import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
import { SolanaCustomLogo } from "./SolanaCustomLogo";
import {
  ChevronRight,
  TrendingUp,
  TrendingDown,
  BarChart3,
  MessageSquareText,
  Clock,
  Target,
  ChevronDown,
  Send,
  RefreshCw,
} from "lucide-react";
import { useLocation } from "wouter";
import { useLicense } from "@/components/LicenseProvider";
import { perplexityService } from "@/services/PerplexityService";
import { AIResponse } from "@/components/AIResponse";
import { SuggestedQuestions } from "@/components/SuggestedQuestions";

// Using CryptoCompare API for real coin logos
import { getCoinLogo as getCryptoCompareLogo } from "@/utils/getCoinLogo";

interface SolanaMascotProps {
  messages?: string[];
  position?: "bottom-right" | "mid-right" | "top-right";
  ctaText?: string;
  ctaLink?: string;
  onCtaClick?: () => void;
  autoHide?: boolean;
  autoHideDelay?: number;
  marketSentiment?: "bullish" | "bearish" | "neutral";
  hideHamburgerButton?: boolean;
}

interface TokenPrice {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume?: number;
  trending?: boolean;
  lastUpdate?: number;
  imageUrl?: string;  // URL for coin logo from API
}

interface MarketSentiment {
  current: "bullish" | "bearish" | "neutral";
  trend: string;
  strength: number;
  lastUpdate: number;
}

interface MarketData {
  topPlatforms: string[];
  volumeNeeded: string;
  bestStrategy: string;
  successRate: string;
  pricePrediction: string;
}

// Example messages - promotional
const DEFAULT_MESSAGES = [
  "Boost your Solana token's visibility with our Volume Bot!",
  "Get your token trending on DEXScreener today!",
  "Ready to see your token on Pump.Fun trending page?",
  "Increase volume +1324% with our Solana Volume Bot!",
  "Make your token stand out in the Solana ecosystem!",
];

// Market strategy suggestions
const STRATEGY_MESSAGES = [
  "Need ~1000 transactions to trend on SolanaFM! Our bot can help.",
  "Typically takes 120K vol to trend on Jupiter. We can get you there!",
  "DEXScreener trending requires consistent volume. Let us handle that.",
  "Meme coins need visibility. We provide 400% more exposure on average.",
];

// Market sentiment-based messages
const MARKET_MESSAGES = {
  bullish: [
    "Market looking bullish! Perfect time to increase token visibility.",
    "Bullish sentiment detected! Boost your token's volume now.",
    "SOL is pumping! Get your token trending on DEX platforms.",
    "Bulls are taking control! Maximize your token's exposure today.",
    "26 trending meme coins are up 40%+ in bullish markets, visibility is key!",
    "Tokens with consistent volume are up 84% more in bullish trends.",
  ],
  bearish: [
    "Market is bearish. Stay visible with strategic volume.",
    "During bear markets, visibility becomes even more crucial.",
    "Stand out during downtrends with consistent volume.",
    "Beat the bearish sentiment with optimized token visibility.",
    "Only 4% of tokens maintain visibility during bear markets - be one of them!",
    "Tokens with steady volume drop 37% less during market corrections.",
  ],
  neutral: [
    "Market sentiment is neutral. Good time to build visibility.",
    "Market consolidating - perfect time to grow token awareness.",
    "Steady market conditions - ideal for volume optimization.",
    "Market is waiting for direction - position your token now.",
    "93% of breakout tokens had consistent visibility before market shifts.",
    "Neutral markets are perfect for establishing visibility benchmarks.",
  ],
};

// Market insights based on sentiment
const MARKET_INSIGHTS = {
  bullish: {
    topPlatforms: ["Pump.Fun", "Jupiter", "DEXScreener"],
    volumeNeeded: "120K-180K USD/24h",
    bestStrategy: "Consistent uptrend volume patterns with breaks",
    successRate: "76% trending success rate in bull markets",
    pricePrediction: "SOL likely to test $160-175 range",
  },
  bearish: {
    topPlatforms: ["Birdeye", "DEXScreener", "Tensor"],
    volumeNeeded: "60K-90K USD/24h",
    bestStrategy: "Steady volume with periodic spikes",
    successRate: "38% trending success rate in bear markets",
    pricePrediction: "SOL may retest $130-140 support levels",
  },
  neutral: {
    topPlatforms: ["DEXScreener", "Solscan", "Jupiter"],
    volumeNeeded: "90K-120K USD/24h",
    bestStrategy: "Balanced buy/sell distribution with natural patterns",
    successRate: "54% trending success rate in neutral markets",
    pricePrediction: "SOL likely to consolidate in $145-155 range",
  },
};

interface UIState {
  isVisible: boolean;
  isHidden: boolean;
  isHovered: boolean;
  isSpeechBubbleVisible: boolean;
  showMarketData: boolean;
  showStats: boolean;
  currentMessageIndex: number;
  isMobile: boolean;
}

interface MarketState {
  sentiment: {
    current: "bullish" | "bearish" | "neutral";
    trend: string;
    strength: number;
    lastUpdate: number;
  };
  insight: string;
  data: {
    topPlatforms: string[];
    volumeNeeded: string;
    bestStrategy: string;
    successRate: string;
    pricePrediction: string;
  };
}

export function SimpleSolanaMascot({
  messages = DEFAULT_MESSAGES,
  position = "bottom-right",
  ctaText = "Start Free Trial",
  ctaLink = "#pricing",
  onCtaClick,
  autoHide = false,
  autoHideDelay = 60000, // 1 minute
  marketSentiment = "neutral",
  hideHamburgerButton = false,
}: SolanaMascotProps) {
  // Combined UI state
  const [uiState, setUiState] = useState<UIState>({
    isVisible: true,
    isHidden: false,
    isHovered: false,
    isSpeechBubbleVisible: window.innerWidth >= 640,
    showMarketData: false,
    showStats: false,
    currentMessageIndex: 0,
    isMobile: window.innerWidth < 640
  });

  // Combined market state
  const [marketState, setMarketState] = useState<MarketState>({
    sentiment: {
      current: marketSentiment,
      trend: "stable",
      strength: 0.5,
      lastUpdate: Date.now()
    },
    insight: "",
    data: MARKET_INSIGHTS[marketSentiment]
  });

  const controls = useAnimation();
  const [location, setLocation] = useLocation();
  const { openRegistrationModal } = useLicense();

  // Memoized values
  const positionClasses = useMemo(() => ({
    "bottom-right": "bottom-24 sm:right-7 right-7",
    "mid-right": "bottom-1/3 sm:right-7 right-7",
    "top-right": "top-32 sm:right-7 right-7",
  }), []);

  const combinedMessages = useMemo(() => [
    ...messages,
    ...MARKET_MESSAGES[marketSentiment],
    ...STRATEGY_MESSAGES,
  ], [messages, marketSentiment]);

  // Memoized handlers
  const handleCtaClick = useCallback(() => {
    controls.start({
      scale: [1, 1.2, 1],
      transition: { duration: 0.5 },
    });

    if (onCtaClick) {
      onCtaClick();
      return;
    }

    openRegistrationModal();

    if (ctaLink.startsWith("#")) {
      const element = document.querySelector(ctaLink);
      element?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [controls, onCtaClick, openRegistrationModal, ctaLink]);

  const toggleSpeechBubble = useCallback(() => {
    setUiState(prev => ({
      ...prev,
      isSpeechBubbleVisible: !prev.isSpeechBubbleVisible
    }));
  }, []);

  // Effects
  useEffect(() => {
    if (!uiState.isHovered) {
      const moveInterval = setInterval(() => {
        controls.start({
          y: [0, -10, 0, -5, 0],
          rotate: [0, 2, 0, -2, 0],
          transition: { duration: 3, ease: "easeInOut" },
        });
      }, 4000);

      return () => clearInterval(moveInterval);
    }
  }, [controls, uiState.isHovered]);

  useEffect(() => {
    if (combinedMessages.length > 1) {
      const messageInterval = setInterval(() => {
        setUiState(prev => ({
          ...prev,
          currentMessageIndex: (prev.currentMessageIndex + 1) % combinedMessages.length
        }));
      }, 4500);

      return () => clearInterval(messageInterval);
    }
  }, [combinedMessages]);

  useEffect(() => {
    if (autoHide) {
      const hideTimeout = setTimeout(() => {
        setUiState(prev => ({ ...prev, isVisible: false }));
      }, autoHideDelay);

      return () => clearTimeout(hideTimeout);
    }
  }, [autoHide, autoHideDelay]);

  useEffect(() => {
    const handleResize = () => {
      const mobileCheck = window.innerWidth < 640;
      setUiState(prev => ({
        ...prev,
        isMobile: mobileCheck,
        isSpeechBubbleVisible: mobileCheck ? false : prev.isSpeechBubbleVisible
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!uiState.isVisible) return null;

  // Render hidden state button
  if (uiState.isHidden) {
    return (
      <button
        onClick={() => setUiState(prev => ({ ...prev, isHidden: false }))}
        className="fixed bottom-20 right-7 z-50 bg-gradient-to-r from-[#14F195] to-[#9945FF] rounded-full p-3 shadow-lg shadow-[#14F195]/20 hover:shadow-[#14F195]/40 transition-all duration-300"
        aria-label="Show mascot"
        title="Show market assistant"
        data-solana-toggle
      >
        <img 
          src="/images/coins/SOL.png"
          alt="Solana logo"
          className="h-5 w-5 rounded-full"
          width="20"
          height="20"
          loading="eager"
        />
      </button>
    );
  }

  // Main render
  return (
    <div className={`fixed ${positionClasses[position]} z-50 flex flex-col ${uiState.isMobile ? 'items-center' : 'items-end'}`}>
      {uiState.isSpeechBubbleVisible && (
        <div className="relative bg-black/85 backdrop-blur-sm text-white p-3 rounded-xl mb-2 max-w-[260px] sm:max-w-[280px] border border-[#14F195]/30">
          <MarketSentimentIndicator sentiment={marketState.sentiment.current} />
          {marketState.insight && <MarketInsight insight={marketState.insight} />}
          
          <p className="text-xs sm:text-sm mb-2 break-words">
            {combinedMessages[uiState.currentMessageIndex]}
          </p>

          <ViewControls 
            showMarketData={uiState.showMarketData}
            showStats={uiState.showStats}
            onToggleMarketData={() => setUiState(prev => ({ ...prev, showMarketData: !prev.showMarketData }))}
            onToggleStats={() => setUiState(prev => ({ ...prev, showStats: !prev.showStats }))}
          />

          {uiState.showMarketData && <MarketDataPanel data={marketState.data} />}
          {uiState.showStats && <StatsPanel />}

          <CTAButton text={ctaText} onClick={handleCtaClick} />
          
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45 bg-black/85 border-r border-b border-[#14F195]/30" />
        </div>
      )}
    </div>
  );
}

// Extracted components
const MarketSentimentIndicator = React.memo(({ sentiment }: { sentiment: string }) => (
  <div className="flex items-center justify-between mb-2">
    <span className="text-xs sm:text-sm text-gray-300 truncate">Live Market Sentiment:</span>
    <span className={`text-xs sm:text-sm flex items-center font-medium ml-2 ${
      sentiment === "bullish" ? "text-[#14F195]" : 
      sentiment === "bearish" ? "text-red-400" : "text-blue-400"
    }`}>
      {sentiment === "bullish" && <>Bullish <TrendingUp className="ml-1 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" /></>}
      {sentiment === "bearish" && <>Bearish <TrendingDown className="ml-1 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" /></>}
      {sentiment === "neutral" && <>Neutral <span className="ml-1">→</span></>}
    </span>
  </div>
));

const MarketInsight = React.memo(({ insight }: { insight: string }) => (
  <div className="mb-2 text-xs text-[#14F195]/80 bg-[#131720] p-1.5 rounded-md border border-[#14F195]/20">
    <div className="flex items-start">
      <TrendingUp className="h-3.5 w-3.5 mr-1 mt-0.5 flex-shrink-0" />
      <p className="flex-1 break-words">{insight}</p>
    </div>
  </div>
));

const ViewControls = React.memo(({ showMarketData, showStats, onToggleMarketData, onToggleStats }) => (
  <div className="flex flex-wrap gap-2 mb-3">
    <button
      onClick={onToggleMarketData}
      className={`text-xs sm:text-sm py-2 px-3 sm:px-2 rounded-lg transition-colors flex items-center justify-center ${
        showMarketData ? "bg-[#14F195]/20 border border-[#14F195]/40" : "bg-[#1A1D2E] border border-[#14F195]/5"
      }`}
    >
      <TrendingUp className="h-4 w-4 sm:h-4 sm:w-4 flex-shrink-0" />
      <span className="hidden sm:inline sm:ml-1.5">Statistics</span>
    </button>
    <button
      onClick={onToggleStats}
      className={`text-xs sm:text-sm py-2 px-3 sm:px-2 rounded-lg transition-colors flex items-center justify-center ${
        showStats ? "bg-[#14F195]/20 border border-[#14F195]/40" : "bg-[#1A1D2E] border border-[#14F195]/5"
      }`}
    >
      <BarChart3 className="h-4 w-4 sm:h-4 sm:w-4 flex-shrink-0" />
      <span className="hidden sm:inline sm:ml-1.5">Requirements</span>
    </button>
  </div>
));

const MarketDataPanel = React.memo(({ data }) => (
  <div className="mb-2 bg-[#131720] rounded-md p-2 text-xs border border-[#14F195]/20">
    <div className="flex items-center text-[#14F195] mb-1">
      <TrendingUp className="h-3 w-3 mr-1" />
      <span className="font-medium">Market Data (Sample)</span>
    </div>
    <div className="space-y-1">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="flex justify-between">
          <span>{key}:</span>
          <span className="text-white">{Array.isArray(value) ? value.join(", ") : value}</span>
        </div>
      ))}
    </div>
  </div>
));

const StatsPanel = React.memo(() => (
  <div className="mb-2 bg-[#131720] rounded-md p-2 text-xs border border-[#14F195]/20">
    <div className="flex items-center mb-1 text-[#14F195]">
      <Target className="h-3 w-3 mr-1" />
      <span className="font-medium">Trending Requirements</span>
    </div>
    <div className="space-y-1">
      <div className="flex justify-between">
        <span>DEXScreener:</span>
        <span className="text-white">~$80K vol/24h</span>
      </div>
      <div className="flex justify-between">
        <span>Jupiter:</span>
        <span className="text-white">~$120K vol/24h</span>
      </div>
      <div className="flex justify-between">
        <span>Pump.Fun:</span>
        <span className="text-white">~6,500 txs/24h</span>
      </div>
      <div className="flex justify-between">
        <span>Birdeye:</span>
        <span className="text-white">~$60K vol/24h</span>
      </div>
    </div>
  </div>
));

const CTAButton = React.memo(({ text, onClick }) => (
  <button
    onClick={onClick}
    className="w-full text-[11px] sm:text-sm py-2 sm:py-2.5 px-3 sm:px-4 rounded-full text-black font-semibold bg-gradient-to-r from-[#14F195] to-[#9945FF] hover:opacity-90 transition-all flex items-center justify-center shadow-lg shadow-[#14F195]/20"
  >
    {text}
    <ChevronRight className="ml-1 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
  </button>
));
