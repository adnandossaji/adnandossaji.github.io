import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';
import fs from 'node:fs/promises';
import path from 'node:path';

export interface GalleryImage {
  id: string;
  src: string;
  thumbnail?: string;
  alt: string;
  title: string;
  description?: string;
  tags: string[];
  date?: string;
}

/**
 * Get all images from the gallery content collection and direct image uploads
 */
export async function getGalleryImages(): Promise<GalleryImage[]> {
  try {
    // Array to hold all gallery images
    let images: GalleryImage[] = [];
    
    // 1. Get entries from the gallery JSON collection
    try {
      const galleryEntries = await getCollection('gallery');
      
      // Convert JSON entries to GalleryImage format
      const jsonImages: GalleryImage[] = galleryEntries.map(entry => {
        const { id, data } = entry;
        
        return {
          id,
          src: data.src,
          thumbnail: data.thumbnail || data.src, // Use same image for thumbnail
          alt: data.alt || data.title,
          title: data.title,
          description: data.description,
          tags: data.tags || [],
          date: data.date ? new Date(data.date).toISOString() : undefined
        };
      });
      
      images = [...images, ...jsonImages];
    } catch (err) {
      console.error('Error loading gallery collection entries:', err);
    }
    
    // 2. Get direct image files from gallery-images directory
    const galleryImagesDir = path.join(process.cwd(), 'public', 'gallery-images');
    
    try {
      const imageFiles = await fs.readdir(galleryImagesDir);
      
      // Process each image file
      for (const file of imageFiles) {
        // Only process image files
        const ext = path.extname(file).toLowerCase();
        if (!['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'].includes(ext)) {
          continue;
        }
        
        const id = path.basename(file, path.extname(file));
        const fileName = path.basename(file);
        
        // Check if we already have this image from JSON entries
        const existingImageIndex = images.findIndex(img => img.src === `/gallery-images/${fileName}`);
        if (existingImageIndex >= 0) {
          continue; // Skip if already exists from JSON
        }
        
        // Get file stats for date
        try {
          const filePath = path.join(galleryImagesDir, file);
          const stats = await fs.stat(filePath);
          
          // Add the image
          images.push({
            id,
            src: `/gallery-images/${fileName}`,
            thumbnail: `/gallery-images/${fileName}`,
            alt: id.replace(/-/g, ' '), // Use filename as alt
            title: id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), // Capitalized title
            tags: ['image'],
            date: stats.mtime.toISOString()
          });
        } catch (statErr) {
          console.error(`Error getting stats for file ${file}:`, statErr);
        }
      }
    } catch (err) {
      console.log('No gallery-images directory found or error accessing it:', err);
      // Continue with just the JSON entries
    }
    
    // Sort by date (newest first)
    return images.sort((a, b) => {
      if (!a.date || !b.date) return 0;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  } catch (error) {
    console.error('Error loading gallery images:', error);
    return [];
  }
}

/**
 * Helper function to process file uploads to the gallery
 * @param file The uploaded file
 * @param metadata Additional metadata for the image
 */
export async function addImageToGallery(
  file: File, 
  metadata: { 
    title?: string; 
    description?: string; 
    alt?: string; 
    tags?: string[] 
  }
): Promise<boolean> {
  // This is a client-side placeholder
  // In a real implementation, you would:
  // 1. Upload the file to a server endpoint
  // 2. The server would save the file to the appropriate location
  
  console.warn('addImageToGallery is a placeholder. Implement server-side handling.');
  return false;
} 