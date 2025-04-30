import { useMemo } from "react";
import { motion } from "framer-motion";
import { Mail, PhoneCall, MapPin, ChevronRight, ArrowUpRight } from "lucide-react";
import { FaTwitter, FaDiscord, FaTelegram, FaGithub } from "react-icons/fa";

// Smooth scroll function for all links
const SmoothScrollLink = ({ href, children, className, ariaLabel }: { 
  href: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Extract the target ID from the href
    const targetId = href.replace(/.*\#/, '');

    if (targetId) {
      const element = document.getElementById(targetId);

      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });

        // Update URL without page reload
        window.history.pushState(null, '', href);
      } else if (href.startsWith('/')) {
        // If it's an internal page link without hash, use regular navigation
        window.location.href = href;
      }
    } else if (href === '/') {
      // Scroll to top for home link
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '/');
    } else if (href.startsWith('/')) {
      // If it's an internal page link without hash, use regular navigation
      window.location.href = href;
    }
  };

  return (
    <a 
      href={href} 
      onClick={handleClick} 
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
};

interface FooterProps {
  onTermsClick?: () => void;
  onPrivacyClick?: () => void;
  onDisclaimerClick?: () => void;
  onDMCAClick?: () => void;
}

export function Footer({
  onTermsClick,
  onPrivacyClick,
  onDisclaimerClick,
  onDMCAClick
}: FooterProps = {}) {
  // Social links with SEO-friendly attributes
  const socialLinks = useMemo(() => [
    {
      name: "Twitter",
      url: "https://twitter.com/solanavolumebot",
      icon: <FaTwitter size={18} />,
      color: "hover:text-[#1DA1F2]"
    },
    {
      name: "Discord",
      url: "https://discord.gg/solanavolumebot",
      icon: <FaDiscord size={18} />,
      color: "hover:text-[#5865F2]"
    },
    {
      name: "Telegram",
      url: "https://t.me/solanavolumebot",
      icon: <FaTelegram size={18} />,
      color: "hover:text-[#0088cc]"
    },
    {
      name: "GitHub",
      url: "https://github.com/solanavolumebot",
      icon: <FaGithub size={18} />,
      color: "hover:text-gray-100"
    }
  ], []);

  // Define interface for link structure
  interface NavLink {
    name: string;
    href: string;
    type?: 'terms' | 'privacy' | 'disclaimer' | 'dmca';
  }

  interface NavSection {
    section: string;
    links: NavLink[];
  }

  // Navigation links with proper structure
  const navLinks = useMemo<NavSection[]>(() => [
    { section: "Quick Links", links: [
      { name: "Features", href: "#features" },
      { name: "Statistics", href: "#stats" },
      { name: "Reviews", href: "#reviews" },
      { name: "Pricing", href: "#pricing" },
      { name: "FAQ", href: "#faq" }
    ]},
    { section: "Resources", links: [
      { name: "Documentation", href: "#resources" },
      { name: "API Reference", href: "#resources" },
      { name: "Tutorials", href: "#resources" },
      { name: "Contact Us", href: "#contact" }
    ]},
    { section: "Legal", links: [
      { name: "Terms of Service", href: "/legal#terms", type: "terms" },
      { name: "Privacy Policy", href: "/legal#privacy", type: "privacy" },
      { name: "Disclaimer", href: "/legal#disclaimer", type: "disclaimer" },
      { name: "DMCA Policy", href: "/legal#dmca", type: "dmca" }
    ]}
  ], []);

  // Current year for copyright
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 bg-gradient-to-b from-background to-card relative overflow-hidden z-10" id="footer">
      {/* SEO structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Solana Volume Bot",
          "url": "https://solanavolumebot.io",
          "logo": "https://solanavolumebot.io/logo.svg",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-555-123-4567",
            "contactType": "customer service",
            "email": "support@solanavolumebot.io",
            "availableLanguage": "English"
          },
          "sameAs": [
            "https://twitter.com/solanavolumebot",
            "https://discord.gg/solanavolumebot",
            "https://t.me/solanavolumebot",
            "https://github.com/solanavolumebot"
          ]
        })
      }} />

      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute -left-32 -top-32 w-96 h-96 bg-blue-600/5 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute -right-32 bottom-0 w-96 h-96 bg-purple-600/5 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-6 gap-x-8 gap-y-12">
          {/* Company information */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-3 shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7 text-white"
                  role="img"
                  aria-label="Volume Bot Logo"
                >
                  <path d="M11.644 1.59a.75.75 0 0 1 .712 0l9.75 5.25a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.712 0l-9.75-5.25a.75.75 0 0 1 0-1.32l9.75-5.25Z" />
                  <path d="m3.265 10.602 7.668 4.129a2.25 2.25 0 0 0 2.134 0l7.668-4.13 1.37.739a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.71 0l-9.75-5.25a.75.75 0 0 1 0-1.32l1.37-.738Z" />
                  <path d="m10.933 19.231-7.668-4.13-1.37.739a.75.75 0 0 0 0 1.32l9.75 5.25a.75.75 0 0 0 .71 0l9.75-5.25a.75.75 0 0 0 0-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 0 1-2.134-.001Z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Solana Volume Bot</h2>
            </div>

            <p className="text-gray-400 mb-6 max-w-md">
              The <a href="https://solanavolumebot.io" rel="dofollow" className="text-[#14F195] hover:underline">Solana Volume Bot</a> creates natural volume patterns that help your token trend on DEXTools, Pump.Fun, and Dexscreener by boosting on-chain volume activity.
            </p>

            {/* Contact information with icons */}
            <div className="space-y-3 mb-6">
              <a 
                href="mailto:info@solanavolumebot.io" 
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                rel="noopener noreferrer"
              >
                <Mail size={16} className="text-blue-400" />
                <span>info@solanavolumebot.io</span>
              </a>
              <a 
                href="tel:+15551234567" 
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                rel="noopener noreferrer"
              >
                <PhoneCall size={16} className="text-blue-400" />
                <span>+1 (555) 123-4567</span>
              </a>
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin size={16} className="text-blue-400" />
                <span>Crypto Valley, Zug, Switzerland</span>
              </div>
            </div>

            {/* Social media links */}
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className={`flex items-center justify-center h-10 w-10 rounded-full bg-card/60 backdrop-blur-sm border border-gray-700/30 text-gray-400 ${link.color} transition-all duration-300 hover:scale-110 hover:shadow-md hover:border-gray-700`}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation links */}
          {navLinks.map((section, sectionIndex) => (
            <div key={sectionIndex} className="col-span-1">
              <h3 className="text-lg font-bold mb-4">{section.section}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {/* Handle legal pages differently if popup handlers exist */}
                    {section.section === "Legal" && link.type && 
                      ((link.type === "terms" && onTermsClick) || 
                       (link.type === "privacy" && onPrivacyClick) ||
                       (link.type === "disclaimer" && onDisclaimerClick) ||
                       (link.type === "dmca" && onDMCAClick)) ? (
                      <button
                        onClick={() => {
                          if (link.type === "terms" && onTermsClick) onTermsClick();
                          else if (link.type === "privacy" && onPrivacyClick) onPrivacyClick();
                          else if (link.type === "disclaimer" && onDisclaimerClick) onDisclaimerClick();
                          else if (link.type === "dmca" && onDMCAClick) onDMCAClick();
                        }}
                        className="text-gray-400 hover:text-gray-200 transition-colors flex items-center group"
                        aria-label={link.name}
                      >
                        <ChevronRight className="h-3 w-3 mr-1 text-gray-600 group-hover:text-blue-400 transition-colors" />
                        {link.name}
                      </button>
                    ) : (
                      <SmoothScrollLink
                        href={link.href}
                        className="text-gray-400 hover:text-gray-200 transition-colors flex items-center group"
                        ariaLabel={link.name}
                      >
                        <ChevronRight className="h-3 w-3 mr-1 text-gray-600 group-hover:text-blue-400 transition-colors" />
                        {link.name}
                        {!link.href.startsWith('#') && (
                          <ArrowUpRight size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </SmoothScrollLink>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter sign-up */}
        <div className="border-t border-gray-700/30 mt-12 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-bold mb-2">Stay updated</h3>
              <p className="text-gray-400">
                Get the latest news and updates about our product
              </p>
            </div>
            <div>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-card/40 backdrop-blur-sm border border-gray-700/30 rounded-lg px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="Email address"
                />
                <button 
                  type="submit" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-white/80 mt-2">
                We respect your privacy. Unsubscribe at any time. 📧
              </p>
            </div>
          </div>
        </div>

        {/* Copyright and compliance footer */}
        <div className="border-t border-gray-700/30 mt-12 pt-8">
          <div className="flex flex-col md:flex-row md:justify-between items-center text-white/80 text-sm">
            <div className="mb-4 md:mb-0">
              &copy; {currentYear} Solana Volume Bot. All rights reserved. Not affiliated with any blockchain foundation.
            </div>
            <div className="flex flex-wrap gap-4 justify-center md:justify-end">
              {onTermsClick ? (
                <button 
                  onClick={onTermsClick} 
                  className="hover:text-white transition-colors text-white/80 text-sm"
                >
                  Terms
                </button>
              ) : (
                <SmoothScrollLink href="#legal" className="hover:text-white transition-colors">
                  Terms
                </SmoothScrollLink>
              )}

              {onPrivacyClick ? (
                <button 
                  onClick={onPrivacyClick} 
                  className="hover:text-white transition-colors text-white/80 text-sm"
                >
                  Privacy
                </button>
              ) : (
                <SmoothScrollLink href="#legal" className="hover:text-white transition-colors">
                  Privacy
                </SmoothScrollLink>
              )}

              {onDisclaimerClick ? (
                <button 
                  onClick={onDisclaimerClick} 
                  className="hover:text-white transition-colors text-white/80 text-sm"
                >
                  Disclaimer
                </button>
              ) : (
                <SmoothScrollLink href="#legal" className="hover:text-white transition-colors">
                  Disclaimer
                </SmoothScrollLink>
              )}

              {onDMCAClick ? (
                <button 
                  onClick={onDMCAClick} 
                  className="hover:text-white transition-colors text-white/80 text-sm"
                >
                  DMCA
                </button>
              ) : (
                <SmoothScrollLink href="#legal" className="hover:text-white transition-colors">
                  DMCA
                </SmoothScrollLink>
              )}

              <SmoothScrollLink href="#footer" className="hover:text-white transition-colors">
                Sitemap
              </SmoothScrollLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}