/**
 * Default SEO configuration for Solana Volume Bot
 * Implements YMYL (Your Money Your Life) guidelines
 * Follows W3C standards for HTML and structured data
 */
export declare const defaultSEO: {
    title: string;
    description: string;
    keywords: string;
    ogImage: string;
    ogUrl: string;
    canonicalUrl: string;
    jsonLd: ({
        "@context": string;
        "@type": string;
        name: string;
        url: string;
        logo: string;
        description: string;
        sameAs: string[];
        contactPoint: ({
            "@type": string;
            contactType: string;
            email: string;
            availableLanguage: string[];
            contactOption: string;
            hoursAvailable: string;
        } | {
            "@type": string;
            contactType: string;
            email: string;
            availableLanguage: string[];
            contactOption?: undefined;
            hoursAvailable?: undefined;
        })[];
        foundingDate: string;
        foundingLocation: {
            "@type": string;
            address: {
                "@type": string;
                addressCountry: string;
            };
        };
        founder: {
            "@type": string;
            name: string;
            jobTitle: string;
        };
        employee: {
            "@type": string;
            name: string;
            jobTitle: string;
        }[];
        ethicsPolicy: string;
        memberOf: {
            "@type": string;
            name: string;
        };
        award: string;
        knowsAbout: string[];
        hasCredential: {
            "@type": string;
            credentialCategory: string;
            name: string;
        };
        potentialAction?: undefined;
        publisher?: undefined;
        inLanguage?: undefined;
        datePublished?: undefined;
        dateModified?: undefined;
        copyrightYear?: undefined;
        copyrightHolder?: undefined;
        keywords?: undefined;
        audience?: undefined;
        creativeWorkStatus?: undefined;
        accessibilityControl?: undefined;
        accessibilityHazard?: undefined;
        accessibilityFeature?: undefined;
        applicationCategory?: undefined;
        operatingSystem?: undefined;
        offers?: undefined;
        applicationSubCategory?: undefined;
        aggregateRating?: undefined;
        releaseNotes?: undefined;
        softwareRequirements?: undefined;
        softwareVersion?: undefined;
        provider?: undefined;
        countriesSupported?: undefined;
        supportingData?: undefined;
        mainEntity?: undefined;
        headline?: undefined;
        image?: undefined;
        author?: undefined;
        mainEntityOfPage?: undefined;
    } | {
        "@context": string;
        "@type": string;
        name: string;
        url: string;
        description: string;
        potentialAction: {
            "@type": string;
            target: string;
            "query-input": string;
        };
        publisher: {
            "@type": string;
            name: string;
            logo: {
                "@type": string;
                url: string;
                width: string;
                height: string;
            };
        };
        inLanguage: string;
        datePublished: string;
        dateModified: string;
        copyrightYear: number;
        copyrightHolder: {
            "@type": string;
            name: string;
            foundingDate: string;
        };
        keywords: string;
        audience: {
            "@type": string;
            audienceType: string;
        };
        creativeWorkStatus: string;
        accessibilityControl: string[];
        accessibilityHazard: string[];
        accessibilityFeature: string[];
        logo?: undefined;
        sameAs?: undefined;
        contactPoint?: undefined;
        foundingDate?: undefined;
        foundingLocation?: undefined;
        founder?: undefined;
        employee?: undefined;
        ethicsPolicy?: undefined;
        memberOf?: undefined;
        award?: undefined;
        knowsAbout?: undefined;
        hasCredential?: undefined;
        applicationCategory?: undefined;
        operatingSystem?: undefined;
        offers?: undefined;
        applicationSubCategory?: undefined;
        aggregateRating?: undefined;
        releaseNotes?: undefined;
        softwareRequirements?: undefined;
        softwareVersion?: undefined;
        provider?: undefined;
        countriesSupported?: undefined;
        supportingData?: undefined;
        mainEntity?: undefined;
        headline?: undefined;
        image?: undefined;
        author?: undefined;
        mainEntityOfPage?: undefined;
    } | {
        "@context": string;
        "@type": string;
        name: string;
        applicationCategory: string;
        operatingSystem: string;
        offers: {
            "@type": string;
            name: string;
            description: string;
            price: string;
            priceCurrency: string;
            eligibleRegion: {
                "@type": string;
                name: string;
            };
            availability: string;
            warranty: string;
            seller: {
                "@type": string;
                name: string;
                url: string;
            };
            pricePlan: string;
            priceValidUntil: string;
        }[];
        description: string;
        applicationSubCategory: string;
        aggregateRating: {
            "@type": string;
            ratingValue: string;
            ratingCount: string;
            bestRating: string;
            worstRating: string;
            reviewCount: string;
        };
        award: string;
        releaseNotes: string;
        softwareRequirements: string;
        softwareVersion: string;
        provider: {
            "@type": string;
            name: string;
            legalName: string;
            vatID: string;
            url: string;
        };
        audience: {
            "@type": string;
            audienceType: string;
        };
        countriesSupported: string;
        supportingData: {
            "@type": string;
            name: string;
            description: string;
        };
        url?: undefined;
        logo?: undefined;
        sameAs?: undefined;
        contactPoint?: undefined;
        foundingDate?: undefined;
        foundingLocation?: undefined;
        founder?: undefined;
        employee?: undefined;
        ethicsPolicy?: undefined;
        memberOf?: undefined;
        knowsAbout?: undefined;
        hasCredential?: undefined;
        potentialAction?: undefined;
        publisher?: undefined;
        inLanguage?: undefined;
        datePublished?: undefined;
        dateModified?: undefined;
        copyrightYear?: undefined;
        copyrightHolder?: undefined;
        keywords?: undefined;
        creativeWorkStatus?: undefined;
        accessibilityControl?: undefined;
        accessibilityHazard?: undefined;
        accessibilityFeature?: undefined;
        mainEntity?: undefined;
        headline?: undefined;
        image?: undefined;
        author?: undefined;
        mainEntityOfPage?: undefined;
    } | {
        "@context": string;
        "@type": string;
        mainEntity: {
            "@type": string;
            name: string;
            acceptedAnswer: {
                "@type": string;
                text: string;
            };
        }[];
        name?: undefined;
        url?: undefined;
        logo?: undefined;
        description?: undefined;
        sameAs?: undefined;
        contactPoint?: undefined;
        foundingDate?: undefined;
        foundingLocation?: undefined;
        founder?: undefined;
        employee?: undefined;
        ethicsPolicy?: undefined;
        memberOf?: undefined;
        award?: undefined;
        knowsAbout?: undefined;
        hasCredential?: undefined;
        potentialAction?: undefined;
        publisher?: undefined;
        inLanguage?: undefined;
        datePublished?: undefined;
        dateModified?: undefined;
        copyrightYear?: undefined;
        copyrightHolder?: undefined;
        keywords?: undefined;
        audience?: undefined;
        creativeWorkStatus?: undefined;
        accessibilityControl?: undefined;
        accessibilityHazard?: undefined;
        accessibilityFeature?: undefined;
        applicationCategory?: undefined;
        operatingSystem?: undefined;
        offers?: undefined;
        applicationSubCategory?: undefined;
        aggregateRating?: undefined;
        releaseNotes?: undefined;
        softwareRequirements?: undefined;
        softwareVersion?: undefined;
        provider?: undefined;
        countriesSupported?: undefined;
        supportingData?: undefined;
        headline?: undefined;
        image?: undefined;
        author?: undefined;
        mainEntityOfPage?: undefined;
    } | {
        "@context": string;
        "@type": string;
        headline: string;
        description: string;
        image: string;
        datePublished: string;
        dateModified: string;
        author: {
            "@type": string;
            name: string;
            url: string;
        };
        publisher: {
            "@type": string;
            name: string;
            logo: {
                "@type": string;
                url: string;
                width: string;
                height: string;
            };
        };
        mainEntityOfPage: {
            "@type": string;
            "@id": string;
        };
        name?: undefined;
        url?: undefined;
        logo?: undefined;
        sameAs?: undefined;
        contactPoint?: undefined;
        foundingDate?: undefined;
        foundingLocation?: undefined;
        founder?: undefined;
        employee?: undefined;
        ethicsPolicy?: undefined;
        memberOf?: undefined;
        award?: undefined;
        knowsAbout?: undefined;
        hasCredential?: undefined;
        potentialAction?: undefined;
        inLanguage?: undefined;
        copyrightYear?: undefined;
        copyrightHolder?: undefined;
        keywords?: undefined;
        audience?: undefined;
        creativeWorkStatus?: undefined;
        accessibilityControl?: undefined;
        accessibilityHazard?: undefined;
        accessibilityFeature?: undefined;
        applicationCategory?: undefined;
        operatingSystem?: undefined;
        offers?: undefined;
        applicationSubCategory?: undefined;
        aggregateRating?: undefined;
        releaseNotes?: undefined;
        softwareRequirements?: undefined;
        softwareVersion?: undefined;
        provider?: undefined;
        countriesSupported?: undefined;
        supportingData?: undefined;
        mainEntity?: undefined;
    })[];
};
/**
 * Terms of Service SEO configuration
 * YMYL-optimized for transparency and legal compliance
 */
