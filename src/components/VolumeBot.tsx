import { AccessibleButton } from '@/components/ui/accessible-button';

<div className="container mx-auto px-4">
  <div className="flex flex-col gap-8">
    <div className="flex flex-col md:flex-row justify-between items-start gap-6">
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-white mb-4">Solana Volume Bot</h1>
        <p className="text-gray-300 mb-6">
          The Solana Volume Bot sentiment analysis tools provide real-time data from multiple DEXs to help you make informed trading decisions.
        </p>
        <div className="flex flex-wrap gap-4">
          <AccessibleButton 
            label="Get Started"
            description="Start using the Solana Volume Bot"
            variant="primary"
            size="md"
          />
          <AccessibleButton 
            label="Learn More"
            description="Learn more about the Solana Volume Bot features"
            variant="secondary"
            size="md"
          />
        </div>
      </div>
    </div>

    <section className="py-16 bg-[#0a0b14] relative overflow-hidden cyberpunk-grid">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-white mb-8">Live Sentiment Analysis</h2>
        <p className="text-gray-200 mb-8">
          Professional market sentiment analysis tools for Solana tokens, providing real-time insights and volume metrics.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[#0c0c15] border border-[#1e2035] rounded-lg p-6 shadow-[0_0_30px_rgba(20,241,149,0.1)]">
            <h3 className="text-xl font-semibold text-white mb-4">Token Volume Bot Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">SolanaVolume</span>
                <span className="text-[#FF6B6B] font-medium">Bearish</span>
              </div>
              <p className="text-gray-200">Current volume bot conditions</p>
            </div>
          </div>

          <div className="bg-[#0c0c15] border border-[#1e2035] rounded-lg p-6 shadow-[0_0_30px_rgba(20,241,149,0.1)]">
            <h3 className="text-xl font-semibold text-white mb-4">Market Statistics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Trades</span>
                <span className="text-[#14F195] font-medium">23,394,957</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Volatility Index</span>
                <span className="text-[#14F195] font-medium">46.2 VI</span>
              </div>
            </div>
          </div>

          <div className="bg-[#0c0c15] border border-[#1e2035] rounded-lg p-6 shadow-[0_0_30px_rgba(20,241,149,0.1)]">
            <h3 className="text-xl font-semibold text-white mb-4">Market Sentiment</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Overall Sentiment</span>
                <span className="text-[#14F195] font-medium">Neutral</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Market Volatility</span>
                <span className="text-[#14F195] font-medium">Medium</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0c0c15] border border-[#1e2035] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Solana (SOL)</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">Price</span>
                <span className="text-white">$148.50</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">24h Volume</span>
                <span className="text-white">$1.73M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">24h Change</span>
                <span className="text-[#FF6B6B]">-1.01%</span>
              </div>
            </div>
          </div>

          <div className="bg-[#0c0c15] border border-[#1e2035] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Marinade Staked SOL (MSOL)</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">Price</span>
                <span className="text-white">$151.83</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">24h Volume</span>
                <span className="text-white">$0.00M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">24h Change</span>
                <span className="text-[#14F195]">+0.00%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button 
            className="px-4 py-2 bg-[#14F195] text-black rounded-md hover:bg-[#14F195]/90 transition-colors"
            aria-label="Refresh market data"
          >
            Refresh Data
          </button>
          <p className="text-gray-400 mt-2 text-sm">
            Last updated: {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>
    </section>

    <section className="py-16 bg-[#0a0b14] relative overflow-hidden cyberpunk-grid">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-white mb-8">Solana Volume Enhancement Advisor</h2>
        <div className="bg-[#0c0c15] border border-[#1e2035] rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center rounded-full border border-[#14F195] px-2.5 py-0.5 text-xs font-medium text-[#14F195]">
              A.I. Powered
            </span>
          </div>
          <h3 className="text-lg font-semibold text-white mb-4">Suggested Questions</h3>
          <div className="space-y-4">
            <div className="rounded-lg border border-[#1e2035] p-4">
              <p className="text-gray-200">What volume distribution strategy would you recommend for my token?</p>
              <span className="text-xs text-gray-400">Updated with real-time DEX volume data</span>
            </div>
            <div className="rounded-lg border border-[#1e2035] p-4">
              <p className="text-gray-200">How can I optimize my token's visibility on DEXs?</p>
              <span className="text-xs text-gray-400">Powered by Perplexity A.I.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</div> 