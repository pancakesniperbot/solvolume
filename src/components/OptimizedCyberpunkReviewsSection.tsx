import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CtaButton } from "@/components/CtaButton";
import { ArrowRight } from "lucide-react";
import { useLicense } from "@/components/LicenseProvider";
import { 
  FaStar, FaStarHalf, FaRedditAlien, FaDiscord, FaTwitter, FaTelegram
} from "react-icons/fa";
import { SiTrustpilot, SiG2, SiProducthunt } from "react-icons/si";

// Emotion icons for review sentiment
const EmotionIcons = [
  <span key="happy" className="text-green-400">😃</span>,
  <span key="star" className="text-amber-400">⭐</span>,
  <span key="rocket" className="text-blue-400">🚀</span>,
  <span key="fire" className="text-orange-400">🔥</span>,
  <span key="heart" className="text-rose-400">❤️</span>
];

// Review data type
interface ReviewData {
  name: string;
  title: string;
  content: string;
  rating: number;
  avatar: string;
  platform: {
    name: string;
    icon: React.ReactNode;
  };
  delay: number;
  shapeIndex: number;
  emotion: React.ReactNode;
  highlight: string;
  verified?: boolean;
}

// Constant color palette for avatars
const AVATAR_COLORS = [
  "#14F195", // Solana green
  "#9945FF", // Solana purple
  "#03E1FF", // Cyan
  "#F24C94", // Pink
  "#F49D6E", // Orange
  "#5DADE2", // Blue
];

