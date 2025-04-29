import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ChevronRight, TrendingUp, TrendingDown } from 'lucide-react';
import { useLocation } from 'wouter';
import { useLicense } from '@/components/LicenseProvider';

interface SolanaMascotProps {
  messages?: string[];
  position?: 'bottom-right' | 'mid-right' | 'top-right';
  ctaText?: string;
  ctaLink?: string;
  onCtaClick?: () => void;
  autoHide?: boolean;
  autoHideDelay?: number;
  marketSentiment?: 'bullish' | 'bearish' | 'neutral';
}

// Example messages
const DEFAULT_MESSAGES = [
  "Boost your Solana token's visibility with our Volume Bot!",
  "Get your token trending on DEXScreener today!",
  "Ready to see your token on Pump.Fun trending page?",
  "Increase volume +1324% with our Solana Volume Bot!",
  "Make your token stand out in the Solana ecosystem!"
];

// Messages based on market sentiment
const MARKET_MESSAGES = {
  bullish: [
    "Market looking bullish! Perfect time to increase token visibility.",
    "Bullish sentiment detected! Boost your token's volume now.",
    "Market is moving up! Get your token trending on DEX platforms.",
    "Bulls are taking control! Maximize your token's exposure today."
  ],
  bearish: [
    "Market is bearish. Stay visible with strategic volume.",
    "During bear markets, visibility becomes even more crucial.",
    "Stand out during downtrends with consistent volume.",
    "Beat the bearish sentiment with optimized token visibility."
  ],
  neutral: [
    "Market sentiment is neutral. Good time to build visibility.",
    "Market consolidating - perfect time to grow token awareness.",
    "Steady market conditions - ideal for volume optimization.",
    "Market is waiting for direction - position your token now."
  ]
};

