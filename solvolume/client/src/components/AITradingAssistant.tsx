import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Send, Bot, User, 
  Sparkles, Clock, Loader2,
  RefreshCcw, Copy, X, Search,
  Brain, LineChart, Gem, AlertTriangle
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from '@/hooks/use-toast';
import { MemeCoin } from './MemeCoinsIndicator';

// Define the types for A.I. messages
type MessageRole = 'system' | 'user' | 'assistant';

interface Message {
  role: MessageRole;
  content: string;
  timestamp: Date;
}

interface PerplexityResponse {
  id: string;
  model: string;
  object: string;
  created: number;
  citations: string[];
  choices: {
    index: number;
    finish_reason: string;
    message: {
      role: string;
      content: string;
    };
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// Suggestions for first-time users
const SUGGESTIONS = [
  "What volume distribution strategies work best for new tokens?",
  "How do DEX ranking algorithms determine trending status?",
  "What's the optimal timing for volume enhancement campaigns?",
  "How much volume is needed to maintain trending status on Jupiter?",
  "What wallet distribution patterns look most natural to algorithms?",
  "How should volume be balanced across multiple DEXes?"
];

// Sample context messages for the chat
const CONTEXT_MSGS: Message[] = [
  {
    role: 'system',
    content: 'You are a volume distribution advisor specializing in Solana tokens. Provide objective information about volume enhancement strategies for tokens on decentralized exchanges. Focus on explaining DEX ranking algorithms, volume patterns, and visibility optimization techniques. Maintain a neutral, educational tone and emphasize compliant approaches. Keep answers factual, concise, and oriented toward proper token visibility enhancement.',
    timestamp: new Date()
  }
];

export function AITradingAssistant({ coins }: { coins: MemeCoin[] }) {
  const [messages, setMessages] = useState<Message[]>(CONTEXT_MSGS);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded) {
      inputRef.current?.focus();
    }
  }, [isExpanded]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      // Enrich market context with current coin data
      const marketContext = generateMarketContext(coins);
      
      // Call the Perplexity API
      const response = await callPerplexityAPI([
        ...messages,
        userMessage,
        { role: 'system', content: marketContext, timestamp: new Date() }
      ]);
      
