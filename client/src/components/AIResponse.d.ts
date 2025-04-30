import React from 'react';
interface AIResponseProps {
    content: string;
    error?: string;
    isLoading?: boolean;
    isStreaming?: boolean;
}
export declare const AIResponse: React.FC<AIResponseProps>;
export {};
