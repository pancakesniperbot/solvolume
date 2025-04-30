import { TrendingUp, Monitor, Shield, Wallet, BarChart2, Users, Target, BarChart, Rocket, Clock, Award, Zap } from "lucide-react";
import { SiSolana } from "react-icons/si";
import type { FeatureDetailContent } from "@/components/FeatureDetailModal";

// Helper function to create consistent heading styles
const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg font-medium text-[#14F195] mt-4 mb-2">{children}</h3>
);

// Helper function for bullet points
const BulletList = ({ items }: { items: string[] }) => (
  <ul className="list-disc list-outside ml-6 space-y-1 text-gray-300">
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);

// Volume Generation Content
export const volumeGenerationContent: FeatureDetailContent = {
  title: "Volume Generation",
  icon: <TrendingUp className="h-6 w-6 text-[#14F195]" />,
  description: (
    <>
      <p>
        Our Volume Generation system creates organic-looking trading patterns that help your token gain visibility on major tracking platforms like DEXTools, DexScreener, and CoinGecko.
      </p>
      
      <SectionHeading>How It Works</SectionHeading>
      <p>
        The Solana Volume Bot uses sophisticated algorithms to distribute buy and sell orders across multiple wallets, DEXes, and time periods, mimicking natural market activity.
      </p>
      
      <SectionHeading>Key Features</SectionHeading>
      <BulletList 
        items={[
          "Distributed transactions across multiple DEXes (Jupiter, Raydium, Orca)",
          "Variable order sizes to create natural-looking patterns",
          "Random time intervals between transactions to avoid detection",
          "Smart volume allocation based on market conditions and token liquidity",
          "Real-time adjustments to maintain optimal buy/sell ratios"
        ]}
      />
      
      <SectionHeading>Benefits for Your Token</SectionHeading>
      <BulletList 
        items={[
          "Increased visibility on DEXTools and other tracking platforms",
          "Higher ranking in 'Most Active' and 'Trending' sections",
          "Greater exposure to potential investors and traders",
          "Enhanced token credibility through consistent trading activity",
          "Improved liquidity attracting larger investors"
        ]}
      />
      
      <p className="mt-4 text-sm text-gray-400">
        Our Volume Generation system is fully compliant with Solana network guidelines and employs anti-detection technologies to ensure sustainable, long-term results.
      </p>
    </>
  )
};

// Real-time Monitoring Content
export const realTimeMonitoringContent: FeatureDetailContent = {
  title: "Real-time Monitoring",
  icon: <Monitor className="h-6 w-6 text-[#03E1FF]" />,
  description: (
    <>
      <p>
        Our advanced Real-time Monitoring system provides comprehensive visibility into your token's performance across all major Solana DEX platforms, enabling data-driven decision making.
      </p>
      
      <SectionHeading>Dashboard Analytics</SectionHeading>
      <p>
        The monitoring dashboard offers a complete overview of your token's market performance with intuitive visualizations and real-time metrics.
      </p>
      
      <BulletList 
        items={[
          "Live price tracking with second-by-second updates",
          "Volume analysis across multiple DEXes (Jupiter, Raydium, Orca)",
          "Liquidity depth charts and pool composition metrics",
          "Whale wallet monitoring for large holder activity",
          "Social sentiment tracking from Twitter, Telegram, and Discord"
        ]}
      />
      
      <SectionHeading>Alert System</SectionHeading>
      <p>
        Stay informed of critical events with our customizable alert system that can notify you via email, SMS, or Telegram.
      </p>
      
      <BulletList 
        items={[
          "Price movement thresholds (configurable percentage changes)",
          "Unusual trading activity detection",
          "Large buy/sell order notifications",
          "Liquidity pool imbalance warnings",
          "DEX ranking position changes"
        ]}
      />
      
      <SectionHeading>Competitive Analysis</SectionHeading>
      <p>
        Compare your token's performance against competitors and market benchmarks to identify opportunities and threats.
      </p>
      
      <p className="mt-4 text-sm text-gray-400">
        Our monitoring system aggregates data from multiple sources to provide the most comprehensive view of your token's market presence and performance.
      </p>
    </>
  )
};

