import { useState } from 'react';
import type { GalleryImage } from '../../utils/gallery';

interface GalleryProps {
  images: GalleryImage[];
}

export default function Gallery({ images }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  
  return (
    <div className="gallery">
      <div className="gallery-grid">
        {images.map(image => (
          <div 
            key={image.id} 
            className="gallery-item"
            onClick={() => setSelectedImage(image)}
          >
            <img 
              src={image.thumbnail || image.src} 
              alt={image.alt} 
              loading="lazy"
            />
            <div className="image-overlay">
              <h3>{image.title}</h3>
              <div className="image-tags">
                {image.tags.map(tag => (
                  <span key={tag} className="image-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button 
              className="close-button" 
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>
            <img src={selectedImage.src} alt={selectedImage.alt} />
            <div className="lightbox-info">
              <h2>{selectedImage.title}</h2>
              <div className="lightbox-tags">
                {selectedImage.tags.map(tag => (
                  <span key={tag} className="image-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <style>{`
        .gallery {
          margin-bottom: 3rem;
        }
        
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1rem;
        }
        
        .gallery-item {
          position: relative;
          overflow: hidden;
          aspect-ratio: var(--aspect-ratio, 1);
          border-radius: 8px;
          cursor: pointer;
          transition: transform 0.3s;
        }
        
        .gallery-item:hover {
          transform: scale(1.03);
        }
        
        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        
        .image-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 1rem;
          transform: translateY(100%);
          transition: transform 0.3s;
        }
        
        .gallery-item:hover .image-overlay {
          transform: translateY(0);
        }
        
        .image-overlay h3 {
          margin: 0 0 0.5rem;
          font-size: 1rem;
        }
        
        .image-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        
        .image-tag {
          background: var(--theme-primary);
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          font-size: 0.8rem;
        }
        
        .lightbox {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        
        .lightbox-content {
          position: relative;
          max-width: 90%;
          max-height: 90%;
        }
        
        .lightbox-content img {
          max-width: 100%;
          max-height: 80vh;
          display: block;
          border-radius: 4px;
        }
        
        .close-button {
          position: absolute;
          top: -2rem;
          right: -2rem;
          background: none;
          border: none;
          color: white;
          font-size: 2rem;
          cursor: pointer;
        }
        
        .lightbox-info {
          color: white;
          padding: 1rem 0;
        }
        
        .lightbox-info h2 {
          margin: 0 0 0.5rem;
        }
        
        .lightbox-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        
        @media (max-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          }
          
          .close-button {
            top: -1.5rem;
            right: -0.5rem;
          }
        }
      `}</style>
    </div>
  );
} 