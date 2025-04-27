import { getCollection } from 'astro:content';
import type { Resource } from '../types';

/**
 * Gets all resources from the resources collection
 */
export async function getResources(): Promise<Resource[]> {
  try {
    // Get all entries from the resources collection
    const resourceEntries = await getCollection('resources');
    
    // Map collection entries to Resource objects
    const resources: Resource[] = resourceEntries.map(entry => ({
      id: entry.id,
      title: entry.data.title,
      description: entry.data.description,
      url: entry.data.url,
      category: entry.data.category,
      tags: entry.data.tags || [],
      isFree: entry.data.isFree !== undefined ? entry.data.isFree : true,
      featured: entry.data.featured || false,
      dateAdded: entry.data.dateAdded.toISOString(),
      lastUpdated: entry.data.lastUpdated?.toISOString(),
      icon: entry.data.icon
    }));
    
    // Sort by featured first, then date
    return resources.sort((a, b) => {
      // Sort by featured first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      
      // Then sort by date (newest first)
      return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    });
  } catch (error) {
    console.error('Error loading resources:', error);
    // Return empty array in case of error
    return [];
  }
} 