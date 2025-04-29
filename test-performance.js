#!/usr/bin/env node

/**
 * Simple performance test script to verify compression and caching headers
 */

const http = require('http');
const https = require('https');

// Configuration
const TEST_URLS = [
  'http://localhost:5000/',
  'http://localhost:5000/assets/logo.png',
  'http://localhost:5000/src/main.tsx'
];

// Function to test a URL with and without compression
async function testUrl(url) {
  console.log(`\n🔍 Testing URL: ${url}`);
  
  // Test with compression
  console.log('\n📊 With compression:');
  await makeRequest(url, { 'Accept-Encoding': 'gzip' });
  
  // Test without compression
  console.log('\n📊 Without compression:');
  await makeRequest(url, {});
  
  console.log('\n' + '-'.repeat(80));
}

// Function to make HTTP request and log headers
function makeRequest(url, headers) {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'HEAD',
      headers: headers
    };
    
    const client = url.startsWith('https') ? https : http;
    
    const req = client.request(url, options, (res) => {
      console.log(`  Status: ${res.statusCode}`);
      console.log('  Headers:');
      
      // Log relevant headers for our performance tests
      const relevantHeaders = [
        'content-encoding',
        'content-length',
        'cache-control',
        'expires',
        'etag',
        'vary'
      ];
      
      // Print all headers in a nice format
      Object.entries(res.headers).forEach(([key, value]) => {
        if (relevantHeaders.includes(key.toLowerCase())) {
          console.log(`    ${key}: ${value}`);
        }
      });
      
      resolve();
    });
    
    req.on('error', (err) => {
      console.error(`  Error: ${err.message}`);
      reject(err);
    });
    
    req.end();
  });
}

// Run tests
async function runTests() {
  console.log('🚀 Running Performance Tests');
  console.log('============================');
  
  for (const url of TEST_URLS) {
    await testUrl(url);
  }
  
  console.log('\n✅ Tests completed!');
}

runTests().catch(err => {
  console.error('Error running tests:', err);
  process.exit(1);
});