interface LegalPopupProps {
    isOpen: boolean;
    onClose: () => void;
    contentType: 'terms' | 'privacy' | 'disclaimer' | 'dmca';
    title?: string;
}
export declare function LegalPopup({ isOpen, onClose, contentType, title }: LegalPopupProps): import("react/jsx-runtime").JSX.Element;
export {};
