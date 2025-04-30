import { ReactNode } from 'react';
interface LicenseContextType {
    openRegistrationModal: () => void;
    closeRegistrationModal: () => void;
    isRegistrationModalOpen: boolean;
    isLicenseModalOpen: boolean;
    licenseData: LicenseData | null;
    setLicenseData: (data: LicenseData | null) => void;
    openLicenseModal: () => void;
    closeLicenseModal: () => void;
}
interface LicenseProviderProps {
    children: ReactNode;
}
interface LicenseData {
    license: string;
    email: string;
    primaryUrl: string;
    backupUrl: string;
    updatedDate: string;
}
export declare function LicenseProvider({ children }: LicenseProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useLicense(): LicenseContextType;
export {};
