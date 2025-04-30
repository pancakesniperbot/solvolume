/**
 * Default SEO configuration for Solana Volume Bot
 * Implements YMYL (Your Money Your Life) guidelines
 * Follows W3C standards for HTML and structured data
 */
const defaultTitle = "Solana Volume Bot: SOL Volume Bot - Pump Fun Volume Bot";
const defaultDescription = "Professional Solana Volume Bot Platform. Enhance your token's visibility with strategic transaction distribution. Features include real-time analytics, multi-wallet support, and compliance.";

export const defaultSEO = {
  title: "Solana Volume Bot: SOL Volume Bot - Pump Fun Volume Bot",
  description: "Professional Solana Volume Bot Platform. Enhance your token's visibility with strategic transaction distribution. Features include real-time analytics, multi-wallet support, and compliance.",
  keywords: "Solana volume bot, token visibility enhancement, professional DEX visibility, volume distribution, token visibility strategies, DEX ranking optimization, compliant volume distribution, Solana trading volume, DEX visibility platform, volume bot service",
  ogImage: "/logo.svg",
  ogUrl: "https://solanavolumebot.io",
  canonicalUrl: "https://solanavolumebot.io",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": defaultTitle,
      "url": "https://solanavolumebot.io",
      "logo": "https://solanavolumebot.io/logo.svg",
      "description": "Professional token visibility enhancement platform providing Solana volume distribution services with transparent methodology and compliant strategies for maximum DEX presence.",
      "sameAs": [
        "https://twitter.com/solanavolumebot",
        "https://discord.gg/solanavolumebot", 
        "https://t.me/solanavolumebot",
        "https://github.com/solanavolumebot"
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "email": "support@solanavolumebot.io",
          "availableLanguage": ["English"],
          "contactOption": "TollFree",
          "hoursAvailable": "Mo-Fr 09:00-17:00"
        },
        {
          "@type": "ContactPoint",
          "contactType": "legal",
          "email": "legal@solanavolumebot.io",
          "availableLanguage": ["English"]
        },
        {
          "@type": "ContactPoint",
          "contactType": "technical support",
          "email": "tech@solanavolumebot.io",
          "availableLanguage": ["English"]
        }
      ],
      "foundingDate": "2023-06-15",
      "foundingLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "US"
        }
      },
      "founder": {
        "@type": "Person", 
        "name": "Solana Trading Technology Team",
        "jobTitle": "Volume Distribution Specialists"
      },
      "employee": [
        {
          "@type": "Person",
          "name": "Volume Strategy Team",
          "jobTitle": "Certified Blockchain Developers"
        },
        {
          "@type": "Person",
          "name": "Compliance Team",
          "jobTitle": "Financial Regulation Experts"
        }
      ],
      "ethicsPolicy": "https://solanavolumebot.io/#legal",
      "memberOf": {
        "@type": "Organization",
        "name": "Solana Foundation Developer Program"
      },
      "award": "Best Volume Distribution Tool - Solana Hackathon 2023",
      "knowsAbout": [
        "Solana Blockchain", 
        "Volume Distribution Strategies", 
        "Token Visibility Enhancement", 
        "DEX Ranking Algorithms", 
        "Blockchain Compliance"
      ],
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "certification",
        "name": "Blockchain Security and Volume Distribution Certification"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": defaultTitle,
      "url": "https://solanavolumebot.io",
      "description": "Professional Solana Volume Bot platform providing token visibility enhancement through strategic transaction distribution. Boost DEX rankings with compliant, natural-looking volume patterns and real-time performance monitoring.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://solanavolumebot.io/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Solana Volume Bot",
        "logo": {
          "@type": "ImageObject",
          "url": "https://solanavolumebot.io/logo.svg",
          "width": "180",
          "height": "180"
        }
      },
      "inLanguage": "en-US",
      "datePublished": "2023-06-15",
      "dateModified": "2025-04-21",
      "copyrightYear": 2025,
      "copyrightHolder": {
        "@type": "Organization",
        "name": "Solana Volume Bot",
        "foundingDate": "2023-06-15"
      },
      "keywords": "Solana Volume Bot, token visibility enhancement, DEX ranking optimization, professional volume distribution, verified Solana transactions",
      "audience": {
        "@type": "Audience",
        "audienceType": "Token project teams, blockchain developers, cryptocurrency creators"
      },
      "creativeWorkStatus": "Published",
      "accessibilityControl": ["fullKeyboardControl", "fullMouseControl"],
      "accessibilityHazard": ["noFlashingHazard", "noMotionSimulationHazard", "noSoundHazard"],
      "accessibilityFeature": ["highContrast", "largePrint", "structuralNavigation", "tableOfContents"]
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": defaultTitle,
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web, Cloud, SaaS",
      "offers": [
        {
          "@type": "Offer",
          "name": "Basic Volume Bot Plan",
          "description": "Entry-level volume distribution for new tokens with industry-standard security protocols",
          "price": "99.00",
          "priceCurrency": "USD",
          "eligibleRegion": {
            "@type": "Country",
            "name": "Global"
          },
          "availability": "https://schema.org/InStock",
          "warranty": "30-day money-back guarantee",
          "seller": {
            "@type": "Organization",
            "name": "Solana Volume Bot",
            "url": "https://solanavolumebot.io"
          },
          "pricePlan": "Monthly subscription",
          "priceValidUntil": "2025-12-31"
        },
        {
          "@type": "Offer",
          "name": "Professional Volume Distribution",
          "description": "Advanced volume distribution with trending strategies and dedicated support team",
          "price": "299.00",
          "priceCurrency": "USD",
          "eligibleRegion": {
            "@type": "Country",
            "name": "Global"
          },
          "availability": "https://schema.org/InStock",
          "warranty": "30-day money-back guarantee",
          "seller": {
            "@type": "Organization",
            "name": "Solana Volume Bot",
            "url": "https://solanavolumebot.io"
          },
          "pricePlan": "Monthly subscription",
          "priceValidUntil": "2025-12-31"
        },
        {
          "@type": "Offer",
          "name": "Enterprise Volume Solution",
          "description": "Custom volume distribution strategies and VIP support with dedicated account manager",
          "price": "499.00",
          "priceCurrency": "USD",
          "eligibleRegion": {
            "@type": "Country",
            "name": "Global"
          },
          "availability": "https://schema.org/InStock",
          "warranty": "30-day money-back guarantee",
          "seller": {
            "@type": "Organization",
            "name": "Solana Volume Bot",
            "url": "https://solanavolumebot.io"
          },
          "pricePlan": "Monthly subscription",
          "priceValidUntil": "2025-12-31"
        }
      ],
      "description": "Advanced Solana Volume Bot platform enhancing token visibility on DEXs through strategic transaction patterns. Generate natural trading activity to boost rankings with compliant volume distribution strategies and real-time performance monitoring.",
      "applicationSubCategory": "Volume Distribution & Token Visibility",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "245",
        "bestRating": "5",
        "worstRating": "1",
        "reviewCount": "245"
      },
      "award": "Best Volume Distribution Tool - Solana Developer Summit 2024",
      "releaseNotes": "Latest update includes enhanced volume distribution algorithms, transaction pattern optimization, multi-wallet coordination improvements, and expanded DEX integration capabilities.",
      "softwareRequirements": "Modern web browser with JavaScript enabled",
      "softwareVersion": "2.1.0",
      "provider": {
        "@type": "Organization",
        "name": "Solana Volume Bot",
        "legalName": "Solana Volume Bot Ltd.",
        "vatID": "US23445566",
        "url": "https://solanavolumebot.io"
      },
      "audience": {
        "@type": "Audience",
        "audienceType": "Token project teams, blockchain developers"
      },
      "countriesSupported": "Global",
      "supportingData": {
        "@type": "DataFeed",
        "name": "Solana Blockchain Data",
        "description": "Real-time data from the Solana blockchain with validated sources"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the Solana Volume Bot platform?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Solana Volume Bot is a professional platform that enhances token visibility through strategic volume distribution on Solana-based decentralized exchanges. Our platform is developed by certified blockchain developers who understand how DEX ranking algorithms work, helping your token gain visibility on platforms like DEXTools, Pump.Fun, and DEXScreener through compliant, natural-looking transaction patterns distributed across multiple wallets."
          }
        },
        {
          "@type": "Question",
          "name": "How do you ensure volume distribution efficiency and transparency?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our platform distributes volume through strategic transaction patterns on the Solana blockchain using industry-standard security protocols. All volume transactions are conducted through compliant methods that mimic natural trading patterns. We maintain detailed documentation of our distribution methodology, and clients receive comprehensive reports of all activity. Our volume distribution strategies undergo regular optimization based on DEX algorithm changes to ensure maximum visibility impact while maintaining market integrity."
          }
        },
        {
          "@type": "Question",
          "name": "What security measures do you implement to protect user data?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We implement comprehensive security measures including end-to-end encryption (AES-256), secure API connections through OAuth 2.0, and regular penetration testing by independent security firms. Our infrastructure is hosted on SOC 2 Type II compliant servers with real-time threat monitoring. User data is protected by role-based access controls, and we maintain clear data retention policies that comply with global privacy regulations including GDPR and CCPA."
          }
        },
        {
          "@type": "Question",
          "name": "Who is behind Solana Volume Bot and what are your qualifications?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Solana Volume Bot was founded in June 2023 by a team of certified blockchain professionals with extensive experience in decentralized exchange optimization and Solana development. Our leadership team includes certified blockchain developers (CBD), DEX optimization specialists, and former financial compliance officers with a combined 25+ years of experience in volume distribution strategies. We're registered members of the Solana Foundation Developer Program and maintain partnerships with leading DEX platforms for optimal visibility enhancement."
          }
        },
        {
          "@type": "Question",
          "name": "What legal protections do users have when using your platform?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Users are protected by our comprehensive Terms of Service, Privacy Policy, and Data Processing Agreement - all drafted and regularly reviewed by our legal team specializing in digital asset compliance. We operate in accordance with applicable financial regulations and maintain transparent business practices. All subscriptions include a 30-day money-back guarantee, and users maintain full ownership and control of their data with the right to export or delete it at any time."
          }
        },
        {
          "@type": "Question",
          "name": "How does your Volume Bot platform work compared to trading bots?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our Volume Bot platform enhances token visibility through strategic transaction distribution, unlike trading bots that focus on profit generation. We use compliant, natural-looking transaction patterns to boost your token's ranking on DEXs without requiring access to your wallet private keys. Our platform focuses on increasing organic discovery of your token rather than automated trading. We adhere to strict ethical guidelines that maintain market integrity and follow sustainable visibility practices."
          }
        },
        {
          "@type": "Question",
          "name": "What credentials or certifications do your Volume Bot professionals hold?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our Volume Bot team includes professionals with Certified Blockchain Developer (CBD) credentials, Certified Information Systems Security Professional (CISSP) certifications, and practical experience in Solana ecosystem development. Our methodology team includes financial compliance experts who ensure all volume distribution patterns meet regulatory requirements. We maintain ongoing professional education in blockchain technologies, with specific focus on Solana infrastructure and DEX integration for optimal volume distribution."
          }
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Understanding Token Visibility Through Volume Distribution on Solana",
      "description": "Professional guide to boosting token visibility through strategic volume distribution for Solana-based projects.",
      "image": "https://solanavolumebot.io/volume-bot-guide.jpg",
      "datePublished": "2024-03-15T08:00:00+08:00",
      "dateModified": "2024-04-18T08:00:00+08:00",
      "author": {
        "@type": "Organization",
        "name": "Solana Volume Bot Development Team",
        "url": "https://solanavolumebot.io"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Solana Volume Bot",
        "logo": {
          "@type": "ImageObject",
          "url": "https://solanavolumebot.io/logo.svg",
          "width": "180",
          "height": "180"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://solanavolumebot.io/volume-bot-guide"
      }
    }
  ]
};

