import React, { useState, useEffect } from "react";
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
  const [isVisible, setIsVisible] = useState(true);
  const [isHidden, setIsHidden] = useState(false); // New state for scroll-based hiding
  const [isHovered, setIsHovered] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  // Closed on mobile devices, open on desktop
  const [isSpeechBubbleVisible, setIsSpeechBubbleVisible] = useState(window.innerWidth >= 640); // Open above 640px (sm), closed below
  const [showSolanaPrice, setShowSolanaPrice] = useState(true); // SOL price always visible
  const [showStats, setShowStats] = useState(false); // Stats initially closed
  const [showAssistant, setShowAssistant] = useState(false); // AI Assistant initially closed
  const [showMarketData, setShowMarketData] = useState(false); // Market data initially closed
  const [userQuestion, setUserQuestion] = useState("");
  const [aiResponses, setAiResponses] = useState<string[]>([]);
  const [solanaPriceData, setSolanaPriceData] = useState<TokenPrice>({
    symbol: "SOL",
    name: "Solana",
    price: 145.82,
    change: 2.4,
    lastUpdate: Date.now(),
  });
  const controls = useAnimation();
  const [location, setLocation] = useLocation();
  const { openRegistrationModal } = useLicense();

  // Select messages based on market sentiment
  const sentimentMessages = MARKET_MESSAGES[marketSentiment];
  const strategyMessages = STRATEGY_MESSAGES;
  const combinedMessages = [
    ...messages,
    ...sentimentMessages,
    ...strategyMessages,
  ];

  // CSS classes for positioning - Fixed positions for each screen size
  const positionClasses = {
    "bottom-right": "bottom-24 sm:right-7 right-7",
    "mid-right": "bottom-1/3 sm:right-7 right-7",
    "top-right": "top-32 sm:right-7 right-7",
  };

  // State for additional tokens and market data
  const [additionalTokens, setAdditionalTokens] = useState<TokenPrice[]>([
    // Default meme coins data to ensure they're always displayed
    { symbol: 'JUP', name: 'Jupiter', price: 2.43, change: 3.2, volume: 189500000, trending: true },
    { symbol: 'RAY', name: 'Raydium', price: 1.07, change: 1.8, volume: 43200000, trending: false },
    { symbol: 'BONK', name: 'Bonk', price: 0.000018, change: 5.2, volume: 91200000, trending: true },
    { symbol: 'WIF', name: 'Dogwifhat', price: 1.35, change: 2.5, volume: 125600000, trending: false }
  ]);
  const [marketSentimentData, setMarketSentimentData] =
    useState<MarketSentiment>({
      current: "neutral",
      trend: "stable",
      strength: 0.5,
      lastUpdate: Date.now(),
    });
  const [marketInsight, setMarketInsight] = useState<string>("");
  const [volumeMarketData, setVolumeMarketData] = useState<MarketData>({
    topPlatforms: [],
    volumeNeeded: "",
    bestStrategy: "",
    successRate: "",
    pricePrediction: "",
  });

  // Perplexity AI related states
  const [aiResponse, setAiResponse] = useState<string>("");
  const [aiResponseLoading, setAiResponseLoading] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string>("");
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>(
    perplexityService.getSuggestedQuestions(),
  );

  // Random movement animation
  useEffect(() => {
    const moveInterval = setInterval(() => {
      if (!isHovered) {
        controls.start({
          y: [0, -10, 0, -5, 0],
          rotate: [0, 2, 0, -2, 0],
          transition: {
            duration: 3,
            ease: "easeInOut",
          },
        });
      }
    }, 4000);

    return () => clearInterval(moveInterval);
  }, [controls, isHovered]);

  // Rotating messages - showing with ideal timing for users to read
  useEffect(() => {
    const messageInterval = setInterval(() => {
      if (combinedMessages.length > 1) {
        setCurrentMessageIndex((prev) => (prev + 1) % combinedMessages.length);
      }
    }, 4500); // Changes every 4.5 seconds - enough time to read without waiting too long

    return () => clearInterval(messageInterval);
  }, [combinedMessages]);

  // Auto-hide after delay if enabled
  useEffect(() => {
    if (autoHide) {
      const hideTimeout = setTimeout(() => {
        setIsVisible(false);
      }, autoHideDelay);

      return () => clearTimeout(hideTimeout);
    }
  }, [autoHide, autoHideDelay]);

  // Add scroll listener to hide mascot when scrolling down
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // If we've scrolled down more than 200px, hide the mascot
          if (window.scrollY > 200 && window.scrollY > lastScrollY) {
            setIsHidden(true);
          } else if (window.scrollY < lastScrollY) {
            // When scrolling back up, show mascot again
            setIsHidden(false);
          }

          lastScrollY = window.scrollY;
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle CTA button click
  const handleCtaClick = () => {
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
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  // Manage mobile/desktop behavior when screen size changes
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  
  useEffect(() => {
    const handleResize = () => {
      // Detect screen size change
      const mobileCheck = window.innerWidth < 640;
      setIsMobile(mobileCheck);
      
      // Automatically close when switching to mobile device
      if (mobileCheck) {
        setIsSpeechBubbleVisible(false);
      }
      
      // Force refresh the page so that button position is calculated correctly
      // Note: Normally this approach is not ideal but in this case it's the most practical solution
      if (mobileCheck !== isMobile) {
        setTimeout(() => {
          // Update button styles without refreshing the page
          const toggleButton = document.querySelector("[data-solana-toggle]");
          if (toggleButton) {
            const btn = toggleButton as HTMLElement;
            btn.style.left = mobileCheck ? '50%' : 'auto';
            btn.style.right = !mobileCheck ? '0' : 'auto';
            btn.style.transform = mobileCheck ? 'translateX(-50%)' : 'none';
          }
        }, 10);
      }
    };

    // Check during initial loading and on size changes
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  // Toggle speech bubble
  const toggleSpeechBubble = () => {
    setIsSpeechBubbleVisible((prev) => !prev);
  };
  
  // Handle manual refresh button click
  const handleRefreshData = () => {
    console.log("Manual refresh requested");
    
    // Show loading indicator
    // We don't need a full loading state since the refresh is fast
    const refreshIcon = document.querySelector("[data-refresh-icon]");
    if (refreshIcon) {
      refreshIcon.classList.add("animate-spin");
      setTimeout(() => {
        refreshIcon.classList.remove("animate-spin");
      }, 1000);
    }
    
    // Connect to WebSocket to get fresh data
    webSocketService.connect();
    
    // Send refresh request message
    webSocketService.sendMessage({
      type: 'refresh_request',
      data: {
        timestamp: Date.now()
      }
    });
  };

  // Handle AI question submission - use Perplexity API
  const handleQuestionSubmit = async () => {
    if (!userQuestion.trim()) return;

    setAiResponseLoading(true);
    setAiError("");

    try {
      // Add user's question to responses array for display
      setAiResponses((prev) => [...prev, `You: ${userQuestion}`]);

      // Call Perplexity API
      const response = await perplexityService.askQuestion(userQuestion);

      if (response.error) {
        setAiError(response.error);
      } else if (response.content) {
        setAiResponse(response.content);
        setAiResponses((prev) => [...prev, response.content]);
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setAiError(
        "Our AI assistant is currently overloaded. Please try again later.",
      );
    } finally {
      setAiResponseLoading(false);
      setUserQuestion(""); // Clear input after submission
    }
  };

  // Handle suggested question click
  const handleSuggestedQuestionClick = (question: string) => {
    setUserQuestion(question);
    // Auto-submit the question
    setTimeout(() => {
      handleQuestionSubmit();
    }, 50);
  };

  if (!isVisible) return null;

  // Add a button to show the mascot when it's hidden - positioned on the right side to match original mascot position
  if (isHidden) {
    return (
      <div className="fixed bottom-20 right-7 z-50">
        <button
          onClick={() => setIsHidden(false)}
          className="bg-gradient-to-r from-[#14F195] to-[#9945FF] rounded-full p-3 shadow-lg shadow-[#14F195]/20 hover:shadow-[#14F195]/40 transition-all duration-300"
          aria-label="Show mascot"
          title="Show market assistant"
          data-solana-toggle
        >
          <img 
            src={'/images/coins/SOL.png'} 
            alt="Solana cryptocurrency logo" 
            className="h-5 w-5 rounded-full"
            width="20"
            height="20"
            loading="eager" 
          />
        </button>
      </div>
    );
  }

  return (
    <div
      className={`fixed ${positionClasses[position]} z-50 flex flex-col ${isMobile ? 'items-center' : 'items-end'}`}
    >
      {/* Speech bubble with message and CTA - fully stable version */}
      {isSpeechBubbleVisible && (
        <div className="relative bg-black/85 backdrop-blur-sm text-white p-3 rounded-xl mb-2 max-w-[260px] sm:max-w-[280px] border border-[#14F195]/30">
          {/* Live Market Sentiment indicator - Live data from API */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm text-gray-300 truncate">Live Market Sentiment:</span>
            <span
              className={`text-xs sm:text-sm flex items-center font-medium ml-2 ${
                marketSentimentData.current === "bullish"
                  ? "text-[#14F195]"
                  : marketSentimentData.current === "bearish"
                    ? "text-red-400"
                    : "text-blue-400"
              }`}
            >
              {marketSentimentData.current === "bullish" && (
                <>
                  Bullish <TrendingUp className="ml-1 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                </>
              )}
              {marketSentimentData.current === "bearish" && (
                <>
                  Bearish <TrendingDown className="ml-1 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                </>
              )}
              {marketSentimentData.current === "neutral" && (
                <>
                  Neutral <span className="ml-1">→</span>
                </>
              )}
            </span>
          </div>

          {/* Market insight, messages, CTA, etc. - KEEP ALL THIS */}
          {marketInsight && (
            <div className="mb-2 text-xs text-[#14F195]/80 bg-[#131720] p-1.5 rounded-md border border-[#14F195]/20">
              <div className="flex items-start">
                <TrendingUp className="h-3.5 w-3.5 mr-1 mt-0.5 flex-shrink-0" />
                <p className="flex-1 break-words">{marketInsight}</p>
              </div>
            </div>
          )}

          <p className="text-xs sm:text-sm mb-2 break-words">
            {combinedMessages[currentMessageIndex]}
          </p>

          <div>
            <button
              onClick={handleCtaClick}
              className="w-full text-[11px] sm:text-sm py-2 sm:py-2.5 px-3 sm:px-4 rounded-full text-black font-semibold bg-gradient-to-r from-[#14F195] to-[#9945FF] hover:opacity-90 transition-all flex items-center justify-center shadow-lg shadow-[#14F195]/20"
            >
              {ctaText}
              <ChevronRight className="ml-1 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            </button>
          </div>

          {/* Speech bubble arrow */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45 bg-black/85 border-r border-b border-[#14F195]/30"></div>
        </div>
      )}
    </div>
  );
}
