export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  isFree: boolean;
  featured: boolean;
  dateAdded: string;
  lastUpdated?: string;
  icon?: string;
} 