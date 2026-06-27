export interface HeroSection {
  title: string;
  subtitle: string;
  image: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
  id?: string;
}

export interface AboutSection {
  title: string;
  content: string;
  image: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  company: string;
  image: string;
  id?: string;
}

export interface ContentType {
  hero: HeroSection;
  features: Feature[];
  about: AboutSection;
  testimonials: Testimonial[];
}