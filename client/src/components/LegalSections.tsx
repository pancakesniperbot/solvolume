import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, ShieldCheck, AlertTriangle, Edit3, 
  BookOpen, HelpCircle, ChevronRight, ChevronDown, 
  ChevronUp, ExternalLink, Link as LinkIcon, ArrowLeft 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TableOfContents } from '@/components/TableOfContents';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

type LegalSectionType = 'terms' | 'privacy' | 'disclaimer' | 'dmca' | 'resources' | 'about' | 'security' | 'contact';

interface LegalSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  id: LegalSectionType;
  activeSection: LegalSectionType;
  onSectionChange: (section: LegalSectionType) => void;
}

// Individual legal section component
export const LegalSection = ({ 
  title, 
  icon, 
  children, 
  id, 
  activeSection, 
  onSectionChange 
}: LegalSectionProps) => {
  const isActive = activeSection === id;
  
  return (
    <div 
      id={id}
      className={`border border-[#1e2035] rounded-xl overflow-hidden mb-6 transition-all duration-300 ${
        isActive ? 'shadow-lg shadow-[#14F195]/5' : 'opacity-80'
      }`}
    >
      <Button
        variant="ghost"
        className={`w-full flex justify-between items-center p-4 text-white hover:bg-[#14141E] transition-all ${
          isActive ? 'bg-[#0c0c15] border-b border-[#1e2035]' : 'bg-[#0a0a12]'
        }`}
        onClick={() => onSectionChange(id)}
      >
        <div className="flex items-center gap-2 text-left">
          <div className={`
            p-1.5 rounded-lg ${isActive ? 'bg-[#14F195]/10 text-[#14F195]' : 'bg-[#1e2035]/50 text-gray-400'}
          `}>
            {icon}
          </div>
          <span className={`font-semibold ${isActive ? 'text-white' : 'text-gray-300'}`}>{title}</span>
        </div>
        {isActive ? <ChevronUp className="h-5 w-5 text-[#14F195]" /> : <ChevronDown className="h-5 w-5" />}
      </Button>
      
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-[#0a0a12] text-gray-300 text-sm relative"
          >
            {/* Scrollable content area */}
            <ScrollArea className="h-[min(70vh,800px)] rounded-b-xl border-t border-[#1e2035]/50">
              <div className="p-6 space-y-4">
                {children}
              </div>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Floating section navigation component
const SectionNav = ({ 
  activeSection, 
  onSectionChange 
}: { 
  activeSection: LegalSectionType, 
  onSectionChange: (section: LegalSectionType) => void 
}) => {
  return (
    <div className="bg-[#0c0c15]/90 backdrop-blur-md border border-[#1e2035] rounded-xl p-4 sticky top-24 mb-6 shadow-lg">
      <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
        <BookOpen className="h-4 w-4 text-[#14F195]" />
        Legal Documents
      </h3>
      
      <nav className="space-y-2">
        <Button 
          variant="ghost" 
          className={`w-full justify-start text-sm p-2 h-auto ${
            activeSection === 'about' ? 'bg-[#14F195]/10 text-[#14F195]' : 'text-gray-300'
          }`}
          onClick={() => onSectionChange('about')}
        >
          <HelpCircle className="h-4 w-4 mr-2" />
          About Us
          {activeSection === 'about' && <ChevronRight className="h-4 w-4 ml-auto" />}
        </Button>

        <Button 
          variant="ghost" 
          className={`w-full justify-start text-sm p-2 h-auto ${
            activeSection === 'terms' ? 'bg-[#14F195]/10 text-[#14F195]' : 'text-gray-300'
          }`}
          onClick={() => onSectionChange('terms')}
        >
          <FileText className="h-4 w-4 mr-2" />
          Terms of Service
          {activeSection === 'terms' && <ChevronRight className="h-4 w-4 ml-auto" />}
        </Button>
        
        <Button 
          variant="ghost" 
          className={`w-full justify-start text-sm p-2 h-auto ${
            activeSection === 'privacy' ? 'bg-[#14F195]/10 text-[#14F195]' : 'text-gray-300'
          }`}
          onClick={() => onSectionChange('privacy')}
        >
          <ShieldCheck className="h-4 w-4 mr-2" />
          Privacy Policy
          {activeSection === 'privacy' && <ChevronRight className="h-4 w-4 ml-auto" />}
        </Button>
        
        <Button 
          variant="ghost" 
          className={`w-full justify-start text-sm p-2 h-auto ${
            activeSection === 'disclaimer' ? 'bg-[#14F195]/10 text-[#14F195]' : 'text-gray-300'
          }`}
          onClick={() => onSectionChange('disclaimer')}
        >
          <AlertTriangle className="h-4 w-4 mr-2" />
          Disclaimer
          {activeSection === 'disclaimer' && <ChevronRight className="h-4 w-4 ml-auto" />}
        </Button>
        
        <Button 
          variant="ghost" 
          className={`w-full justify-start text-sm p-2 h-auto ${
            activeSection === 'dmca' ? 'bg-[#14F195]/10 text-[#14F195]' : 'text-gray-300'
          }`}
          onClick={() => onSectionChange('dmca')}
        >
          <Edit3 className="h-4 w-4 mr-2" />
          DMCA Policy
          {activeSection === 'dmca' && <ChevronRight className="h-4 w-4 ml-auto" />}
        </Button>
        
        <Button 
          variant="ghost" 
          className={`w-full justify-start text-sm p-2 h-auto ${
            activeSection === 'resources' ? 'bg-[#14F195]/10 text-[#14F195]' : 'text-gray-300'
          }`}
          onClick={() => onSectionChange('resources')}
        >
          <BookOpen className="h-4 w-4 mr-2" />
          Educational Resources
          {activeSection === 'resources' && <ChevronRight className="h-4 w-4 ml-auto" />}
        </Button>
        
        <Button 
          variant="ghost" 
          className={`w-full justify-start text-sm p-2 h-auto ${
            activeSection === 'security' ? 'bg-[#14F195]/10 text-[#14F195]' : 'text-gray-300'
          }`}
          onClick={() => onSectionChange('security')}
        >
          <ShieldCheck className="h-4 w-4 mr-2" />
          Security Statement
          {activeSection === 'security' && <ChevronRight className="h-4 w-4 ml-auto" />}
        </Button>
      </nav>
      
      <Separator className="my-3 bg-[#1e2035]" />
      
      <div className="text-xs text-gray-400">
        <p className="flex items-center gap-1">
          <HelpCircle className="h-3 w-3" />
          Solana Volume Bot Official Documentation
        </p>
      </div>
    </div>
  );
};

// Full legal sections container with all legal content
export const LegalSections = ({ initialSection = 'terms', isStandalone = false }: { initialSection?: LegalSectionType, isStandalone?: boolean }) => {
  const [activeSection, setActiveSection] = useState<LegalSectionType>(initialSection);
  
  // URL hash handling
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'terms' || hash === 'privacy' || hash === 'disclaimer' || 
          hash === 'dmca' || hash === 'resources' || hash === 'about' || 
          hash === 'security' || hash === 'contact') {
        setActiveSection(hash as LegalSectionType);
      }
    };
    
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
  const handleSectionChange = (section: LegalSectionType) => {
    setActiveSection(section);
    if (isStandalone) {
      window.history.pushState(null, '', `#${section}`);
    }
  };
  
  return (
    <section id="legal" className={`py-12 ${isStandalone ? 'pt-32' : ''} bg-[#080810]`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          {/* Left sidebar with section navigation */}
          <div className="lg:w-1/4">
            <SectionNav activeSection={activeSection} onSectionChange={handleSectionChange} />
          </div>
          
          {/* Main content section */}
          <div className="lg:w-3/4">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Legal <span className="text-[#14F195]">Information</span>
                </h2>
                
                {isStandalone && (
                  <Button 
                    variant="outline" 
                    className="border-[#1e2035] hover:border-[#14F195]/40 text-white"
                    onClick={() => window.history.back()}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                  </Button>
                )}
              </div>
              
              <p className="text-gray-400">
                The following information outlines the legal framework for using the Solana Volume Bot service. 
                Please read these documents carefully to understand your rights and responsibilities.
              </p>
              
              <LegalSection 
                title="About Us" 
                icon={<HelpCircle className="h-5 w-5" />}
                id="about"
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
              >
                <div className="space-y-6">
                  <div className="p-4 bg-[#0c0c15] rounded-lg border border-[#1e2035]">
                    <p className="text-white font-medium mb-2">
                      Solana Volume Bot provides professional volume distribution services and visibility enhancement solutions for Solana-based tokens.
                    </p>
                  </div>
                
                  <h3 className="text-lg font-semibold text-white">Our Mission</h3>
                  <p>
                    Our mission is to provide effective volume distribution services that help Solana token creators enhance their token's visibility and optimize discoverability on major decentralized exchanges through ethical and compliant methods.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-white">What We Do</h3>
                  <p>
                    Solana Volume Bot offers strategic volume distribution services that help token creators achieve greater visibility on major DEX platforms. Our platform provides:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Tailored volume distribution strategies</li>
                    <li>Multi-wallet transaction coordination</li>
                    <li>Natural trading pattern simulation</li>
                    <li>DEX ranking algorithm optimization</li>
                    <li>Educational resources for sustainable token visibility</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-white">Our Approach</h3>
                  <p>
                    We believe in transparency and ethical practices in the cryptocurrency space. Our platform focuses on providing effective volume distribution strategies through compliant methods that enhance token visibility. We do not:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Provide financial advice or investment recommendations</li>
                    <li>Guarantee specific price movements or trading outcomes</li>
                    <li>Engage in market manipulation or deceptive practices</li>
                    <li>Offer "pump and dump" schemes or artificial price inflation services</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-white">Our Team</h3>
                  <p>
                    Our team consists of experienced blockchain developers, DEX optimization specialists, and volume distribution experts with deep expertise in the Solana ecosystem. We're committed to providing reliable volume enhancement services that help token creators navigate the complex world of DEX visibility.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-white">Company Information</h3>
                  <p>
                    Solana Volume Bot is operated by FULL VOLUME CO. UK. LTD, a company registered in England and Wales.
                  </p>
                  <div className="mt-2">
                    <ul className="list-none space-y-1 text-gray-300">
                      <li><strong>Company Number:</strong> 05551974</li>
                      <li><strong>Registered Office:</strong> 182 Staniforth Road, Sheffield, S9 3HF, United Kingdom</li>
                      <li><strong>Phone:</strong> +44 (0) 114 244 8891</li>
                      <li><strong>Email:</strong> info@solanavolumebot.io</li>
                    </ul>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white">Contact Us</h3>
                  <p>
                    We welcome your questions, feedback, and inquiries about our services. Please feel free to contact us through any of the following channels:
                  </p>
                  <div className="mt-2">
                    <ul className="list-none space-y-1 text-gray-300">
                      <li><strong>Email:</strong> support@solanavolumebot.io</li>
                      <li><strong>Phone:</strong> +44 (0) 114 244 8891</li>
                      <li><strong>Hours:</strong> Monday to Friday, 9:00 AM - 5:00 PM (GMT)</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-[#0c0c15] rounded-lg border border-[#14F195]/20 mt-6">
                    <p className="text-[#14F195] font-medium mb-2">Our Commitment to Accessibility</p>
                    <p className="text-gray-300 text-sm">
                      Solana Volume Bot is committed to making our website and services accessible to everyone. We follow WCAG 3.0 guidelines to ensure our platform can be easily navigated and used by people with diverse abilities and needs. If you encounter any accessibility issues or have suggestions for improvement, please contact our support team.
                    </p>
                  </div>
                </div>
              </LegalSection>
              
              <LegalSection 
                title="Terms of Service" 
                icon={<FileText className="h-5 w-5" />}
                id="terms"
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
              >
                <div className="space-y-6">
                  <div className="p-4 bg-[#0c0c15] rounded-lg border border-[#1e2035]">
                    <p className="text-sm text-amber-300 mb-2">
                      <strong>Important:</strong> Solana Volume Bot is a technical visibility optimization tool for Solana-based tokens. 
                      It is not a financial product and does not guarantee trading profits, investment returns, or specific price outcomes.
                    </p>
                    <p className="text-sm text-gray-400">
                      <strong>Company Information:</strong> FULL VOLUME CO. UK. LTD<br />
                      Company Number: 05551974<br />
                      Registered in England and Wales<br />
                      Registered Office: 182 Staniforth Road, Sheffield, S9 3HF, United Kingdom<br />
                      Phone: +44 (0) 114 244 8891
                    </p>
                  </div>
                
                  <h3 className="text-lg font-semibold text-white">1. Acceptance of Terms</h3>
                  <p>By accessing and using the Solana Volume Bot service ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Service.</p>
                  
                  <h3 className="text-lg font-semibold text-white">2. Description of Service</h3>
                  <p>The Solana Volume Bot provides technical visibility enhancement for Solana-based tokens. Our service helps increase your token's presence on DEX platforms including DEXTools and Pump.fun through strategic and optimized transaction patterns, intended solely to improve discoverability - not to manipulate prices or markets.</p>
                  
                  <h3 className="text-lg font-semibold text-white">3. Account Registration and Security</h3>
                  <p>To use the Sol Volume Bot, you must create an account. You are responsible for maintaining the confidentiality of your account information and for all activities under your account. You agree to notify us immediately of any unauthorized use of your account.</p>
                  
                  <h3 className="text-lg font-semibold text-white">4. Service Usage Guidelines</h3>
                  <p>You agree to use the Pump Fun Volume Bot service in compliance with all applicable laws, regulations, and these Terms. Any misuse or abuse of the Service, including attempts to manipulate markets or engage in fraudulent activities, is strictly prohibited.</p>
                  
                  <h3 className="text-lg font-semibold text-white">5. Subscription and Payments</h3>
                  <p>Our Service is offered through subscription plans. By purchasing a subscription to the Dextools Volume Bot, you agree to pay all fees associated with your selected plan. Subscription fees are non-refundable except as required by law.</p>
                  
                  <h3 className="text-lg font-semibold text-white">6. Modifications to Service</h3>
                  <p>We reserve the right to modify, suspend, or discontinue any aspect of the service at any time, including hours of operation or availability of the Service, without notice or liability.</p>
                  
                  <h3 className="text-lg font-semibold text-white">7. Limitation of Liability</h3>
                  <p>The Solana Volume Bot is provided "as is" and "as available" without any warranties, express or implied. We do not guarantee that the Service will be uninterrupted, secure, or error-free. We shall not be liable for any direct, indirect, incidental, special, or consequential damages.</p>
                  
                  <h3 className="text-lg font-semibold text-white">8. Indemnification</h3>
                  <p>You agree to indemnify and hold harmless the Sol Volume Bot and its affiliates, officers, agents, and employees from any claim or demand made by any third party due to or arising out of your use of the Service.</p>
                  
                  <h3 className="text-lg font-semibold text-white">9. Governing Law</h3>
                  <p>These Terms shall be governed by the laws of the jurisdiction in which the service operates, without regard to its conflict of law provisions.</p>
                  
                  <h3 className="text-lg font-semibold text-white">10. Termination</h3>
                  <p>We may terminate or suspend your access to the service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.</p>
                </div>
              </LegalSection>
              
              <LegalSection 
                title="Privacy Policy" 
                icon={<ShieldCheck className="h-5 w-5" />}
                id="privacy"
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
              >
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-white">1. Information Collection</h3>
                  <p>The Solana Volume Bot collects information you provide directly to us, such as when you create an account, subscribe to our service, or communicate with us. This may include your name, email address, wallet addresses, and payment information.</p>
                  
                  <h3 className="text-lg font-semibold text-white">2. Usage Information</h3>
                  <p>When you use our service, we automatically collect certain information about your device and usage patterns. This includes IP addresses, browser types, operating systems, and pages visited.</p>
                  
                  <h3 className="text-lg font-semibold text-white">3. Use of Information</h3>
                  <p>We use the information we collect to operate and improve the Sol Volume Bot, process transactions, send communications, prevent fraud, and comply with legal obligations. Your information helps us to provide a better user experience and optimize our services.</p>
                  
                  <h3 className="text-lg font-semibold text-white">4. Information Sharing</h3>
                  <p>The Dextools Volume Bot does not sell or rent your personal information to third parties. We may share information with service providers who assist in operating our website and conducting business, such as payment processors and hosting services.</p>
                  
                  <h3 className="text-lg font-semibold text-white">5. Cookies and Similar Technologies</h3>
                  <p>We use cookies and similar tracking technologies to track activity on our service and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
                  
                  <h3 className="text-lg font-semibold text-white">6. Data Security</h3>
                  <p>We implement appropriate security measures to protect your personal information within the Solana Volume Bot. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
                  
                  <h3 className="text-lg font-semibold text-white">7. Data Retention</h3>
                  <p>We retain personal information collected through the Sol Volume Bot for as long as necessary to fulfill the purposes for which it was collected, including legal, accounting, or reporting requirements.</p>
                  
                  <h3 className="text-lg font-semibold text-white">8. Your Rights</h3>
                  <p>Depending on your location, you may have rights regarding your personal data processed by our service. These may include the right to access, correct, delete, restrict processing, or request data portability.</p>
                  
                  <h3 className="text-lg font-semibold text-white">9. Changes to Privacy Policy</h3>
                  <p>We may update our Privacy Policy from time to time. We will notify users of any material changes to how we treat personal information through the service.</p>
                  
                  <h3 className="text-lg font-semibold text-white">10. Contact Information</h3>
                  <p>If you have questions about this Privacy Policy or the practices of the Solana Volume Bot, please contact us at privacy@solanavolumebot.io.</p>
                </div>
              </LegalSection>
              
              <LegalSection 
                title="Security Statement" 
                icon={<ShieldCheck className="h-5 w-5" />}
                id="security"
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
              >
                <div className="space-y-6">
                  <div className="p-4 bg-[#0c0c15] rounded-lg border border-[#14F195]/20">
                    <p className="text-white font-medium mb-2">
                      At Solana Volume Bot, we prioritize the security and privacy of our users. This security statement outlines the measures we take to protect your data and ensure a safe experience on our platform.
                    </p>
                  </div>
                
                  <h3 className="text-lg font-semibold text-white">Our Security Approach</h3>
                  <p>
                    Security is fundamental to our service. We implement industry-standard security practices and continuously update our security measures to protect against emerging threats. Our approach includes:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Regular security audits and vulnerability assessments</li>
                    <li>Secure coding practices and code reviews</li>
                    <li>Encryption of sensitive data both in transit and at rest</li>
                    <li>Strict access controls and authentication mechanisms</li>
                    <li>Regular security training for our team</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-white">Data Protection</h3>
                  <p>
                    We take data protection seriously and have implemented the following measures:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Encryption of personal and financial information</li>
                    <li>Secure database configurations with access restrictions</li>
                    <li>Regular data backups with secure storage</li>
                    <li>Data minimization principles - we only collect data necessary for service operation</li>
                    <li>Scheduled data deletion for information that is no longer needed</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-white">No Private Key Requirements</h3>
                  <p>
                    Our service is designed to operate without requiring access to your private keys. We never ask for, store, or have access to your cryptocurrency wallet private keys. This design principle ensures that:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Your crypto assets remain completely under your control at all times</li>
                    <li>There is no risk of unauthorized transactions from our service</li>
                    <li>Your wallet security is maintained independently from our platform</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-white">Wallet Connection Security</h3>
                  <p>
                    When you choose to connect a wallet to our service, we implement the following security measures:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Read-only connections that prevent transaction execution</li>
                    <li>Secure connection protocols with industry-standard encryption</li>
                    <li>Clear permission screens showing exactly what data is being accessed</li>
                    <li>Option to disconnect your wallet at any time</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-white">Authentication & Authorization</h3>
                  <p>
                    We use secure authentication methods to protect your account:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Strong password requirements with secure hashing</li>
                    <li>Email verification for account creation</li>
                    <li>Session timeout and automatic logout after periods of inactivity</li>
                    <li>IP monitoring to detect suspicious login attempts</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-white">Incident Response</h3>
                  <p>
                    We have a comprehensive incident response plan to address security incidents promptly:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Dedicated security team for monitoring and responding to incidents</li>
                    <li>Defined procedures for containing and mitigating security breaches</li>
                    <li>Transparent communication with affected users in case of a breach</li>
                    <li>Continuous improvement of security measures based on incident analysis</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-white">Security Best Practices for Users</h3>
                  <p>
                    We recommend the following security practices for all users:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Use unique, strong passwords for your Solana Volume Bot account</li>
                    <li>Keep your email account secure as it's used for account recovery</li>
                    <li>Be vigilant against phishing attempts - we will never ask for your private keys</li>
                    <li>Keep your operating system and browser updated</li>
                    <li>Log out of your account when using shared computers</li>
                  </ul>
                  
                  <div className="p-4 bg-[#0c0c15] rounded-lg border border-amber-500/30 mt-6">
                    <p className="text-amber-400 font-medium mb-2">Reporting Security Issues</p>
                    <p className="text-gray-300 text-sm">
                      If you discover a security vulnerability or have concerns about the security of our platform, please contact us immediately at security@solanavolumebot.io. We take all security reports seriously and will investigate promptly.
                    </p>
                  </div>
                </div>
              </LegalSection>
              
              <LegalSection 
                title="Disclaimer" 
                icon={<AlertTriangle className="h-5 w-5" />}
                id="disclaimer"
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
              >
                <div className="space-y-6">
                  <div className="p-4 bg-[#0c0c15] rounded-lg border border-amber-700/30">
                    <h3 className="font-semibold text-amber-300 mb-2">Important Risk Disclosure</h3>
                    <p className="text-amber-100/80 text-sm">
                      The information on this website is for informational and educational purposes only.
                      It is not intended to be and does not constitute financial advice or any other advice.
                    </p>
                  </div>
                
                  <h3 className="text-lg font-semibold text-white">1. Not Financial Advice</h3>
                  <p>The Solana Volume Bot is a technical visibility service only. Nothing on this website, in our communications, or in our service constitutes professional and/or financial advice. All content is for informational purposes only.</p>
                  
                  <h3 className="text-lg font-semibold text-white">2. No Investment Recommendations</h3>
                  <p>We do not make recommendations regarding the purchase, sale, or holding of any cryptocurrencies or tokens. Our service is solely designed to enhance the visibility of Solana tokens through optimized transaction patterns.</p>
                  
                  <h3 className="text-lg font-semibold text-white">3. High-Risk Activity</h3>
                  <p>Cryptocurrency trading and token creation involve substantial risk and are not suitable for all individuals. The high degree of price volatility can result in significant or complete losses of investment.</p>
                  
                  <h3 className="text-lg font-semibold text-white">4. No Guarantees of Outcomes</h3>
                  <p>We do not guarantee any specific outcomes, including but not limited to: price appreciation, trading volumes beyond those directly facilitated by our service, listing on exchanges, or market success of any kind.</p>
                  
                  <h3 className="text-lg font-semibold text-white">5. Technical Limitations</h3>
                  <p>Our service operates within the constraints of the Solana blockchain and may be affected by network congestion, technical failures, or protocol changes. We do not guarantee uninterrupted service or specific performance metrics.</p>
                  
                  <h3 className="text-lg font-semibold text-white">6. Regulatory Compliance</h3>
                  <p>Users are solely responsible for ensuring that their use of our service complies with all applicable laws and regulations in their jurisdiction. Regulatory frameworks for cryptocurrencies vary by location and are subject to change.</p>
                  
                  <h3 className="text-lg font-semibold text-white">7. Third-Party Services</h3>
                  <p>Our service interacts with third-party platforms such as DEXTools and Pump.fun. We have no control over the policies, terms of service, or technical operations of these platforms and cannot guarantee continued compatibility or visibility.</p>
                  
                  <h3 className="text-lg font-semibold text-white">8. No Professional Relationship</h3>
                  <p>Use of our service does not create any professional-client relationship, fiduciary duty, or other special relationship between you and Solana Volume Bot beyond what is explicitly stated in our Terms of Service.</p>
                  
                  <h3 className="text-lg font-semibold text-white">9. Independent Verification</h3>
                  <p>Users should independently verify all information and conduct their own research before making any financial decisions related to cryptocurrencies or the use of our service.</p>
                </div>
              </LegalSection>
              
              <LegalSection 
                title="DMCA Policy" 
                icon={<Edit3 className="h-5 w-5" />}
                id="dmca"
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
              >
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-white">1. Digital Millennium Copyright Act Notice</h3>
                  <p>The Solana Volume Bot respects the intellectual property rights of others and expects its users to do the same. In accordance with the Digital Millennium Copyright Act (DMCA), we will respond to notices of alleged copyright infringement.</p>
                  
                  <h3 className="text-lg font-semibold text-white">2. DMCA Notification Requirements</h3>
                  <p>To file a copyright infringement notification with our service, you will need to send a written communication that includes substantially the following information:</p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li>A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
                    <li>Identification of the copyrighted work claimed to have been infringed, or, if multiple copyrighted works are covered by a single notification, a representative list of such works.</li>
                    <li>Identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled, and information reasonably sufficient to permit the service to locate the material.</li>
                    <li>Information reasonably sufficient to permit the service to contact you, such as an address, telephone number, and, if available, an electronic mail address at which you may be contacted.</li>
                    <li>A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.</li>
                    <li>A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-white">3. Where to Send DMCA Notices</h3>
                  <p>DMCA notices concerning our service should be sent to our designated agent at dmca@solanavolumebot.io or via postal mail to our registered business address.</p>
                  
                  <h3 className="text-lg font-semibold text-white">4. Counter-Notification</h3>
                  <p>If material that you have posted to the Solana Volume Bot service has been taken down, you may file a counter-notification by providing the following information:</p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li>Your physical or electronic signature.</li>
                    <li>Identification of the material that has been removed or to which access has been disabled and the location at which the material appeared before it was removed or access to it was disabled.</li>
                    <li>A statement under penalty of perjury that you have a good faith belief that the material was removed or disabled as a result of mistake or misidentification of the material to be removed or disabled.</li>
                    <li>Your name, address, and telephone number, and a statement that you consent to the jurisdiction of Federal District Court for the judicial district in which the service is located, and that you will accept service of process from the person who provided notification of the alleged infringement.</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-white">5. Policy Against Repeat Infringers</h3>
                  <p>In appropriate circumstances, the service will disable and/or terminate the accounts of users who are repeat infringers of the copyrights of others. We consider a "repeat infringer" to be any user who has uploaded content to our service and for whom we have received more than two takedown notices.</p>
                </div>
              </LegalSection>
              
              <LegalSection 
                title="Educational Resources" 
                icon={<BookOpen className="h-5 w-5" />}
                id="resources"
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
              >
                <div className="space-y-6">
                  <div className="p-4 bg-[#0c0c15] rounded-lg border border-[#14F195]/20">
                    <p className="text-sm text-[#14F195] mb-2">
                      <strong>Learning Resources:</strong> The following educational materials are provided to help you understand token visibility strategies, analytics, and security best practices.
                    </p>
                  </div>
                
                  {/* Token Visibility Guide */}
                  <div className="p-5 bg-[#0A0A12] rounded-lg border border-[#1e2035] hover:border-[#14F195]/30 transition-all">
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <FileText className="text-[#14F195] h-5 w-5" />
                      Token Visibility Guide
                    </h3>
                    
                    <div className="space-y-4">
                      <p>Understanding how tokens gain visibility on decentralized exchanges (DEXs) is essential for project success. This guide covers the fundamentals of token visibility.</p>
                      
                      <h4 className="text-md font-medium text-[#14F195]">Key Topics:</h4>
                      <ul className="list-disc pl-6 space-y-1 text-gray-300">
                        <li>Understanding DEX listing factors</li>
                        <li>Volume indicators and their significance</li>
                        <li>Organic growth vs. artificial patterns</li>
                        <li>Creating sustainable visibility strategies</li>
                        <li>Analyzing successful token visibility patterns</li>
                      </ul>
                      
                      <p className="text-sm text-gray-400 italic">
                        Our comprehensive guidelines help you navigate token visibility challenges while maintaining ethical practices and regulatory compliance.
                      </p>
                    </div>
                  </div>
                  
                  {/* Volume Optimization Guide */}
                  <div className="p-5 bg-[#0A0A12] rounded-lg border border-[#1e2035] hover:border-[#14F195]/30 transition-all">
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <FileText className="text-[#9945FF] h-5 w-5" />
                      Volume Optimization Guide
                    </h3>
                    
                    <div className="space-y-4">
                      <p>Understanding how to optimize volume distribution is crucial for token visibility. This guide explains effective volume strategies and DEX ranking factors.</p>
                      
                      <h4 className="text-md font-medium text-[#9945FF]">Key Topics:</h4>
                      <ul className="list-disc pl-6 space-y-1 text-gray-300">
                        <li>Optimizing volume distribution patterns</li>
                        <li>Understanding DEX ranking algorithms</li>
                        <li>Implementing sustainable visibility strategies</li>
                        <li>Balancing transaction frequencies and sizes</li>
                        <li>Recognizing effective vs. inefficient volume patterns</li>
                      </ul>
                      
                      <p className="text-sm text-gray-400 italic">
                        This educational guide helps you understand visibility optimization without making investment recommendations.
                      </p>
                    </div>
                  </div>
                  
                  {/* Security Best Practices */}
                  <div className="p-5 bg-[#0A0A12] rounded-lg border border-[#1e2035] hover:border-[#14F195]/30 transition-all">
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <ShieldCheck className="text-[#03E1FF] h-5 w-5" />
                      Security Best Practices
                    </h3>
                    
                    <div className="space-y-4">
                      <p>Security is paramount in the blockchain ecosystem. This guide covers essential security practices for token creators and traders.</p>
                      
                      <h4 className="text-md font-medium text-[#03E1FF]">Key Topics:</h4>
                      <ul className="list-disc pl-6 space-y-1 text-gray-300">
                        <li>Wallet security best practices</li>
                        <li>Smart contract audit importance</li>
                        <li>Recognizing phishing and scam attempts</li>
                        <li>API key management and security</li>
                        <li>Multi-signature protection strategies</li>
                      </ul>
                      
                      <p className="text-sm text-gray-400 italic">
                        These educational materials are regularly updated to reflect current security standards and emerging threats in the blockchain ecosystem.
                      </p>
                    </div>
                  </div>
                  
                  {/* Contact for More Resources */}
                  <div className="p-4 bg-[#0c0c15] rounded-lg border border-[#1e2035] mt-8">
                    <p className="text-center text-gray-400">
                      Need more specialized resources? <button onClick={() => handleSectionChange('contact')} className="text-[#14F195] hover:underline">Contact our team</button> for personalized educational materials.
                    </p>
                  </div>
                </div>
              </LegalSection>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};