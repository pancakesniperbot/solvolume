import { 
  ExternalLink,
  Mail,
  Heart,
  ArrowUp,
  Shield,
  Building,
  MapPin,
  Phone,
  Clock,
  FileText,
  Award,
  CheckCircle,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  SiSolana,
  SiDiscord,
  SiTelegram,
  SiLinkedin,
  SiGithub
} from "react-icons/si";
import { FaTwitter } from "react-icons/fa";

/**
 * MainFooter component for the Solana Volume Bot website
 * YMYL compliant with enhanced trust indicators, complete contact information,
 * and proper accessibility features according to W3C standards
 */
export function MainFooter() {
  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  // Links with section IDs for navigation - enhanced with descriptive tooltips
  const sections = [
    { name: "Home", id: "hero", ariaLabel: "Go to homepage" },
    { name: "Try Now", id: "demo", ariaLabel: "Try the demo" },
    { name: "About Us", id: "about", ariaLabel: "Learn about our team" },
    { name: "Reviews", id: "reviews", ariaLabel: "Read customer reviews" },
    { name: "Features", id: "features", ariaLabel: "Explore platform features" },
    { name: "Tools", id: "tools", ariaLabel: "Discover our analytics tools" },
    { name: "API", id: "api", ariaLabel: "Learn about our API" },
    { name: "FAQs", id: "faqs", ariaLabel: "View frequently asked questions" },
    { name: "Contact", id: "contact", ariaLabel: "Contact our team" }
  ];
  
  // Handle section click with improved accessibility
  const handleSectionClick = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 100, // Account for navbar
        behavior: "smooth"
      });
      // Set focus to the section for accessibility
      section.setAttribute('tabindex', '-1');
      section.focus({ preventScroll: true });
    }
  };
  
  // No need for complex arrays - removed for performance
  
  // Current year for copyright notice
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative bg-[#0c0c15] border-t border-[#1e2035] overflow-hidden" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer - Contact information, navigation, and legal notices</h2>
      
      {/* Grid background overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[url('/grid.svg')] bg-repeat"></div>
      </div>
      
      {/* Scroll to top button with enhanced accessibility */}
      <div className="container mx-auto px-4 relative">
        <div className="absolute right-6 -top-6">
          <Button 
            onClick={scrollToTop}
            className="rounded-full h-12 w-12 bg-gradient-to-br from-[#9945FF] to-[#14F195] text-black hover:from-[#8035E5] hover:to-[#05E286] shadow-lg"
            aria-label="Back to top of page"
            title="Scroll to top"
          >
            <ArrowUp className="h-6 w-6" />
            <span className="sr-only">Scroll to top of page</span>
          </Button>
        </div>
      </div>
      
      {/* Main footer content - YMYL enhanced */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Trust Indicators Row - Simplified for Performance */}
        <div className="mb-8 p-4 bg-[#151525] rounded-lg border border-[#1e2035]">
          <div className="flex flex-wrap justify-center md:justify-between gap-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-[#14F195]" />
              <span className="text-white text-sm font-medium">SOC 2 Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-[#14F195]" />
              <span className="text-white text-sm font-medium">256-bit Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-[#14F195]" />
              <span className="text-white text-sm font-medium">Verified Analytics</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Company Information with YMYL Trust Elements */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img 
                src="/logo.svg" 
                alt="Solana Volume Bot Logo" 
                className="w-10 h-10 transition-transform hover:scale-110" 
                width="40"
                height="40"
              />
              <div className="font-bold text-2xl">
                <span className="text-white">Solana</span>
                <span className="text-[#14F195]">VolumeBot</span>
              </div>
            </div>
            
            <p className="text-gray-400 max-w-md">
              Professional analytics platform providing transparent token visibility data and market insights for Solana token creators in a secure, compliant environment. Developed and maintained by certified blockchain professionals.
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <Building className="h-4 w-4 text-[#14F195]" />
                <span className="text-gray-400 text-sm">Established June 2023</span>
              </div>
              <div className="flex items-center gap-1">
                <Award className="h-4 w-4 text-[#14F195]" />
                <span className="text-gray-400 text-sm">Best Analytics Platform - Solana Hackathon 2023</span>
              </div>
              <div className="flex items-center gap-1">
                <SiSolana className="h-4 w-4 text-[#14F195]" />
                <span className="text-gray-400 text-sm">Solana Foundation Developer Program Member</span>
              </div>
            </div>
          </div>
          
          {/* Navigation Links - Semantic Improvement */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Navigation</h3>
            <nav aria-label="Footer Navigation">
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => handleSectionClick(section.id)}
                      className="text-gray-400 hover:text-[#14F195] transition-colors"
                      aria-label={section.ariaLabel}
                      title={section.ariaLabel}
                    >
                      {section.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          
          {/* Contact Information - YMYL Compliant with Complete Details */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact Information</h3>
            <address className="not-italic">
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-400">
                  <Mail className="h-5 w-5 text-[#9945FF] flex-shrink-0" />
                  <a 
                    href="mailto:support@solanavolumebot.io" 
                    className="text-gray-400 hover:text-[#14F195] transition-colors"
                    aria-label="Send email to support"
                  >
                    support@solanavolumebot.io
                  </a>
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <Mail className="h-5 w-5 text-[#14F195] flex-shrink-0" />
                  <a 
                    href="mailto:legal@solanavolumebot.io" 
                    className="text-gray-400 hover:text-[#14F195] transition-colors"
                    aria-label="Send email to legal department"
                  >
                    legal@solanavolumebot.io
                  </a>
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <Phone className="h-5 w-5 text-[#9945FF] flex-shrink-0" />
                  <span>+44 (0) 114 244 8891</span>
                </li>
                <li className="flex items-start gap-2 text-gray-400">
                  <MapPin className="h-5 w-5 text-[#14F195] flex-shrink-0 mt-1" />
                  <span>FULL VOLUME CO. UK. LTD<br />15 Birchgreen Close<br />Maltby, Rotherham<br />South Yorkshire, S66 8RP<br />United Kingdom</span>
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <Clock className="h-5 w-5 text-[#9945FF] flex-shrink-0" />
                  <span>Business hours: 9am-5pm EST, Monday-Friday</span>
                </li>
                <li className="text-xs text-gray-500 pt-2">
                  <span className="flex items-center gap-1">
                    <FileText className="h-4 w-4 text-[#14F195]" />
                    Response within 24 hours guaranteed (business days)
                  </span>
                </li>
              </ul>
              
              {/* Social Links - Simplified for Performance */}
              <div className="mt-4">
                <h4 className="text-white font-medium mb-2">Connect With Us</h4>
                <div className="flex items-center gap-4 flex-wrap">
                  <a 
                    href="https://twitter.com/solanavolbot"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow us on Twitter"
                    className="text-[#1DA1F2] hover:text-white"
                  >
                    <FaTwitter className="h-5 w-5" />
                  </a>
                  <a 
                    href="https://discord.gg/solanavolbot"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Join our Discord"
                    className="text-[#5865F2] hover:text-white"
                  >
                    <SiDiscord className="h-5 w-5" />
                  </a>
                  <a 
                    href="https://t.me/solanavolbot"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Join our Telegram"
                    className="text-[#0088cc] hover:text-white"
                  >
                    <SiTelegram className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </address>
          </div>
          
          {/* Educational Resources - Simplified for Performance */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Educational Resources</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleSectionClick('legal')}
                  className="text-gray-400 hover:text-[#14F195] transition-colors flex items-center gap-2"
                >
                  <FileText className="h-4 w-4 text-[#9945FF]" />
                  <span>Token Visibility Guide</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleSectionClick('legal')}
                  className="text-gray-400 hover:text-[#14F195] transition-colors flex items-center gap-2"
                >
                  <FileText className="h-4 w-4 text-[#9945FF]" />
                  <span>Analytics Guide</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleSectionClick('legal')}
                  className="text-gray-400 hover:text-[#14F195] transition-colors flex items-center gap-2"
                >
                  <FileText className="h-4 w-4 text-[#9945FF]" />
                  <span>Security Best Practices</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleSectionClick('contact')}
                  className="text-gray-400 hover:text-[#14F195] transition-colors flex items-center gap-2 mt-4"
                >
                  <Mail className="h-4 w-4 text-[#14F195]" />
                  <span>Request Resources</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-[#1e2035] my-8"></div>
        
        {/* Bottom Footer with Enhanced Legal Links and YMYL Trust Indicators */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright with Company Information */}
          <div className="text-gray-500 text-sm flex flex-col">
            <span>© {currentYear} FULL VOLUME CO. UK. LTD. All rights reserved.</span>
            <span className="text-xs mt-1">Company Number: 05551974 (UK)</span>
            <span className="text-xs mt-1">Registered in England and Wales</span>
          </div>
          
          {/* Legal and Policy Links - Enhanced for YMYL */}
          <nav aria-label="Legal Links">
            <ul className="flex flex-wrap gap-4 lg:gap-6">
              <li>
                <button 
                  onClick={() => handleSectionClick('legal')} 
                  className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-1"
                  aria-label="View Privacy Policy"
                >
                  <span className="h-1 w-1 rounded-full bg-[#14F195]"></span>
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleSectionClick('legal')} 
                  className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-1"
                  aria-label="View Terms of Service"
                >
                  <span className="h-1 w-1 rounded-full bg-[#14F195]"></span>
                  Terms of Service
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleSectionClick('legal')} 
                  className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-1"
                  aria-label="View Cookie Policy"
                >
                  <span className="h-1 w-1 rounded-full bg-[#14F195]"></span>
                  Cookie Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleSectionClick('legal')} 
                  className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-1"
                  aria-label="View DMCA Policy"
                >
                  <span className="h-1 w-1 rounded-full bg-[#14F195]"></span>
                  DMCA Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleSectionClick('legal')} 
                  className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-1"
                  aria-label="View Data Security Policy"
                >
                  <span className="h-1 w-1 rounded-full bg-[#14F195]"></span>
                  Security Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleSectionClick('contact')} 
                  className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-1"
                  aria-label="Contact Us"
                >
                  <span className="h-1 w-1 rounded-full bg-[#14F195]"></span>
                  Contact Us
                </button>
              </li>
            </ul>
          </nav>
          
          {/* Additional Trust Elements */}
          <div className="text-gray-500 text-xs flex flex-col items-end">
            <div className="flex items-center gap-1">
              <span>Built with</span>
              <Heart className="h-3 w-3 text-[#F43F5E]" />
              <span>on</span>
              <SiSolana className="h-3 w-3 text-[#14F195]" />
            </div>
            <span className="mt-1">ISO 27001 Compliant | SOC 2 Certified</span>
            <span className="mt-1">Verified Professional Analytics Platform</span>
          </div>
        </div>
        
        {/* Accessibility Statement - Minimized */}
        <div className="text-center mt-4 text-xs text-gray-500">
          <span>WCAG 2.1 AA compliant |</span>
          <a href="mailto:accessibility@solanavolumebot.io" className="text-[#14F195] hover:underline ml-1">accessibility@solanavolumebot.io</a>
        </div>
      </div>
    </footer>
  );
}