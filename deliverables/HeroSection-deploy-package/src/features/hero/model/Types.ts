export interface FeatureItem {
  img: string;
  title: string;
  desc: string;
}

export interface FeaturesContent {
  left: FeatureItem[];
  right: FeatureItem[];
}

export interface TopBlockContent {
  text: string;
  title: string;
  desc: string;
}

export interface SixthSliceItem {
  text: string;
  title: string;
  desc: string;
}

export interface HeroState {
  activeCard: number | null;
  activeTopBlock: number | null;
  carouselOffset: number;
  currentSection: number;
  leftBlocks: string[];
  rightBlocks: string[];
  sixthsliceData: Record<number, SixthSliceItem[]>;
  topBlockContent: Record<number, TopBlockContent>;
  featuresContent: Record<number, FeaturesContent>;
}
