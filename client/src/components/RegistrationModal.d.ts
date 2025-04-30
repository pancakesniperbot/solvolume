type LicenseData = {
    license: string;
    email: string;
    primaryUrl: string;
    backupUrl: string;
    updatedDate: string;
};
interface RegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    setLicenseData: (data: LicenseData | null) => void;
    openLicenseModal: () => void;
}
export declare function RegistrationModal({ isOpen, onClose, setLicenseData, openLicenseModal }: RegistrationModalProps): import("react/jsx-runtime").JSX.Element;
export {};
