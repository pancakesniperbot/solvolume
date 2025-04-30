import { MemeCoin } from "./MemeCoinsIndicator";
interface FullSentimentAnalysisProps {
    isOpen: boolean;
    onClose: () => void;
    coins: MemeCoin[];
    refreshTime: Date;
}
export declare function FullSentimentAnalysis({ isOpen, onClose, coins, refreshTime }: FullSentimentAnalysisProps): import("react/jsx-runtime").JSX.Element;
export {};
