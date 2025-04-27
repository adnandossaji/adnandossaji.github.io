# Resource Hub Collection

This directory contains resources for the Resource Hub feature. Each file represents a single resource entry.

## How to Add Resources

Add a new JSON file to this directory with the following format:

```json
{
  "title": "Resource Name",
  "description": "A short description of the resource",
  "url": "https://example.com",
  "category": "Category Name",
  "tags": ["tag1", "tag2", "tag3"],
  "isFree": true,
  "featured": false,
  "dateAdded": "2023-10-15",
  "lastUpdated": "2023-10-20",
  "icon": "code"
}
```

### Fields

- `title`: Name of the resource (required)
- `description`: Brief description (required)
- `url`: URL of the resource (required)
- `category`: Category for filtering (required)
- `tags`: Array of tags for filtering and search (optional)
- `isFree`: Whether the resource is free (defaults to true)
- `featured`: Whether to highlight the resource (defaults to false)
- `dateAdded`: Date when the resource was added (format: YYYY-MM-DD)
- `lastUpdated`: Date when the resource was last updated (optional)
- `icon`: Icon identifier to display (optional)

### Available Icons

The following icon identifiers are available:

- `code` - For development tools and frameworks
- `design` - For design tools and resources
- `robot` - For AI and automation tools
- `image` - For image and media resources
- `animation` - For animation tools
- `document` - For documentation and note-taking

If no icon is provided, a default document icon will be used.

## Best Practices

1. Use meaningful filenames that match the resource (e.g., `figma.json`, `astro.json`)
2. Keep descriptions concise but informative
3. Use consistent category names to improve filtering
4. Include relevant tags to make resources searchable 