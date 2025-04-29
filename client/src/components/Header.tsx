import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "./ui/button";
import { CtaButton } from "./CtaButton";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { 
  Menu, ChevronRight, Layers, DollarSign, Users, HelpCircle, 
  BarChart2, Zap, LineChart, Activity, Clock, Settings, Home,
  Code, ExternalLink, Sparkles, Lock
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "./ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { SiSolana } from "react-icons/si";

// Navigation links with scroll behavior
interface NavLinkProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  isNew?: boolean;
  onClick?: () => void;
}

const NavLink = ({ href, label, icon, isNew, onClick }: NavLinkProps) => {
  // Define custom click handler for Home link (/) or section links (#section)
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // For Home link - just scroll to top
    if (href === "/") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '/');
    } else {
      // For section links - scroll to section
      const targetId = href.replace(/.*\#/, '');
      const element = document.getElementById(targetId);
      
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update URL without page reload
        window.history.pushState(null, '', href);
      }
    }
    
    // Execute additional click handler if provided
    if (onClick) onClick();
  };
  
  return (
    <a 
      href={href} 
      onClick={handleClick}
      className="font-medium text-white hover:text-white transition-colors flex items-center gap-2 relative group"
      aria-label={label}
    >
      {icon && <span className="text-white/80 group-hover:text-white">{icon}</span>}
      {label}
      
      {isNew && (
        <Badge className="bg-[#9945FF] text-white text-[10px] py-0 px-1.5">NEW</Badge>
      )}
      
      <motion.span 
        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-full"
        initial={{ scaleX: 0, opacity: 0 }}
        whileHover={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
    </a>
  );
};

