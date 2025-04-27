import { useState, useRef } from 'react';

interface ImageUploadProps {
  onUpload?: (file: File, metadata: {
    title: string;
    description?: string;
    alt?: string;
    tags: string[];
  }) => Promise<boolean>;
}

export default function ImageUpload({ onUpload }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [alt, setAlt] = useState('');
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type.startsWith('image/')) {
        setFile(droppedFile);
        // Auto-populate title from filename
        const fileName = droppedFile.name.split('.')[0];
        const formattedName = fileName
          .replace(/[-_]/g, ' ')
          .replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.substr(1).toLowerCase());
        setTitle(formattedName);
      } else {
        setMessage('Please upload an image file');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      // Auto-populate title from filename
      const fileName = e.target.files[0].name.split('.')[0];
      const formattedName = fileName
        .replace(/[-_]/g, ' ')
        .replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.substr(1).toLowerCase());
      setTitle(formattedName);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setMessage('Please select an image to upload');
      return;
    }
    
    if (!title) {
      setMessage('Title is required');
      return;
    }
    
    setIsSubmitting(true);
    setMessage('');
    
    try {
      // If there's a custom upload handler provided, use that
      if (onUpload) {
        const success = await onUpload(file, {
          title,
          description: description || undefined,
          alt: alt || undefined,
          tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
        });
        
        if (success) {
          setMessage('Image uploaded successfully!');
          resetForm();
        } else {
          setMessage('Failed to upload image');
        }
      } else {
        // Use the built-in upload API endpoint
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        
        if (description) {
          formData.append('description', description);
        }
        
        if (alt) {
          formData.append('alt', alt);
        }
        
        if (tags) {
          formData.append('tags', tags);
        }
        
        const response = await fetch('/api/upload-image', {
          method: 'POST',
          body: formData,
        });
        
        const result = await response.json();
        
        if (result.success) {
          setMessage(result.message || 'Image uploaded successfully!');
          resetForm();
          
          // Refresh the page after a short delay to show the new image
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          setMessage(result.message || 'Failed to upload image');
        }
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage('Error uploading image');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const resetForm = () => {
    setFile(null);
    setTitle('');
    setDescription('');
    setAlt('');
    setTags('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="image-upload-container">
      <h2>Upload a New Image</h2>
      
      <form onSubmit={handleSubmit}>
        <div 
          className={`drop-area ${isDragging ? 'dragging' : ''} ${file ? 'has-file' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          {file ? (
            <div className="preview">
              <img 
                src={URL.createObjectURL(file)} 
                alt="Preview" 
                className="preview-image" 
              />
              <span className="file-name">{file.name}</span>
            </div>
          ) : (
            <div className="upload-prompt">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
                <path fill="none" d="M0 0h24v24H0z"/>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v4h3l-4 4-4-4h3z" fill="currentColor"/>
              </svg>
              <p>Drag & drop an image or click to browse</p>
            </div>
          )}
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            ref={fileInputRef}
            className="file-input"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="title">Title (required)</label>
          <input 
            type="text" 
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea 
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="alt">Alt Text</label>
          <input 
            type="text" 
            id="alt"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            placeholder="Alternative text for accessibility"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="tags">Tags (comma separated)</label>
          <input 
            type="text" 
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="nature, landscape, etc."
          />
        </div>
        
        {message && <div className="message">{message}</div>}
        
        <button 
          type="submit" 
          className="upload-button"
          disabled={isSubmitting || !file}
        >
          {isSubmitting ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>
      
      <style>{`
        .image-upload-container {
          background: var(--theme-bg-offset);
          border-radius: 8px;
          padding: 2rem;
          margin-bottom: 2rem;
        }
        
        h2 {
          margin-top: 0;
          margin-bottom: 1.5rem;
        }
        
        .drop-area {
          border: 2px dashed var(--theme-divider);
          border-radius: 8px;
          padding: 2rem;
          text-align: center;
          cursor: pointer;
          margin-bottom: 1.5rem;
          transition: border-color 0.3s, background-color 0.3s;
        }
        
        .drop-area.dragging {
          border-color: var(--theme-primary);
          background-color: rgba(var(--theme-primary-rgb), 0.1);
        }
        
        .drop-area.has-file {
          border-style: solid;
        }
        
        .file-input {
          display: none;
        }
        
        .upload-prompt {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: var(--theme-text-light);
        }
        
        .upload-prompt svg {
          margin-bottom: 1rem;
        }
        
        .preview {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .preview-image {
          max-width: 100%;
          max-height: 200px;
          border-radius: 4px;
          margin-bottom: 0.5rem;
        }
        
        .file-name {
          font-size: 0.9rem;
          color: var(--theme-text-light);
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }
        
        input[type="text"],
        textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid var(--theme-divider);
          border-radius: 4px;
          background: var(--theme-bg);
          color: var(--theme-text);
          font-size: 1rem;
          font-family: inherit;
        }
        
        textarea {
          min-height: 100px;
          resize: vertical;
        }
        
        .message {
          padding: 0.75rem;
          margin-bottom: 1.5rem;
          border-radius: 4px;
          background-color: var(--theme-bg);
          border-left: 4px solid var(--theme-primary);
        }
        
        .upload-button {
          background-color: var(--theme-primary);
          color: white;
          border: none;
          border-radius: 4px;
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        
        .upload-button:hover {
          background-color: var(--theme-primary-dark, var(--theme-primary));
        }
        
        .upload-button:disabled {
          background-color: var(--theme-divider);
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
} 