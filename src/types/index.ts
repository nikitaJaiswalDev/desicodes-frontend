export interface Language {
  id: string;
  name: string;
  nativeName: string;
  description: string;
  isActive?: boolean;
}

export interface FeatureCard {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  isActive?: boolean;
}

export interface SocialLink {
  id: string;
  name: string;
  href: string;
}