const NavLinks = ({ onClick }: { onClick?: () => void }) => (
  <>
    <NavLink href="/" label="Home" icon={<Home size={16} />} onClick={onClick} />
    <NavLink href="#features" label="Features" icon={<Zap size={16} />} onClick={onClick} />
    <NavLink href="#trending-platforms" label="Trending" icon={<LineChart size={16} />} onClick={onClick} />
    <NavLink href="#demo" label="Demo" icon={<Activity size={16} />} onClick={onClick} />
    <NavLink href="#sentiment" label="Coin Sentiment" icon={<BarChart2 size={16} />} onClick={onClick} />
    <NavLink href="#reviews" label="Reviews" icon={<Users size={16} />} isNew onClick={onClick} />
    <NavLink href="#pricing" label="Pricing" icon={<DollarSign size={16} />} onClick={onClick} />
    <NavLink href="#faq" label="FAQ" icon={<HelpCircle size={16} />} onClick={onClick} />
    
    <div className="relative group">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="font-medium text-white hover:text-white transition-all duration-200 flex items-center gap-2 relative group px-2 py-1 rounded-md hover:bg-[#1E1E2E]/20">
            <span className="text-white/80 group-hover:text-white transition-colors"><Code size={16} /></span>
            API
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 bg-[#14141E] border border-gray-800/50 backdrop-blur-md shadow-xl shadow-[#9945FF]/10 p-1">
          <DropdownMenuLabel className="text-[#14F195] font-bold">
            <div className="flex items-center">
              <Code className="h-4 w-4 mr-2 text-[#9945FF]" />
              Developer Resources
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gradient-to-r from-transparent via-[#14F195]/30 to-transparent my-1" />
          <DropdownMenuItem 
            className="hover:bg-[#1E1E2E] cursor-pointer group transition-all duration-200"
            onClick={() => {
              const resourcesSection = document.getElementById('resources');
              if (resourcesSection) {
                const apiTab = resourcesSection.querySelector('[value="api"]') as HTMLElement;
                if (apiTab) apiTab.click();
                resourcesSection.scrollIntoView({ behavior: 'smooth' });
                window.history.pushState(null, '', '#resources');
              }
            }}
          >
            <Sparkles className="h-4 w-4 mr-2 text-[#9945FF] group-hover:text-[#14F195] transition-colors" />
            <span className="group-hover:text-[#14F195] transition-colors">REST API</span>
            <span className="ml-auto opacity-60 text-xs">v2.0</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="hover:bg-[#1E1E2E] cursor-pointer group transition-all duration-200"
            onClick={() => {
              const resourcesSection = document.getElementById('resources');
              if (resourcesSection) {
                const documentationTab = resourcesSection.querySelector('[value="documentation"]') as HTMLElement;
                if (documentationTab) documentationTab.click();
                resourcesSection.scrollIntoView({ behavior: 'smooth' });
                window.history.pushState(null, '', '#resources');
              }
            }}
          >
            <Code className="h-4 w-4 mr-2 text-[#9945FF] group-hover:text-[#14F195] transition-colors" />
            <span className="group-hover:text-[#14F195] transition-colors">SDK Documentation</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-gradient-to-r from-transparent via-[#14F195]/30 to-transparent my-1" />
          <DropdownMenuItem 
            className="hover:bg-[#1E1E2E] cursor-pointer group transition-all duration-200"
            onClick={() => {
              const resourcesSection = document.getElementById('resources');
              if (resourcesSection) {
                const apiTab = resourcesSection.querySelector('[value="api"]') as HTMLElement;
                if (apiTab) apiTab.click();
                resourcesSection.scrollIntoView({ behavior: 'smooth' });
                window.history.pushState(null, '', '#resources');
              }
            }}
          >
            <Lock className="h-4 w-4 mr-2 text-[#9945FF] group-hover:text-[#14F195] transition-colors" />
            <span className="group-hover:text-[#14F195] transition-colors">Authentication</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="hover:bg-[#1E1E2E] cursor-pointer group transition-all duration-200"
            onClick={() => {
              const resourcesSection = document.getElementById('resources');
              if (resourcesSection) {
                const tutorialsTab = resourcesSection.querySelector('[value="tutorials"]') as HTMLElement;
                if (tutorialsTab) tutorialsTab.click();
                resourcesSection.scrollIntoView({ behavior: 'smooth' });
                window.history.pushState(null, '', '#resources');
              }
            }}
          >
            <ExternalLink className="h-4 w-4 mr-2 text-[#9945FF] group-hover:text-[#14F195] transition-colors" />
            <span className="group-hover:text-[#14F195] transition-colors">Bot Integration Guide</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <motion.span 
        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-full"
        initial={{ scaleX: 0, opacity: 0 }}
        whileHover={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  </>
);

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  
  // Handle scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when clicking a link
  const handleMobileNavClick = () => {
    setOpen(false);
  };

  return (
    <motion.header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <motion.div 
              className="h-10 w-10 rounded-full bg-gradient-to-r from-[#9945FF] to-[#14F195] flex items-center justify-center mr-3 overflow-hidden"
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
              style={{ boxShadow: "0 0 15px rgba(153,69,255,0.5)" }}
            >
              <SiSolana className="w-6 h-6 text-black" />
            </motion.div>
            
            <a href="/" onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              window.history.pushState(null, '', '/');
            }}>
              <motion.div 
                className="flex items-center"
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="text-xl font-bold cursor-pointer bg-clip-text text-transparent bg-gradient-to-r from-[#14F195] to-[#9945FF]">Solana Volume Bot</span>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-[#14F195]/10 text-[#14F195]"
                >
                  v2.0
                </motion.div>
              </motion.div>
            </a>
          </div>

          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex space-x-8">
              <NavLinks />
            </nav>

            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:block"
              >
                <CtaButton 
                  variant="primary"
                  size="md"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#14F195] to-[#9945FF] text-black hover:opacity-90 transition-all font-semibold"
                  icon={<ChevronRight className="ml-1 h-4 w-4" />}
                >
                  Start Free Trial
                </CtaButton>
              </motion.div>

              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild className="block md:hidden">
                  <Button variant="ghost" size="icon" aria-label="Menu">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                  <div className="py-6 flex flex-col h-full">
                    <div className="flex items-center mb-8">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#9945FF] to-[#14F195] flex items-center justify-center mr-3"
                           style={{ boxShadow: "0 0 15px rgba(153,69,255,0.5)" }}>
                        <SiSolana className="w-6 h-6 text-black" />
                      </div>
                      <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#14F195] to-[#9945FF]">Solana Volume Bot</span>
                    </div>
                    
                    {/* 3D Decorated Divider */}
                    <div className="relative h-px w-full mb-6 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#14F195]/30 to-transparent"></div>
                      <div className="absolute h-px w-16 bg-[#14F195] left-1/2 transform -translate-x-1/2 blur-[1px]"></div>
                    </div>
                    
                    <nav className="flex flex-col space-y-6">
                      <NavLinks onClick={handleMobileNavClick} />
                    </nav>
                    
                    {/* API Resources Section in Mobile Menu */}
                    <div className="mt-6 mb-6">
                      <div className="text-sm text-[#14F195] font-medium flex items-center mb-2">
                        <Code size={14} className="mr-2" />
                        Developer Resources

                      </div>
                      <div className="space-y-2">
                        <a 
                          href="#resources" 
                          className="text-sm text-white hover:text-white pl-6 flex items-center group transition-all duration-200 hover:bg-[#1E1E2E]/30 py-1.5 px-2 rounded"
                          onClick={(e) => {
                            e.preventDefault();
                            setOpen(false);
                            const resourcesSection = document.getElementById('resources');
                            if (resourcesSection) {
                              const apiTab = resourcesSection.querySelector('[value="api"]') as HTMLElement;
                              if (apiTab) apiTab.click();
                              resourcesSection.scrollIntoView({ behavior: 'smooth' });
                              window.history.pushState(null, '', '#resources');
                            }
                          }}
                        >
                          <Sparkles className="h-3.5 w-3.5 mr-2 text-[#9945FF] group-hover:text-[#14F195] transition-colors" />
                          <span>REST API</span>
                          <span className="ml-auto opacity-60 text-xs">v2.0</span>
                        </a>
                        <a 
                          href="#resources" 
                          className="text-sm text-white hover:text-white pl-6 flex items-center group transition-all duration-200 hover:bg-[#1E1E2E]/30 py-1.5 px-2 rounded"
                          onClick={(e) => {
                            e.preventDefault();
                            setOpen(false);
                            const resourcesSection = document.getElementById('resources');
                            if (resourcesSection) {
                              const documentationTab = resourcesSection.querySelector('[value="documentation"]') as HTMLElement;
                              if (documentationTab) documentationTab.click();
                              resourcesSection.scrollIntoView({ behavior: 'smooth' });
                              window.history.pushState(null, '', '#resources');
                            }
                          }}
                        >
                          <Code className="h-3.5 w-3.5 mr-2 text-[#9945FF] group-hover:text-[#14F195] transition-colors" />
                          <span>SDK Documentation</span>
                        </a>
                        <a 
                          href="#resources" 
                          className="text-sm text-white hover:text-white pl-6 flex items-center group transition-all duration-200 hover:bg-[#1E1E2E]/30 py-1.5 px-2 rounded"
                          onClick={(e) => {
                            e.preventDefault();
                            setOpen(false);
                            const resourcesSection = document.getElementById('resources');
                            if (resourcesSection) {
                              const apiTab = resourcesSection.querySelector('[value="api"]') as HTMLElement;
                              if (apiTab) apiTab.click();
                              resourcesSection.scrollIntoView({ behavior: 'smooth' });
                              window.history.pushState(null, '', '#resources');
                            }
                          }}
                        >
                          <Lock className="h-3.5 w-3.5 mr-2 text-[#9945FF] group-hover:text-[#14F195] transition-colors" />
                          <span>Authentication</span>
                        </a>
                        <a 
                          href="#resources" 
                          className="text-sm text-white hover:text-white pl-6 flex items-center group transition-all duration-200 hover:bg-[#1E1E2E]/30 py-1.5 px-2 rounded"
                          onClick={(e) => {
                            e.preventDefault();
                            setOpen(false);
                            const resourcesSection = document.getElementById('resources');
                            if (resourcesSection) {
                              const tutorialsTab = resourcesSection.querySelector('[value="tutorials"]') as HTMLElement;
                              if (tutorialsTab) tutorialsTab.click();
                              resourcesSection.scrollIntoView({ behavior: 'smooth' });
                              window.history.pushState(null, '', '#resources');
                            }
                          }}
                        >
                          <ExternalLink className="h-3.5 w-3.5 mr-2 text-[#9945FF] group-hover:text-[#14F195] transition-colors" />
                          <span>Bot Integration Guide</span>
                        </a>
                      </div>
                    </div>

                    <div className="mt-auto pt-6 border-t border-gray-800/30">
                      <div className="mb-4 p-3 rounded-lg bg-[#14141E] border border-gray-800/50">
                        <div className="text-sm text-[#14F195] mb-2 font-medium">Ready to boost your token?</div>
                        <div className="text-xs text-white/80 mb-3">
                          Our volume bot works effectively to get your coin trending on major DEX platforms
                        </div>
                      </div>
                      
                      <CtaButton 
                        variant="primary"
                        size="md"
                        className="w-full rounded-lg bg-gradient-to-r from-[#14F195] to-[#9945FF] text-black hover:opacity-90 transition-all font-semibold"
                        icon={<ChevronRight className="ml-1 h-4 w-4" />}
                      >
                        Start Free Trial
                      </CtaButton>
                      
                      <div className="mt-4 text-center text-sm text-white/70">
                        No credit card required
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
      
      {/* SEO optimization - Adding structured data for organization */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Solana Volume Bot",
          "url": "https://solanavolumebot.io",
          "logo": "https://solanavolumebot.io/logo.png",
          "description": "Advanced Solana volume generation bot to increase token visibility on Pump.Fun, DEXTools, and DEXScreener"
        })
      }} />

      {/* Add CSS for button highlight animation */}
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Hero CTA Button Highlight Animation */
          @keyframes cta-pulse {
            0% { transform: scale(1); box-shadow: 0 0 0 rgba(20, 241, 149, 0); }
            30% { transform: scale(1.05); box-shadow: 0 0 20px rgba(153, 69, 255, 0.7); }
            70% { transform: scale(1.02); box-shadow: 0 0 10px rgba(20, 241, 149, 0.5); }
            100% { transform: scale(1); box-shadow: 0 0 0 rgba(20, 241, 149, 0); }
          }
          .hero-cta-highlight {
            animation: cta-pulse 1.5s ease 3;
          }
        `
      }} />
    </motion.header>
  );
}