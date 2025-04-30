interface LicenseData {
    license: string;
    email: string;
    primaryUrl: string;
    backupUrl: string;
    updatedDate: string;
}
interface LicenseModalProps {
    isOpen: boolean;
    onClose: () => void;
    licenseData: LicenseData | null;
}
export declare function LicenseModal({ isOpen, onClose, licenseData }: LicenseModalProps): import("react/jsx-runtime").JSX.Element | null;
export {};
