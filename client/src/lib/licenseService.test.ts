import { generateLicense, verifyLicense } from './licenseService';

describe('License Service', () => {
  // Test email validation
  test('should reject invalid email format', async () => {
    const invalidEmails = [
      'test',
      'test@',
      '@test.com',
      'test@test',
      'test.com'
    ];

    for (const email of invalidEmails) {
      await expect(generateLicense(email)).rejects.toThrow('Invalid email format');
    }
  });

  // Test successful license generation
  test('should generate valid license for correct email', async () => {
    const email = 'test@example.com';
    const licenseData = await generateLicense(email);

    expect(licenseData).toHaveProperty('license');
    expect(licenseData).toHaveProperty('email', email);
    expect(licenseData).toHaveProperty('primaryUrl');
    expect(licenseData).toHaveProperty('backupUrl');
    expect(licenseData).toHaveProperty('updatedDate');
    expect(licenseData).toHaveProperty('timestamp');

    // Verify license format (XXXX-XXXX-XXXX-XXXX)
    expect(licenseData.license).toMatch(/^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/);
  });

  // Test license verification
  test('should verify valid license', async () => {
    const email = 'test@example.com';
    const licenseData = await generateLicense(email);
    const isValid = await verifyLicense(licenseData.license);
    expect(isValid).toBe(true);
  });

  // Test invalid license verification
  test('should reject invalid license', async () => {
    const invalidLicenses = [
      'INVALID-LICENSE-KEY',
      'XXXX-XXXX-XXXX-XXXX',
      '1234-5678-90AB-CDEF'
    ];

    for (const license of invalidLicenses) {
      const isValid = await verifyLicense(license);
      expect(isValid).toBe(false);
    }
  });

  // Test error handling
  test('should handle network errors gracefully', async () => {
    // Mock fetch to simulate network error
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

    await expect(generateLicense('test@example.com')).rejects.toThrow('Failed to generate license');
  });

  // Test response validation
  test('should validate response data structure', async () => {
    // Mock fetch to return invalid response
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        license: 'XXXX-XXXX-XXXX-XXXX',
        // Missing required fields
      })
    });

    await expect(generateLicense('test@example.com')).rejects.toThrow('Invalid license data received from server');
  });
}); 