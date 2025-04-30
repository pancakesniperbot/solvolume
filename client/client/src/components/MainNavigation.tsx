import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Home, 
  BarChart3, 
  LineChart, 
  Settings, 
  Info, 
  MessageSquare,
  HelpCircle,
  Phone,
  ChevronRight,
  Menu,
  X,
  Moon,
  Sun,
  Code,
  Wrench,
  Database,
  ChevronDown,
  LineChart as LiveAnalysisIcon,
  AlertTriangle,
  Zap,
  ShieldCheck,
  Bot,
  Sparkles
} from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { CtaButton } from "@/components/CtaButton";

export function MainNavigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  
  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);
  
  // Toggle theme handler
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  
  // Close mobile menu on link click
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };
  
  const scrollToSection = (sectionId: string) => {
    // First close the mobile menu
    handleLinkClick();
    
    // Small delay to allow the menu animation to complete
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        // Scroll to the section with offset for the fixed header
        const headerHeight = 80; // Approximate header height
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      } else {
        console.warn(`Section with ID "${sectionId}" not found`);
      }
    }, 300);
  };
  
  return (
    <>
      {/* Navigation Bar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-[#0c0c15]/95 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
                <img 
                  src="/logo.svg" 
                  alt="Solana Volume Bot" 
                  className="w-10 h-10 transition-transform hover:scale-110" 
                />
                <div className="font-bold text-xl hidden sm:block">
                  <span className="text-white">Solana</span>
                  <span className="text-[#14F195]">VolumeBot</span>
                </div>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-0.5">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-300 hover:text-white hover:bg-[#1e2035] px-2.5"
                onClick={() => scrollToSection("hero")}
              >
                <Home className="mr-1 h-4 w-4" /> Home
              </Button>
              <CtaButton 
                variant="ghost" 
                size="sm" 
                className="text-gray-300 hover:text-white hover:bg-[#1e2035] px-2.5"
                icon={<LineChart className="mr-1 h-4 w-4" />}
              >
                Try Now
              </CtaButton>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-300 hover:text-white hover:bg-[#1e2035] px-2.5"
                onClick={() => scrollToSection("reviews")}
              >
                <MessageSquare className="mr-1 h-4 w-4" /> Reviews
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-300 hover:text-white hover:bg-[#1e2035] px-2.5"
                onClick={() => scrollToSection("sentiment-analysis")}
              >
                <LineChart className="mr-1 h-4 w-4" /> Live Analysis
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-300 hover:text-white hover:bg-[#1e2035] px-2.5"
                onClick={() => scrollToSection("features")}
              >
                <BarChart3 className="mr-1 h-4 w-4" /> Features
              </Button>
              
              {/* Added Table of Contents menus to the main menu */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-300 hover:text-white hover:bg-[#1e2035] px-2.5"
                onClick={() => scrollToSection("tools")}
              >
                <Zap className="mr-1 h-4 w-4" /> Tools
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-300 hover:text-white hover:bg-[#1e2035] px-2.5"
                onClick={() => scrollToSection("api")}
              >
                <LineChart className="mr-1 h-4 w-4" /> API
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-300 hover:text-white hover:bg-[#1e2035] px-2.5"
                onClick={() => scrollToSection("faqs")}
              >
                <HelpCircle className="mr-1 h-4 w-4" /> FAQs
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-300 hover:text-white hover:bg-[#1e2035] px-2.5"
                onClick={() => scrollToSection("contact")}
              >
                <Phone className="mr-1 h-4 w-4" /> Contact
              </Button>
            </nav>
            
            {/* CTA Button & Mobile Menu Toggle */}
            <div className="flex items-center gap-2">
              <CtaButton 
                variant="primary" 
                size="sm" 
                className="hidden sm:flex"
                icon={<ChevronRight className="h-4 w-4 ml-1" />}
              >
                Start Free Trial
              </CtaButton>
              
              {/* Theme Toggle */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-300 hover:text-white" 
                onClick={toggleTheme}
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              
              {/* Mobile Menu Toggle */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden text-gray-300 hover:text-white" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </motion.header>
      
      {/* Mobile Menu */}
      <AnimateMobileMenu isOpen={mobileMenuOpen}>
        <div className="flex flex-col p-4 space-y-3">
          <button 
            className="w-full flex items-center justify-start text-white hover:bg-[#1e2035] p-3 rounded-md active:bg-[#2a2c48] touch-manipulation"
            onClick={() => scrollToSection("hero")}
            aria-label="Navigate to Home section"
          >
            <Home className="mr-3 h-5 w-5 text-[#14F195]" />
            <span className="text-base font-medium">Home</span>
          </button>
          
          <CtaButton 
            className="w-full flex items-center justify-start text-white hover:bg-[#1e2035] p-3 rounded-md active:bg-[#2a2c48] touch-manipulation"
            icon={<LineChart className="mr-3 h-5 w-5 text-[#14F195]" />}
            variant="ghost"
          >
            <span className="text-base font-medium">Try Now</span>
          </CtaButton>
          
          <button 
            className="w-full flex items-center justify-start text-white hover:bg-[#1e2035] p-3 rounded-md active:bg-[#2a2c48] touch-manipulation"
            onClick={() => scrollToSection("reviews")}
            aria-label="Navigate to Reviews section"
          >
            <MessageSquare className="mr-3 h-5 w-5 text-[#14F195]" />
            <span className="text-base font-medium">Reviews</span>
          </button>
          
          <button 
            className="w-full flex items-center justify-start text-white hover:bg-[#1e2035] p-3 rounded-md active:bg-[#2a2c48] touch-manipulation"
            onClick={() => scrollToSection("sentiment-analysis")}
            aria-label="Navigate to Live Analysis section"
          >
            <LiveAnalysisIcon className="mr-3 h-5 w-5 text-[#14F195]" />
            <span className="text-base font-medium">Live Analysis</span>
          </button>
          
          <button 
            className="w-full flex items-center justify-start text-white hover:bg-[#1e2035] p-3 rounded-md active:bg-[#2a2c48] touch-manipulation"
            onClick={() => scrollToSection("features")}
            aria-label="Navigate to Features section"
          >
            <BarChart3 className="mr-3 h-5 w-5 text-[#14F195]" />
            <span className="text-base font-medium">Features</span>
          </button>
          
          {/* Mobile Contents Submenu - Added all menus with the same icons */}
          <div className="pl-3 border-l-2 border-[#1e2035] mt-2 mb-2">
            <h3 className="text-xs uppercase text-gray-500 font-medium mb-3 pl-2">Additional Pages</h3>
            <div className="space-y-2">
              <button 
                className="w-full flex items-center justify-start text-white hover:bg-[#1e2035] p-3 rounded-md active:bg-[#2a2c48] touch-manipulation"
                onClick={() => scrollToSection("tools")}
                aria-label="Navigate to Tools section"
              >
                <Zap className="mr-3 h-5 w-5 text-[#9945FF]" />
                <span className="text-base font-medium">Tools</span>
              </button>
              
              <button 
                className="w-full flex items-center justify-start text-white hover:bg-[#1e2035] p-3 rounded-md active:bg-[#2a2c48] touch-manipulation"
                onClick={() => scrollToSection("api")}
                aria-label="Navigate to API section"
              >
                <LineChart className="mr-3 h-5 w-5 text-[#9945FF]" />
                <span className="text-base font-medium">API</span>
              </button>

              <button 
                className="w-full flex items-center justify-start text-white hover:bg-[#1e2035] p-3 rounded-md active:bg-[#2a2c48] touch-manipulation"
                onClick={() => scrollToSection("ai-assistant")}
                aria-label="Navigate to AI Advisor section"
              >
                <Bot className="mr-3 h-5 w-5 text-[#9945FF]" />
                <span className="text-base font-medium">AI Advisor</span>
              </button>
            </div>
          </div>
          
          <button 
            className="w-full flex items-center justify-start text-white hover:bg-[#1e2035] p-3 rounded-md active:bg-[#2a2c48] touch-manipulation"
            onClick={() => scrollToSection("faqs")}
            aria-label="Navigate to FAQs section"
          >
            <HelpCircle className="mr-3 h-5 w-5 text-[#14F195]" />
            <span className="text-base font-medium">FAQs</span>
          </button>
          
          <button 
            className="w-full flex items-center justify-start text-white hover:bg-[#1e2035] p-3 rounded-md active:bg-[#2a2c48] touch-manipulation"
            onClick={() => scrollToSection("contact")}
            aria-label="Navigate to Contact section"
          >
            <Phone className="mr-3 h-5 w-5 text-[#14F195]" />
            <span className="text-base font-medium">Contact</span>
          </button>
          
          <CtaButton 
            variant="primary"
            size="md"
            className="w-full mt-4 py-4"
            icon={<ChevronRight className="ml-2 h-5 w-5" />}
          >
            Start Free Trial
          </CtaButton>
        </div>
      </AnimateMobileMenu>
    </>
  );
}

function AnimateMobileMenu({ 
  isOpen, 
  children 
}: { 
  isOpen: boolean; 
  children: React.ReactNode 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{
        opacity: isOpen ? 1 : 0,
        height: isOpen ? "auto" : 0
      }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
        opacity: { duration: 0.15 }
      }}
      className={`md:hidden fixed top-16 left-0 right-0 bg-[#0c0c15]/95 backdrop-blur-md z-40 overflow-hidden border-b border-[#1e2035] ${
        isOpen ? "shadow-[0_10px_30px_rgba(0,0,0,0.3)]" : ""
      }`}
      style={{ 
        touchAction: "pan-y",
        WebkitOverflowScrolling: "touch",
        willChange: "opacity, height",
        transform: "translateZ(0)"
      }}
    >
      {children}
    </motion.div>
  );
}