// Anti-Detection System Content
export const antiDetectionContent: FeatureDetailContent = {
  title: "Anti-Detection System",
  icon: <Shield className="h-6 w-6 text-[#DC1FFF]" />,
  description: (
    <>
      <p>
        Our proprietary Anti-Detection System creates natural trading patterns that bypass monitoring systems used by exchanges and tracking platforms, ensuring sustainable long-term visibility.
      </p>
      
      <SectionHeading>Advanced Technologies</SectionHeading>
      <BulletList 
        items={[
          "Machine learning algorithms that analyze and replicate natural market behavior",
          "Behavioral pattern randomization to avoid predictable trading signatures",
          "Time-variance protocols that adjust transaction timing based on market conditions",
          "IP rotation and wallet fingerprint diversification",
          "Transaction size variability to mimic organic trading activity"
        ]}
      />
      
      <SectionHeading>Risk Mitigation Strategies</SectionHeading>
      <p>
        Our system employs multiple safeguards to protect your token's reputation and ensure compliance with platform guidelines.
      </p>
      
      <BulletList 
        items={[
          "Transaction velocity controls to avoid triggering exchange monitoring systems",
          "Gradual volume building rather than sudden spikes",
          "Natural buy/sell ratio maintenance within market norms",
          "Cross-DEX distribution to prevent concentration flags",
          "Adaptive response to exchange algorithm updates"
        ]}
      />
      
      <SectionHeading>Continuous Improvement</SectionHeading>
      <p>
        Our anti-detection systems constantly evolve to stay ahead of exchange monitoring algorithms.
      </p>
      
      <p className="mt-4 text-sm text-gray-400">
        The anti-detection technology undergoes regular updates based on the latest market intelligence and exchange policy changes to maintain effectiveness.
      </p>
    </>
  )
};

// Multi-Wallet Support Content
export const multiWalletContent: FeatureDetailContent = {
  title: "Multi-Wallet Support",
  icon: <Wallet className="h-6 w-6 text-[#9945FF]" />,
  description: (
    <>
      <p>
        Our Multi-Wallet Support system creates realistic distributed trading activity across the Solana blockchain, enhancing the natural appearance of volume and reducing detection risk.
      </p>
      
      <SectionHeading>Wallet Management</SectionHeading>
      <p>
        The platform intelligently manages multiple wallet addresses to create diverse trading patterns.
      </p>
      
      <BulletList 
        items={[
          "Automated creation and management of up to 50+ unique wallet addresses",
          "Smart fund distribution across wallets based on trading strategy",
          "Wallet aging protocols to establish credibility and history",
          "Variable wallet balance maintenance to appear natural",
          "Cross-wallet transaction patterns that mimic real trader networks"
        ]}
      />
      
      <SectionHeading>Transaction Distribution</SectionHeading>
      <p>
        Transactions are strategically distributed across multiple wallets to create natural on-chain activity.
      </p>
      
      <BulletList 
        items={[
          "Varied transaction sizes tailored to each wallet's balance history",
          "Realistic timing intervals between wallet activities",
          "Natural progression of trading behavior for each wallet identity",
          "Cross-DEX trading patterns unique to each wallet",
          "Simulated trader behavior profiles assigned to wallet clusters"
        ]}
      />
      
      <SectionHeading>Security Features</SectionHeading>
      <p>
        Our system incorporates robust security measures to protect wallet assets and privacy.
      </p>
      
      <p className="mt-4 text-sm text-gray-400">
        The multi-wallet architecture is designed to create a network of seemingly independent trading activities that collectively enhance your token's market presence while maintaining a natural appearance.
      </p>
    </>
  )
};