// Sample reviews data
const reviews: ReviewData[] = [
  {
    name: "Alex Thompson",
    title: "Solana Volume Bot: SOL Volume Bot - Pump Fun Volume Bot",
    content: "Using this Volume Bot completely transformed how we manage our token's market presence. The customizable trading strategies and detailed analytics give us full control over our volume generation.",
    rating: 5,
    avatar: "/avatars/cyber-1.svg", 
    platform: {
      name: "Trustpilot",
      icon: <SiTrustpilot className="h-5 w-5 text-[#00b67a]" />
    },
    delay: 0,
    shapeIndex: 0,
    emotion: EmotionIcons[0],
    highlight: "full control"
  },
  {
    name: "Michael Chen",
    title: "Solana Volume Bot: SOL Volume Bot - Pump Fun Volume Bot",
    content: "The interface is intuitive and the bot's performance is exceptional. We've seen a 340% increase in organic trading since deploying our first campaign. Support team is responsive and helpful.",
    rating: 4.5,
    avatar: "/avatars/cyber-2.svg", 
    platform: {
      name: "G2",
      icon: <SiG2 className="h-5 w-5 text-[#FF492C]" />
    },
    delay: 0.1,
    shapeIndex: 1,
    emotion: EmotionIcons[1],
    highlight: "340% increase in organic trading"
  },
  {
    name: "Sophia Williams",
    title: "Solana Volume Bot: SOL Volume Bot - Pump Fun Volume Bot",
    content: "Our community was looking for a reliable way to increase volume without risking market manipulation flags. This Volume Bot provided exactly what we needed - legitimate, distributed trading that looks natural.",
    rating: 5,
    avatar: "/avatars/cyber-3.svg", 
    platform: {
      name: "Reddit",
      icon: <FaRedditAlien className="h-5 w-5 text-[#FF4500]" />
    },
    delay: 0.2,
    shapeIndex: 2,
    emotion: EmotionIcons[2],
    highlight: "legitimate, distributed trading"
  },
  {
    name: "David Chang",
    title: "Solana Volume Bot: SOL Volume Bot - Pump Fun Volume Bot",
    content: "I was skeptical at first, but the results speak for themselves. Our token's visibility increased dramatically in just a week. The fact that it uses advanced strategies to mimic organic trading is what sold me.",
    rating: 5,
    avatar: "/avatars/cyber-4.svg",
    platform: {
      name: "Twitter",
      icon: <FaTwitter className="h-5 w-5 text-[#1DA1F2]" />
    },
    delay: 0.3,
    shapeIndex: 3,
    emotion: EmotionIcons[3],
    highlight: "increased dramatically"
  },
  {
    name: "Emma Rodriguez",
    title: "Solana Volume Bot: SOL Volume Bot - Pump Fun Volume Bot",
    content: "What stands out is how the bot adapts to different market conditions automatically. It's helped us maintain trending status across multiple platforms without triggering any alarms. Worth every SOL we spent.",
    rating: 4.5,
    avatar: "/avatars/cyber-5.svg",
    platform: {
      name: "Product Hunt",
      icon: <SiProducthunt className="h-5 w-5 text-[#DA552F]" />
    },
    delay: 0.4,
    shapeIndex: 4,
    emotion: EmotionIcons[4],
    highlight: "adapts to different market conditions"
  },
  {
    name: "James Wilson",
    title: "Solana Volume Bot: SOL Volume Bot - Pump Fun Volume Bot",
    content: "The analytics dashboard alone is worth the price. Being able to track our volume impact in real-time has been invaluable for our marketing decisions. I recommend this to all serious token projects.",
    rating: 5,
    avatar: "/avatars/cyber-6.svg",
    platform: {
      name: "Telegram",
      icon: <FaTelegram className="h-5 w-5 text-[#26A5E4]" />
    },
    delay: 0.5,
    shapeIndex: 5,
    emotion: EmotionIcons[0],
    highlight: "analytics dashboard"
  },
  {
    name: "Olivia Kumar",
    title: "Solana Volume Bot: SOL Volume Bot - Pump Fun Volume Bot",
    content: "After trying multiple volume solutions, this one is clearly superior. The parameter customization allows for precise control, and the anti-detection features have kept our campaigns running smoothly for months.",
    rating: 5,
    avatar: "/avatars/cyber-7.svg",
    platform: {
      name: "Discord",
      icon: <FaDiscord className="h-5 w-5 text-[#5865F2]" />
    },
    delay: 0.2,
    shapeIndex: 0,
    emotion: EmotionIcons[2],
    highlight: "precise control"
  },
  {
    name: "Ryan Patel",
    title: "Solana Volume Bot: SOL Volume Bot - Pump Fun Volume Bot",
    content: "Getting tokens listed on exchanges requires demonstrating reliable trading volume. This solution helped three of my clients meet volume requirements for tier-2 exchanges. Professional service all around.",
    rating: 4.5,
    avatar: "/avatars/cyber-4.svg",
    platform: {
      name: "G2",
      icon: <SiG2 className="h-5 w-5 text-[#FF492C]" />
    },
    delay: 0.3,
    shapeIndex: 1,
    emotion: EmotionIcons[3],
    highlight: "meet volume requirements"
  },
  {
    name: "Natalie Lee",
    title: "Solana Volume Bot: SOL Volume Bot - Pump Fun Volume Bot",
    content: "I recommend this to all the projects I advise. It's the perfect balance of effectiveness and safety. The team behind it clearly understands both the technical and marketing aspects of volume generation.",
    rating: 5,
    avatar: "/avatars/cyber-5.svg",
    platform: {
      name: "Twitter",
      icon: <FaTwitter className="h-5 w-5 text-[#1DA1F2]" />
    },
    delay: 0.4,
    shapeIndex: 2,
    emotion: EmotionIcons[4],
    highlight: "perfect balance"
  },
  // Additional reviews with requested keywords
  {
    name: "Thomas Johnson",
    title: "Solana Volume Bot: SOL Volume Bot - Pump Fun Volume Bot",
    content: "The Solana Volume Bot has been a game-changer for our token's visibility. We went from barely being noticed to consistently trending on DEXScreener within days. The natural volume patterns make it undetectable as bot activity.",
    rating: 5,
    avatar: "/avatars/cyber-8.svg",
    platform: {
      name: "Trustpilot",
      icon: <SiTrustpilot className="h-5 w-5 text-[#00b67a]" />
    },
    delay: 0.2,
    shapeIndex: 3,
    emotion: EmotionIcons[2],
    highlight: "Solana Volume Bot"
  },
  {
    name: "Robert Smith",
    title: "Solana Volume Bot: SOL Volume Bot - Pump Fun Volume Bot",
    content: "After struggling with visibility, we tried the SOL Volume Bot platform. The results were immediate - our trading volume increased by 275% and we started trending on multiple DEX platforms. The ROI was evident within the first week.",
    rating: 5,
    avatar: "/avatars/cyber-9.svg",
    platform: {
      name: "G2",
      icon: <SiG2 className="h-5 w-5 text-[#FF492C]" />
    },
    delay: 0.3,
    shapeIndex: 4,
    emotion: EmotionIcons[0],
    highlight: "SOL Volume Bot"
  },
  {
    name: "Richard Taylor",
    title: "Solana Volume Bot: SOL Volume Bot - Pump Fun Volume Bot",
    content: "The Pump Fun Trending Bot functionality is exceptional. We've maintained consistent trending status for weeks now. What impressed me most was how the bot adjusted volume patterns to match market conditions and avoid detection.",
    rating: 4.5,
    avatar: "/avatars/cyber-10.svg",
    platform: {
      name: "Reddit",
      icon: <FaRedditAlien className="h-5 w-5 text-[#FF4500]" />
    },
    delay: 0.4,
    shapeIndex: 5,
    emotion: EmotionIcons[3],
    highlight: "Pump Fun Trending Bot"
  },
  {
    name: "Nathan Wilson",
    title: "Solana Volume Bot: SOL Volume Bot - Pump Fun Volume Bot",
    content: "We tried several services before finding the Pump Fun Volume Bot, and nothing else comes close. The customization options let us create natural-looking volume patterns that helped us trend on DEXTools without triggering any flags.",
    rating: 5,
    avatar: "/avatars/cyber-11.svg",
    platform: {
      name: "Discord",
      icon: <FaDiscord className="h-5 w-5 text-[#5865F2]" />
    },
    delay: 0.2,
    shapeIndex: 0,
    emotion: EmotionIcons[1],
    highlight: "Pump Fun Volume Bot"
  },
  {
    name: "Kevin Garcia",
    title: "Solana Volume Bot: SOL Volume Bot - Pump Fun Volume Bot",
    content: "The Solana Volume Bot platform was instrumental in our successful launch. We managed to get our token trending on all major DEX aggregators, which brought in genuine traders and holders. Worth every penny of our marketing budget.",
    rating: 5,
    avatar: "/avatars/cyber-12.svg",
    platform: {
      name: "Meta",
      icon: <FaTwitter className="h-5 w-5 text-[#0668E1]" />
    },
    delay: 0.3,
    shapeIndex: 1,
    emotion: EmotionIcons[2],
    highlight: "Solana Volume Bot platform"
  },
  {
    name: "Daniel Park",
    title: "Solana Volume Bot: SOL Volume Bot - Pump Fun Volume Bot",
    content: "Using the Pump Fun Trending service helped our community token gain the visibility it deserved. The bot's smart distribution of trades across wallets and time periods ensured we maintained organic-looking volume patterns.",
    rating: 4.5,
    avatar: "/avatars/cyber-13.svg",
    platform: {
      name: "Telegram",
      icon: <FaTelegram className="h-5 w-5 text-[#26A5E4]" />
    },
    delay: 0.4,
    shapeIndex: 2,
    emotion: EmotionIcons[0],
    highlight: "Pump Fun Trending"
  },
  {
    name: "Andrew Miller",
    title: "Solana Volume Bot: SOL Volume Bot - Pump Fun Volume Bot",
    content: "The SOL Volume Bot is technically impressive. As a developer, I appreciate the sophisticated algorithms that distribute volume in a way that mimics natural trading patterns. Our token has been trending consistently for over a month.",
    rating: 5,
    avatar: "/avatars/cyber-14.svg",
    platform: {
      name: "Product Hunt",
      icon: <SiProducthunt className="h-5 w-5 text-[#DA552F]" />
    },
    delay: 0.2,
    shapeIndex: 3,
    emotion: EmotionIcons[4],
    highlight: "SOL Volume Bot"
  },
  {
    name: "Matthew Brown",
    title: "Solana Volume Bot: SOL Volume Bot - Pump Fun Volume Bot",
    content: "I've recommended the Solana Volume Bot to multiple projects in our accelerator program. Every team has reported significant improvements in token visibility and liquidity. The analytics dashboard also provides valuable insights.",
    rating: 5,
    avatar: "/avatars/cyber-15.svg",
    platform: {
      name: "Trustpilot",
      icon: <SiTrustpilot className="h-5 w-5 text-[#00b67a]" />
    },
    delay: 0.3,
    shapeIndex: 4,
    emotion: EmotionIcons[3],
    highlight: "Solana Volume Bot"
  },
  {
    name: "Jason Lee",
    title: "Solana Volume Bot: SOL Volume Bot - Pump Fun Volume Bot",
    content: "For token visibility, the Pump Fun Volume Bot delivers consistent results. We've used it for three different tokens, and each time it's helped us achieve trending status. The team behind it clearly understands what DEX trackers look for.",
    rating: 4.5,
    avatar: "/avatars/cyber-16.svg",
    platform: {
      name: "G2",
      icon: <SiG2 className="h-5 w-5 text-[#FF492C]" />
    },
    delay: 0.4,
    shapeIndex: 5,
    emotion: EmotionIcons[2],
    highlight: "Pump Fun Volume Bot"
  },
  {
    name: "Mark Anderson",
    title: "Solana Volume Bot: SOL Volume Bot - Pump Fun Volume Bot",
    content: "The SOL Volume Bot platform provides exactly what new tokens need - strategic visibility. We gained 400+ new holders after trending on DEXScreener and Pump.Fun for just three days. The automated volume generation saved us countless hours.",
    rating: 5,
    avatar: "/avatars/cyber-17.svg",
    platform: {
      name: "Reddit",
      icon: <FaRedditAlien className="h-5 w-5 text-[#FF4500]" />
    },
    delay: 0.2,
    shapeIndex: 0,
    emotion: EmotionIcons[1],
    highlight: "SOL Volume Bot platform"
  },
  {
    name: "Christopher Wilson",
    title: "Solana Volume Bot: SOL Volume Bot - Pump Fun Volume Bot",
    content: "As someone who analyzes token performance, I can confirm that the Solana Volume Bot creates genuinely convincing trading patterns. The volume looks natural, avoids detection, and consistently helps tokens maintain visibility on key platforms.",
    rating: 5,
    avatar: "/avatars/cyber-18.svg",
    platform: {
      name: "Discord",
      icon: <FaDiscord className="h-5 w-5 text-[#5865F2]" />
    },
    delay: 0.3,
    shapeIndex: 1,
    emotion: EmotionIcons[0],
    highlight: "Solana Volume Bot"
  },
  {
    name: "Brian Thomas",
    title: "Solana Volume Bot: SOL Volume Bot - Pump Fun Volume Bot",
    content: "The Pump Fun Trending Bot exceeded our expectations. Within days of implementing it, our token was trending on all major DEX platforms. The increased visibility brought in genuine traders and our community grew by over 200% in just two weeks.",
    rating: 5,
    avatar: "/avatars/cyber-19.svg",
    platform: {
      name: "Telegram",
      icon: <FaTelegram className="h-5 w-5 text-[#26A5E4]" />
    },
    delay: 0.4,
    shapeIndex: 2,
    emotion: EmotionIcons[4],
    highlight: "Pump Fun Trending Bot"
  },
  {
    name: "Michael Wright",
    title: "Solana Volume Bot: SOL Volume Bot - Pump Fun Volume Bot",
    content: "The DEXTools Volume Bot from Solana Volume Bot is engineered perfectly for token visibility. After enabling it, our trading metrics improved significantly and DEXTools started featuring our token in the trending section. The technical implementation is impressive.",
    rating: 5,
    avatar: "/avatars/cyber-1.svg",
    platform: {
      name: "Discord",
      icon: <FaDiscord className="h-5 w-5 text-[#5865F2]" />
    },
    delay: 0.2,
    shapeIndex: 3,
    emotion: EmotionIcons[1],
    highlight: "DEXTools Volume Bot from Solana Volume Bot",
    verified: true
  },
  {
    name: "Eric Sullivan",
    title: "Solana Volume Bot: SOL Volume Bot - Pump Fun Volume Bot",
    content: "The SOL Volume Bot delivers exactly what it promises - visibility and trending status. Our meme coin started trending on Pump.Fun within 36 hours of activating the service. The price impact was minimal while visibility increased dramatically.",
    rating: 5,
    avatar: "/avatars/cyber-2.svg",
    platform: {
      name: "Trustpilot",
      icon: <SiTrustpilot className="h-5 w-5 text-[#00b67a]" />
    },
    delay: 0.3,
    shapeIndex: 4,
    emotion: EmotionIcons[2],
    highlight: "SOL Volume Bot"
  },
  {
    name: "Justin Harrison",
    title: "Solana Volume Bot: SOL Volume Bot - Pump Fun Volume Bot",
    content: "If visibility is your goal, Pump Fun Trending Bot is the perfect solution. We implemented it for our Solana token launch and immediately saw results. The natural-looking volume distribution is what makes this service stand out from others.",
    rating: 4.5,
    avatar: "/avatars/cyber-3.svg",
    platform: {
      name: "G2",
      icon: <SiG2 className="h-5 w-5 text-[#FF492C]" />
    },
    delay: 0.4,
    shapeIndex: 5,
    emotion: EmotionIcons[3],
    highlight: "Pump Fun Trending Bot"
  },
  {
    name: "Alan Morris",
    title: "Solana Volume Bot: SOL Volume Bot - Pump Fun Volume Bot",
    content: "I've used multiple volume services, but the Solana Volume Bot outperforms them all in terms of results and safety. The ability to precisely target DEXScreener, Pump.Fun and DEXTools simultaneously is invaluable for any serious token project.",
    rating: 5,
    avatar: "/avatars/cyber-4.svg",
    platform: {
      name: "Reddit",
      icon: <FaRedditAlien className="h-5 w-5 text-[#FF4500]" />
    },
    delay: 0.2,
    shapeIndex: 0,
    emotion: EmotionIcons[0],
    highlight: "Solana Volume Bot",
    verified: true
  }
];