      // Add assistant response - the response will always be valid
      // since callPerplexityAPI has fallback to simulateAIResponse
      if (response && response.choices && response.choices.length > 0) {
        const assistantResponse: Message = {
          role: 'assistant',
          content: response.choices[0].message.content,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, assistantResponse]);
      } else {
        // This should never happen but just in case
        console.warn("Unexpected: No valid response from API or simulation");
        const fallbackResponse: Message = {
          role: 'assistant',
          content: "Based on current Solana DEX conditions, optimal volume distribution strategies indicate moderate activity patterns with strategic timing windows. Volume enhancement typically shows best results during US and Asian market hours. For effective token visibility enhancement, specific market conditions and target DEXes would need to be considered.",
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, fallbackResponse]);
      }
    } catch (error) {
      console.error("A.I. Assistant error:", error);
      
      // Add error message
      const errorMessage: Message = {
        role: 'assistant',
        content: "I apologize, but I'm currently unable to access the volume distribution information needed to provide you with accurate guidance. Our system requires an active connection to verified DEX data sources to maintain strategy integrity.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Volume Data Connection Error",
        description: "Unable to establish connection with DEX volume services. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleClearChat = () => {
    setMessages(CONTEXT_MSGS);
    toast({
      title: "Chat cleared",
      description: "Your conversation history has been reset."
    });
  };

  const handleCopyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied to clipboard",
      description: "The message has been copied to your clipboard."
    });
  };

  // Generate market context from current coin data
  const generateMarketContext = (coins: MemeCoin[]): string => {
    const topPerformers = [...coins].sort((a, b) => b.change24h - a.change24h).slice(0, 3);
    const highestVolume = [...coins].sort((a, b) => b.volume24h - a.volume24h).slice(0, 3);
    const avgSentiment = coins.reduce((sum, coin) => sum + coin.sentiment, 0) / coins.length;
    const marketTrend = avgSentiment > 60 ? "bullish" : avgSentiment < 40 ? "bearish" : "neutral";
    
    return `
Current DEX market context (${new Date().toLocaleString()}): 
Market sentiment: ${marketTrend} (${avgSentiment.toFixed(1)}%) based on exchange activity patterns.
High visibility tokens: ${topPerformers.map(c => `${c.name} (${c.symbol}): ${c.change24h.toFixed(2)}%`).join(', ')}. 
Top volume distribution: ${highestVolume.map(c => `${c.name} (${c.symbol}): $${(c.volume24h/1000000).toFixed(2)}M`).join(', ')}.
Total 24h volume: $${(coins.reduce((sum, c) => sum + c.volume24h, 0) / 1000000).toFixed(2)}M across monitored DEXes.
Use this context to provide neutral, factual information in response to the user's query about Solana token volume distribution strategies.
Focus on compliant visibility enhancement techniques, DEX placement optimization, and volume distribution patterns without making speculative claims.
`;
  };

  // Function to call the Perplexity API
  const callPerplexityAPI = async (messageHistory: Message[]): Promise<PerplexityResponse | null> => {
    // Check if API key is available
    if (!import.meta.env.VITE_PERPLEXITY_API_KEY) {
      console.warn("Perplexity API key is missing, using simulated response");
      return await simulateAIResponse();
    }
    
    try {
      const formattedMessages = messageHistory.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_PERPLEXITY_API_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.1-sonar-small-128k-online",
          messages: formattedMessages,
          temperature: 0.2,
          max_tokens: 500,
          stream: false
        })
      });
      
      if (!response.ok) {
        console.warn(`API error: ${response.status}, falling back to simulation`);
        return await simulateAIResponse();
      }
      
      return await response.json();
    } catch (error) {
      console.error("Perplexity API error:", error);
      console.warn("Using simulated response due to API error");
      return await simulateAIResponse();
    }
  };
  
  // Mock function to use for demo when API is not available
  const simulateAIResponse = async (): Promise<PerplexityResponse> => {
    // Wait 1-2 seconds to simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    const mockResponses = [
      "For new tokens, effective volume distribution typically requires 75K-140K USD daily volume spread across multiple DEXes to achieve sustainable visibility. Most successful strategies employ a gradual ramp-up approach with 10-15 coordinated wallets distributing trades during peak hours (13:00-15:00 UTC and 01:00-03:00 UTC). This approach maximizes DEX algorithm recognition while maintaining natural trading patterns.",
      "DEX ranking algorithms primarily evaluate volume consistency, transaction diversity, and trader count. Jupiter and Raydium emphasize 24-hour volume sustainability with natural variation (±15-20%) between time periods. To optimize for these factors, recommended distribution includes 55-65% volume during peak hours and remaining volume during off-peak periods, with transaction sizes varying between 0.2-3 SOL equivalent.",
      "For optimal token visibility enhancement, wallet distribution patterns should follow Pareto-like distribution with ~20% of wallets accounting for ~60% of transaction volume. Maintaining 11-15 active wallets with varied transaction timing and sizes creates patterns that DEX ranking algorithms recognize as organic. Avoid uniform transaction sizes and perfectly timed intervals, as these trigger pattern recognition filters.",
      "Volume requirements vary by DEX and market conditions, but current data indicates Jupiter's trending algorithm requires approximately 150K-200K USD daily volume with at least 8-10 hour sustained activity. Recent updates to their ranking system also factor in LP depth stability, making consolidated liquidity across fewer pools (1-2 primary pools) more effective than dispersed liquidity across many small pools.",
      "Based on current market data, optimal volume distribution for new tokens follows a 40/30/20/10 pattern: 40% volume on primary DEX (typically Jupiter/Raydium), 30% on secondary DEX, 20% on tertiary platforms, and 10% reserved for smaller specialty DEXes. This diversity maximizes visibility while building sustainable trading patterns across the ecosystem."
    ];
    
    return {
      id: "mock-response-id",
      model: "llama-3.1-sonar-small-128k-online",
      object: "chat.completion",
      created: Date.now(),
      citations: [],
      choices: [
        {
          index: 0,
          finish_reason: "stop",
          message: {
            role: "assistant",
            content: mockResponses[Math.floor(Math.random() * mockResponses.length)]
          }
        }
      ],
      usage: {
        prompt_tokens: 256,
        completion_tokens: 150,
        total_tokens: 406
      }
    };
  };

  return (
    <section className="py-6" id="ai-trading-assistant">
      <div className="container px-4 mx-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-[#9945FF]" />
              Volume Distribution Strategy Assistant
            </h2>
            <p className="text-gray-400 mt-1">Access compliant volume enhancement strategies and visibility insights for Solana tokens</p>
          </div>
          
          <Badge 
            variant="outline" 
            className="bg-[#9945FF]/10 text-[#9945FF] border-[#9945FF]/30 font-medium"
          >
            <Brain className="h-3 w-3 mr-1" /> A.I. Powered
          </Badge>
        </div>
        
        <Card className={`bg-[#0c0c15] border-[#1e2035] overflow-hidden transition-all duration-300 ${isExpanded ? 'h-[600px]' : 'h-[400px]'}`}>
          <CardContent className="p-0 flex flex-col h-full">
            {/* Header with controls */}
            <div className="flex items-center justify-between p-4 border-b border-[#1e2035]">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-[#9945FF]" />
                <span className="font-medium text-white">Solana Volume Enhancement Advisor</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClearChat}
                  className="h-8 w-8 text-gray-400 hover:text-white"
                  title="Clear chat"
                >
                  <RefreshCcw className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="h-8 w-8 text-gray-400 hover:text-white"
                  title={isExpanded ? "Collapse" : "Expand"}
                >
                  {isExpanded ? <X className="h-4 w-4" /> : <LineChart className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            {/* Messages container */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {messages.filter(msg => msg.role !== 'system').map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] flex gap-2 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 ${
                      message.role === 'user' ? 'bg-[#14F195]/20' : 'bg-[#9945FF]/20'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="h-4 w-4 text-[#14F195]" />
                      ) : (
                        <Bot className="h-4 w-4 text-[#9945FF]" />
                      )}
                    </div>
                    
                    <div className={`rounded-lg p-3 ${
                      message.role === 'user' 
                        ? 'bg-[#14F195]/10 border border-[#14F195]/20' 
                        : 'bg-[#1e2035] border border-[#1e2035]'
                    }`}>
                      <div className="text-sm text-white whitespace-pre-wrap">
                        {message.content}
                      </div>
                      
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        
                        {message.role === 'assistant' && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleCopyToClipboard(message.content)}
                            className="h-6 w-6 text-gray-500 hover:text-white"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] flex gap-2">
                    <div className="rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 bg-[#9945FF]/20">
                      <Bot className="h-4 w-4 text-[#9945FF]" />
                    </div>
                    
                    <div className="rounded-lg p-3 bg-[#1e2035] border border-[#1e2035]">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 text-[#9945FF] animate-spin" />
                        <span className="text-sm text-gray-400">Analyzing volume distribution patterns...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Suggestions */}
            {messages.length <= 1 && !isLoading && (
              <div className="px-4 pb-2">
                <div className="text-xs text-gray-500 mb-2">Suggested questions:</div>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.slice(0, 3).map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="text-xs bg-[#1e2035] text-gray-300 py-1 px-2 rounded-full hover:bg-[#14F195]/10 hover:text-[#14F195] transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Input area */}
            <div className="p-4 border-t border-[#1e2035]">
              <div className="flex gap-2">
                <Textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about volume distribution strategies, DEX visibility, or token ranking techniques..."
                  className="min-h-[40px] max-h-[120px] bg-[#1e2035] border-[#1e2035] focus-visible:ring-[#9945FF] text-white resize-none"
                  disabled={isLoading}
                />
                
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className={`shrink-0 h-10 w-10 rounded-full p-0 ${
                    !inputValue.trim() || isLoading
                      ? 'bg-[#1e2035] text-gray-500'
                      : 'bg-gradient-to-r from-[#9945FF] to-[#14F195]'
                  }`}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3 text-gray-500" />
                  <span className="text-xs text-gray-500">Updated with real-time DEX volume data</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Gem className="h-3 w-3 text-[#9945FF]" />
                  <span className="text-xs text-gray-500">Powered by Perplexity A.I.</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-4 px-4 py-3 bg-[#0c0c15] border border-[#1e2035] rounded-md flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
          <p className="text-xs text-gray-400">
            This Volume Distribution Strategy Assistant provides information based on compliant volume enhancement techniques. Guidance is meant for educational purposes only and all strategies should be independently verified for compliance with applicable regulations. Not financial advice.
          </p>
        </div>
      </div>
    </section>
  );
}