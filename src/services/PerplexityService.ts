// PerplexityService.ts
// AI assistant service using Perplexity API

export interface PerplexityResponse {
  content: string;
  error?: string;
  isLoading?: boolean;
}

export interface PerplexityStreamResponse {
  id: string;
  model: string;
  created: number;
  object: string;
  choices: {
    index: number;
    delta: {
      content?: string;
    };
    finish_reason: string | null;
  }[];
}

class PerplexityService {
  private static instance: PerplexityService;
  private readonly API_KEY: string = import.meta.env.PERPLEXITY_API_KEY || ''; // API key from environment variable
  private readonly API_URL: string = 'https://api.perplexity.ai/chat/completions';
  private readonly DEFAULT_MODEL: string = 'llama-3.1-sonar-small-128k-online';

  private constructor() {
    // Singleton pattern - to create a single service instance
  }

  public static getInstance(): PerplexityService {
    if (!PerplexityService.instance) {
      PerplexityService.instance = new PerplexityService();
    }
    return PerplexityService.instance;
  }

  /**
   * Sends a query to the Perplexity API and gets a response
   * @param question User's question
   * @returns Promise<PerplexityResponse> Response from Perplexity API
   */
  public async askQuestion(question: string): Promise<PerplexityResponse> {
    try {
      const response = await fetch(this.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.API_KEY}`
        },
        body: JSON.stringify({
          model: this.DEFAULT_MODEL,
          messages: [
            {
              role: "system",
              content: "You are an AI assistant specialized in Solana blockchain, meme coins, and token marketing strategies. Provide concise, actionable advice for meme coin creators. Focus on practical strategies for token visibility, volume optimization, and trending on DEX platforms like Jupiter, Raydium, and Pump.Fun. Tailor your responses to US-based users in the Solana ecosystem. Avoid generic answers and optimize for specific Solana-ecosystem tactics."
            },
            {
              role: "user",
              content: question
            }
          ],
          temperature: 0.2,
          top_p: 0.9,
          max_tokens: 300,
          stream: false,
          frequency_penalty: 1
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      
      return {
        content: data.choices[0].message.content,
        isLoading: false
      };
    } catch (error) {
      console.error("Error fetching from Perplexity API:", error);
      return {
        content: "",
        error: "Our AI assistant is currently overloaded. Please try again later.",
        isLoading: false
      };
    }
  }

  /**
   * For getting streaming responses from the Perplexity API
   * @param question User's question
   * @param onChunk Callback called for each chunk during streaming
   * @param onComplete Callback called when streaming is complete
   * @param onError Callback called when an error occurs
   */
  public async streamQuestion(
    question: string,
    onChunk: (chunk: string) => void,
    onComplete: (fullResponse: string) => void,
    onError: (error: string) => void
  ): Promise<void> {
    try {
      const response = await fetch(this.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.API_KEY}`
        },
        body: JSON.stringify({
          model: this.DEFAULT_MODEL,
          messages: [
            {
              role: "system",
              content: "You are an AI assistant specialized in Solana blockchain, meme coins, and token marketing strategies. Provide concise, actionable advice for meme coin creators. Focus on practical strategies for token visibility, volume optimization, and trending on DEX platforms like Jupiter, Raydium, and Pump.Fun. Tailor your responses to US-based users in the Solana ecosystem. Avoid generic answers and optimize for specific Solana-ecosystem tactics."
            },
            {
              role: "user",
              content: question
            }
          ],
          temperature: 0.2,
          top_p: 0.9,
          max_tokens: 300,
          stream: true,
          frequency_penalty: 1
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("ReadableStream not supported");
      }

      const decoder = new TextDecoder();
      let fullResponse = '';

      const processStream = async (): Promise<void> => {
        let done = false;
        
        while (!done) {
          const { value, done: streamDone } = await reader.read();
          done = streamDone;
          
          if (done) break;
          
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk
            .split('\n')
            .filter(line => line.trim() !== '' && line.startsWith('data:'));
          
          for (const line of lines) {
            if (line === 'data: [DONE]') continue;
            
            try {
              const jsonData = JSON.parse(line.replace('data: ', '')) as PerplexityStreamResponse;
              const content = jsonData.choices[0]?.delta?.content;
              
              if (content) {
                fullResponse += content;
                onChunk(content);
              }
            } catch (e) {
              console.error('Error parsing stream chunk:', e);
            }
          }
        }
        
        onComplete(fullResponse);
      };

      await processStream();
    } catch (error) {
      console.error("Error streaming from Perplexity API:", error);
      onError("Our AI assistant is currently overloaded. Please try again later.");
    }
  }
  
  /**
   * Returns the list of suggested questions
   * @returns List of suggested questions
   */
  public getSuggestedQuestions(): string[] {
    return [
      "How to trend my token?",
      "What makes a meme coin go viral?",
      "How to increase volume on Pump.fun?",
      "Best time to launch a Solana meme coin?",
      "How to appear on Solana trending bots?",
      "Optimal volume distribution strategy?",
      "How to avoid being flagged as bot activity?",
      "Most cost-effective volume strategy?"
    ];
  }
}

// Singleton instance export
export const perplexityService = PerplexityService.getInstance();