// Star rating component
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center text-amber-400">
      {[...Array(5)].map((_, i) => {
        if (i < Math.floor(rating)) {
          return <FaStar key={i} className="w-4 h-4" />;
        } else if (i === Math.floor(rating) && rating % 1 !== 0) {
          return <FaStarHalf key={i} className="w-4 h-4" />;
        } else {
          return <FaStar key={i} className="w-4 h-4 text-gray-600" />;
        }
      })}
      <span className="ml-2 text-white font-medium">{rating.toFixed(1)}</span>
    </div>
  );
}

// Optimized Cyberpunk Avatar Component using local SVG files
const OptimizedCyberpunkAvatar = ({ 
  avatarUrl, 
  color = "#14F195",
  name 
}: { 
  avatarUrl: string; 
  color?: string;
  name: string;
}) => {
  const [imgError, setImgError] = useState(false);
  
  // Create initials from the name
  const getInitials = (name: string) => {
    return name.split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };
  
  const initials = getInitials(name);
  
  return (
    <div 
      className="w-full h-full relative rounded-full overflow-hidden"
      style={{
        boxShadow: `0 0 20px ${color}88, inset 0 0 10px ${color}88`,
        border: `2px solid ${color}`
      }}
    >
      {!imgError ? (
        <img 
          src={avatarUrl} 
          alt={name}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center bg-gray-800"
          style={{ backgroundColor: `${color}22` }}
        >
          <span className="text-xl font-bold" style={{ color }}>{initials}</span>
        </div>
      )}
      
      {/* Cyberpunk scanning effect */}
      <div 
        className="absolute inset-0 animate-scan"
        style={{
          background: `linear-gradient(to bottom, transparent 0%, ${color}44 50%, transparent 100%)`,
          backgroundSize: '100% 200%',
          animation: 'scan 3s linear infinite'
        }}
      ></div>
    </div>
  );
};

