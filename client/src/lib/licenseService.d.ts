/**
 * Service for generating and verifying license keys through a Cloudflare Workers API
 */
interface LicenseResponse {
    license: string;
    email: string;
    primaryUrl: string;
    backupUrl: string;
    updatedDate: string;
    timestamp: string;
}
interface TrackingParams {
    licenseKey?: string;
    tokenId?: string;
    action?: string;
}
/**
 * Submits an email to the license service to generate a license key
 * @param email - User's email address
 * @returns License data including the license key and download URLs
 */
export declare function generateLicense(email: string): Promise<LicenseResponse>;
/**
 * Tracks a specific action with the license service
 * @param action - The action to track
 * @param params - Additional parameters for tracking
 */
export declare function trackAction(action: 'license_activated' | 'download_clicked' | 'bot_started' | 'bot_configured', params?: TrackingParams): Promise<void>;
/**
 * Verifies a license key
 * @param licenseKey - The license key to verify
 * @returns Whether the license key is valid
 */
export declare function verifyLicense(licenseKey: string): Promise<boolean>;
export {};