/**
 * Terms of Service SEO configuration
 * YMYL-optimized for transparency and legal compliance
 */
export const termsSEO = {
  title: defaultTitle,
  description: "Official legally-binding terms and conditions for Solana Volume Bot's professional volume enhancement platform. Transparent information about user rights, data handling, and service limitations.",
  keywords: "solana volume bot terms, legal terms of service, binding user agreement, professional volume bot terms, compliant token visibility, legal platform terms, token volume terms, financial bot terms, blockchain volume agreement",
  ogImage: "/logo.svg",
  ogUrl: "https://solanavolumebot.io/#legal",
  canonicalUrl: "https://solanavolumebot.io/#legal",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Terms of Service - Solana Volume Bot Platform",
      "description": "Complete legal terms and conditions for using our professional Solana Volume Bot platform. Includes all rights, responsibilities, and warranty information.",
      "publisher": {
        "@type": "Organization",
        "name": "Solana Volume Bot",
        "logo": "https://solanavolumebot.io/logo.svg"
      },
      "license": "https://solanavolumebot.io/#legal",
      "mainContentOfPage": {
        "@type": "WebPageElement",
        "cssSelector": "#terms-of-service"
      },
      "specialty": "Legal Agreement",
      "lastReviewed": "2024-04-15",
      "reviewedBy": {
        "@type": "Organization",
        "name": "Legal Compliance Team"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "LegalService",
      "name": "Solana Volume Bot Legal Department",
      "description": "Our legal department ensures all terms and agreements comply with relevant regulations and protect both user and platform interests.",
      "availableLanguage": "English",
      "serviceType": "Terms of Service Compliance",
      "termsOfService": "https://solanavolumebot.io/#legal",
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "certification",
        "name": "Financial Technology Compliance Certification"
      }
    }
  ]
};

