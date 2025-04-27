import React from 'react';

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  textLight: string;
  divider: string;
  cardBg: string;
  codeBg: string;
  codeText: string;
}

interface ThemePreviewProps {
  theme: ThemeColors;
}

export default function ThemePreview({ theme }: ThemePreviewProps) {
  return (
    <div className="theme-preview" style={{ backgroundColor: theme.background, color: theme.text }}>
      <div className="preview-section">
        <h3>Typography</h3>
        <div className="preview-typography">
          <h1 style={{ color: theme.text }}>Heading 1</h1>
          <h2 style={{ color: theme.text }}>Heading 2</h2>
          <h3 style={{ color: theme.text }}>Heading 3</h3>
          <p style={{ color: theme.text }}>Regular paragraph text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at eros magna.</p>
          <p style={{ color: theme.textLight }}>Secondary text with lighter color.</p>
          <a href="#" style={{ color: theme.primary }}>This is a hyperlink</a>
        </div>
      </div>
      
      <div className="preview-section">
        <h3>Colors</h3>
        <div className="color-chips">
          <div className="color-chip" style={{ backgroundColor: theme.primary }}>
            <span>Primary</span>
          </div>
          <div className="color-chip" style={{ backgroundColor: theme.secondary }}>
            <span>Secondary</span>
          </div>
          <div className="color-chip" style={{ backgroundColor: theme.accent }}>
            <span>Accent</span>
          </div>
          <div className="color-chip" style={{ backgroundColor: theme.background, border: `1px solid ${theme.divider}` }}>
            <span style={{ color: theme.text }}>Background</span>
          </div>
        </div>
      </div>
      
      <div className="preview-section">
        <h3>UI Elements</h3>
        <div className="element-preview">
          <button className="button primary" style={{ backgroundColor: theme.primary, color: '#fff' }}>
            Primary Button
          </button>
          <button className="button secondary" style={{ backgroundColor: theme.secondary, color: '#fff' }}>
            Secondary Button
          </button>
          <button className="button accent" style={{ backgroundColor: theme.accent, color: '#fff' }}>
            Accent Button
          </button>
        </div>
        
        <div className="element-preview" style={{ marginTop: '1rem' }}>
          <div 
            className="card" 
            style={{ 
              backgroundColor: theme.cardBg, 
              color: theme.text,
              border: `1px solid ${theme.divider}`
            }}
          >
            <h4 style={{ color: theme.text }}>Card Title</h4>
            <p style={{ color: theme.text }}>This is card content with regular text.</p>
            <p style={{ color: theme.textLight }}>This is card content with light text.</p>
            <div style={{ borderTop: `1px solid ${theme.divider}`, paddingTop: '0.5rem', marginTop: '0.5rem' }}>
              <a href="#" style={{ color: theme.primary }}>Card Link</a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="preview-section">
        <h3>Code Block</h3>
        <pre 
          className="code-block"
          style={{ 
            backgroundColor: theme.codeBg, 
            color: theme.codeText 
          }}
        >
          <code>{`function greet(name) {
  // This is a comment
  console.log(\`Hello, \${name}!\`);
  return name;
}`}</code>
        </pre>
      </div>
      
      <style>{`
        .theme-preview {
          border-radius: 8px;
          overflow: hidden;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }
        
        .preview-section {
          padding: 1.5rem;
          border-bottom: 1px solid ${theme.divider};
        }
        
        .preview-section:last-child {
          border-bottom: none;
        }
        
        .preview-section h3 {
          margin-top: 0;
          margin-bottom: 1rem;
          font-size: 1.2rem;
        }
        
        .preview-typography h1 {
          font-size: 2rem;
          margin: 0.5rem 0;
        }
        
        .preview-typography h2 {
          font-size: 1.5rem;
          margin: 0.5rem 0;
        }
        
        .preview-typography h3 {
          font-size: 1.2rem;
          margin: 0.5rem 0;
        }
        
        .preview-typography p {
          margin: 0.5rem 0;
          line-height: 1.5;
        }
        
        .color-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }
        
        .color-chip {
          height: 70px;
          width: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .color-chip span {
          color: white;
          font-size: 0.8rem;
          font-weight: bold;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }
        
        .element-preview {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }
        
        .button {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          font-weight: bold;
          cursor: pointer;
          font-size: 0.9rem;
        }
        
        .card {
          padding: 1rem;
          border-radius: 6px;
          width: 100%;
          max-width: 300px;
        }
        
        .card h4 {
          margin-top: 0;
          margin-bottom: 0.5rem;
        }
        
        .card p {
          margin: 0.5rem 0;
        }
        
        .code-block {
          padding: 1rem;
          border-radius: 6px;
          font-family: monospace;
          font-size: 0.9rem;
          line-height: 1.5;
          white-space: pre;
          overflow-x: auto;
        }
        
        @media (max-width: 600px) {
          .color-chips {
            justify-content: center;
          }
          
          .element-preview {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .card {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
} 