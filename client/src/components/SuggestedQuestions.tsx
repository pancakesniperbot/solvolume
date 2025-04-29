import React from 'react';
import { ChevronRight } from 'lucide-react';

interface SuggestedQuestionsProps {
  questions: string[];
  onQuestionClick: (question: string) => void;
}

export const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({
  questions,
  onQuestionClick
}) => {
  if (!questions || questions.length === 0) {
    return null;
  }

  return (
    <div className="mt-1 mb-2 space-y-1">
      <p className="text-[11px] text-gray-400">Suggested questions:</p>
      <div className="flex flex-wrap gap-1.5">
        {questions.map((question, index) => (
          <button
            key={index}
            onClick={() => onQuestionClick(question)}
            className="text-[10px] py-0.5 px-1.5 bg-black/20 rounded border border-[#14F195]/10 hover:border-[#14F195]/30 hover:bg-black/40 transition-colors text-gray-300 flex items-center"
          >
            <ChevronRight className="h-2.5 w-2.5 mr-0.5 text-[#14F195]" />
            {question}
          </button>
        ))}
      </div>
    </div>
  );
};