// Automated Multithreaded Trades Content
export const automatedTradesContent: FeatureDetailContent = {
  title: "Automated Multithreaded Trades",
  icon: <BarChart2 className="h-6 w-6 text-[#00FFA3]" />,
  description: (
    <>
      <p>
        Our Automated Multithreaded Trading system executes complex trading strategies across multiple threads simultaneously, creating natural market patterns while maximizing visibility.
      </p>
      
      <SectionHeading>Technical Infrastructure</SectionHeading>
      <p>
        The system utilizes advanced parallel processing architecture to manage multiple trading operations simultaneously.
      </p>
      
      <BulletList 
        items={[
          "Concurrent execution of up to 24 independent trading threads",
          "Load-balanced transaction distribution across Solana validators",
          "Real-time market data processing with microsecond latency",
          "Autonomous decision-making based on 20+ market indicators",
          "Self-optimizing algorithms that improve over time"
        ]}
      />
      
      <SectionHeading>Trading Pattern Intelligence</SectionHeading>
      <p>
        Our algorithms create sophisticated trading patterns that mimic natural market behavior.
      </p>
      
      <BulletList 
        items={[
          "Price-sensitive order sizing based on volatility analysis",
          "Momentum-based trading acceleration and deceleration",
          "Support and resistance level awareness",
          "Market sentiment responsiveness",
          "Liquidity-aware order placement strategies"
        ]}
      />
      
      <SectionHeading>Performance Optimization</SectionHeading>
      <p>
        The system continuously optimizes for maximum impact with minimal resources.
      </p>
      
      <p className="mt-4 text-sm text-gray-400">
        Multithreaded trading allows for complex market behaviors that appear natural while strategically enhancing visibility metrics tracked by DEXTools and similar platforms.
      </p>
    </>
  )
};

// Attract New Holders & Whales Content
export const attractHoldersContent: FeatureDetailContent = {
  title: "Attract New Holders & Whales",
  icon: <Users className="h-6 w-6 text-[#DC1FFF]" />,
  description: (
    <>
      <p>
        Our system is designed to increase your token's visibility and appeal to both retail investors and large holders (whales), creating sustainable growth in your holder base.
      </p>
      
      <SectionHeading>Visibility Enhancement</SectionHeading>
      <p>
        Strategic volume distribution increases your token's ranking and prominence on key platforms.
      </p>
      
      <BulletList 
        items={[
          "Optimized trading patterns to achieve and maintain 'Trending' status",
          "Strategic placement in DEXTools and DexScreener hot lists",
          "Enhanced token metrics to improve ranking in filters and searches",
          "Consistent presence in 24h volume gainers lists",
          "Improved social sentiment indicators"
        ]}
      />
      
      <SectionHeading>Whale Attraction Strategies</SectionHeading>
      <p>
        Specific techniques designed to capture the attention of larger investors looking for new opportunities.
      </p>
      
      <BulletList 
        items={[
          "Liquidity depth improvements to accommodate larger positions",
          "Stability indicators that signal investment safety",
          "Progressive volume growth that suggests organic adoption",
          "Favorable technical analysis pattern formation",
          "Targeted visibility in whale-focused communities and platforms"
        ]}
      />
      
      <SectionHeading>Holder Retention Mechanics</SectionHeading>
      <p>
        Beyond attraction, our system incorporates strategies to encourage longer holding periods.
      </p>
      
      <p className="mt-4 text-sm text-gray-400">
        The combination of increased visibility, favorable market metrics, and strategic trading patterns creates an environment conducive to organic growth in both retail and whale investment.
      </p>
    </>
  )
};

// Create FOMO & Trending Status Content
export const createFOMOContent: FeatureDetailContent = {
  title: "Create FOMO & Trending Status",
  icon: <Target className="h-6 w-6 text-[#00FFA3]" />,
  description: (
    <>
      <p>
        Our system strategically generates excitement and FOMO (Fear of Missing Out) by optimizing for the specific metrics that drive trending status on DEXTools, Pump.Fun, and Dexscreener.
      </p>
      
      <SectionHeading>Understanding Trending Algorithms</SectionHeading>
      <p>
        We've reverse-engineered the key factors that influence trending status on major platforms.
      </p>
      
      <BulletList 
        items={[
          "DEXTools trending algorithm optimization (volume, transactions, unique wallets)",
          "Dexscreener visibility metrics enhancement (volume peaks, consistency, growth rate)",
          "CoinGecko and CoinMarketCap ranking factor alignment",
          "Pump.Fun and similar platform trending thresholds targeting",
          "Cross-platform consistency to maximize composite visibility"
        ]}
      />
      
      <SectionHeading>FOMO Generation Techniques</SectionHeading>
      <p>
        Strategic trading patterns create psychological triggers for investment momentum.
      </p>
      
      <BulletList 
        items={[
          "Calculated volume surges timed for maximum visibility",
          "Strategic price candle formation to create positive chart patterns",
          "Buy pressure simulation during key trading windows",
          "Momentum building through progressive volume increases",
          "Social signal amplification through trading activity"
        ]}
      />
      
      <SectionHeading>Sustainable Momentum Building</SectionHeading>
      <p>
        Rather than short-lived pumps, our system builds sustainable, long-term momentum.
      </p>
      
      <p className="mt-4 text-sm text-gray-400">
        The FOMO generation strategy uses psychological market principles combined with technical trading patterns to create organic excitement while maintaining compliance with platform guidelines.
      </p>
    </>
  )
};

