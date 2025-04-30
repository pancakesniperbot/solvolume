import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, TrendingUp, TrendingDown, AlertTriangle, BarChart3, LineChart, ArrowRight, Search, Clock, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MemeCoin, getSentimentStatus, getSentimentColor, getSentimentText } from "./MemeCoinsIndicator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FullSentimentAnalysisProps {
  isOpen: boolean;
  onClose: () => void;
  coins: MemeCoin[];
  refreshTime: Date;
}

export function FullSentimentAnalysis({ isOpen, onClose, coins, refreshTime }: FullSentimentAnalysisProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h");
  const [detailedCoin, setDetailedCoin] = useState<MemeCoin | null>(null);
  
  // Calculate aggregate sentiment metrics
  const avgSentiment = coins.reduce((sum, coin) => sum + coin.sentiment, 0) / coins.length;
  const sentimentStatus = getSentimentStatus(avgSentiment);
  const sentimentColor = getSentimentColor(sentimentStatus);
  const sentimentText = getSentimentText(sentimentStatus);
  
  const bullishCount = coins.filter(coin => coin.sentiment >= 60).length;
  const bearishCount = coins.filter(coin => coin.sentiment <= 40).length;
  const neutralCount = coins.length - bullishCount - bearishCount;
  
  const totalVolume = coins.reduce((sum, coin) => sum + coin.volume24h, 0);
  const avgPriceChange = coins.reduce((sum, coin) => sum + coin.change24h, 0) / coins.length;
  
  // Sentiment distribution data for visualization
  const sentimentDistribution = [
    { name: 'Extremely Bullish', count: coins.filter(c => c.sentiment >= 75).length, color: '#14F195' },
    { name: 'Bullish', count: coins.filter(c => c.sentiment >= 60 && c.sentiment < 75).length, color: '#4ADE80' },
    { name: 'Neutral', count: coins.filter(c => c.sentiment > 40 && c.sentiment < 60).length, color: '#9945FF' },
    { name: 'Bearish', count: coins.filter(c => c.sentiment > 25 && c.sentiment <= 40).length, color: '#FB7185' },
    { name: 'Extremely Bearish', count: coins.filter(c => c.sentiment <= 25).length, color: '#F43F5E' }
  ];
  
  // Correlation data
  const priceToSentimentCorrelation = calculateCorrelation(
    coins.map(c => c.change24h),
    coins.map(c => c.sentiment)
  );
  
  const volumeToSentimentCorrelation = calculateCorrelation(
    coins.map(c => c.volume24h),
    coins.map(c => c.sentiment)
  );
  
  // Handle ESC key press to close modal
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);
  
  // Helper function to calculate correlation between two arrays
  function calculateCorrelation(array1: number[], array2: number[]): number {
    if (array1.length !== array2.length) {
      return 0;
    }
    
    const n = array1.length;
    let sum1 = 0;
    let sum2 = 0;
    let sum1Sq = 0;
    let sum2Sq = 0;
    let pSum = 0;
    
    for (let i = 0; i < n; i++) {
      sum1 += array1[i];
      sum2 += array2[i];
      sum1Sq += array1[i] ** 2;
      sum2Sq += array2[i] ** 2;
      pSum += array1[i] * array2[i];
    }
    
    const num = pSum - (sum1 * sum2 / n);
    const den = Math.sqrt((sum1Sq - sum1 ** 2 / n) * (sum2Sq - sum2 ** 2 / n));
    
    return den === 0 ? 0 : num / den;
  }
  
  // Format correlation for display
  const formatCorrelation = (corr: number): string => {
    if (corr > 0.7) return "Strong positive";
    if (corr > 0.3) return "Moderate positive";
    if (corr > -0.3) return "Weak/No correlation";
    if (corr > -0.7) return "Moderate negative";
    return "Strong negative";
  };
  
  // Get color for correlation value
  const getCorrelationColor = (corr: number): string => {
    if (corr > 0.7) return "#14F195";
    if (corr > 0.3) return "#4ADE80"; 
    if (corr > -0.3) return "#9945FF";
    if (corr > -0.7) return "#FB7185";
    return "#F43F5E";
  };
  
  const getVolumeDescription = (volume: number): string => {
    if (volume > 20000000) return "Extremely High";
    if (volume > 10000000) return "Very High";
    if (volume > 5000000) return "High";
    if (volume > 1000000) return "Moderate";
    if (volume > 500000) return "Low";
    return "Very Low";
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-[#0c0c15] border border-[#1e2035] rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-[0_0_50px_rgba(20,241,149,0.15)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="border-b border-[#1e2035] p-4 flex justify-between items-center sticky top-0 bg-[#0c0c15] z-10">
              <div className="flex items-center gap-3">
                <Badge className="bg-[#14F195]/10 text-[#14F195] border-none py-1 px-3">
                  <BarChart3 className="h-4 w-4 mr-1" /> Advanced Analysis
                </Badge>
                <h2 className="text-xl font-bold text-white">Meme Coin Sentiment Analysis</h2>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  Updated {refreshTime.toLocaleTimeString()}
                </span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={onClose}
                  className="h-8 w-8 rounded-full hover:bg-[#1e2035]"
                  aria-label="Close sentiment analysis panel"
                  title="Close panel"
                >
                  <X className="h-4 w-4 text-gray-400" aria-hidden="true" />
                </Button>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="p-4 border-b border-[#1e2035]">
              <Tabs 
                defaultValue="overview" 
                onValueChange={setActiveTab} 
                className="w-full"
                aria-label="Market sentiment analysis sections"
              >
                <TabsList className="bg-[#1e2035]/50" role="tablist" aria-orientation="horizontal">
                  <TabsTrigger 
                    value="overview" 
                    className="data-[state=active]:bg-[#14F195]/10 data-[state=active]:text-[#14F195]"
                    role="tab"
                    aria-selected={activeTab === "overview"}
                    aria-controls="overview-tab-content"
                  >
                    Market Overview
                  </TabsTrigger>
                  <TabsTrigger 
                    value="correlation" 
                    className="data-[state=active]:bg-[#9945FF]/10 data-[state=active]:text-[#9945FF]"
                    role="tab"
                    aria-selected={activeTab === "correlation"}
                    aria-controls="correlation-tab-content"
                  >
                    Sentiment Correlation
                  </TabsTrigger>
                  <TabsTrigger 
                    value="coins" 
                    className="data-[state=active]:bg-[#03E1FF]/10 data-[state=active]:text-[#03E1FF]"
                    role="tab"
                    aria-selected={activeTab === "coins"}
                    aria-controls="coins-tab-content"
                  >
                    Individual Coins
                  </TabsTrigger>
                  <TabsTrigger 
                    value="predictions" 
                    className="data-[state=active]:bg-[#FB7185]/10 data-[state=active]:text-[#FB7185]"
                    role="tab"
                    aria-selected={activeTab === "predictions"}
                    aria-controls="predictions-tab-content"
                  >
                    AI Predictions
                  </TabsTrigger>
                </TabsList>
                
                {/* Overview Tab */}
                <TabsContent 
                  value="overview" 
                  className="mt-4"
                  role="tabpanel"
                  id="overview-tab-content"
                  aria-labelledby="overview-tab"
                  tabIndex={0}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Sentiment summary */}
                    <div className="bg-[#151525] rounded-lg p-5 border border-[#1e2035]">
                      <h3 className="text-lg font-medium text-white mb-3">Market Sentiment</h3>
                      
                      {/* Main sentiment indicator */}
                      <div className="flex items-center gap-4 mb-4 p-4 bg-[#0c0c15] rounded-lg border border-[#1e2035]">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: `${sentimentColor}20` }}>
                          {sentimentStatus.includes('bullish') ? (
                            <TrendingUp className="h-8 w-8" style={{ color: sentimentColor }} />
                          ) : sentimentStatus.includes('bearish') ? (
                            <TrendingDown className="h-8 w-8" style={{ color: sentimentColor }} />
                          ) : (
                            <AlertTriangle className="h-8 w-8" style={{ color: sentimentColor }} />
                          )}
                        </div>
                        
                        <div>
                          <h4 className="text-2xl font-bold" style={{ color: sentimentColor }}>
                            {sentimentText}
                          </h4>
                          <div className="text-gray-400">Overall market sentiment score: {avgSentiment.toFixed(1)}</div>
                        </div>
                      </div>
                      
                      {/* Distribution chart */}
                      <div className="mb-4">
                        <div className="text-sm text-gray-400 mb-2">Market Distribution</div>
                        <div className="flex gap-1 h-6 rounded-lg overflow-hidden">
                          {sentimentDistribution.map((segment, i) => (
                            segment.count > 0 && (
                              <div 
                                key={i}
                                style={{ 
                                  backgroundColor: segment.color,
                                  width: `${(segment.count / coins.length) * 100}%` 
                                }}
                                className="relative group"
                              >
                                <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#0c0c15] text-white text-xs py-1 px-2 rounded whitespace-nowrap transition-opacity duration-200 z-10">
                                  {segment.name}: {segment.count} coin{segment.count !== 1 ? 's' : ''}
                                </div>
                              </div>
                            )
                          ))}
                        </div>
                      </div>
                      
                      {/* Sentiment breakdown */}
                      <div className="bg-[#0c0c15] rounded-lg p-3 grid grid-cols-3 gap-2">
                        <div className="text-center">
                          <div className="text-lg font-medium text-[#14F195]">{bullishCount}</div>
                          <div className="text-xs text-gray-400">Bullish</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-medium text-[#9945FF]">{neutralCount}</div>
                          <div className="text-xs text-gray-400">Neutral</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-medium text-[#F43F5E]">{bearishCount}</div>
                          <div className="text-xs text-gray-400">Bearish</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Market metrics */}
                    <div className="bg-[#151525] rounded-lg p-5 border border-[#1e2035]">
                      <h3 className="text-lg font-medium text-white mb-3">Market Metrics</h3>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        {/* Total Volume */}
                        <div className="bg-[#0c0c15] rounded-lg p-4 border border-[#1e2035]">
                          <div className="text-gray-400 text-sm mb-1">Total Volume (24h)</div>
                          <div className="text-white text-2xl font-bold">
                            ${(totalVolume / 1000000).toFixed(2)}M
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Across {coins.length} tracked meme coins
                          </div>
                        </div>
                        
                        {/* Avg Price Change */}
                        <div className="bg-[#0c0c15] rounded-lg p-4 border border-[#1e2035]">
                          <div className="text-gray-400 text-sm mb-1">Avg. Price Change</div>
                          <div className={`text-2xl font-bold ${avgPriceChange >= 0 ? 'text-[#14F195]' : 'text-[#F43F5E]'}`}>
                            {avgPriceChange >= 0 ? '+' : ''}{avgPriceChange.toFixed(2)}%
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Over the last 24 hours
                          </div>
                        </div>
                      </div>
                      
                      {/* Trading Activity & Best Performer */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#0c0c15] rounded-lg p-4 border border-[#1e2035]">
                          <div className="text-gray-400 text-sm mb-1">Trading Activity</div>
                          <div className="text-white text-2xl font-bold">
                            {Math.round(totalVolume / 75000)} Trades
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Estimated across all platforms
                          </div>
                        </div>
                        
                        {/* Best Performer */}
                        {coins.length > 0 && (
                          <div className="bg-[#0c0c15] rounded-lg p-4 border border-[#1e2035]">
                            <div className="text-gray-400 text-sm mb-1">Best Performer (24h)</div>
                            <div className="text-white text-xl font-medium truncate">
                              {coins.sort((a, b) => b.change24h - a.change24h)[0].name}
                            </div>
                            <div className="text-[#14F195] font-medium mt-1">
                              +{coins.sort((a, b) => b.change24h - a.change24h)[0].change24h.toFixed(2)}%
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Time selector */}
                  <div className="flex justify-center mb-4">
                    <div className="inline-flex p-1 bg-[#1e2035]/50 rounded-lg">
                      {['1h', '4h', '24h', '7d'].map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTimeframe(time)}
                          className={`px-4 py-1 rounded-md text-sm font-medium ${
                            selectedTimeframe === time 
                              ? 'bg-[#14F195]/10 text-[#14F195]' 
                              : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <Button className="flex-1 bg-gradient-to-r from-[#9945FF] to-[#14F195] text-black font-medium">
                      Run Full Sentiment Analysis
                      <LineChart className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="flex-1 border-[#9945FF]/30 text-[#9945FF] hover:bg-[#9945FF]/10">
                      Set Sentiment Alerts
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
                
                {/* Correlation Tab */}
                <TabsContent 
                  value="correlation" 
                  className="mt-4"
                  role="tabpanel"
                  id="correlation-tab-content"
                  aria-labelledby="correlation-tab"
                  tabIndex={0}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Price to Sentiment */}
                    <div className="bg-[#151525] rounded-lg p-5 border border-[#1e2035]">
                      <h3 className="text-lg font-medium text-white mb-3">Price Change vs Sentiment</h3>
                      
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center" 
                          style={{ backgroundColor: `${getCorrelationColor(priceToSentimentCorrelation)}20` }}>
                          <LineChart className="h-6 w-6" style={{ color: getCorrelationColor(priceToSentimentCorrelation) }} />
                        </div>
                        
                        <div>
                          <div className="text-lg font-medium" style={{ color: getCorrelationColor(priceToSentimentCorrelation) }}>
                            {formatCorrelation(priceToSentimentCorrelation)}
                          </div>
                          <div className="text-gray-400 text-sm">Correlation: {priceToSentimentCorrelation.toFixed(2)}</div>
                        </div>
                      </div>
                      
                      <div className="bg-[#0c0c15] rounded-lg p-3 border border-[#1e2035]">
                        <p className="text-gray-300 text-sm">
                          {priceToSentimentCorrelation > 0.5 
                            ? "Strong positive correlation indicates sentiment is closely following price movements. Sentiment may be a lagging indicator."
                            : priceToSentimentCorrelation > 0 
                              ? "Weak positive correlation suggests some relationship between price and sentiment, but other factors are also influential."
                              : priceToSentimentCorrelation > -0.5
                                ? "Near-zero correlation indicates price and sentiment are moving independently."
                                : "Negative correlation shows sentiment may be contrarian to price movements - a potential market reversal signal."
                          }
                        </p>
                      </div>
                      
                      {/* Scatter Plot Placeholder */}
                      <div className="h-40 bg-[#0c0c15] rounded-lg mt-4 border border-[#1e2035] flex items-center justify-center">
                        <div className="text-gray-500 text-sm">Interactive scatter plot (click to explore)</div>
                      </div>
                    </div>
                    
                    {/* Volume to Sentiment */}
                    <div className="bg-[#151525] rounded-lg p-5 border border-[#1e2035]">
                      <h3 className="text-lg font-medium text-white mb-3">Volume vs Sentiment</h3>
                      
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center" 
                          style={{ backgroundColor: `${getCorrelationColor(volumeToSentimentCorrelation)}20` }}>
                          <BarChart3 className="h-6 w-6" style={{ color: getCorrelationColor(volumeToSentimentCorrelation) }} />
                        </div>
                        
                        <div>
                          <div className="text-lg font-medium" style={{ color: getCorrelationColor(volumeToSentimentCorrelation) }}>
                            {formatCorrelation(volumeToSentimentCorrelation)}
                          </div>
                          <div className="text-gray-400 text-sm">Correlation: {volumeToSentimentCorrelation.toFixed(2)}</div>
                        </div>
                      </div>
                      
                      <div className="bg-[#0c0c15] rounded-lg p-3 border border-[#1e2035]">
                        <p className="text-gray-300 text-sm">
                          {volumeToSentimentCorrelation > 0.5 
                            ? "Strong correlation between volume and sentiment suggests market activity increases with bullish sentiment. Indicates strong momentum."
                            : volumeToSentimentCorrelation > 0 
                              ? "Moderate correlation indicates some relationship between trading volume and market sentiment."
                              : volumeToSentimentCorrelation > -0.5
                                ? "Weak correlation suggests volume and sentiment are largely independent."
                                : "Negative correlation may indicate contrarian trading - higher volume during bearish sentiment could signal capitulation."
                          }
                        </p>
                      </div>
                      
                      {/* Scatter Plot Placeholder */}
                      <div className="h-40 bg-[#0c0c15] rounded-lg mt-4 border border-[#1e2035] flex items-center justify-center">
                        <div className="text-gray-500 text-sm">Interactive scatter plot (click to explore)</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Key Insights */}
                  <div className="mt-6 bg-[#151525] rounded-lg p-5 border border-[#1e2035]">
                    <h3 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
                      <Search className="h-4 w-4 text-[#14F195]" />
                      Key Insights
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-[#0c0c15] rounded-lg p-3 border border-[#1e2035]">
                        <h4 className="text-white font-medium mb-2">Volume Strategy Recommendation</h4>
                        <p className="text-gray-300 text-sm">
                          Based on current sentiment-volume correlation ({volumeToSentimentCorrelation.toFixed(2)}), 
                          {volumeToSentimentCorrelation > 0.3 
                            ? " focus volume campaigns during positive sentiment spikes to maximize visibility."
                            : volumeToSentimentCorrelation < -0.3
                              ? " consider counter-cyclical volume strategy - increase during negative sentiment for contrarian advantage."
                              : " sentiment has limited impact on volume effectiveness - focus on consistent timing regardless of sentiment shifts."
                          }
                        </p>
                      </div>
                      
                      <div className="bg-[#0c0c15] rounded-lg p-3 border border-[#1e2035]">
                        <h4 className="text-white font-medium mb-2">Sentiment Prediction Value</h4>
                        <p className="text-gray-300 text-sm">
                          With price-sentiment correlation at {priceToSentimentCorrelation.toFixed(2)},
                          {priceToSentimentCorrelation > 0.5 
                            ? " sentiment appears to be a strong price predictor. Consider using sentiment analysis to anticipate price movements."
                            : priceToSentimentCorrelation > 0.2
                              ? " sentiment may provide modest predictive value for price movements."
                              : " sentiment has limited predictive power for price - use as one of multiple indicators rather than in isolation."
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Individual Coins Tab */}
                <TabsContent 
                  value="coins" 
                  className="mt-4"
                  role="tabpanel"
                  id="coins-tab-content"
                  aria-labelledby="coins-tab"
                  tabIndex={0}
                >
                  <div className="bg-[#151525] rounded-lg p-5 border border-[#1e2035] mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-white">Sentiment Details</h3>
                      
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.1))}
                          className="h-8 w-8 rounded-full bg-[#0c0c15] border border-[#1e2035]"
                          aria-label="Zoom out"
                          title="Zoom out"
                        >
                          <Minus className="h-3 w-3 text-gray-400" aria-hidden="true" />
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => setZoomLevel(Math.min(1.5, zoomLevel + 0.1))}
                          className="h-8 w-8 rounded-full bg-[#0c0c15] border border-[#1e2035]"
                          aria-label="Zoom in"
                          title="Zoom in"
                        >
                          <Plus className="h-3 w-3 text-gray-400" aria-hidden="true" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Coin grid with zoom level */}
                    <div 
                      className="grid gap-3 max-h-[350px] overflow-y-auto pr-2" 
                      style={{ 
                        gridTemplateColumns: `repeat(auto-fill, minmax(${280 * zoomLevel}px, 1fr))` 
                      }}
                    >
                      {coins.map((coin) => {
                        const status = getSentimentStatus(coin.sentiment);
                        const color = getSentimentColor(status);
                        
                        return (
                          <button 
                            key={coin.id}
                            onClick={() => setDetailedCoin(coin)}
                            className="bg-[#0c0c15] border border-[#1e2035] hover:border-[color]/50 rounded-lg p-4 text-left transition-all duration-200 relative overflow-hidden group"
                            style={{ '--color': color } as any}
                          >
                            {/* Background sentiment indicator */}
                            <div 
                              className="absolute bottom-0 left-0 h-1 transition-all duration-300 group-hover:h-full opacity-10"
                              style={{ width: `${coin.sentiment}%`, backgroundColor: color }}
                            />
                            
                            {/* Coin header */}
                            <div className="flex justify-between mb-2 relative">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                                  {coin.icon ? (
                                    <img src={coin.icon} alt={coin.name} className="w-full h-full object-cover" />
                                  ) : (
                                    <span className="text-xs font-bold">{coin.symbol.substring(0, 2)}</span>
                                  )}
                                </div>
                                <div>
                                  <div className="text-white font-medium">{coin.name}</div>
                                  <div className="text-gray-500 text-xs">{coin.symbol}</div>
                                </div>
                              </div>
                              
                              <div className={`text-sm font-medium ${coin.change24h >= 0 ? 'text-[#14F195]' : 'text-[#F43F5E]'}`}>
                                {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                              </div>
                            </div>
                            
                            {/* Sentiment indicator */}
                            <div className="mb-3 relative">
                              <div className="text-xs text-gray-400 mb-1">Sentiment:</div>
                              <div className="flex justify-between items-center">
                                <div className="text-sm font-medium" style={{ color }}>
                                  {getSentimentText(status)}
                                </div>
                                <div className="text-white bg-[#1e2035] px-2 py-0.5 rounded text-xs">
                                  {coin.sentiment.toFixed(1)}%
                                </div>
                              </div>
                            </div>
                            
                            {/* Price & Volume */}
                            <div className="grid grid-cols-2 gap-2">
                              <div className="bg-[#1e2035] rounded px-2 py-1.5">
                                <div className="text-xs text-gray-400">Price:</div>
                                <div className="text-white text-sm">
                                  ${coin.price < 0.01 ? coin.price.toFixed(8) : coin.price.toFixed(2)}
                                </div>
                              </div>
                              
                              <div className="bg-[#1e2035] rounded px-2 py-1.5">
                                <div className="text-xs text-gray-400">Volume:</div>
                                <div className="text-white text-sm">
                                  ${(coin.volume24h / 1000000).toFixed(2)}M
                                </div>
                              </div>
                            </div>
                            
                            {/* View details button (visible on hover) */}
                            <div className="absolute inset-0 bg-[#0c0c15]/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="bg-[color]/20 text-[color] px-3 py-1.5 rounded-full text-sm">
                                View Analysis
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Selected coin details */}
                  {detailedCoin && (
                    <div className="bg-[#151525] rounded-lg p-5 border border-[#1e2035]">
                      <div className="flex justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                            {detailedCoin.icon ? (
                              <img src={detailedCoin.icon} alt={detailedCoin.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-sm font-bold">{detailedCoin.symbol.substring(0, 2)}</span>
                            )}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white">{detailedCoin.name}</h3>
                            <div className="text-gray-400 text-sm">{detailedCoin.symbol}</div>
                          </div>
                        </div>
                        
                        <Button 
                          variant="outline" 
                          className="text-[#14F195] border-[#14F195]/30 hover:bg-[#14F195]/10"
                        >
                          Create Volume Campaign
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-[#0c0c15] rounded-lg p-3 border border-[#1e2035]">
                          <div className="text-gray-400 text-xs mb-1">Sentiment Score</div>
                          <div className="flex items-center gap-2">
                            <div className="text-xl font-bold" style={{ color: getSentimentColor(getSentimentStatus(detailedCoin.sentiment)) }}>
                              {detailedCoin.sentiment.toFixed(1)}%
                            </div>
                            <div className="text-sm text-gray-400">
                              ({getSentimentText(getSentimentStatus(detailedCoin.sentiment))})
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-[#0c0c15] rounded-lg p-3 border border-[#1e2035]">
                          <div className="text-gray-400 text-xs mb-1">Price Change (24h)</div>
                          <div className={`text-xl font-bold ${detailedCoin.change24h >= 0 ? 'text-[#14F195]' : 'text-[#F43F5E]'}`}>
                            {detailedCoin.change24h >= 0 ? '+' : ''}{detailedCoin.change24h.toFixed(2)}%
                          </div>
                        </div>
                        
                        <div className="bg-[#0c0c15] rounded-lg p-3 border border-[#1e2035]">
                          <div className="text-gray-400 text-xs mb-1">Trading Volume</div>
                          <div className="flex items-center gap-2">
                            <div className="text-xl font-bold text-white">
                              ${(detailedCoin.volume24h / 1000000).toFixed(2)}M
                            </div>
                            <div className="text-sm text-gray-400">
                              ({getVolumeDescription(detailedCoin.volume24h)})
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* AI Sentiment Insight */}
                      <div className="bg-[#0c0c15] rounded-lg p-4 border border-[#1e2035]">
                        <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                          <Badge className="bg-[#9945FF]/10 text-[#9945FF] border-none">
                            AI Insight
                          </Badge>
                          Volume Strategy Recommendation
                        </h4>
                        
                        <p className="text-gray-300 text-sm">
                          {detailedCoin.sentiment > 75
                            ? `${detailedCoin.name}'s extremely bullish sentiment (${detailedCoin.sentiment.toFixed(1)}%) presents an optimal opportunity for volume enhancement. With current market visibility, a sustained volume campaign could rapidly increase DEX tracker ranking. Recommended strategy: 45-60 transactions per hour with 60% during US trading hours.`
                            : detailedCoin.sentiment > 60
                              ? `${detailedCoin.name} shows strong positive sentiment with moderate visibility. Current momentum can be leveraged with strategic volume generation. Recommended approach: gradual volume increase targeting 40-50 transactions per hour with varied transaction sizes to appear natural.`
                              : detailedCoin.sentiment > 40
                                ? `${detailedCoin.name}'s neutral sentiment (${detailedCoin.sentiment.toFixed(1)}%) requires careful volume strategy. Focus on establishing consistent baseline volume before attempting ranking improvements. Initiate with 30-40 transactions per hour to build momentum while monitoring sentiment shifts.`
                                : detailedCoin.sentiment > 25
                                  ? `${detailedCoin.name}'s bearish sentiment suggests postponing aggressive volume campaigns. Focus first on sentiment improvement through community engagement. If proceeding with volume generation, maintain modest activity of 20-30 transactions hourly, primarily during market upticks.`
                                  : `${detailedCoin.name}'s extremely bearish sentiment (${detailedCoin.sentiment.toFixed(1)}%) indicates high risk for volume campaigns at this time. Recommended strategy: delay major volume initiatives until sentiment improves, or implement minimal visibility maintenance with 15-20 transactions hourly until market conditions change.`
                          }
                        </p>
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                {/* AI Predictions Tab */}
                <TabsContent 
                  value="predictions" 
                  className="mt-4"
                  role="tabpanel"
                  id="predictions-tab-content"
                  aria-labelledby="predictions-tab"
                  tabIndex={0}
                >
                  <div className="bg-[#151525] rounded-lg p-5 border border-[#1e2035]">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-white flex items-center gap-2">
                        <Badge className="bg-[#9945FF]/10 text-[#9945FF] border-none">AI Powered</Badge>
                        Sentiment Forecast
                      </h3>
                      
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-xs h-8 text-[#9945FF] border-[#9945FF]/30 hover:bg-[#9945FF]/10"
                        >
                          Refresh Predictions
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-[#0c0c15] rounded-lg p-4 border border-[#1e2035] mb-4">
                      <h4 className="text-white font-medium mb-2">24-Hour Sentiment Forecast</h4>
                      <p className="text-gray-300 text-sm">
                        Based on current market data, sentiment for Solana meme coins is predicted to 
                        {avgSentiment > 60
                          ? " remain elevated with a potential 5-10% increase in the next 24 hours. The current strong bullish bias shows no signs of reversal in the short term."
                          : avgSentiment > 50
                            ? " continue moderately bullish with potential for further improvement if volume trends maintain. Expect a 2-5% sentiment increase over the next 24 hours."
                            : avgSentiment > 40
                              ? " remain neutral with slight upward bias. Current data suggests a possible shift to bullish territory within 24 hours if recent price action continues."
                              : " gradually improve from current bearish levels. Analysis indicates a potential 3-7% sentiment recovery within the next 24-hour period as oversold conditions normalize."
                        }
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {/* Volume Impact Prediction */}
                      <div className="bg-[#0c0c15] rounded-lg p-4 border border-[#1e2035]">
                        <h4 className="text-white font-medium mb-2">Volume Impact Prediction</h4>
                        <p className="text-gray-300 text-sm">
                          AI analysis predicts that a 25% increase in coordinated volume across meme coins would result in an estimated 
                          {avgSentiment > 60
                            ? " 12-15% improvement in overall sentiment metrics within 48 hours. High current sentiment creates favorable conditions for volume-driven improvement."
                            : avgSentiment > 40
                              ? " 8-10% improvement in sentiment metrics within 72 hours. Current neutral conditions provide opportunity for significant impact from volume campaigns."
                              : " 5-7% sentiment recovery within 96 hours. Current bearish conditions will require sustained volume to generate meaningful sentiment improvements."
                          }
                        </p>
                      </div>
                      
                      {/* Top Opportunity */}
                      <div className="bg-[#0c0c15] rounded-lg p-4 border border-[#1e2035]">
                        <h4 className="text-white font-medium mb-2">Top Volume Opportunity</h4>
                        {coins.length > 0 && (
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                                {coins.sort((a, b) => {
                                  // Complex ranking based on sentiment, volume, and price change
                                  const aScore = (a.sentiment / 100) * 0.5 + (a.change24h / 30) * 0.3 + (a.volume24h / 10000000) * 0.2;
                                  const bScore = (b.sentiment / 100) * 0.5 + (b.change24h / 30) * 0.3 + (b.volume24h / 10000000) * 0.2;
                                  return bScore - aScore;
                                })[0].icon ? (
                                  <img 
                                    src={coins.sort((a, b) => {
                                      const aScore = (a.sentiment / 100) * 0.5 + (a.change24h / 30) * 0.3 + (a.volume24h / 10000000) * 0.2;
                                      const bScore = (b.sentiment / 100) * 0.5 + (b.change24h / 30) * 0.3 + (b.volume24h / 10000000) * 0.2;
                                      return bScore - aScore;
                                    })[0].icon} 
                                    alt={coins[0].name} 
                                    className="w-full h-full object-cover" 
                                  />
                                ) : (
                                  <span className="text-xs font-bold">
                                    {coins.sort((a, b) => {
                                      const aScore = (a.sentiment / 100) * 0.5 + (a.change24h / 30) * 0.3 + (a.volume24h / 10000000) * 0.2;
                                      const bScore = (b.sentiment / 100) * 0.5 + (b.change24h / 30) * 0.3 + (b.volume24h / 10000000) * 0.2;
                                      return bScore - aScore;
                                    })[0].symbol.substring(0, 2)}
                                  </span>
                                )}
                              </div>
                              <div className="text-white font-medium">
                                {coins.sort((a, b) => {
                                  const aScore = (a.sentiment / 100) * 0.5 + (a.change24h / 30) * 0.3 + (a.volume24h / 10000000) * 0.2;
                                  const bScore = (b.sentiment / 100) * 0.5 + (b.change24h / 30) * 0.3 + (b.volume24h / 10000000) * 0.2;
                                  return bScore - aScore;
                                })[0].name}
                              </div>
                            </div>
                            <p className="text-gray-300 text-sm">
                              Based on sentiment momentum and current visibility metrics, AI identifies this token as having the highest potential ROI for volume campaign investment. Recommend 48-hour synchronized volume strategy.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <Button className="w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] text-black font-medium">
                      Generate Custom Volume Strategy
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Modal footer */}
            <div className="border-t border-[#1e2035] p-4 flex justify-between sticky bottom-0 bg-[#0c0c15]">
              <div className="text-xs text-gray-500 flex items-center">
                <AlertTriangle className="h-3 w-3 mr-1 text-yellow-500" />
                All analysis is based on real-time market data and intended for informational purposes only
              </div>
              
              <Button 
                variant="outline" 
                className="text-[#14F195] border-[#14F195]/30 hover:bg-[#14F195]/10"
                onClick={onClose}
              >
                Close Analysis
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}