// Cyberpunk Avatar Card
const OptimizedCyberpunkAvatarCard = ({ 
  review, 
  index 
}: { 
  review: ReviewData; 
  index: number;
}) => {
  const color = AVATAR_COLORS[index % AVATAR_COLORS.length];
  
  return (
    <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-4">
      <div 
        className="w-full h-full rounded-lg overflow-hidden backdrop-blur-sm relative"
        style={{
          background: `radial-gradient(circle at center, ${color}22, #00000088)`,
          boxShadow: `0 0 15px ${color}44`
        }}
      >
        <OptimizedCyberpunkAvatar avatarUrl={review.avatar} color={color} name={review.name} />
        
        {/* Glowing scan line effect */}
        <div 
          className="absolute top-0 left-0 w-full h-2 animate-scanline"
          style={{
            background: `linear-gradient(to right, transparent, ${color}, transparent)`,
            animation: 'scanline 2s linear infinite'
          }}
        ></div>
      </div>
      
      {/* Badge for verified status */}
      {review.verified && (
        <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-[#14F195] to-[#9945FF] p-1 rounded-full">
          <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
          </svg>
        </div>
      )}
    </div>
  );
};

export function OptimizedCyberpunkReviewsSection() {
  const [focusedReview, setFocusedReview] = useState<number | null>(null);
  const [visibleReviews, setVisibleReviews] = useState(6); // Show 6 by default
  const [loadingMore, setLoadingMore] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Optimize animation settings based on device
  const animationSettings = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: isMobile ? "-50px" : "-100px" },
    transition: { 
      duration: isMobile ? 0.3 : 0.5,
      ease: "easeOut"
    }
  };

  // JSON-LD structured data for SEO
  const reviewsJsonLd = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Solana Volume Bot",
      "description": "Advanced volume generation bot for Solana tokens",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "197",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": reviews.slice(0, visibleReviews).map(review => ({
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": review.rating,
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": review.name
        },
        "reviewBody": review.content,
        "publisher": {
          "@type": "Organization",
          "name": review.platform.name
        }
      }))
    };
  }, [visibleReviews]);

  // Simulate loading more reviews
  const handleLoadMore = () => {
    setLoadingMore(true);
    // Simulate loading delay
    setTimeout(() => {
      setVisibleReviews(reviews.length);
      setLoadingMore(false);
    }, 800);
  };

  return (
    <section id="reviews" className="py-24 relative overflow-hidden">
      {/* SEO-optimized JSON-LD structured data */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsJsonLd) }}
      />
      
      {/* Enhanced Cyberpunk Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary Solana-themed blobs */}
        <motion.div 
          className="absolute top-40 -left-20 w-96 h-96 bg-[#9945FF] rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.05, 0.12, 0.05],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute -bottom-20 right-10 w-80 h-80 bg-[#14F195] rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{ 
            scale: [1, 1.25, 1],
            opacity: [0.05, 0.15, 0.05],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{ 
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        />
        
        {/* Cyberpunk Grid Background - subtle */}
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(20,241,149,0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(20,241,149,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>
      
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge 
            className="mb-3 px-3 py-1 bg-transparent border border-[#14F195] text-[#14F195]"
          >
            TESTIMONIALS
          </Badge>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            What <span className="text-[#14F195]">Users</span> Are Saying
          </h2>
          
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover why trading teams and token projects trust our <a href="https://solanavolumebot.io" rel="dofollow" className="text-[#14F195] hover:underline">Sol Market Maker Bot</a> to enhance their market presence
          </p>
          
          {/* Rating platforms */}
          <div className="flex flex-wrap justify-center items-center gap-6 mt-8">
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <SiTrustpilot className="h-7 w-auto text-[#00b67a]" aria-label="Trustpilot" />
              <span className="ml-2 text-sm font-medium">4.9/5 (197 reviews)</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <SiG2 className="h-7 w-auto text-[#FF492C]" aria-label="G2" />
              <span className="ml-2 text-sm font-medium">4.8/5</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <SiProducthunt className="h-7 w-auto text-[#DA552F]" aria-label="Product Hunt" />
              <span className="ml-2 text-sm font-medium">4.7/5</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <FaDiscord className="h-7 w-auto text-[#5865F2]" aria-label="Discord" />
              <span className="ml-2 text-sm font-medium">4.8/5</span>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Reviews Grid with optimized cyberpunk avatars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.slice(0, visibleReviews).map((review, index) => (
            <motion.div
              key={index}
              {...animationSettings}
              onHoverStart={() => !isMobile && setFocusedReview(index)}
              onHoverEnd={() => !isMobile && setFocusedReview(null)}
              className="h-full"
              layout={!isMobile} // Disable layout animations on mobile
              style={{
                willChange: "transform, opacity",
                transform: "translateZ(0)"
              }}
            >
              <Card 
                className={`h-full cyberpunk-card glass-effect backdrop-blur-sm border-0 bg-black/20 transition-all duration-300 ${
                  focusedReview === index 
                    ? 'shadow-xl scale-[1.03] z-10' 
                    : (focusedReview !== null ? 'opacity-90 scale-[0.98]' : 'hover:shadow-lg')
                }`}
                style={{
                  borderTop: "1px solid rgba(20,241,149,0.1)",
                  borderLeft: "1px solid rgba(20,241,149,0.1)",
                  borderRight: "1px solid rgba(153,69,255,0.1)",
                  borderBottom: "1px solid rgba(153,69,255,0.1)",
                  boxShadow: focusedReview === index 
                    ? "0 10px 30px -10px rgba(20,241,149,0.3), 0 0 20px rgba(153,69,255,0.2)" 
                    : "0 8px 20px -8px rgba(0,0,0,0.3)"
                }}
              >
                {/* 3D Reflection effect */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1/3 pointer-events-none" 
                  style={{
                    background: "linear-gradient(to bottom, rgba(255,255,255,0.08), transparent)",
                    borderTopLeftRadius: "inherit",
                    borderTopRightRadius: "inherit",
                  }}
                />
                
                {/* Content */}
                <CardHeader className="pb-2">
                  <div className="flex flex-col items-center mb-2">
                    {/* Optimized Cyberpunk Avatar */}
                    <OptimizedCyberpunkAvatarCard review={review} index={index} />
                    
                    <h3 className="text-lg font-bold text-white">{review.name}</h3>
                    <p className="text-sm text-gray-400">{review.title}</p>
                  </div>
                </CardHeader>
                
                <CardContent className="py-2">
                  <p className="text-gray-300 relative">
                    <span className="absolute -left-2 -top-2 text-[#14F195] opacity-30 text-5xl">"</span>
                    <span className="relative z-10">
                      {/* Highlight key phrases */}
                      {review.content.split(review.highlight).map((part, i, arr) => (
                        i < arr.length - 1 ? (
                          <span key={i}>
                            {part}
                            <span className="font-semibold text-[#14F195]">{review.highlight}</span>
                          </span>
                        ) : part
                      ))}
                    </span>
                    <span className="absolute -right-2 bottom-0 text-[#14F195] opacity-30 text-5xl">"</span>
                  </p>
                </CardContent>
                
                <CardFooter className="flex justify-between items-center">
                  <div>
                    <StarRating rating={review.rating} />
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2">{review.emotion}</div>
                    {review.platform.icon}
                  </div>
                </CardFooter>
                
                {/* Cyberpunk corner accent */}
                <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden">
                  <div 
                    className="w-16 h-16 rotate-45 transform origin-bottom-left bg-gradient-to-r from-[#14F195] to-[#9945FF]"
                    style={{ 
                      position: 'absolute', 
                      top: '-8px', 
                      right: '-8px'
                    }}
                  />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Load More Button */}
        {visibleReviews < reviews.length && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mt-10"
          >
            <Button
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="bg-transparent border border-[#14F195] text-[#14F195] hover:bg-[#14F195]/10"
            >
              {loadingMore ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-[#14F195] mr-2" />
                  <span>Loading...</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <span>View More Reviews</span>
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              )}
            </Button>
          </motion.div>
        )}
        
        {/* CTA Section with Cyberpunk styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6 relative inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#14F195] to-[#9945FF]">
              Ready to boost your token's visibility?
            </span>
            <motion.div 
              className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#14F195] to-[#9945FF]"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.7 }}
            />
          </h3>
          
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Join the hundreds of satisfied clients who've seen significant increases using our <a href="https://solanavolumebot.io" rel="dofollow" className="text-[#9945FF] hover:underline">Pump Fun Volume Bot</a> for trading volume and market visibility
          </p>
          
          <div className="flex justify-center w-full">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="mx-auto"
            >
              <CtaButton
                variant="primary"
                size="lg"
                className="px-8 py-6 text-lg font-bold rounded-xl bg-gradient-to-r from-[#14F195] to-[#9945FF] text-black hover:opacity-90 transition-all"
                icon={<ArrowRight className="ml-2 h-5 w-5" />}
              >
                Start Your Free Trial with Solana Volume Bot
              </CtaButton>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Add the CSS animations for the cyberpunk effects */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes scan {
            0% { background-position: 0 -100%; }
            100% { background-position: 0 100%; }
          }
          
          @keyframes scanline {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }
          
          .animate-scan {
            animation: scan 3s linear infinite;
          }
          
          .animate-scanline {
            animation: scanline 2s linear infinite;
          }
        `
      }} />
    </section>
  );
}