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
import { webSocketService, GameMessage } from "@/services/WebSocketService";
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

  // Set up WebSocket listener and automatically connect on component mount
  useEffect(() => {
    const handleMessage = (message: GameMessage) => {
      if (message.type === "price_update" && message.data) {
        console.log("Received market data update", message.data);

        // Process price updates
        if (message.data.prices) {
          const prices = message.data.prices;
          const solanaData = prices.find((p: any) => p.symbol === "SOL");

          // Update Solana price
          if (solanaData) {
            setSolanaPriceData({
              symbol: solanaData.symbol,
              name: solanaData.name,
              price: solanaData.price,
              change: solanaData.change,
              volume: solanaData.volume,
              trending: solanaData.trending,
              lastUpdate: Date.now(),
            });
          }

          // Get additional token data (JUP, RAY, etc.)
          const otherTokens = prices.filter(
            (p: any) =>
              p.symbol !== "SOL" &&
              ["JUP", "RAY", "BONK", "WIF"].includes(p.symbol),
          );

          if (otherTokens.length > 0) {
            setAdditionalTokens(otherTokens);
          }
        }

        // Process market sentiment data
        if (message.data.marketSentiment) {
          console.log(
            "Updating market sentiment:",
            message.data.marketSentiment,
          );
          setMarketSentimentData(message.data.marketSentiment);
        }

        // Process market insight
        if (message.data.marketInsight) {
          console.log("Updating market insight:", message.data.marketInsight);
          setMarketInsight(message.data.marketInsight);
        }

        // Process market data for volume insights
        if (message.data.marketData) {
          console.log("Updating volume market data:", message.data.marketData);
          setVolumeMarketData(message.data.marketData);
        }
      }
    };

    // Register for WebSocket updates
    webSocketService.addMessageListener(handleMessage);
    
    // Auto-connect and fetch initial data
    if (!webSocketService.isConnected()) {
      webSocketService.connect();
      
      // Request fresh data after a short delay to ensure connection is established
      const initialDataTimer = setTimeout(() => {
        webSocketService.sendMessage({
          type: 'refresh_request',
          data: {
            timestamp: Date.now()
          }
        });
      }, 500);
      
      return () => {
        clearTimeout(initialDataTimer);
        webSocketService.removeMessageListener(handleMessage);
      };
    }

    return () => {
      // Clean up
      webSocketService.removeMessageListener(handleMessage);
    };
  }, []);

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
    const refreshIcon = document.querySelector("[data-refresh-icon]");
    if (refreshIcon) {
      refreshIcon.classList.add("animate-spin");
      setTimeout(() => {
        refreshIcon.classList.remove("animate-spin");
      }, 1000);
    }
    
    // Request data refresh
    if (!webSocketStore.isConnected) {
      webSocketStore.connect();
    } else {
      webSocketStore.sendMessage({ type: 'refresh' });
    }
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
          {/* Live Solana Price Section - With real logos and updated prices */}
          <div className="mb-2 bg-[#131720] rounded-md p-2 border border-[#14F195]/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img 
                  src={'/images/coins/SOL.png'} 
                  alt="Solana cryptocurrency logo" 
                  className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 rounded-full"
                  width="20" 
                  height="20"
                  loading="eager" 
                />
                <span className="text-xs sm:text-sm font-medium text-white">
                  SOL Price:
                </span>
              </div>

              <div
                className={`text-xs sm:text-sm font-mono font-bold ${solanaPriceData.change >= 0 ? "text-[#14F195]" : "text-red-400"}`}
              >
                ${solanaPriceData.price.toFixed(2)}
                <span className="ml-1">
                  {solanaPriceData.change >= 0 ? "+" : ""}
                  {solanaPriceData.change.toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Volume data for SOL - helps show importance of volume */}
            {solanaPriceData.volume && (
              <div className="flex items-center justify-between mt-1 text-[11px] text-gray-400">
                <span>24h Volume:</span>
                <span className="font-mono">
                  ${(solanaPriceData.volume / 1000000).toFixed(1)}M
                </span>
              </div>
            )}
          </div>

          {/* Additional Tokens Section - JUP, RAY, etc. */}
          {additionalTokens.length > 0 && (
            <div className="mb-2 bg-[#131720] rounded-md p-2 border border-[#14F195]/20">
              <div className="text-xs text-gray-400 mb-1 flex justify-between items-center">
                <div className="flex items-center">
                  <span className="font-medium text-white">Market Stats</span>
                  <button 
                    onClick={handleRefreshData} 
                    className="ml-2 p-1 rounded-full bg-[#14F195]/10 hover:bg-[#14F195]/20 transition-colors"
                    title="Refresh Market Data"
                  >
                    <RefreshCw 
                      className="h-3.5 w-3.5 text-[#14F195]" 
                      data-refresh-icon
                    />
                  </button>
                </div>
                <span className="text-[10px] text-gray-500">
                  {additionalTokens.length > 0 ? `${additionalTokens.length} tokens` : "No data"}
                </span>
              </div>

              {/* Token grid */}
              <div className="grid grid-cols-2 gap-1.5">
                {additionalTokens.slice(0, 4).map((token) => (
                  <div
                    key={token.symbol}
                    className={`p-1 rounded border ${token.trending ? "border-[#14F195]/30 bg-[#14F195]/5" : "border-gray-800"} text-[10px]`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center min-w-0 flex-shrink-0 w-1/2">
                        {/* Real coin logos - from CryptoCompare */}
                        <img 
                          src={`/images/coins/${token.symbol}.png`} 
                          alt={`${token.name} cryptocurrency logo`} 
                          className="h-4 w-4 mr-1 rounded-full flex-shrink-0"
                          width="16" 
                          height="16"
                          loading="lazy" 
                          onError={(e) => {
                            // Fallback to SVG if PNG not available
                            const target = e.target as HTMLImageElement;
                            target.onerror = null; // Prevent infinite loop
                            target.src = `/images/coins/placeholder-coin.svg`;
                          }}
                        />
                        <span className="font-bold truncate">{token.symbol}</span>
                      </div>
                      <span
                        className={`${token.change >= 0 ? "text-[#14F195]" : "text-red-400"} font-mono ml-1`}
                      >
                        {token.change >= 0 ? "+" : ""}
                        {token.change.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between mt-0.5 text-[9px] text-gray-400">
                      <div className="truncate mr-1">
                        $
                        {token.price < 0.01
                          ? token.price.toFixed(6)
                          : token.price.toFixed(2)}
                      </div>
                      {token.volume && (
                        <div className="truncate flex-shrink-0">
                          Vol: ${(token.volume / 1000000).toFixed(1)}M
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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

          {/* Market insight - rotating message from API */}
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

          {/* View selectors - market data and stats buttons */}
          <div className="flex flex-wrap gap-2 mb-3">
            <button
              onClick={() => setShowMarketData((prev) => !prev)}
              className={`text-xs sm:text-sm py-2 px-3 sm:px-2 rounded-lg transition-colors flex items-center justify-center ${showMarketData ? "bg-[#14F195]/20 border border-[#14F195]/40" : "bg-[#1A1D2E] border border-[#14F195]/5"}`}
              title="Statistics"
            >
              <TrendingUp className="h-4 w-4 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="hidden sm:inline sm:ml-1.5">Statistics</span>
            </button>
            <button
              onClick={() => setShowStats((prev) => !prev)}
              className={`text-xs sm:text-sm py-2 px-3 sm:px-2 rounded-lg transition-colors flex items-center justify-center ${showStats ? "bg-[#14F195]/20 border border-[#14F195]/40" : "bg-[#1A1D2E] border border-[#14F195]/5"}`}
              title="Requirements"
            >
              <BarChart3 className="h-4 w-4 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="hidden sm:inline sm:ml-1.5">Requirements</span>
            </button>
            {/* Refresh button moved to Market Stats header section */}
          </div>

          {/* Market Data Panel */}
          {showMarketData && (
            <div className="mb-2 bg-[#131720] rounded-md p-2 text-xs border border-[#14F195]/20">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center text-[#14F195]">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span className="font-medium">
                    {marketSentimentData.current.charAt(0).toUpperCase() +
                      marketSentimentData.current.slice(1)}{" "}
                    Market Data
                  </span>
                </div>

                {/* Market sentiment strength indicator */}
                <div className="flex space-x-1 items-center">
                  <span className="text-[10px] text-gray-400 mr-1">
                    Strength:
                  </span>
                  <div className="w-12 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        marketSentimentData.current === "bullish"
                          ? "bg-green-500"
                          : marketSentimentData.current === "bearish"
                            ? "bg-red-500"
                            : "bg-blue-500"
                      }`}
                      style={{
                        width: `${marketSentimentData.strength * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                {volumeMarketData.topPlatforms &&
                volumeMarketData.topPlatforms.length > 0 ? (
                  <div className="flex justify-between text-[11px]">
                    <span className="text-gray-400">Top Platforms:</span>
                    <span className="text-white">
                      {volumeMarketData.topPlatforms.join(", ")}
                    </span>
                  </div>
                ) : (
                  <div className="flex justify-between text-[11px]">
                    <span className="text-gray-400">Top Platforms:</span>
                    <span className="text-white">
                      {MARKET_INSIGHTS[
                        marketSentimentData.current
                      ].topPlatforms.join(", ")}
                    </span>
                  </div>
                )}

                {volumeMarketData.volumeNeeded ? (
                  <div className="flex justify-between text-[11px]">
                    <span className="text-gray-400">Volume Needed:</span>
                    <span className="text-white">
                      {volumeMarketData.volumeNeeded}
                    </span>
                  </div>
                ) : (
                  <div className="flex justify-between text-[11px]">
                    <span className="text-gray-400">Volume Needed:</span>
                    <span className="text-white">
                      {
                        MARKET_INSIGHTS[marketSentimentData.current]
                          .volumeNeeded
                      }
                    </span>
                  </div>
                )}

                {volumeMarketData.bestStrategy ? (
                  <div className="flex justify-between text-[11px]">
                    <span className="text-gray-400">Best Strategy:</span>
                    <span className="text-white">
                      {volumeMarketData.bestStrategy}
                    </span>
                  </div>
                ) : (
                  <div className="flex justify-between text-[11px]">
                    <span className="text-gray-400">Best Strategy:</span>
                    <span className="text-white">
                      {
                        MARKET_INSIGHTS[marketSentimentData.current]
                          .bestStrategy
                      }
                    </span>
                  </div>
                )}

                {volumeMarketData.successRate ? (
                  <div className="flex justify-between text-[11px]">
                    <span className="text-gray-400">Success Rate:</span>
                    <span className="text-white">
                      {volumeMarketData.successRate}
                    </span>
                  </div>
                ) : (
                  <div className="flex justify-between text-[11px]">
                    <span className="text-gray-400">Success Rate:</span>
                    <span className="text-white">
                      {MARKET_INSIGHTS[marketSentimentData.current].successRate}
                    </span>
                  </div>
                )}

                {volumeMarketData.pricePrediction ? (
                  <div className="flex justify-between text-[11px]">
                    <span className="text-gray-400">SOL Prediction:</span>
                    <span className="text-white">
                      {volumeMarketData.pricePrediction}
                    </span>
                  </div>
                ) : (
                  <div className="flex justify-between text-[11px]">
                    <span className="text-gray-400">SOL Prediction:</span>
                    <span className="text-white">
                      {
                        MARKET_INSIGHTS[marketSentimentData.current]
                          .pricePrediction
                      }
                    </span>
                  </div>
                )}

                {/* Last updated timestamp */}
                <div className="flex justify-end text-[9px] text-gray-500 mt-1 pt-1 border-t border-gray-800">
                  <span>
                    Updated:{" "}
                    {new Date(
                      marketSentimentData.lastUpdate,
                    ).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* A.I. Volume Bot Help Assistant Panel - Now fully powered by Perplexity API */}
          {showAssistant && (
            <div className="mb-2 bg-[#131720] rounded-md p-2 text-xs border border-[#14F195]/20">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center text-[#14F195]">
                  <MessageSquareText className="h-3 w-3 mr-1" />
                  <span className="font-medium">A.I. Volume Bot Help Assistant</span>
                </div>

                {/* Clear chat button */}
                {aiResponses.length > 0 && (
                  <button
                    onClick={() => {
                      setAiResponses([]);
                      setAiResponse("");
                      setAiError("");
                    }}
                    className="text-[10px] text-gray-400 hover:text-white transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* AI chat area */}
              {aiResponses.length > 0 ? (
                <div className="mb-2 max-h-24 overflow-y-auto space-y-1.5 bg-black/20 p-1.5 rounded">
                  {aiResponses.map((response, index) => (
                    <div key={index} className="text-[11px] text-gray-300">
                      {response.startsWith("You: ") ? (
                        <div className="text-gray-400">{response}</div>
                      ) : (
                        <div>
                          <span className="text-[#14F195] font-medium">
                            A.I.:{" "}
                          </span>
                          {response}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Display loading state if AI is thinking */}
                  {aiResponseLoading && (
                    <AIResponse content="" isLoading={true} />
                  )}

                  {/* Display error if any */}
                  {aiError && <AIResponse content="" error={aiError} />}
                </div>
              ) : (
                <div className="mb-2">
                  <p className="text-[11px] text-gray-300">
                    Need help? Ask me about volume strategies or market trends!
                  </p>

                  {/* Suggested questions as clickable buttons */}
                  <SuggestedQuestions
                    questions={suggestedQuestions}
                    onQuestionClick={handleSuggestedQuestionClick}
                  />
                </div>
              )}

              {/* A.I. input form with Perplexity integration */}
              <div className="flex space-x-1">
                <input
                  type="text"
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  onKeyDown={(e) => {
                    if (
                      e.key === "Enter" &&
                      userQuestion.trim() &&
                      !aiResponseLoading
                    ) {
                      handleQuestionSubmit();
                    }
                  }}
                  placeholder="Ask A.I. Volume Bot Help Assistant..."
                  className="flex-1 text-[11px] py-1 px-2 rounded bg-black/30 border border-[#14F195]/20 focus:border-[#14F195]/40 focus:outline-none"
                  disabled={aiResponseLoading}
                />
                <button
                  onClick={handleQuestionSubmit}
                  disabled={aiResponseLoading || !userQuestion.trim()}
                  className={`py-1 px-1.5 rounded border border-[#14F195]/30 transition-colors ${
                    aiResponseLoading || !userQuestion.trim()
                      ? "bg-gray-800/50 border-gray-700/50 cursor-not-allowed"
                      : "bg-[#14F195]/20 hover:bg-[#14F195]/30 cursor-pointer"
                  }`}
                >
                  <Send className="h-3 w-3" />
                </button>
              </div>
            </div>
          )}

          {/* Stats Panel */}
          {showStats && (
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
          )}

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

          {/* Toggle button for speech bubble */}
          <button
            onClick={() => setIsSpeechBubbleVisible(false)}
            className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-black/80 text-white/80 flex items-center justify-center text-xs hover:bg-black"
            aria-label="Dismiss message"
          >
            ×
          </button>
        </div>
      )}

      {/* Don't show anything if popup is closed */}
    </div>
  );
}
