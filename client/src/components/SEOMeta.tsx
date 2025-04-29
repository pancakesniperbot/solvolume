import { Helmet } from 'react-helmet';

interface SEOMetaProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  twitterCard?: string;
  twitterSite?: string;
  twitterCreator?: string;
  twitterImage?: string;
  twitterImageAlt?: string;
  canonicalUrl?: string;
}

/**
 * SEO Meta Component for YMYL (Your Money Your Life) compliant websites
 * This component implements best practices for SEO and structured data
 * according to W3C standards and YMYL guidelines
 */
export const SEOMeta: React.FC<SEOMetaProps> = ({
  title = 'Solana Volume Bot - Automated Trading Bot for Solana',
  description = 'Solana Volume Bot is an automated trading bot designed to help traders maximize their profits on the Solana blockchain. Get started with our easy-to-use platform today.',
  keywords = 'solana, trading bot, automated trading, cryptocurrency, defi, volume bot, solana bot',
  ogTitle,
  ogDescription,
  ogImage = 'https://solana-volumebot.com/og-image.jpg',
  ogUrl,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  twitterSite = '@solana_volumebot',
  twitterCreator = '@solana_volumebot',
  twitterImage = 'https://solana-volumebot.com/twitter-image.jpg',
  twitterImageAlt = 'Solana Volume Bot',
  canonicalUrl,
}) => {
  const siteTitle = 'Solana Volume Bot';
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;
  const ogTitleFinal = ogTitle || fullTitle;
  const ogDescriptionFinal = ogDescription || description;
  const ogUrlFinal = ogUrl || (typeof window !== 'undefined' ? window.location.href : '');
  const canonicalUrlFinal = canonicalUrl || ogUrlFinal;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: siteTitle,
    description: description,
    url: ogUrlFinal,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };

  return (
    <Helmet>
      {/* Primary Meta Tags - YMYL Optimized */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Solana Volume Bot Team" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={canonicalUrlFinal} />
      
      {/* Accessibility and Language */}
      <html lang="en" />
      <meta httpEquiv="content-language" content="en-US" />
      
      {/* Performance & Device Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      
      {/* Security Tags - YMYL Trust Indicators */}
      <meta httpEquiv="Content-Security-Policy" content="default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'" />
      <meta httpEquiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains; preload" />
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta name="referrer" content="no-referrer-when-downgrade" />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={ogTitleFinal} />
      <meta property="og:description" content={ogDescriptionFinal} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrlFinal} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Solana Volume Bot" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:updated_time" content={new Date().toISOString()} />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={twitterSite} />
      <meta name="twitter:creator" content={twitterCreator} />
      <meta name="twitter:title" content={ogTitleFinal} />
      <meta name="twitter:description" content={ogDescriptionFinal} />
      <meta name="twitter:image" content={twitterImage} />
      <meta name="twitter:image:alt" content={twitterImageAlt} />
      
      {/* YMYL Trust & Professional Indication Tags */}
      <meta name="theme-color" content="#ffffff" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="application-name" content="Solana Volume Bot" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />
      
      {/* Web App Manifest - W3C Standard */}
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Cache Control - Browser Optimization */}
      <meta httpEquiv="Cache-Control" content="max-age=86400, public" />
      
      {/* Accessibility Tags */}
      <meta name="accessibility" content="WCAG2AA" />
      
      {/* Favicon and App Icons */}
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};