/**
 * Privacy Policy SEO configuration
 * YMYL-optimized for data protection compliance and transparency
 */
export const privacySEO = {
  title: defaultTitle,
  description: "Comprehensive privacy policy detailing how we collect, process, protect, and secure your personal data, in full compliance with global data protection regulations.",
  keywords: "privacy policy, GDPR compliant privacy, blockchain data protection, token volume privacy, data security policy, SOC 2 compliance, data encryption standards, user data protection, secure volume platform, data rights policy",
  ogImage: "/logo.svg",
  ogUrl: "https://solanavolumebot.io/#legal",
  canonicalUrl: "https://solanavolumebot.io/#legal",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Privacy Policy - Solana Volume Bot Platform",
      "description": "Comprehensive information about how we collect, use, protect, and handle your personal data in compliance with global data protection standards.",
      "publisher": {
        "@type": "Organization",
        "name": "Solana Volume Bot",
        "logo": "https://solanavolumebot.io/logo.svg"
      },
      "mainContentOfPage": {
        "@type": "WebPageElement",
        "cssSelector": "#privacy-policy"
      },
      "specialty": "Data Protection",
      "lastReviewed": "2024-04-15",
      "reviewedBy": {
        "@type": "Organization",
        "name": "Data Protection Office"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "DataCatalog",
      "name": "Solana Volume Bot User Data Protection Framework",
      "description": "Our comprehensive framework for protecting user data with industry-standard encryption and security protocols.",
      "creator": {
        "@type": "Organization",
        "name": "Solana Volume Bot Data Security Team"
      },
      "license": "https://solanavolumebot.io/#legal",
      "contentRating": "Safe For Work"
    }
  ]
};

