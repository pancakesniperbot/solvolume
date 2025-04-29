import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, FileText, Shield, Info, Scale } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDiscord, FaTelegram, FaTwitter } from 'react-icons/fa';

interface LegalPopupProps {
  isOpen: boolean;
  onClose: () => void;
  contentType: 'terms' | 'privacy' | 'disclaimer' | 'dmca';
  title?: string;
}

export function LegalPopup({ 
  isOpen, 
  onClose, 
  contentType = 'terms',
  title
}: LegalPopupProps) {
  const [currentSection, setCurrentSection] = useState<string>('main');
  const [animationComplete, setAnimationComplete] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Define our legal page titles
  const titles = {
    terms: "Terms of Service",
    privacy: "Privacy Policy",
    disclaimer: "Risk Disclaimer",
    dmca: "DMCA Policy"
  };

  // Reset section when content type changes
  useEffect(() => {
    setCurrentSection('main');
  }, [contentType]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    setScrollPosition(target.scrollTop);
  };

  const getIcon = () => {
    switch(contentType) {
      case 'terms': return <FileText className="w-6 h-6 text-[#9945FF]" />;
      case 'privacy': return <Shield className="w-6 h-6 text-[#14F195]" />;
      case 'disclaimer': return <Info className="w-6 h-6 text-[#00C2FF]" />;
      case 'dmca': return <Scale className="w-6 h-6 text-[#9945FF]" />;
      default: return <FileText className="w-6 h-6 text-[#9945FF]" />;
    }
  };

  // Navigation for subsections
  const navigateToSection = (section: string) => {
    setCurrentSection(section);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/70 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className="w-full max-w-4xl max-h-[90vh] bg-black rounded-xl border overflow-hidden relative"
            style={{
              borderImage: 'linear-gradient(to right, #9945FF, #14F195) 1',
              boxShadow: '0 0 30px rgba(153,69,255,0.3), 0 0 15px rgba(20,241,149,0.2)'
            }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            onAnimationComplete={() => setAnimationComplete(true)}
          >
            {/* Decorative 3D elements */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#9945FF]/10 filter blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-[#14F195]/10 filter blur-2xl opacity-20"></div>
            
            {/* Header with gradient glow */}
            <div className="relative px-6 py-4 border-b border-gray-800 flex items-center justify-between"
              style={{
                background: 'linear-gradient(to right, rgba(10,10,10,0.9), rgba(20,20,30,0.9))',
                boxShadow: '0 5px 20px -5px rgba(153,69,255,0.3)'
              }}
            >
              <div className="flex items-center gap-3">
                {currentSection !== 'main' && (
                  <button 
                    onClick={() => setCurrentSection('main')}
                    className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}
                
                <div className="flex items-center gap-2.5">
                  {getIcon()}
                  <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9945FF] to-[#14F195]">
                    {title || titles[contentType]}
                    {currentSection !== 'main' && (
                      <span className="ml-2 text-gray-300 font-normal text-sm">
                        / {currentSection}
                      </span>
                    )}
                  </h2>
                </div>
              </div>
              
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Content area with fancy scrollbar */}
            <div 
              className="text-gray-300 text-sm md:text-base p-6 overflow-y-auto custom-scrollbar"
              style={{ maxHeight: 'calc(90vh - 4rem)' }}
              onScroll={handleScroll}
            >
              {/* Radial glow following scroll */}
              <motion.div 
                className="absolute left-1/2 w-96 h-96 rounded-full pointer-events-none opacity-20"
                style={{
                  background: 'radial-gradient(circle, rgba(153,69,255,0.2), transparent 70%)',
                  x: '-50%',
                  top: `${Math.min(scrollPosition + 100, 400)}px`,
                  filter: 'blur(40px)',
                  mixBlendMode: 'screen'
                }}
              />
            
              {/* Dynamic content based on section */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${contentType}-${currentSection}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {contentType === 'terms' && renderTermsContent(currentSection, navigateToSection)}
                  {contentType === 'privacy' && renderPrivacyContent(currentSection, navigateToSection)}
                  {contentType === 'disclaimer' && renderDisclaimerContent(currentSection, navigateToSection)}
                  {contentType === 'dmca' && renderDMCAContent(currentSection, navigateToSection)}
                </motion.div>
              </AnimatePresence>
              
              {/* Footer with last updated info */}
              <div className="mt-10 pt-4 border-t border-gray-800 text-sm text-gray-500 flex justify-between items-center">
                <div>Our Official Legal Documentation</div>
                <div className="flex gap-3">
                  <a href="#" onClick={(e) => e.preventDefault()} className="text-[#9945FF] hover:text-[#14F195] transition-colors">
                    <FaTwitter />
                  </a>
                  <a href="#" onClick={(e) => e.preventDefault()} className="text-[#9945FF] hover:text-[#14F195] transition-colors">
                    <FaDiscord />
                  </a>
                  <a href="#" onClick={(e) => e.preventDefault()} className="text-[#9945FF] hover:text-[#14F195] transition-colors">
                    <FaTelegram />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Terms of Service Content
function renderTermsContent(section: string, navigate: (section: string) => void) {
  if (section === 'main') {
    return (
      <div className="space-y-6">
        <p>
          Welcome to Solana Volume Bot ("we," "our," or "us"). By accessing or using our services, you agree to be bound by these Terms of Service. Please read them carefully.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {[
            { title: "Service Description", section: "service", desc: "Details about the Solana Volume Bot service" },
            { title: "Account Registration", section: "account", desc: "Requirements for creating and maintaining an account" },
            { title: "Payment Terms", section: "payment", desc: "Pricing, billing, and refund policies" },
            { title: "User Obligations", section: "obligations", desc: "Rules and responsibilities when using our service" },
            { title: "Intellectual Property", section: "ip", desc: "Ownership of content and technology" },
            { title: "Limitation of Liability", section: "liability", desc: "Legal boundaries of our responsibility" },
          ].map((item, i) => (
            <motion.div 
              key={item.section}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate(item.section)}
              className="p-4 rounded-xl border border-gray-800 hover:border-[#9945FF]/50 bg-black/50 hover:bg-black/70 cursor-pointer transition-all duration-300"
              style={{
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 20px -4px rgba(0, 0, 0, 0.1)'
              }}
            >
              <h3 className="font-bold text-white mb-1">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
        
        <p className="text-gray-400 text-sm mt-6">
          By using the Solana Volume Bot, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
        </p>
      </div>
    );
  }
  
  if (section === 'service') {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">Service Description</h3>
        
        <p>
          Solana Volume Bot is a professional-grade software service designed to provide automated volume generation for cryptocurrency tokens on the Solana blockchain. Our platform offers:
        </p>
        
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
          <li>Automated 24/7 volume generation for your Solana tokens</li>
          <li>Real-time analytics and tracking of your token's market performance</li>
          <li>Customizable strategies for volume optimization</li>
          <li>Integration with major DEX platforms including Raydium, Jupiter, and Orca</li>
          <li>Solana blockchain-specific optimization for maximum efficiency</li>
        </ul>
        
        <p className="mt-4">
          We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time without prior notice. We make no guarantees about the continuous availability of the Service or any specific features.
        </p>
        
        <div className="p-4 rounded-lg bg-[#9945FF]/10 border border-[#9945FF]/30 mt-6">
          <h4 className="text-white font-bold">Important Notice</h4>
          <p className="text-sm text-gray-300 mt-1">
            The Solana Volume Bot service is designed to work within the bounds of legitimate trading practices. Users should ensure they comply with all applicable regulations and platform terms of service when utilizing our bot.
          </p>
        </div>
      </div>
    );
  }
  
  if (section === 'account') {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">Account Registration</h3>
        
        <p>
          To access and use the Solana Volume Bot services, you must create an account. When registering, you agree to:
        </p>
        
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
          <li>Provide accurate, current, and complete information about yourself</li>
          <li>Maintain and promptly update your account information</li>
          <li>Keep your account credentials confidential and secure</li>
          <li>Notify us immediately of any unauthorized access to your account</li>
          <li>Take responsibility for all activities that occur under your account</li>
        </ul>
        
        <div className="mt-4">
          <h4 className="font-bold text-white">Account Restrictions</h4>
          <p>
            You must be at least 18 years old to use our services. Accounts registered by automated methods are not permitted. Each user may maintain only one account unless explicitly permitted otherwise.
          </p>
        </div>
        
        <div className="mt-4">
          <h4 className="font-bold text-white">Account Termination</h4>
          <p>
            We reserve the right to suspend or terminate accounts that violate our Terms of Service, engage in fraudulent activities, or pose a risk to our platform or other users. Upon termination, you will lose access to our services, your account, and any data associated with your account.
          </p>
        </div>
      </div>
    );
  }
  
  if (section === 'payment') {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">Payment Terms</h3>
        
        <p>
          Solana Volume Bot offers various subscription plans with different features and capabilities. By subscribing to our service, you agree to the following terms:
        </p>
        
        <div className="mt-4">
          <h4 className="font-bold text-white">Billing Cycle</h4>
          <p>
            Your subscription will automatically renew at the end of each billing period unless you cancel it before the renewal date. The billing period depends on the subscription plan you select (monthly, quarterly, or annual).
          </p>
        </div>
        
        <div className="mt-4">
          <h4 className="font-bold text-white">Payment Methods</h4>
          <p>
            We accept payments in various cryptocurrencies, including SOL, USDC, and other stablecoins on the Solana blockchain. Payments are processed securely through our integrated payment system.
          </p>
        </div>
        
        <div className="mt-4">
          <h4 className="font-bold text-white">Free Trial</h4>
          <p>
            New users may be eligible for a free trial period. After the trial period ends, your selected payment method will be automatically charged based on the subscription plan you chose during registration, unless you cancel before the trial period ends.
          </p>
        </div>
        
        <div className="mt-4">
          <h4 className="font-bold text-white">Refund Policy</h4>
          <p>
            Given the nature of digital services, all sales are final, and we do not offer refunds unless required by law. If you believe you are entitled to a refund due to exceptional circumstances, please contact our support team within 7 days of the charge.
          </p>
        </div>
        
        <div className="p-4 rounded-lg bg-[#14F195]/10 border border-[#14F195]/30 mt-6">
          <h4 className="text-white font-bold">Pricing Changes</h4>
          <p className="text-sm text-gray-300 mt-1">
            We may change our subscription prices from time to time. Any price changes will apply to billing periods after the current one. We will provide notice of any price changes through our website or by email.
          </p>
        </div>
      </div>
    );
  }
  
  // Default content for other sections
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white mb-4">
        {section.charAt(0).toUpperCase() + section.slice(1)}
      </h3>
      
      <p>This section contains information about {section}. Please return to the main menu to see all available sections.</p>
      
      <button 
        onClick={() => navigate('main')} 
        className="px-4 py-2 bg-[#9945FF]/20 hover:bg-[#9945FF]/30 rounded-lg border border-[#9945FF]/50 transition-colors mt-3"
      >
        Back to Main Menu
      </button>
    </div>
  );
}

// Privacy Policy Content
function renderPrivacyContent(section: string, navigate: (section: string) => void) {
  if (section === 'main') {
    return (
      <div className="space-y-6">
        <p>
          At Solana Volume Bot, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our service.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {[
            { title: "Information We Collect", section: "collect", desc: "Types of data we gather from users" },
            { title: "How We Use Information", section: "use", desc: "Ways we utilize collected data" },
            { title: "Data Security", section: "security", desc: "How we protect your information" },
            { title: "Third-Party Services", section: "third-party", desc: "Our relationships with external services" },
            { title: "User Rights", section: "rights", desc: "Your control over your data" },
            { title: "Policy Updates", section: "updates", desc: "How we notify you of changes" },
          ].map((item, i) => (
            <motion.div 
              key={item.section}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate(item.section)}
              className="p-4 rounded-xl border border-gray-800 hover:border-[#14F195]/50 bg-black/50 hover:bg-black/70 cursor-pointer transition-all duration-300"
              style={{
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 20px -4px rgba(0, 0, 0, 0.1)'
              }}
            >
              <h3 className="font-bold text-white mb-1">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
        
        <p className="text-gray-400 text-sm mt-6">
          By using the Solana Volume Bot service, you consent to the data practices described in this Privacy Policy.
        </p>
      </div>
    );
  }
  
  if (section === 'collect') {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">Information We Collect</h3>
        
        <p>
          We collect several types of information from and about users of our service:
        </p>
        
        <div className="mt-4">
          <h4 className="font-bold text-white">Personal Information</h4>
          <ul className="list-disc pl-5 space-y-1 text-gray-300">
            <li>Email address</li>
            <li>Wallet addresses associated with your account</li>
            <li>Username and password</li>
            <li>Payment information (transaction hashes, not actual private keys)</li>
            <li>Optional profile information (display name, avatar)</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h4 className="font-bold text-white">Usage Information</h4>
          <ul className="list-disc pl-5 space-y-1 text-gray-300">
            <li>Bot configuration settings</li>
            <li>Tokens selected for volume enhancement</li>
            <li>Trading parameters and strategies</li>
            <li>Usage patterns and feature preferences</li>
            <li>Performance metrics and results</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h4 className="font-bold text-white">Technical Information</h4>
          <ul className="list-disc pl-5 space-y-1 text-gray-300">
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Device information (operating system, device type)</li>
            <li>Access times and dates</li>
            <li>Pages viewed and interactions</li>
            <li>Error logs and performance data</li>
          </ul>
        </div>
        
        <div className="p-4 rounded-lg bg-[#14F195]/10 border border-[#14F195]/30 mt-6">
          <h4 className="text-white font-bold">Blockchain Data</h4>
          <p className="text-sm text-gray-300 mt-1">
            Please note that any transactions performed by the Solana Volume Bot are recorded on the public Solana blockchain. This information is inherently public and not subject to our privacy controls.
          </p>
        </div>
      </div>
    );
  }
  
  // Default content for other sections
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white mb-4">
        {section.charAt(0).toUpperCase() + section.slice(1)}
      </h3>
      
      <p>This section contains privacy information about {section}. Please return to the main menu to see all available sections.</p>
      
      <button 
        onClick={() => navigate('main')} 
        className="px-4 py-2 bg-[#14F195]/20 hover:bg-[#14F195]/30 rounded-lg border border-[#14F195]/50 transition-colors mt-3"
      >
        Back to Main Menu
      </button>
    </div>
  );
}

// Disclaimer Content
function renderDisclaimerContent(section: string, navigate: (section: string) => void) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white">Risk Disclaimer</h3>
      
      <div className="p-4 rounded-lg bg-[#9945FF]/10 border border-[#9945FF]/30">
        <h4 className="text-white font-bold">Important Notice</h4>
        <p className="text-gray-300 mt-2">
          <strong>Solana Volume Bot is a technical visibility tool designed for token discoverability enhancement. It is not an investment product, financial advisor, or trading signal generator.</strong> Trading cryptocurrencies involves significant risk and may not be suitable for all investors. Before using our service, please consider the following risks:
        </p>
      </div>
      
      <div className="space-y-4 mt-6">
        <div>
          <h4 className="font-bold text-white">Cryptocurrency Risk</h4>
          <p className="text-gray-300">
            Cryptocurrencies are highly volatile assets. Their prices can fluctuate significantly over short periods, potentially causing substantial financial loss. Past performance is not indicative of future results.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold text-white">Technical Risks</h4>
          <p className="text-gray-300">
            Blockchain networks may experience delays, congestion, or technical failures. Smart contracts may contain bugs or vulnerabilities. Our service depends on the proper functioning of the Solana blockchain, which is beyond our control.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold text-white">Regulatory Risks</h4>
          <p className="text-gray-300">
            Cryptocurrency regulations vary by jurisdiction and are evolving rapidly. Changes in regulations may adversely affect the operation of our service or the value of your cryptocurrency assets.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold text-white">No Financial Advice</h4>
          <p className="text-gray-300">
            The information provided by Solana Volume Bot does not constitute investment advice, financial advice, trading advice, or any other sort of advice. You should conduct your own research and consult a professional financial advisor before making any investment decisions.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold text-white">Performance Limitations</h4>
          <p className="text-gray-300">
            While our service aims to enhance trading volume, we cannot guarantee specific results. Market conditions, liquidity, token fundamentals, and numerous other factors may influence the effectiveness of our service.
          </p>
        </div>
      </div>
      
      <div className="p-5 rounded-lg bg-black/40 border border-gray-800 mt-6">
        <h4 className="text-white font-bold text-center mb-3">Acknowledgment of Risk</h4>
        <p className="text-gray-300 text-center">
          By using the Solana Volume Bot service, you acknowledge that you understand and accept these risks. You are solely responsible for your trading decisions and the management of your cryptocurrency assets.
        </p>
      </div>
    </div>
  );
}

// DMCA Content
function renderDMCAContent(section: string, navigate: (section: string) => void) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white">DMCA Policy</h3>
      
      <p>
        Solana Volume Bot respects the intellectual property rights of others and expects its users to do the same. We are committed to complying with the Digital Millennium Copyright Act (DMCA).
      </p>
      
      <div className="mt-6">
        <h4 className="font-bold text-white">Reporting Copyright Infringement</h4>
        <p className="text-gray-300 mt-2">
          If you believe that content available on or through our service infringes your copyright, please send a notification containing the following information to our designated agent:
        </p>
        
        <ul className="list-decimal pl-5 space-y-2 text-gray-300 mt-3">
          <li>A physical or electronic signature of the copyright owner or a person authorized to act on their behalf</li>
          <li>Identification of the copyrighted work claimed to have been infringed</li>
          <li>Identification of the material that is claimed to be infringing or to be the subject of infringing activity</li>
          <li>Contact information for the complainant, such as an address, telephone number, and email</li>
          <li>A statement that the complainant has a good faith belief that use of the material is not authorized by the copyright owner</li>
          <li>A statement that the information in the notification is accurate, and, under penalty of perjury, that the complainant is authorized to act on behalf of the copyright owner</li>
        </ul>
      </div>
      
      <div className="p-4 rounded-lg bg-[#00C2FF]/10 border border-[#00C2FF]/30 mt-6">
        <h4 className="text-white font-bold">Designated Agent</h4>
        <p className="text-gray-300 mt-2">
          Please send all DMCA notices to our designated agent at:
        </p>
        <p className="text-white mt-1">dmca@solanavolumebot.io</p>
      </div>
      
      <div className="mt-6">
        <h4 className="font-bold text-white">Counter Notification</h4>
        <p className="text-gray-300 mt-2">
          If you believe your content was removed in error, you may submit a counter-notification with the following information:
        </p>
        
        <ul className="list-decimal pl-5 space-y-2 text-gray-300 mt-3">
          <li>Your physical or electronic signature</li>
          <li>Identification of the material that has been removed</li>
          <li>A statement under penalty of perjury that you have a good faith belief that the material was removed or disabled as a result of mistake or misidentification</li>
          <li>Your name, address, and telephone number</li>
          <li>A statement that you consent to the jurisdiction of the Federal District Court for the judicial district in which your address is located</li>
        </ul>
      </div>
      
      <div className="mt-6">
        <h4 className="font-bold text-white">Repeat Infringers</h4>
        <p className="text-gray-300">
          It is our policy to terminate the accounts of users who repeatedly infringe or are repeatedly charged with infringing the copyrights or other intellectual property rights of others.
        </p>
      </div>
    </div>
  );
}