// Real-Time Performance Analytics Content
export const performanceAnalyticsContent: FeatureDetailContent = {
  title: "Real-Time Performance Analytics",
  icon: <BarChart className="h-6 w-6 text-blue-400" />,
  description: (
    <>
      <p>
        Our comprehensive analytics dashboard provides deep insights into your token's performance, trading patterns, and market position with real-time data visualization.
      </p>
      
      <SectionHeading>Core Metrics Dashboard</SectionHeading>
      <p>
        View essential performance indicators at a glance with intuitive visualizations.
      </p>
      
      <BulletList 
        items={[
          "Real-time price tracking with microsecond precision",
          "Volume analytics broken down by DEX, time period, and wallet category",
          "Holder growth and distribution metrics",
          "Liquidity depth and stability measurements",
          "Volatility and price action patterns"
        ]}
      />
      
      <SectionHeading>Competitive Benchmarking</SectionHeading>
      <p>
        Compare your token's performance against similar projects and market segments.
      </p>
      
      <BulletList 
        items={[
          "Side-by-side comparison with comparable tokens",
          "Market segment performance indexing",
          "Relative volume and growth velocity metrics",
          "Visibility ranking across major platforms",
          "Share of voice in Solana ecosystem"
        ]}
      />
      
      <SectionHeading>Predictive Analytics</SectionHeading>
      <p>
        AI-powered forecasting to anticipate market trends and optimize strategy.
      </p>
      
      <BulletList 
        items={[
          "Volume threshold predictions for reaching trending status",
          "Liquidity requirement forecasting",
          "Holder growth projection models",
          "Price resistance and support prediction",
          "Optimal trading window identification"
        ]}
      />
      
      <p className="mt-4 text-sm text-gray-400">
        Our analytics platform processes terabytes of on-chain data to provide actionable insights that allow for real-time strategy adjustments and optimization.
      </p>
    </>
  )
};

// Strategic Volume Distribution Content
export const volumeDistributionContent: FeatureDetailContent = {
  title: "Strategic Volume Distribution",
  icon: <Rocket className="h-6 w-6 text-[#DC1FFF]" />,
  description: (
    <>
      <p>
        Our Strategic Volume Distribution system intelligently allocates trading activity across multiple DEXes to maximize visibility while creating natural market dynamics.
      </p>
      
      <SectionHeading>Multi-DEX Optimization</SectionHeading>
      <p>
        Trading activity is strategically distributed across the Solana ecosystem's top DEXes.
      </p>
      
      <BulletList 
        items={[
          "Jupiter - Primary focus for major visibility metrics",
          "Raydium - Strategic presence for liquidity pool visibility",
          "Orca - Complementary volume for ecosystem-wide recognition",
          "OpenBook - Targeted placements for specific investor segments",
          "Cross-DEX arbitrage patterns for natural trading appearance"
        ]}
      />
      
      <SectionHeading>Time-Based Distribution</SectionHeading>
      <p>
        Volume allocation is optimized across different time periods for maximum impact.
      </p>
      
      <BulletList 
        items={[
          "Peak trading hour focus for maximum visibility",
          "Strategic overnight activity to maintain 24h metrics",
          "Time zone optimization for global market coverage",
          "Pattern variation to prevent predictability",
          "Event-based timing around market announcements"
        ]}
      />
      
      <SectionHeading>Wallet-Based Distribution</SectionHeading>
      <p>
        Trading is distributed across multiple wallet types to create natural on-chain footprints.
      </p>
      
      <p className="mt-4 text-sm text-gray-400">
        The strategic distribution of volume is continuously optimized based on real-time market conditions, DEX algorithm changes, and performance analytics.
      </p>
    </>
  )
};

