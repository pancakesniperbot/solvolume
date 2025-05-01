import { Helmet } from "react-helmet";
import { motion, AnimatePresence } from "framer-motion";
import { FeaturesSection } from "@/components/FeaturesSection";
import { StatsSection } from "@/components/StatsSection";
import { OptimizedCyberpunkReviewsSection } from "@/components/OptimizedCyberpunkReviewsSection"; // Using optimized non-WebGL cyberpunk version
import { CyberpunkBackground } from "@/components/CyberpunkBackground";
import { PricingSection } from "@/components/PricingSection";
// Import the component that's actually exported
import { FaqSection } from "@/components/FaqSection";
import { MainNavigation } from "@/components/MainNavigation";
import { MainFooter } from "@/components/MainFooter";
import { SecurityFeaturesSection } from "@/components/SecurityFeaturesSection";
import { SEOMeta } from "@/components/SEOMeta";
import { defaultSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { SolanaHeroSection } from "@/components/SolanaHeroSection";
import { ThreeDHeroSection } from "@/components/3DHeroSection";
import { TrendingPlatformsSection } from "@/components/TrendingPlatformsSection";
import { SolanaDemoShowcase } from "@/components/SolanaDemoShowcase";
import { TableOfContents } from "@/components/TableOfContents";
import { AIAssistant } from "@/components/AIAssistant";
import AIVolumeAssistantPopup from "@/components/AIVolumeAssistantPopup";
import { Bot, List, Cpu } from "lucide-react";
import { useState, useRef } from "react";
import { ContactSection } from "@/components/ContactSection";
import { ToolsSection } from "@/components/ToolsSection";
import { ApiSection } from "@/components/ApiSection";
import { LegalPopup } from "@/components/LegalPopup";
import { LegalSections } from "@/components/LegalSections";
import { ResourcesSection } from "@/components/ResourcesSection";
import { SimpleSolanaMascot } from "@/components/SimpleSolanaMascot";
import { MemeCoinsIndicator } from "@/components/MemeCoinsIndicator";
import { LivePriceUpdates } from "@/components/LivePriceUpdates";
import { AITradingAssistant } from "@/components/AITradingAssistant";
import { FloatingNavbar } from "@/components/FloatingNavbar";
import { 
  ArrowRight, Monitor, Shield, Wallet, TrendingUp
} from "lucide-react";
import { SiSolana } from "react-icons/si";
// CornerMascot component removed as per user request

// Import feature content for modals
import { FeatureDetailModal } from "@/components/FeatureDetailModal";
import { 
  volumeGenerationContent,
  realTimeMonitoringContent,
  antiDetectionContent,
  multiWalletContent
} from "@/lib/featureDetailsContent";

// Animated features section with 3D cards
const SolanaFeaturesSection = () => {
  // State for tracking which feature's modal is open
  const [activeFeatureModal, setActiveFeatureModal] = useState<string | null>(null);

  const features: {
    icon: React.ReactNode;
    title: string;
    description: string;
    gradientFrom: string;
    gradientTo: string;
    modalContent: any;
  }[] = [
    {
      icon: <TrendingUp className="h-10 w-10 text-white" />,
      title: "Solana Volume Bot: SOL Volume Bot - Pump Fun Volume Bot",
      description: "Create organic-looking trading volume with distributed buy and sell orders to get noticed on DEXTools",
      gradientFrom: "#9945FF",
      gradientTo: "#14F195",
      modalContent: volumeGenerationContent
    },
    {
      icon: <Monitor className="h-10 w-10 text-white" />,
      title: "Solana Volume Bot: SOL Volume Bot - Pump Fun Volume Bot",
      description: "Track your token's performance across all major DEX platforms with real-time analytics",
      gradientFrom: "#14F195",
      gradientTo: "#03E1FF",
      modalContent: realTimeMonitoringContent
    },
    {
      icon: <Shield className="h-10 w-10 text-white" />,
      title: "Solana Volume Bot: SOL Volume Bot - Pump Fun Volume Bot",
      description: "Our advanced algorithms create natural trading patterns that avoid detection by monitoring systems",
      gradientFrom: "#03E1FF",
      gradientTo: "#DC1FFF",
      modalContent: antiDetectionContent
    },
    {
      icon: <Wallet className="h-10 w-10 text-white" />,
      title: "Solana Volume Bot: SOL Volume Bot - Pump Fun Volume Bot",
      description: "Connect multiple wallets to create realistic distributed trading activity across the blockchain",
      gradientFrom: "#DC1FFF",
      gradientTo: "#9945FF",
      modalContent: multiWalletContent
    }
  ];

  // Handle opening a specific feature modal
  const openFeatureModal = (title: string) => {
    setActiveFeatureModal(title);
  };

  // Handle closing the feature modal
  const closeFeatureModal = () => {
    setActiveFeatureModal(null);
  };

  // Find the active feature for the modal
  const activeFeature = features.find(feature => feature.title === activeFeatureModal);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Cyberpunk background */}
      <CyberpunkBackground variant="dark" withGrid withNoise withGlitch />
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-4 text-white">
            Powerful <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#14F195] to-[#9945FF]">Features</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Our advanced toolkit gives you everything you need to boost your Solana token's visibility on major tracking platforms
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.2 }
              }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A25] to-[#0D0D15] rounded-xl transform group-hover:scale-[1.02] transition-transform duration-300"></div>
              <div className="absolute inset-[1px] bg-[#0F0F17] rounded-[10px] z-10"></div>

              {/* Glow effect on hover */}
              <div 
                className="absolute -inset-0.5 bg-gradient-to-r rounded-xl opacity-0 group-hover:opacity-70 blur-md transition-opacity duration-300 z-0"
                style={{ 
                  backgroundImage: `linear-gradient(to right, ${feature.gradientFrom}, ${feature.gradientTo})` 
                }}
              ></div>

              <div className="relative z-20 p-6 h-full flex flex-col">
                <div 
                  className="w-16 h-16 rounded-lg flex items-center justify-center mb-5"
                  style={{ 
                    backgroundImage: `linear-gradient(135deg, ${feature.gradientFrom}, ${feature.gradientTo})` 
                  }}
                >
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>

                <p className="text-gray-400 mb-4 flex-grow">{feature.description}</p>

                <button 
                  onClick={() => openFeatureModal(feature.title)}
                  className="flex items-center text-[#14F195] text-sm font-medium cursor-pointer"
                  style={{ color: feature.gradientTo }}
                  aria-label={`Learn more about ${feature.title}`}
                >
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Feature Detail Modal */}
        {activeFeature && (
          <FeatureDetailModal
            isOpen={!!activeFeatureModal}
            onClose={closeFeatureModal}
            content={{
              title: activeFeature.title,
              description: activeFeature.modalContent.description,
              icon: activeFeature.icon,
            }}
          />
        )}
      </div>
    </section>
  );
};


