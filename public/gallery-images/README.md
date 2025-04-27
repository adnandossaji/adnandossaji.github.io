# Gallery Images Directory

This directory contains all the images that will be automatically displayed in the website gallery.

## How to Add Images to the Gallery

1. Simply place your image files directly in this directory.
2. Supported formats: JPG, JPEG, PNG, GIF, WebP, AVIF
3. Image metadata will be derived from the filename:
   - Filenames like `my-cool-image.jpg` will be displayed as "My Cool Image" in the gallery
   - The file's modification date will be used for sorting

## Tips for Best Results

- Use descriptive filenames that make good titles when converted to title case
- Keep image resolutions reasonable (1200-2000px on the longest side)
- If you need more control over image metadata, consider using the JSON-based system in the content collection

Remember that after adding images here, you'll need to rebuild and redeploy the site for the changes to be visible in production. 