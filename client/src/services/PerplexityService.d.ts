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
declare class PerplexityService {
    private static instance;
    private readonly API_KEY;
    private readonly API_URL;
    private readonly DEFAULT_MODEL;
    private constructor();
    static getInstance(): PerplexityService;
    /**
     * Sends a query to the Perplexity API and gets a response
     * @param question User's question
     * @returns Promise<PerplexityResponse> Response from Perplexity API
     */
    askQuestion(question: string): Promise<PerplexityResponse>;
    /**
     * For getting streaming responses from the Perplexity API
     * @param question User's question
     * @param onChunk Callback called for each chunk during streaming
     * @param onComplete Callback called when streaming is complete
     * @param onError Callback called when an error occurs
     */
    streamQuestion(question: string, onChunk: (chunk: string) => void, onComplete: (fullResponse: string) => void, onError: (error: string) => void): Promise<void>;
    /**
     * Returns the list of suggested questions
     * @returns List of suggested questions
     */
    getSuggestedQuestions(): string[];
}
export declare const perplexityService: PerplexityService;
export {};
