import { useState } from 'react';

interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({ label, color, onChange }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  // Handle clicking outside to close the picker
  const handleOutsideClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.color-picker-container')) {
      setIsOpen(false);
      document.removeEventListener('click', handleOutsideClick);
    }
  };
  
  // Toggle the color picker
  const togglePicker = () => {
    if (!isOpen) {
      // Add click listener to close when clicking outside
      setTimeout(() => {
        document.addEventListener('click', handleOutsideClick);
      }, 0);
    }
    setIsOpen(!isOpen);
  };
  
  // Handle color change
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  
  return (
    <div className="color-picker-container">
      <label className="color-label">{label}</label>
      <div className="color-preview" onClick={togglePicker}>
        <div 
          className="color-swatch" 
          style={{ backgroundColor: color }}
        ></div>
        <span className="color-value">{color}</span>
      </div>
      
      {isOpen && (
        <div className="color-picker-popup">
          <input 
            type="color" 
            value={color}
            onChange={handleColorChange}
            className="color-input"
          />
        </div>
      )}
      
      <style>{`
        .color-picker-container {
          display: flex;
          flex-direction: column;
          position: relative;
        }
        
        .color-label {
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
          color: var(--theme-text-light, #6c757d);
        }
        
        .color-preview {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem;
          border: 1px solid var(--theme-divider, #e9ecef);
          border-radius: 4px;
          background-color: var(--theme-bg, #ffffff);
          cursor: pointer;
        }
        
        .color-swatch {
          width: 20px;
          height: 20px;
          border-radius: 3px;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .color-value {
          font-size: 0.9rem;
          color: var(--theme-text, #333333);
          font-family: monospace;
        }
        
        .color-picker-popup {
          position: absolute;
          top: 100%;
          left: 0;
          z-index: 10;
          padding: 0.5rem;
          background-color: var(--theme-bg, #ffffff);
          border: 1px solid var(--theme-divider, #e9ecef);
          border-radius: 4px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          margin-top: 0.5rem;
        }
        
        .color-input {
          width: 100%;
          height: 40px;
          padding: 0;
          border: none;
          background: none;
          cursor: pointer;
        }
        
        .color-input::-webkit-color-swatch-wrapper {
          padding: 0;
        }
        
        .color-input::-webkit-color-swatch {
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
} 