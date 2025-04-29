import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Sparkles,
  ChevronDown,
  X,
  Send,
  Loader2,
  AlertCircle
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// For Perplexity API usage
const PERPLEXITY_API_KEY = import.meta.env.PERPLEXITY_API_KEY;

// AI Button Label
const AI_BUTTON_LABEL = "A.I. Volume Bot Help Assistant";

interface AIAssistantProps {
  className?: string;
  isVisible?: boolean;
}

export function AIAssistant({ className = "", isVisible = false }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant'; content: string}>>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Update isOpen when isVisible prop changes
  useEffect(() => {
    setIsOpen(isVisible);
  }, [isVisible]);

  const suggestedQuestions = [
    "How do I trend my token?",
    "What is the ideal volume to trend on Pump.fun?",
    "Can you analyze this meme coin chart?",
    "What are the best DEXes for visibility?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (question: string) => {
    if (!question.trim()) return;
    
    setUserInput("");
    setIsLoading(true);
    setError(null);
    
    const newUserMessage = { role: 'user' as const, content: question };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    
    try {
      const response = await fetch("https://api.perplexity.ai/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${PERPLEXITY_API_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.1-sonar-small-128k-online",
          messages: [
            {
              role: "system",
              content: "You are an expert advisor for Solana meme coin creators focused on providing actionable advice about volume strategies, trading patterns, and visibility tactics. Target your responses to US-based meme coin creators who need concise, practical guidance. Keep your responses focused on visibility, volume generation, and market trends. Avoid investment advice or price predictions. Be concise and direct."
            },
            ...updatedMessages.map(msg => ({
              role: msg.role,
              content: msg.content
            }))
          ],
          temperature: 0.2,
          top_p: 0.9,
          max_tokens: 500,
          stream: false,
          presence_penalty: 0,
          frequency_penalty: 1
        })
      });
      
      if (!response.ok) {
        throw new Error(`Network response error: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.choices && data.choices[0] && data.choices[0].message) {
        const newAssistantMessage = { 
          role: 'assistant' as const, 
          content: data.choices[0].message.content 
        };
        setMessages([...updatedMessages, newAssistantMessage]);
      } else {
        throw new Error("Invalid response format from Perplexity API");
      }
    } catch (err) {
      console.error("AI API Error:", err);
      setError("Our AI assistant is currently busy. Please try again later.");
    } finally {
      setIsLoading(false);
      setTimeout(scrollToBottom, 100);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setUserInput(question);
    handleSubmit(question);
  };

  return (
    <div className={`fixed bottom-20 right-3 sm:bottom-20 sm:right-3 md:bottom-20 md:right-6 z-50 ${className}`}>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <motion.button
            className="flex items-center gap-2 bg-gradient-to-br from-[#0c0c15]/90 to-[#14142b]/90 backdrop-blur-md border border-[#14F195]/30 rounded-lg px-3 py-3 shadow-[0_8px_32px_rgba(20,241,149,0.15),0_0_1px_rgba(153,69,255,0.5)] hover:shadow-[0_8px_32px_rgba(20,241,149,0.25),0_0_4px_rgba(153,69,255,0.6)] transition-all duration-300 group relative overflow-hidden w-full justify-between"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ 
                  rotate: [0, 15, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  repeatType: "loop",
                  ease: "easeInOut",
                  times: [0, 0.5, 1]
                }}
              >
                <Bot className="h-4 w-4 text-[#14F195]" />
              </motion.div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14F195] to-[#9945FF] font-medium whitespace-nowrap">{AI_BUTTON_LABEL}</span>
            </div>
            <ChevronDown className="h-4 w-4 text-[#14F195]/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#14F195]/10 to-[#9945FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
          </motion.button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-[#0c0c15]/95 to-[#14142b]/95 backdrop-blur-md border border-[#14F195]/30 shadow-[0_8px_32px_rgba(20,241,149,0.15),0_0_1px_rgba(153,69,255,0.5)] text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Bot className="h-5 w-5 text-[#14F195]" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14F195] to-[#9945FF]">
                A.I. Volume Bot Help Assistant
              </span>
              <Sparkles className="h-3 w-3 text-[#9945FF]" />
            </DialogTitle>
          </DialogHeader>
          
          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-3">
              Ask our A.I. Volume Bot Help Assistant about Solana volume strategies, meme coin trends, or visibility tactics.
            </p>
            
            {messages.length === 0 && (
              <div className="mb-4">
                <p className="text-xs text-[#14F195]/70 uppercase font-medium mb-2">Suggested Questions</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="text-xs px-3 py-1.5 rounded-md bg-[#1e2035]/50 hover:bg-[#1e2035] text-gray-300 hover:text-white border border-[#14F195]/20 hover:border-[#14F195]/40 transition-all duration-200"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="max-h-[350px] overflow-y-auto mb-4 pr-1 scrollbar-thin scrollbar-thumb-[#14F195]/20 scrollbar-track-transparent">
              {messages.length > 0 && (
                <div className="space-y-4">
                  {messages.map((msg, index) => (
                    <div 
                      key={index} 
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[85%] px-3 py-2 rounded-lg ${
                          msg.role === 'user' 
                            ? 'bg-[#14F195]/20 text-white' 
                            : 'bg-[#1e2035] text-gray-200'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="max-w-[85%] px-3 py-2 rounded-lg bg-[#1e2035] text-gray-200">
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin text-[#14F195]" />
                          <p className="text-sm">Thinking...</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {error && (
                    <div className="flex justify-start">
                      <div className="max-w-[85%] px-3 py-2 rounded-lg bg-[#ff4d4f]/20 text-gray-200 border border-[#ff4d4f]/30">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-[#ff4d4f]" />
                          <p className="text-sm">{error}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Input
              className="bg-[#1e2035] border-[#14F195]/30 focus-visible:ring-[#14F195]/30 placeholder:text-gray-500"
              placeholder="Ask A.I. Volume Bot Help Assistant about strategies..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit(userInput)}
              disabled={isLoading}
            />
            <Button 
              onClick={() => handleSubmit(userInput)}
              disabled={isLoading || !userInput.trim()}
              className="bg-gradient-to-r from-[#14F195] to-[#9945FF] hover:opacity-90 text-white"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}