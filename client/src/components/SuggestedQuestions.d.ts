import React from 'react';
interface SuggestedQuestionsProps {
    questions: string[];
    onQuestionClick: (question: string) => void;
}
export declare const SuggestedQuestions: React.FC<SuggestedQuestionsProps>;
export {};
