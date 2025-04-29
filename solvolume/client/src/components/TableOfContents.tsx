import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  BarChart3, 
  MessageSquare, 
  Info, 
  HelpCircle, 
  Phone,
  LineChart,
  ChevronRight,
  Activity,
  Zap,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Bot,
  Sparkles,
  X
} from "lucide-react";

interface Section {
  id: string;
  label: string;
  icon: React.ReactNode;
  subsections?: {
    id: string;
    label: string;
  }[];
}

interface TableOfContentsProps {
  isVisible?: boolean;
  onClose?: () => void;
}

export function TableOfContents({ isVisible = false, onClose }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState<string>("hero");
  
  // Create a fixed-position modal when isVisible is true
  if (!isVisible) return null;
  
  // Define sections with IDs that match the HTML element IDs in your content
  const sections: Section[] = [
    {
      id: "hero",
      label: "Home",
      icon: <Home className="h-4 w-4" />
    },
    {
      id: "demo",
      label: "Try Now",
      icon: <LineChart className="h-4 w-4" />
    },
    {
      id: "ai-assistant",
      label: "AI Volume Advisor",
      icon: <Bot className="h-4 w-4 text-[#9945FF]" />
    },
    {
      id: "about",
      label: "About Us",
      icon: <Info className="h-4 w-4" />
    },
    {
      id: "reviews",
      label: "Reviews",
      icon: <MessageSquare className="h-4 w-4" />
    },
    {
      id: "features",
      label: "Key Features",
      icon: <BarChart3 className="h-4 w-4" />,
      subsections: [
        { id: "volume-tools", label: "Volume Tools" },
        { id: "sentiment-analysis", label: "Sentiment Analysis" },
        { id: "dex-tracker", label: "DEX Tracker" },
        { id: "ai-powered", label: "AI Insights" }
      ]
    },
    {
      id: "tools",
      label: "Tools",
      icon: <Zap className="h-4 w-4" />
    },
    {
      id: "api",
      label: "API",
      icon: <LineChart className="h-4 w-4" />
    },
    {
      id: "security",
      label: "Security Features",
      icon: <ShieldCheck className="h-4 w-4" />
    },
    {
      id: "faqs",
      label: "FAQs",
      icon: <HelpCircle className="h-4 w-4" />
    },
    {
      id: "contact",
      label: "Contact",
      icon: <Phone className="h-4 w-4" />
    }
  ];
  
  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset to trigger section change a bit earlier
      
      // Find all section elements
      const sectionElements = sections
        .map(section => {
          const element = document.getElementById(section.id);
          return element 
            ? { 
                id: section.id, 
                offsetTop: element.offsetTop, 
                offsetHeight: element.offsetHeight 
              } 
            : null;
        })
        .filter(Boolean);
      
      // Find the current active section
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section && scrollPosition >= section.offsetTop) {
          setActiveSection(section.id);
          break;
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);
  
  // Handle clicking on a section
  const handleSectionClick = (sectionId: string) => {
    // First close the popup for better UX
    if (onClose) {
      onClose();
    }
    
    // Then scroll after a small delay to ensure the target is found correctly
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        const offsetTop = section.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: offsetTop - 100, // Account for navbar
          behavior: "smooth"
        });
      } else {
        console.log(`Could not find element with id: ${sectionId}`);
      }
    }, 50);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        className="bg-gradient-to-br from-[#0c0c15] to-[#14142b] border border-[#14F195]/30 rounded-xl shadow-[0_8px_32px_rgba(20,241,149,0.15)] max-w-md w-full max-h-[80vh] overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#14F195] to-[#9945FF]">
              {/* "Table of Contents" text removed as requested */}
            </h3>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#14F195]/10 text-white/80 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="max-h-[60vh] overflow-y-auto pr-1 my-2">
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => handleSectionClick(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center gap-2 transition-all duration-200 ${
                      activeSection === section.id
                        ? "bg-gradient-to-r from-[#14F195]/20 to-[#9945FF]/10 text-white border-l-2 border-[#14F195]"
                        : "text-gray-400 hover:text-white hover:bg-[#1e2035]/50 border-l-2 border-transparent"
                    }`}
                  >
                    <div className={activeSection === section.id ? "text-[#14F195]" : ""}>
                      {section.icon}
                    </div>
                    <span>{section.label}</span>
                    {activeSection === section.id && (
                      <div className="ml-auto">
                        <ChevronRight className="h-3 w-3 text-[#14F195]" />
                      </div>
                    )}
                  </button>
                  
                  {/* Subsections */}
                  {section.subsections && (
                    <ul className="pl-6 mt-1 space-y-1">
                      {section.subsections.map((subsection) => (
                        <li key={subsection.id}>
                          <button
                            onClick={() => handleSectionClick(subsection.id)}
                            className="w-full text-left px-3 py-1.5 rounded-md text-xs flex items-center gap-1.5 text-gray-400 hover:text-white hover:bg-[#1e2035]/50 transition-all duration-200"
                          >
                            <Sparkles className="h-3 w-3 text-[#9945FF]" />
                            <span>{subsection.label}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}