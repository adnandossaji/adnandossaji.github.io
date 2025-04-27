/// <reference types="astro/client" />

// Declare the content collections types
declare module 'astro:content' {
  interface ContentCollectionEntry {
    'blog': {
      id: string;
      data: {
        title: string;
        description: string;
        pubDate: Date;
        updatedDate?: Date;
        heroImage?: string;
        tags: string[];
      };
    };
    'gallery': {
      id: string;
      data: {
        title: string;
        description?: string;
        src: string;
        alt?: string;
        tags: string[];
        date?: Date;
      };
    };
    'resources': {
      id: string;
      data: {
        title: string;
        description: string;
        url: string;
        category: string;
        tags: string[];
        isFree: boolean;
        featured: boolean;
        dateAdded: Date;
        lastUpdated?: Date;
        icon?: string;
      };
    };
  }

  // Define the collections that are available
  type ContentCollections = {
    'blog': ContentCollectionEntry['blog'][];
    'gallery': ContentCollectionEntry['gallery'][];
    'resources': ContentCollectionEntry['resources'][];
  };

  // Export the getCollection function
  export function getCollection<C extends keyof ContentCollections>(
    collection: C,
    filter?: (entry: ContentCollections[C][number]) => boolean
  ): Promise<ContentCollections[C]>;
} 