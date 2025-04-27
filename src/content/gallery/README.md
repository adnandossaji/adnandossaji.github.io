# Gallery Content Collection

This directory contains JSON files that define the images displayed in your gallery.

## Adding Images to the Gallery

There are two ways to add images to your gallery:

### 1. Using the Upload Form

The easiest way is to use the upload form on the gallery page. This will:
- Upload your image to the public directory
- Create a JSON metadata file in this directory
- Automatically display your image in the gallery

### 2. Manually Adding Images

You can also manually add images:

1. Copy your image to the `public/images/gallery/` directory
2. Create a JSON file in this directory with the following structure:

```json
{
  "title": "Your Image Title",
  "description": "Optional description of the image",
  "src": "/images/gallery/your-image-filename.jpg",
  "alt": "Alternative text for accessibility",
  "tags": ["tag1", "tag2", "tag3"],
  "date": "2023-11-15"
}
```

## JSON File Structure

Each gallery image is defined by a JSON file with the following properties:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| title | string | Yes | The title of the image |
| description | string | No | A description of the image |
| src | string | Yes | Path to the image file (relative to the public directory) |
| alt | string | No | Alternative text for accessibility |
| tags | string[] | No | Array of tags for categorizing the image |
| date | string | No | ISO date string for when the image was created/added |

## Example

```json
{
  "title": "Sunset at the Beach",
  "description": "Beautiful sunset captured at Malibu Beach",
  "src": "/images/gallery/sunset-beach.jpg",
  "alt": "Orange and purple sunset over ocean waves",
  "tags": ["sunset", "beach", "nature", "ocean"],
  "date": "2023-10-15"
}
``` 