// Customizable Trading Parameters Content
export const tradingParametersContent: FeatureDetailContent = {
  title: "Customizable Trading Parameters",
  icon: <Clock className="h-6 w-6 text-amber-400" />,
  description: (
    <>
      <p>
        Our platform provides extensive customization options to tailor the trading strategy to your token's specific goals, market conditions, and target audience.
      </p>
      
      <SectionHeading>Volume Configuration</SectionHeading>
      <p>
        Fine-tune your volume strategy with precise control over key parameters.
      </p>
      
      <BulletList 
        items={[
          "Daily volume targets with automatic distribution",
          "Volume scaling based on market capitalization",
          "Buy/sell ratio customization",
          "Transaction size variability configuration",
          "Volume ramp-up and sustain phases"
        ]}
      />
      
      <SectionHeading>Timing Customization</SectionHeading>
      <p>
        Control when and how your token's trading activity is distributed.
      </p>
      
      <BulletList 
        items={[
          "24-hour activity distribution planning",
          "Peak hour optimization",
          "Event-based volume adjustments",
          "Trading session intensity configuration",
          "Geographic time zone targeting"
        ]}
      />
      
      <SectionHeading>Strategy Templates</SectionHeading>
      <p>
        Choose from pre-configured strategies or create your own custom approach.
      </p>
      
      <BulletList 
        items={[
          "'Trending Push' - Optimized for achieving trending status",
          "'Steady Growth' - Consistent, sustainable volume increase",
          "'Launch Acceleration' - Ideal for new token launches",
          "'Whale Attraction' - Configured to appeal to larger investors",
          "'Reversal Pattern' - Designed to change negative momentum"
        ]}
      />
      
      <p className="mt-4 text-sm text-gray-400">
        All parameters can be adjusted in real-time through our intuitive dashboard, allowing for dynamic strategy adaptation based on market conditions.
      </p>
    </>
  )
};

// Anti-Detection Technology Content
export const antiDetectionTechnologyContent: FeatureDetailContent = {
  title: "Anti-Detection Technology",
  icon: <Shield className="h-6 w-6 text-green-400" />,
  description: (
    <>
      <p>
        Our proprietary Anti-Detection Technology employs sophisticated algorithms to ensure trading patterns appear natural and pass exchange monitoring systems for sustainable long-term visibility.
      </p>
      
      <SectionHeading>Pattern Analysis & Replication</SectionHeading>
      <p>
        Our system studies and replicates natural trading behaviors to create authentic-looking activity.
      </p>
      
      <BulletList 
        items={[
          "Machine learning models trained on millions of legitimate transactions",
          "Behavioral fingerprint randomization",
          "Natural market reaction simulation",
          "Organic volume fluctuation patterns",
          "Realistic trading velocity variations"
        ]}
      />
      
      <SectionHeading>Technical Countermeasures</SectionHeading>
      <p>
        Advanced technical approaches to avoid detection by monitoring systems.
      </p>
      
      <BulletList 
        items={[
          "Transaction signature diversification",
          "Wallet behavioral profiling to avoid patterns",
          "Connection methodology randomization",
          "Timing entropy introduction",
          "Cross-chain footprint management"
        ]}
      />
      
      <SectionHeading>Adaptive Response System</SectionHeading>
      <p>
        Our technology continuously adapts to changes in detection methods.
      </p>
      
      <BulletList 
        items={[
          "Real-time monitoring of exchange policy updates",
          "Dynamic strategy adjustment based on detection risk analysis",
          "Pattern rotation to prevent fingerprinting",
          "Progressive learning from successful transactions",
          "Continuous improvement through market research"
        ]}
      />
      
      <p className="mt-4 text-sm text-gray-400">
        Our anti-detection technology is the product of years of research into market behaviors and exchange monitoring systems, providing unmatched sustainability for volume strategies.
      </p>
    </>
  )
};

