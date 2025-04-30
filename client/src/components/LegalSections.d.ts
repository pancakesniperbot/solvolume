import React from 'react';
type LegalSectionType = 'terms' | 'privacy' | 'disclaimer' | 'dmca' | 'resources' | 'about' | 'security' | 'contact';
interface LegalSectionProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    id: LegalSectionType;
    activeSection: LegalSectionType;
    onSectionChange: (section: LegalSectionType) => void;
}
export declare const LegalSection: ({ title, icon, children, id, activeSection, onSectionChange }: LegalSectionProps) => import("react/jsx-runtime").JSX.Element;
export declare const LegalSections: ({ initialSection, isStandalone }: {
    initialSection?: LegalSectionType;
    isStandalone?: boolean;
}) => import("react/jsx-runtime").JSX.Element;
export {};
