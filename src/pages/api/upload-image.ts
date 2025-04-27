import type { APIRoute } from 'astro';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Get the form data from the request
    const formData = await request.formData();
    
    // Get file, title, and other metadata
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const alt = formData.get('alt') as string;
    const tagsInput = formData.get('tags') as string;
    
    // Validate required fields
    if (!file || !title) {
      return new Response(
        JSON.stringify({ success: false, message: 'File and title are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Process tags
    const tags = tagsInput ? tagsInput.split(',').map(tag => tag.trim()).filter(Boolean) : [];
    
    // Process the file
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const rootDir = path.resolve(__dirname, '../../../');
    
    // Create directories if they don't exist
    const publicImageDir = path.join(rootDir, 'public/images/gallery');
    fs.mkdirSync(publicImageDir, { recursive: true });
    
    const contentGalleryDir = path.join(rootDir, 'src/content/gallery');
    fs.mkdirSync(contentGalleryDir, { recursive: true });
    
    // Get the file extension
    const fileExtension = path.extname(file.name).toLowerCase();
    
    // Create a safe filename from the title
    const safeFilename = title
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    
    // Create unique filename with timestamp to avoid overwriting
    const timestamp = Date.now();
    const uniqueFilename = `${safeFilename}-${timestamp}${fileExtension}`;
    
    // Save the file to the public directory
    const imageBuffer = Buffer.from(await file.arrayBuffer());
    const imagePath = path.join(publicImageDir, uniqueFilename);
    fs.writeFileSync(imagePath, imageBuffer);
    
    // Create the JSON metadata file in the content collection
    const metadataFilePath = path.join(contentGalleryDir, `${safeFilename}-${timestamp}.json`);
    const metadata = {
      title,
      description: description || undefined,
      src: `/images/gallery/${uniqueFilename}`,
      alt: alt || title,
      tags,
      date: new Date().toISOString()
    };
    
    // Write the metadata file
    fs.writeFileSync(
      metadataFilePath, 
      JSON.stringify(metadata, null, 2)
    );
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Image uploaded successfully',
        data: {
          id: `${safeFilename}-${timestamp}`,
          ...metadata
        }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error uploading image:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Error uploading image',
        error: error instanceof Error ? error.message : String(error)
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}; 