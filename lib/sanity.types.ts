// ─── Shared ───────────────────────────────────────────────────────────────────
export interface NavLink { label: string; href: string; }
export interface MainNavLink { label: string; href: string; hasDropdown?: boolean; }

// ─── Site Settings Types ──────────────────────────────────────────────────────
export interface SanityBrandColors {
  primaryColor?: string;
  primaryDark?:  string;
  navyColor?:    string;
}

export interface SanityNavbar {
  mainNavLinks?:   MainNavLink[];
  productLinks:    NavLink[];
  serviceLinks:    NavLink[];
  resourceLinks?:  NavLink[];
  ctaText:         string;
  ctaHref:         string;
}

export interface SanityFooter {
  tagline:      string;
  socials:      { label: string; href: string }[];
  quickLinks:   NavLink[];
  productLinks: NavLink[];
  serviceLinks: NavLink[];
  copyright:    string;
}

export interface SiteSettingsData {
  brand?:  SanityBrandColors;
  navbar:  SanityNavbar;
  footer:  SanityFooter;
}

// ─── Homepage Types ───────────────────────────────────────────────────────────

export interface SanityHero {
  badge:                string;
  heading:              string;
  headingHighlight:     string;
  subtext:              string;
  primaryButtonText:    string;
  primaryButtonHref:    string;
  secondaryButtonText:  string;
  secondaryButtonHref:  string;
  socials:              { label: string; href: string }[];
  review?:              { score: string; label: string };
}

export interface SanityStatItem { value: string; label: string; }
export interface SanityStats { items: SanityStatItem[]; }

export interface SanityAbout {
  badge:                 string;
  heading:               string;
  headingHighlight:      string;
  subtext:               string;
  whoWeAreP1:            string;
  whoWeAreP2:            string;
  highlights:            string[];
  statBadge?:            { value: string; label: string };
  primaryButtonText?:    string;
  primaryButtonHref?:    string;
  secondaryButtonText?:  string;
  secondaryButtonHref?:  string;
}

export interface SanityServiceCard {
  title:       string;
  iconName?:   string;
  description: string;
  href:        string;
  badge?:      string;
  features:    string[];
}

export interface SanityServices {
  badge:            string;
  heading:          string;
  headingHighlight: string;
  subtext:          string;
  cards:            SanityServiceCard[];
}

// ─── How It Works ───────────────────────────────────────────────────────────
export interface SanityHowStep { title: string; description: string; }
export interface SanityHowItWorks {
  eyebrow?: string;
  heading?: string;
  steps:    SanityHowStep[];
}

// ─── Blogs (posts auto-pulled from the Resources page) ──────────────────────
export interface SanityBlogPost {
  title:     string;
  category?: string;
  excerpt?:  string;
  href:      string;
  meta?:     string;
}
export interface SanityBlogs {
  eyebrow?:     string;
  heading?:     string;
  viewAllText?: string;
  viewAllHref?: string;
  posts:        SanityBlogPost[];
}

// ─── Testimonials (manual CMS entries) ──────────────────────────────────────
export interface SanityReview { quote: string; authorName: string; authorRole?: string; }
export interface SanityTestimonials {
  eyebrow?: string;
  heading?: string;
  rating?:  { score: string; count: string };
  reviews:  SanityReview[];
}

// ─── Contact CTA (gradient conversion band) ─────────────────────────────────
export interface SanityContactCta {
  eyebrow?:             string;
  heading?:             string;
  subtext?:             string;
  primaryButtonText?:   string;
  primaryButtonHref?:   string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  trustLabel?:          string;
}

export interface SanityWhyFeature {
  title: string;
  desc:  string;
}

export interface SanityWhy {
  badge:            string;
  heading:          string;
  headingHighlight: string;
  subtext:          string;
  features:         SanityWhyFeature[];
}

export interface SanityContactForm {
  nameLabel:      string;
  emailLabel:     string;
  companyLabel:   string;
  showCompany:    boolean;
  serviceLabel:   string;
  showService:    boolean;
  messageLabel:   string;
  buttonText:     string;
  successMessage: string;
}

export interface SanityContact {
  badge:            string;
  heading:          string;
  headingHighlight: string;
  subtext:          string;
  email:            string;
  socials:          { label: string; href: string }[];
  form:             SanityContactForm;
}

// ─── About Page Types ─────────────────────────────────────────────────────────

export interface AboutStat  { val: string; label: string; }
export interface AboutCap   { icon?: string; metric?: string; title?: string; desc?: string; }
export interface AboutFeat  { icon?: string; title?: string; desc?: string; }

export interface AboutHero {
  chip?:                string;
  heading?:             string;
  headingHighlight?:    string;
  subtext?:             string;
  primaryButtonText?:   string;
  primaryButtonHref?:   string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  trustItems?:          AboutStat[];
  solutions?:           string[];
}
export interface AboutAbout {
  eyebrow?:          string;
  heading?:          string;
  headingHighlight?: string;
  pullQuote?:        string;
  paragraph1?:       string;
  paragraph2?:       string;
  paragraph3?:       string;
  capabilities?:     AboutCap[];
}
export interface AboutStory {
  heading?:          string;
  headingHighlight?: string;
  intro?:            string;
  pullQuote?:        string;
  col1Para1?:        string;
  col1Para2?:        string;
  col2Para1?:        string;
  col2Callout?:      string;
}
export interface AboutMvv {
  missionTitle?: string;
  missionBody?:  string;
  visionTitle?:  string;
  visionBody?:   string;
  valuesTitle?:  string;
  values?:       string[];
}
export interface AboutFuture {
  eyebrow?:           string;
  heading?:           string;
  headingHighlight?:  string;
  subtext?:           string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  stats?:             AboutStat[];
  features?:          AboutFeat[];
}
export interface AboutBrands {
  eyebrow?:          string;
  heading?:          string;
  headingHighlight?: string;
  logos?:            string[];
}
export interface AboutReviews {
  heading?:     string;
  subtext?:     string;
  googleScore?: string;
  googleCount?: string;
}
export interface AboutCta {
  chip?:                string;
  heading?:             string;
  subtext?:             string;
  primaryButtonText?:   string;
  primaryButtonHref?:   string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  trustLine?:           string;
}
export interface AboutPageData {
  hero?:    AboutHero;
  about?:   AboutAbout;
  story?:   AboutStory;
  mvv?:     AboutMvv;
  future?:  AboutFuture;
  brands?:  AboutBrands;
  reviews?: AboutReviews;
  cta?:     AboutCta;
  seo?:     { title?: string; description?: string };
}

export interface HomepageData {
  hero:         SanityHero;
  stats:        SanityStats;
  about:        SanityAbout;
  services:     SanityServices;
  how:          SanityHowItWorks;
  testimonials: SanityTestimonials;
  contactCta:   SanityContactCta;
  why:          SanityWhy;
  contact:      SanityContact;
  seo: {
    title:       string;
    description: string;
  };
}