/**
 * DMCA Policy SEO configuration
 * YMYL-optimized for intellectual property protection and legal compliance
 */
export const dmcaSEO = {
  title: defaultTitle,
  description: "Official Digital Millennium Copyright Act (DMCA) compliance policy with transparent procedures for reporting intellectual property infringement and copyright protection measures.",
  keywords: "DMCA policy, copyright infringement reporting, intellectual property protection, digital rights management, content takedown procedure, copyright compliance, IP protection policy, legal content compliance",
  ogImage: "/logo.svg",
  ogUrl: "https://solanavolumebot.io/#legal",
  canonicalUrl: "https://solanavolumebot.io/#legal",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "DMCA Policy - Solana Volume Bot Platform",
      "description": "Our detailed Digital Millennium Copyright Act (DMCA) policy outlining intellectual property protection, copyright compliance, and procedures for reporting infringement claims.",
      "publisher": {
        "@type": "Organization",
        "name": "Solana Volume Bot",
        "logo": "https://solanavolumebot.io/logo.svg"
      },
      "mainContentOfPage": {
        "@type": "WebPageElement",
        "cssSelector": "#dmca-policy"
      },
      "specialty": "Copyright Protection",
      "lastReviewed": "2024-04-15",
      "reviewedBy": {
        "@type": "Organization",
        "name": "Intellectual Property Compliance Office"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "LegalService",
      "name": "Solana Volume Bot Copyright Department",
      "description": "Our copyright department handles all DMCA requests and ensures proper intellectual property protection across our platform.",
      "availableLanguage": "English",
      "serviceType": "Copyright Protection and DMCA Compliance",
      "email": "legal@solanavolumebot.io",
      "termsOfService": "https://solanavolumebot.io/#legal"
    }
  ]
};