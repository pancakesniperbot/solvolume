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
export async function generateLicense(email: string): Promise<LicenseResponse> {
  try {
    // We use the built-in API endpoint in the /api directory
    const response = await fetch('/api/license', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to generate license: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('License generation error:', error);
    throw error;
  }
}

/**
 * Tracks a specific action with the license service
 * @param action - The action to track
 * @param params - Additional parameters for tracking
 */
export async function trackAction(
  action: 'license_activated' | 'download_clicked' | 'bot_started' | 'bot_configured',
  params: TrackingParams = {}
): Promise<void> {
  try {
    // Only track if we're in production
    if (import.meta.env.DEV) {
      console.log(`[DEV] Tracking action: ${action}`, params);
      return;
    }

    const response = await fetch('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action,
        ...params,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to track action: ${errorText}`);
    }
  } catch (error) {
    console.error('Action tracking error:', error);
  }
}

/**
 * Verifies a license key
 * @param licenseKey - The license key to verify
 * @returns Whether the license key is valid
 */
export async function verifyLicense(licenseKey: string): Promise<boolean> {
  try {
    const response = await fetch('/api/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ licenseKey }),
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.valid === true;
  } catch (error) {
    console.error('License verification error:', error);
    return false;
  }
}