const fs = require('fs').promises;
const path = require('path');
const critical = require('critical');

async function extractCriticalCSS() {
  try {
    const result = await critical.generate({
      base: 'dist/',
      src: 'index.html',
      target: {
        css: 'assets/critical.css',
        html: 'index.html',
        uncritical: 'assets/non-critical.css',
      },
      dimensions: [
        {
          height: 900,
          width: 375,
        },
        {
          height: 900,
          width: 1440,
        },
      ],
      extract: true,
      inline: true,
      ignore: {
        atrule: ['@font-face'],
        rule: [/print/],
        decl: (node, value) => /url\(/.test(value),
      },
    });

    console.log('Critical CSS extracted successfully');
  } catch (error) {
    console.error('Error extracting critical CSS:', error);
    process.exit(1);
  }
}

extractCriticalCSS(); 