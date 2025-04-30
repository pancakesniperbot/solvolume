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
export declare const SEOMeta: React.FC<SEOMetaProps>;
export {};
