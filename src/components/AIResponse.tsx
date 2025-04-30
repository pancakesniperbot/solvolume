import React, { useState, useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';

interface AIResponseProps {
  content: string;
  error?: string;
  isLoading?: boolean;
  isStreaming?: boolean;
}

export const AIResponse: React.FC<AIResponseProps> = ({
  content,
  error,
  isLoading = false,
  isStreaming = false
}) => {
  const [displayedContent, setDisplayedContent] = useState<string>('');
  const responseRef = useRef<HTMLDivElement>(null);
  
  // For streaming effect
  useEffect(() => {
    if (isStreaming) {
      setDisplayedContent(content);
    } else if (!isLoading && content && !error) {
      let currentIndex = 0;
      const contentArr = content.split('');
      
      // Clear previous timers
      setDisplayedContent('');
      
      const typingInterval = setInterval(() => {
        if (currentIndex < contentArr.length) {
          setDisplayedContent(prev => prev + contentArr[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 10); // Typing effect at 10ms speed
      
      return () => clearInterval(typingInterval);
    }
  }, [content, isLoading, error, isStreaming]);
  
  // Scroll to bottom when new content arrives
  useEffect(() => {
    if (responseRef.current) {
      responseRef.current.scrollTop = responseRef.current.scrollHeight;
    }
  }, [displayedContent]);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-2 text-[11px] text-gray-400">
        <Loader2 className="h-3 w-3 mr-2 animate-spin" />
        Thinking...
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-[11px] text-red-400 py-1">
        {error}
      </div>
    );
  }
  
  if (!content) {
    return null;
  }
  
  return (
    <div 
      ref={responseRef}
      className="text-[11px] text-gray-300 max-h-24 overflow-y-auto py-1 pr-1"
    >
      <span className="text-[#14F195] font-medium">AI: </span>
      {displayedContent}
    </div>
  );
};