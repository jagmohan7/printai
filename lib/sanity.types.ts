// ─── Shared ───────────────────────────────────────────────────────────────────
export interface NavLink { label: string; href: string; }

// ─── Site Settings Types ──────────────────────────────────────────────────────
export interface SanityNavbar {
  productLinks: NavLink[];
  serviceLinks: NavLink[];
  ctaText:      string;
  ctaHref:      string;
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
  navbar: SanityNavbar;
  footer: SanityFooter;
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
}

export interface SanityAbout {
  badge:            string;
  heading:          string;
  headingHighlight: string;
  subtext:          string;
  whoWeAreP1:       string;
  whoWeAreP2:       string;
  highlights:       string[];
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

export interface HomepageData {
  hero:     SanityHero;
  about:    SanityAbout;
  services: SanityServices;
  why:      SanityWhy;
  contact:  SanityContact;
  seo: {
    title:       string;
    description: string;
  };
}
