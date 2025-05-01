import React, { createContext, useState, useContext, ReactNode } from 'react';
import { RegistrationModal } from './RegistrationModal';
import { LicenseModal } from './LicenseModal';

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

const LicenseContext = createContext<LicenseContextType | undefined>(undefined);

export function LicenseProvider({ children }: LicenseProviderProps) {
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);
  const [licenseData, setLicenseData] = useState<LicenseData | null>(null);

  const openRegistrationModal = () => {
    setIsRegistrationModalOpen(true);
  };

  const closeRegistrationModal = () => {
    setIsRegistrationModalOpen(false);
  };

  const openLicenseModal = () => {
    setIsLicenseModalOpen(true);
  };

  const closeLicenseModal = () => {
    setIsLicenseModalOpen(false);
  };

  return (
    <LicenseContext.Provider 
      value={{ 
        openRegistrationModal, 
        closeRegistrationModal, 
        isRegistrationModalOpen,
        isLicenseModalOpen,
        licenseData,
        setLicenseData,
        openLicenseModal,
        closeLicenseModal
      }}
    >
      {children}
      <RegistrationModal 
        isOpen={isRegistrationModalOpen} 
        onClose={closeRegistrationModal} 
        setLicenseData={setLicenseData}
        openLicenseModal={openLicenseModal}
      />
      <LicenseModal 
        isOpen={isLicenseModalOpen} 
        onClose={closeLicenseModal}
        licenseData={licenseData}
      />
    </LicenseContext.Provider>
  );
}

export function useLicense() {
  const context = useContext(LicenseContext);
  
  if (context === undefined) {
    throw new Error('useLicense must be used within a LicenseProvider');
  }
  
  return context;
}