export declare const termsSEO: {
    title: string;
    description: string;
    keywords: string;
    ogImage: string;
    ogUrl: string;
    canonicalUrl: string;
    jsonLd: ({
        "@context": string;
        "@type": string;
        name: string;
        description: string;
        publisher: {
            "@type": string;
            name: string;
            logo: string;
        };
        license: string;
        mainContentOfPage: {
            "@type": string;
            cssSelector: string;
        };
        specialty: string;
        lastReviewed: string;
        reviewedBy: {
            "@type": string;
            name: string;
        };
        availableLanguage?: undefined;
        serviceType?: undefined;
        termsOfService?: undefined;
        hasCredential?: undefined;
    } | {
        "@context": string;
        "@type": string;
        name: string;
        description: string;
        availableLanguage: string;
        serviceType: string;
        termsOfService: string;
        hasCredential: {
            "@type": string;
            credentialCategory: string;
            name: string;
        };
        publisher?: undefined;
        license?: undefined;
        mainContentOfPage?: undefined;
        specialty?: undefined;
        lastReviewed?: undefined;
        reviewedBy?: undefined;
    })[];
};
/**
 * Privacy Policy SEO configuration
 * YMYL-optimized for data protection compliance and transparency
 */
export declare const privacySEO: {
    title: string;
    description: string;
    keywords: string;
    ogImage: string;
    ogUrl: string;
    canonicalUrl: string;
    jsonLd: ({
        "@context": string;
        "@type": string;
        name: string;
        description: string;
        publisher: {
            "@type": string;
            name: string;
            logo: string;
        };
        mainContentOfPage: {
            "@type": string;
            cssSelector: string;
        };
        specialty: string;
        lastReviewed: string;
        reviewedBy: {
            "@type": string;
            name: string;
        };
        creator?: undefined;
        license?: undefined;
        contentRating?: undefined;
    } | {
        "@context": string;
        "@type": string;
        name: string;
        description: string;
        creator: {
            "@type": string;
            name: string;
        };
        license: string;
        contentRating: string;
        publisher?: undefined;
        mainContentOfPage?: undefined;
        specialty?: undefined;
        lastReviewed?: undefined;
        reviewedBy?: undefined;
    })[];
};
/**
 * DMCA Policy SEO configuration
 * YMYL-optimized for intellectual property protection and legal compliance
 */
export declare const dmcaSEO: {
    title: string;
    description: string;
    keywords: string;
    ogImage: string;
    ogUrl: string;
    canonicalUrl: string;
    jsonLd: ({
        "@context": string;
        "@type": string;
        name: string;
        description: string;
        publisher: {
            "@type": string;
            name: string;
            logo: string;
        };
        mainContentOfPage: {
            "@type": string;
            cssSelector: string;
        };
        specialty: string;
        lastReviewed: string;
        reviewedBy: {
            "@type": string;
            name: string;
        };
        availableLanguage?: undefined;
        serviceType?: undefined;
        email?: undefined;
        termsOfService?: undefined;
    } | {
        "@context": string;
        "@type": string;
        name: string;
        description: string;
        availableLanguage: string;
        serviceType: string;
        email: string;
        termsOfService: string;
        publisher?: undefined;
        mainContentOfPage?: undefined;
        specialty?: undefined;
        lastReviewed?: undefined;
        reviewedBy?: undefined;
    })[];
};