export default function Home() {
  // State for legal popups
  const [legalPopup, setLegalPopup] = useState<{
    isOpen: boolean;
    type: 'terms' | 'privacy' | 'disclaimer' | 'dmca';
  }>({
    isOpen: false,
    type: 'terms'
  });
  
  // Function to scroll to section
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  // State for AI Volume Assistant popup
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  
  // State for Table of Contents
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);
  
  // Ref for pricing CTA section
  const pricingRef = useRef<HTMLDivElement>(null);
  
  // Function to open legal popup
  const openLegalPopup = (type: 'terms' | 'privacy' | 'disclaimer' | 'dmca') => {
    setLegalPopup({
      isOpen: true,
      type
    });
  };

  // Function to close legal popup
  const closeLegalPopup = () => {
    setLegalPopup(prev => ({
      ...prev,
      isOpen: false
    }));
  };
  
  // Function to handle game end - highlight CTA
  const handleGameEnd = () => {
    // Add a subtle highlight to the pricing section
    if (pricingRef.current) {
      pricingRef.current.classList.add('highlight-section');
      
      // Remove highlight class after animation completes
      setTimeout(() => {
        if (pricingRef.current) {
          pricingRef.current.classList.remove('highlight-section');
        }
      }, 2000);
    }
  };
  
  // Function to scroll to CTA
  const scrollToCTA = () => {
    if (pricingRef.current) {
      pricingRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  return (
    <>
      <SEOMeta 
        title="Solana Volume Bot: SOL Volume Bot - Pump Fun Volume Bot"
        description={defaultSEO.description}
        keywords={defaultSEO.keywords}
        ogImage={defaultSEO.ogImage}
        ogUrl={defaultSEO.ogUrl}
        canonicalUrl={defaultSEO.canonicalUrl}
      />
      <div className="flex flex-col min-h-screen">
        <MainNavigation />
        <main className="flex-1" role="main" aria-label="Solana Volume Bot features and information">
          {/* A.I. Volume Bot Help Assistant Popup */}
          <AnimatePresence>
            {isAIAssistantOpen && (
              <AIVolumeAssistantPopup
                isOpen={isAIAssistantOpen}
                onClose={() => setIsAIAssistantOpen(false)}
              />
            )}
          </AnimatePresence>
          
          {/* Table of Contents Popup */}
          <AnimatePresence>
            {isTableOfContentsOpen && (
              <TableOfContents
                isVisible={isTableOfContentsOpen}
                onClose={() => setIsTableOfContentsOpen(false)}
              />
            )}
          </AnimatePresence>
          
          {/* Solana Mascot */}
          <SimpleSolanaMascot 
            position="bottom-right"
            ctaText="Start Free Trial"
            autoHide={false}
            marketSentiment="bullish"
          />
          
          {/* A.I. Assistant - Removed to prevent duplicates and CPU usage issues */}
          
          {/* New 3D-style Hero Section */}
          <div id="hero">
            <ThreeDHeroSection />
          </div>
          
          {/* Trending Platforms Section */}
          <div id="trending-platforms">
            <TrendingPlatformsSection />
          </div>

          {/* Features Section with 3D cards */}
          <div id="features">
            <SolanaFeaturesSection />
          </div>

          {/* Demo Showcase Section */}
          <div id="demo">
            <SolanaDemoShowcase />
          </div>

          {/* Removed Platform Showcase Section as requested */}

          {/* Tools Section Container */}
          <div id="tools">
            <ToolsSection />
          </div>
          
          {/* API Section */}
          <div id="api">
            <ApiSection />
          </div>

          {/* Sentiment Analysis & Tools Container */}
          <div id="sentiment-analysis">
            <section className="py-16 bg-[#0a0b14] relative overflow-hidden">
              <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold text-white mb-4" aria-label="Live Sentiment Analysis with Solana Volume Bot">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#14F195] to-[#9945FF]">
                      Live Sentiment Analysis
                    </span>
                  </h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    Professional market sentiment analysis tools for Solana tokens. Access transparent data on market sentiment, track price movements, and get data-driven DEX visibility insights.
                  </p>
                  <div className="mt-4 text-sm text-gray-500 max-w-2xl mx-auto">
                    <p>The Solana Volume Bot sentiment analysis tools provide real-time data from multiple DEX platforms including DEXTools, PUMP.FUN, and DEXScreener. All analyses follow transparent methodologies and use verifiable on-chain data.</p>
                  </div>
                </div>
                
                {/* Tools Navigation Removed Per User Request */}
                
                {/* Sentiment Tool */}
                <div id="sentiment-tool" className="mb-16">
                  <MemeCoinsIndicator />
                </div>
                
                {/* Live Price Updates */}
                <div id="price-tool" className="mb-16">
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">
                    Real-Time <span className="text-[#03E1FF]">Price Tracker</span>
                  </h3>
                  <div className="flex justify-center">
                    <LivePriceUpdates />
                  </div>
                </div>
                
                {/* A.I. Trading Help Assistant */}
                <div id="ai-assistant" className="mb-8">
                  <AITradingAssistant coins={[
                    {
                      id: '1',
                      name: 'BONK',
                      symbol: 'BONK',
                      price: 0.00002458,
                      change24h: 12.5,
                      sentiment: 78,
                      volume24h: 25000000,
                      color: '#F7931A'
                    },
                    {
                      id: '2',
                      name: 'WIF',
                      symbol: 'WIF',
                      price: 0.87,
                      change24h: 5.2,
                      sentiment: 65,
                      volume24h: 18000000,
                      color: '#627EEA'
                    },
                    {
                      id: '3',
                      name: 'POPCAT',
                      symbol: 'POPCAT',
                      price: 0.013,
                      change24h: -2.1,
                      sentiment: 42,
                      volume24h: 7500000,
                      color: '#FF007A'
                    },
                    {
                      id: '4',
                      name: 'BOOK',
                      symbol: 'BOOK',
                      price: 0.0035,
                      change24h: 8.7,
                      sentiment: 71,
                      volume24h: 12000000,
                      color: '#2775CA'
                    },
                    {
                      id: '5',
                      name: 'BOME',
                      symbol: 'BOME',
                      price: 0.000071,
                      change24h: -7.3,
                      sentiment: 34,
                      volume24h: 5800000,
                      color: '#26A17B'
                    }
                  ]} />
                </div>
              </div>
            </section>
          </div>
          
          {/* Reviews Section with 3D Cyberpunk Avatars (Optimized) */}
          <div id="reviews">
            <OptimizedCyberpunkReviewsSection />
          </div>

          {/* Pricing Section - with ref for game targeting */}
          <div id="pricing" ref={pricingRef}>
            <PricingSection />
          </div>

          {/* FAQ Section */}
          <div id="faqs">
            <FaqSection />
          </div>
          
          {/* Security Features Section */}
          <div id="security">
            <SecurityFeaturesSection />
          </div>

          {/* Resources Section with Documentation, API Reference, and Tutorials */}
          <div id="resources">
            <ResourcesSection />
          </div>

          {/* Contact Section with Social Media */}
          <div id="contact">
            <ContactSection />
          </div>

          {/* Legal Sections directly on landing page */}
          <div id="legal">
            <LegalSections />
          </div>
        </main>

        {/* Fixed navigation buttons container - better mobile experience with glassmorphism */}
        <div className="fixed z-40 flex flex-col gap-3 sm:gap-4 pointer-events-none">
          {/* Left-side Table of Contents button */}
          <div className="fixed bottom-6 left-6 pointer-events-auto">
            <motion.button 
              onClick={() => setIsTableOfContentsOpen(true)}
              className="flex items-center gap-2 bg-black/85 backdrop-blur-sm rounded-xl px-3 py-2.5 border border-[#14F195]/30 shadow-lg hover:shadow-[0_0_15px_rgba(20,241,149,0.3)] transition-all duration-300 group"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative w-5 h-5 flex items-center justify-center">
                <List className="h-4 w-4 text-[#14F195]" />
              </div>
              {/* "Table of Contents" text removed as requested */}
            </motion.button>
          </div>
          
          {/* Right-side AI Volume Assistant button - maximum z-index to guarantee top layer positioning */}
          <div className="fixed bottom-6 right-7 pointer-events-auto z-[999]">
            <motion.button 
              onClick={() => setIsAIAssistantOpen(true)}
              className="flex items-center gap-2 bg-black/85 backdrop-blur-sm rounded-xl px-3 py-2.5 border border-[#14F195]/30 shadow-lg hover:shadow-[0_0_15px_rgba(20,241,149,0.3)] transition-all duration-300 group"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative w-5 h-5 flex items-center justify-center">
                <Bot className="h-4 w-4 text-[#14F195] absolute animate-pulse" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#14F195] rounded-full animate-ping opacity-75"></div>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#14F195] rounded-full"></div>
              </div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14F195] to-[#9945FF] font-medium text-sm md:text-base hidden sm:inline">A.I. Volume Bot Help Assistant</span>
            </motion.button>
          </div>
        </div>

        {/* Footer with Legal Links */}
        <MainFooter />
      </div>

      {/* Dynamic Legal Popups */}
      <AnimatePresence>
        {legalPopup.isOpen && (
          <LegalPopup
            isOpen={legalPopup.isOpen}
            onClose={closeLegalPopup}
            contentType={legalPopup.type}
          />
        )}
      </AnimatePresence>
      
      {/* Popups are handled with AnimatePresence in the main section */}
      
      {/* Solana Mascot - shows only the pop-up box, black square and logo removed */}
      <SimpleSolanaMascot 
        position="bottom-right"
        ctaText="Start Free Trial"
        ctaLink="#pricing"
        hideHamburgerButton={true}
      />

      {/* SEO-Optimized Table of Contents (Hidden but parsed by search engines) */}
      <div className="sr-only">
        <h2>Solana Volume Bot - Table of Contents</h2>
        <p>
          The <a href="https://solanavolumebot.io" rel="dofollow">Solana Volume Bot</a> is an advanced tool for generating strategic 
          trading volume on Solana tokens, helping projects gain visibility 
          on major DEX trackers and attract serious traders and investors.
        </p>
        <ol>
          <li><a href="#hero">Introduction to Solana Volume Bot</a></li>
          <li><a href="#features">Key Features and Capabilities</a></li>
          <li><a href="#demo">Live Demo and Showcase</a></li>
          <li><a href="#sentiment">Real-time Meme Coin Sentiment Analysis</a></li>
          <li><a href="#reviews">User Testimonials and Reviews</a></li>
          <li><a href="#pricing">Pricing Plans and Packages</a></li>
          <li><a href="#faq">Frequently Asked Questions</a></li>
          <li><a href="#resources">Resources & Documentation</a></li>
          <li><a href="#contact">Contact Information</a></li>
          <li><a href="#legal">Legal Information (Terms, Privacy Policy & DMCA)</a></li>
        </ol>
      </div>

      {/* Performance optimizations - no external images needed anymore as we use SVGs */}

      {/* Resource hints for browsers */}
      <meta httpEquiv="x-dns-prefetch-control" content="on" />

      {/* Global SEO structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Solana Volume Bot - Advanced Volume Generator",
            "applicationCategory": "DeFiApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "499.00",
              "priceCurrency": "USD"
            },
            "description": "Advanced volume generation tool that gets your Solana token trending on major DEX trackers. Boost visibility with AI-powered trading patterns.",
            "keywords": "solana volume bot, DEX trackers, trading volume, token visibility, crypto trending, solana token, pump.fun, volume generation",
            "applicationSubCategory": "Blockchain",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://solanavolumebot.io"
            },
            "provider": {
              "@type": "Organization",
              "name": "Solana Volume Bot",
              "url": "https://solanavolumebot.io",
              "sameAs": [
                "https://twitter.com/solanavolumebot",
                "https://discord.gg/solanavolumebot",
                "https://t.me/solanavolumebot" 
              ]
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Solana Volume Bot",
            "description": "The #1 volume generation solution for Solana tokens. Make your token trend on DEXTools and PUMP.FUN with our advanced volume bot.",
            "brand": {
              "@type": "Brand",
              "name": "Sol Volume Bot"
            },
            "offers": [
              {
                "@type": "Offer",
                "name": "Starter Plan", 
                "price": "199.00",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              },
              {
                "@type": "Offer",
                "name": "Pro Plan",
                "price": "399.00",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              },
              {
                "@type": "Offer",
                "name": "Enterprise Plan",
                "price": "499.00", 
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              }
            ],
            "review": [
              {
                "@type": "Review",
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5"
                },
                "author": {
                  "@type": "Person",
                  "name": "Alex Thompson"
                },
                // removed date for anonymity
                "reviewBody": "The PUMP.FUN Trending Bot was a game-changer for our token launch. We went from zero visibility to trending on multiple DEX platforms within 48 hours."
              },
              {
                "@type": "Review",
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5"
                },
                "author": {
                  "@type": "Person",
                  "name": "Samantha Chen"
                },
                // removed date for anonymity
                "reviewBody": "We tried several solutions before finding the DEXTools Volume Bot. Nothing else comes close in terms of effectiveness and reliability. Our token has maintained consistent visibility for weeks."
              },
              {
                "@type": "Review",
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "4",
                  "bestRating": "5"
                },
                "author": {
                  "@type": "Person",
                  "name": "Michael Rodriguez"
                },
                // removed date for anonymity
                "reviewBody": "The Solana Volume Bot customer support team is excellent. They helped us optimize our settings to match our token's specific needs and market conditions."
              }
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "bestRating": "5",
              "worstRating": "1",
              "ratingCount": "149",
              "reviewCount": "149"
            }
          }
        ])
      }} />
    </>
  );
}