export function SolanaMascot({ 
  messages = DEFAULT_MESSAGES, 
  position = 'bottom-right',
  ctaText = "Start Free Trial",
  ctaLink = "#free-trial", 
  onCtaClick,
  autoHide = false,
  autoHideDelay = 60000, // 1 minute
  marketSentiment = 'neutral'
}: SolanaMascotProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isSpeechBubbleVisible, setIsSpeechBubbleVisible] = useState(true);
  const controls = useAnimation();
  const [location, setLocation] = useLocation();
  const { openRegistrationModal } = useLicense();
  
  // Select market sentiment messages
  const sentimentMessages = MARKET_MESSAGES[marketSentiment];
  const combinedMessages = [...messages, ...sentimentMessages];
  
  // Position classes
  const positionClasses = {
    'bottom-right': 'bottom-8 right-8',
    'mid-right': 'bottom-1/3 right-8',
    'top-right': 'top-32 right-8'
  };

  // Random movement animation
  useEffect(() => {
    // Set up interval for random float animation
    const moveInterval = setInterval(() => {
      if (!isHovered) {
        controls.start({
          y: [0, -10, 0, -5, 0],
          rotate: [0, 2, 0, -2, 0],
          transition: { 
            duration: 3, 
            ease: "easeInOut",
          }
        });
      }
    }, 4000);

    return () => clearInterval(moveInterval);
  }, [controls, isHovered]);
  
  // Rotating messages
  useEffect(() => {
    // Change message every 8 seconds
    const messageInterval = setInterval(() => {
      if (!isHovered && combinedMessages.length > 1) {
        setCurrentMessageIndex((prev) => (prev + 1) % combinedMessages.length);
      }
    }, 8000);
    
    return () => clearInterval(messageInterval);
  }, [isHovered, combinedMessages]);
  
  // Auto-hide after delay if enabled
  useEffect(() => {
    if (autoHide) {
      const hideTimeout = setTimeout(() => {
        setIsVisible(false);
      }, autoHideDelay);
      
      return () => clearTimeout(hideTimeout);
    }
  }, [autoHide, autoHideDelay]);

  // Handle CTA button click
  const handleCtaClick = () => {
    // Apply animation
    controls.start({
      scale: [1, 1.2, 1],
      transition: { duration: 0.5 }
    });
    
    // Call custom click function if provided
    if (onCtaClick) {
      onCtaClick();
      return;
    }
    
    // Open registration modal
    openRegistrationModal();
    
    // Optionally navigate to in-page links
    if (ctaLink.startsWith('#')) {
      // Scroll to element if it's an anchor link
      const element = document.querySelector(ctaLink);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  // Toggle speech bubble
  const toggleSpeechBubble = () => {
    setIsSpeechBubbleVisible(prev => !prev);
  };

  if (!isVisible) return null;

  return (
    <motion.div 
      className={`fixed ${positionClasses[position]} z-50 flex flex-col items-center`}
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      {/* Speech bubble with message and CTA */}
      {isSpeechBubbleVisible && (
        <motion.div 
          className="relative bg-black/80 backdrop-blur-sm text-white p-3 rounded-xl mb-2 max-w-[230px] border border-[#14F195]/30"
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          key={currentMessageIndex} // Key prop to force re-render and animation on message change
        >
          {/* Market sentiment indicator */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400">Market Sentiment:</span>
            <span className={`text-xs flex items-center ${
              marketSentiment === 'bullish' 
                ? 'text-green-400' 
                : marketSentiment === 'bearish' 
                  ? 'text-red-400' 
                  : 'text-blue-400'
            }`}>
              {marketSentiment === 'bullish' && (
                <>Bullish <TrendingUp className="ml-1 h-3 w-3" /></>
              )}
              {marketSentiment === 'bearish' && (
                <>Bearish <TrendingDown className="ml-1 h-3 w-3" /></>
              )}
              {marketSentiment === 'neutral' && (
                <>Neutral <span className="ml-1">→</span></>
              )}
            </span>
          </div>
          
          <motion.p 
            className="text-sm mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {combinedMessages[currentMessageIndex]}
          </motion.p>
          
          <motion.div
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <button 
              onClick={handleCtaClick}
              className="w-full text-sm py-1.5 px-2 rounded-lg text-black font-medium bg-gradient-to-r from-[#14F195] to-[#9945FF] hover:opacity-90 transition-all flex items-center justify-center"
            >
              {ctaText}
              <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          </motion.div>
          
          {/* Speech bubble arrow */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45 bg-black/80 border-r border-b border-[#14F195]/30"></div>
          
          {/* Toggle button for speech bubble */}
          <button
            onClick={() => setIsSpeechBubbleVisible(false)}
            className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-black/80 text-white/80 flex items-center justify-center text-xs hover:bg-black"
            aria-label="Dismiss message"
          >
            ×
          </button>
        </motion.div>
      )}

      {/* Solana Mascot - SVG implementation based on the images */}
      <motion.div 
        className="relative cursor-pointer w-24 h-28"
        animate={controls}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleSpeechBubble}
      >
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 120 140" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0"
        >
          {/* Cape */}
          <path 
            d="M 30 60 Q 20 80 30 100 L 90 100 Q 100 80 90 60 Z" 
            fill="#1A1D2E" 
            className="drop-shadow-lg"
          />
          
          {/* Rocket fire */}
          <motion.path 
            d="M 50 120 Q 60 140 70 120" 
            fill="url(#flameGradient)"
            animate={{ 
              d: [
                "M 50 120 Q 60 140 70 120",
                "M 50 120 Q 60 150 70 120",
                "M 50 120 Q 60 140 70 120"
              ]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              repeatType: "mirror" 
            }}
          />
          
          {/* Body */}
          <ellipse 
            cx="60" 
            cy="80" 
            rx="30" 
            ry="35" 
            fill="url(#bodyGradient)" 
            className="drop-shadow-md"
          />
          
          {/* Left arm */}
          <path 
            d="M 30 70 Q 25 80 30 90" 
            stroke="#14F195" 
            strokeWidth="10" 
            strokeLinecap="round"
          />
          
          {/* Right arm */}
          <path 
            d="M 90 70 Q 95 80 90 90" 
            stroke="#14F195" 
            strokeWidth="10" 
            strokeLinecap="round"
          />
          
          {/* Left leg */}
          <path 
            d="M 45 115 L 45 120" 
            stroke="#14F195" 
            strokeWidth="10" 
            strokeLinecap="round"
          />
          
          {/* Right leg */}
          <path 
            d="M 75 115 L 75 120" 
            stroke="#14F195" 
            strokeWidth="10" 
            strokeLinecap="round"
          />
          
          {/* Helmet */}
          <ellipse 
            cx="60" 
            cy="50" 
            rx="28" 
            ry="25" 
            fill="url(#helmetGradient)" 
            className="drop-shadow-md"
          />
          
          {/* Helmet visor */}
          <ellipse 
            cx="60" 
            cy="50" 
            rx="20" 
            ry="18" 
            fill="#14F195" 
            className="drop-shadow-inner"
          />
          
          {/* Left eye */}
          <ellipse 
            cx="50" 
            cy="45" 
            rx="5" 
            ry="6" 
            fill="#000"
          >
            <animate
              attributeName="ry"
              values="6;3;6"
              dur="5s"
              repeatCount="indefinite"
              begin={(marketSentiment === 'bearish') ? "0s" : "indefinite"}
            />
          </ellipse>
          
          {/* Right eye */}
          <ellipse 
            cx="70" 
            cy="45" 
            rx="5" 
            ry="6" 
            fill="#000"
          >
            <animate
              attributeName="ry"
              values="6;3;6"
              dur="5s"
              repeatCount="indefinite"
              begin={(marketSentiment === 'bearish') ? "0s" : "indefinite"}
            />
          </ellipse>
          
          {/* Left eye reflection */}
          <circle 
            cx="48" 
            cy="42" 
            r="1.5" 
            fill="#fff"
          />
          
          {/* Right eye reflection */}
          <circle 
            cx="68" 
            cy="42" 
            r="1.5" 
            fill="#fff"
          />
          
          {/* Mouth */}
          {marketSentiment === 'bullish' && (
            <path 
              d="M 53 60 Q 60 65 67 60" 
              stroke="#FF5A5A" 
              strokeWidth="3" 
              strokeLinecap="round"
              fill="none"
            />
          )}
          
          {marketSentiment === 'bearish' && (
            <path 
              d="M 53 63 Q 60 58 67 63" 
              stroke="#FF5A5A" 
              strokeWidth="3" 
              strokeLinecap="round"
              fill="none"
            />
          )}
          
          {marketSentiment === 'neutral' && (
            <line 
              x1="53" 
              y1="60" 
              x2="67" 
              y2="60" 
              stroke="#FF5A5A" 
              strokeWidth="3" 
              strokeLinecap="round"
            />
          )}
          
          {/* Antenna */}
          <line 
            x1="60" 
            y1="25" 
            x2="60" 
            y2="15" 
            stroke="#9945FF" 
            strokeWidth="2"
          />
          <circle 
            cx="60" 
            cy="12" 
            r="4" 
            fill="#9945FF"
          />
          
          {/* Solana Logo on chest */}
          <g transform="translate(50, 80) scale(0.5)">
            <rect 
              x="0" 
              y="0" 
              width="20" 
              height="5" 
              rx="1" 
              fill="#9945FF" 
              transform="skewX(-15)"
            />
            <rect 
              x="0" 
              y="7" 
              width="20" 
              height="5" 
              rx="1" 
              fill="#14F195" 
              transform="skewX(15)"
            />
          </g>
          
          {/* Gradients */}
          <defs>
            <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#14F195" />
              <stop offset="100%" stopColor="#0E8E59" />
            </linearGradient>
            
            <linearGradient id="helmetGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={marketSentiment === 'bullish' ? '#9945FF' : marketSentiment === 'bearish' ? '#2B3148' : '#6B77E8'} />
              <stop offset="100%" stopColor={marketSentiment === 'bullish' ? '#6322B5' : marketSentiment === 'bearish' ? '#1A1E2D' : '#3A45A0'} />
            </linearGradient>
            
            <linearGradient id="flameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={marketSentiment === 'bullish' ? '#FF6B6B' : marketSentiment === 'bearish' ? '#9945FF' : '#FF9900'} />
              <stop offset="50%" stopColor={marketSentiment === 'bullish' ? '#FFB547' : marketSentiment === 'bearish' ? '#794AA3' : '#FFCC00'} />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Close button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsVisible(false);
          }}
          className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-black/80 text-white/80 flex items-center justify-center text-xs hover:bg-black z-20"
          aria-label="Close mascot"
        >
          ×
        </button>
      </motion.div>
    </motion.div>
  );
}