// 24/7 Automated Operation Content
export const automatedOperationContent: FeatureDetailContent = {
  title: "24/7 Automated Operation",
  icon: <Award className="h-6 w-6 text-blue-400" />,
  description: (
    <>
      <p>
        Our system operates continuously around the clock, monitoring market conditions and executing your trading strategy without requiring manual intervention.
      </p>
      
      <SectionHeading>Autonomous Trading Engine</SectionHeading>
      <p>
        The core automation system handles all aspects of strategy execution.
      </p>
      
      <BulletList 
        items={[
          "Continuous operation across all time zones",
          "Self-healing architecture with redundant systems",
          "Automatic adaptation to market conditions",
          "Smart scheduling of trading activity",
          "Dynamic resource allocation based on needs"
        ]}
      />
      
      <SectionHeading>Monitoring & Safety Systems</SectionHeading>
      <p>
        Comprehensive safeguards ensure reliable operation and risk management.
      </p>
      
      <BulletList 
        items={[
          "Real-time performance monitoring and alerts",
          "Automatic anomaly detection and response",
          "Failsafe protocols for unexpected market events",
          "Budget management and spend limiting",
          "System health checks and diagnostics"
        ]}
      />
      
      <SectionHeading>Reporting & Notifications</SectionHeading>
      <p>
        Stay informed about your campaign's performance without constant monitoring.
      </p>
      
      <BulletList 
        items={[
          "Daily performance reports delivered via email",
          "Critical event alerts via SMS or Telegram",
          "Milestone achievement notifications",
          "Weekly strategy summaries and recommendations",
          "Monthly performance analytics and insights"
        ]}
      />
      
      <p className="mt-4 text-sm text-gray-400">
        The fully automated system allows you to focus on your project's development and community building while the volume strategy executes consistently in the background.
      </p>
    </>
  )
};

// SOL-Optimized Architecture Content
export const solArchitectureContent: FeatureDetailContent = {
  title: "SOL-Optimized Architecture",
  icon: <SiSolana className="h-6 w-6 text-[#00FFA3]" />,
  description: (
    <>
      <p>
        Our platform is built specifically for the Solana blockchain, taking full advantage of its unique capabilities, low fees, and high transaction speeds to maximize effectiveness.
      </p>
      
      <SectionHeading>Solana-Native Development</SectionHeading>
      <p>
        The entire system is architected from the ground up for Solana's specific characteristics.
      </p>
      
      <BulletList 
        items={[
          "Direct integration with Solana Program Library (SPL)",
          "Optimized transaction construction for minimal fees",
          "High-throughput processing capabilities matching Solana's capacity",
          "Low-latency order execution leveraging Solana's speed",
          "Token program-specific optimizations"
        ]}
      />
      
      <SectionHeading>DEX Integration Framework</SectionHeading>
      <p>
        Seamless interaction with Solana's decentralized exchange ecosystem.
      </p>
      
      <BulletList 
        items={[
          "Native Jupiter aggregator integration for best execution",
          "Direct Raydium liquidity pool interaction",
          "Orca Whirlpools compatible trading",
          "OpenBook order book management",
          "Cross-DEX arbitrage capabilities"
        ]}
      />
      
      <SectionHeading>Technical Advantages</SectionHeading>
      <p>
        The Solana-specific architecture provides significant benefits over generic solutions.
      </p>
      
      <BulletList 
        items={[
          "Transaction costs reduced by up to 98% compared to Ethereum-based systems",
          "Processing speed up to 65,000 transactions per second",
          "Sub-second finality for real-time strategy adjustments",
          "Efficient RPC management for reliable connections",
          "Multi-instruction transactions for complex trading patterns"
        ]}
      />
      
      <p className="mt-4 text-sm text-gray-400">
        By focusing exclusively on Solana, our system achieves levels of efficiency, speed, and cost-effectiveness that wouldn't be possible on other blockchains.
      </p>
    </>
  )
};

// Export all content in a map for easy access
export const featureDetailsMap = {
  "Volume Generation": volumeGenerationContent,
  "Real-time Monitoring": realTimeMonitoringContent,
  "Anti-Detection System": antiDetectionContent,
  "Multi-Wallet Support": multiWalletContent,
  "Automated Multithreaded Trades": automatedTradesContent,
  "Attract New Holders & Whales": attractHoldersContent,
  "Create FOMO & Trending Status": createFOMOContent,
  "Real-Time Performance Analytics": performanceAnalyticsContent,
  "Strategic Volume Distribution": volumeDistributionContent,
  "Customizable Trading Parameters": tradingParametersContent,
  "Anti-Detection Technology": antiDetectionTechnologyContent,
  "24/7 Automated Operation": automatedOperationContent,
  "SOL-Optimized Architecture": solArchitectureContent
};