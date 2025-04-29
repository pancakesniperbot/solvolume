import React, { useState, useRef, useEffect } from 'react';
import { X, Bot, SendHorizonal, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Example questions
const exampleQuestions = [
  "How much volume do I need to get trending on DEXScreener?",
  "What are the best times to increase trading volume?",
  "How to distribute volume transactions for natural patterns?",
  "What's the optimal transaction size for Solana meme coins?",
  "How to maintain trending status after initial pump?",
  "What DEXes should I focus on for visibility?",
  "What market signals indicate good timing for volume campaigns?",
  "How to avoid detection of artificial volume?",
  "How many wallets should be used for a natural pattern?",
  "What metrics determine trending status on Birdeye?",
];

interface AIVolumeAssistantPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIVolumeAssistantPopup({ isOpen, onClose }: AIVolumeAssistantPopupProps) {
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversation, setConversation] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([
    {
      role: 'assistant',
      content: 'Hi, I\'m your A.I. Volume Bot Help Assistant. I can help you with strategies to increase visibility, trending status, and volume patterns for your token. Ask me anything about DEX metrics, volume strategies, or market timing!'
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when popup opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim() || isProcessing) return;
    
    const userQuery = query.trim();
    setQuery('');
    setIsProcessing(true);
    
    // Add user message to conversation
    setConversation(prev => [
      ...prev,
      { role: 'user', content: userQuery }
    ]);

    try {
      // Call Perplexity API through our backend
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: userQuery }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI');
      }

      const data = await response.json();
      
      // Add AI response to conversation
      setConversation(prev => [
        ...prev,
        { role: 'assistant', content: data.answer }
      ]);
    } catch (error) {
      console.error('Error querying AI assistant:', error);
      setConversation(prev => [
        ...prev,
        { 
          role: 'assistant', 
          content: 'Sorry, I had trouble connecting to my knowledge base. Please try again in a moment.' 
        }
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExampleClick = (question: string) => {
    setQuery(question);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-2xl h-[600px] bg-gradient-to-b from-[#0a0a18] to-[#14142b] rounded-xl shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 border-b border-[#14F195]/20 flex items-center justify-between bg-black/30">
              <div className="flex items-center gap-2">
                <div className="relative w-6 h-6 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-[#14F195] absolute" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#14F195] rounded-full animate-ping opacity-75"></div>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#14F195] rounded-full"></div>
                </div>
                <h2 className="text-lg font-medium text-white/90">A.I. Volume Bot Help Assistant</h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-1 hover:bg-black/40 text-white/70 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {conversation.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] ${
                    msg.role === 'user' ? 'ml-auto bg-[#9945FF]/20' : 'mr-auto bg-[#14F195]/10'
                  } p-3 rounded-lg`}
                >
                  <p className={`text-sm ${msg.role === 'user' ? 'text-white/90' : 'text-white/90'}`}>
                    {msg.content}
                  </p>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Example questions */}
            {conversation.length < 2 && (
              <div className="px-4 py-2 bg-black/20">
                <p className="text-xs text-white/60 mb-2">Try asking:</p>
                <div className="flex flex-wrap gap-2">
                  {exampleQuestions.slice(0, 4).map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleExampleClick(q)}
                      className="text-xs bg-[#14F195]/10 hover:bg-[#14F195]/20 text-white/80 px-3 py-1 rounded-full transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input area */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-[#14F195]/20 bg-black/30">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  disabled={isProcessing}
                  placeholder={isProcessing ? "Thinking..." : "Ask about volume strategies, DEX metrics, or trending tactics..."}
                  className="flex-1 rounded-lg bg-black/30 border border-[#14F195]/20 text-white/90 px-4 py-2 focus:outline-none focus:border-[#14F195]/50"
                />
                <button
                  type="submit"
                  disabled={isProcessing || !query.trim()}
                  className={`rounded-lg p-2 ${
                    isProcessing || !query.trim()
                      ? 'bg-[#14F195]/20 text-white/40'
                      : 'bg-[#14F195]/70 text-black hover:bg-[#14F195] transition-colors'
                  }`}
                >
                  <SendHorizonal className="h-5 w-5" />
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}