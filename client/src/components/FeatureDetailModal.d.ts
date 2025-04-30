export interface FeatureDetailContent {
    title: string;
    description: React.ReactNode;
    icon?: React.ReactNode;
}
interface FeatureDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    content: FeatureDetailContent;
}
export declare function FeatureDetailModal({ isOpen, onClose, content, }: FeatureDetailModalProps): import("react/jsx-runtime").JSX.Element;
export {};
