import { useState, useEffect } from 'react';
import ColorPicker from './ColorPicker';
import ThemePreview from './ThemePreview';

// Define the theme structure
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

// Predefined theme presets
const themePresets: Record<string, ThemeColors> = {
  default: {
    primary: '#3a86ff',
    secondary: '#8338ec',
    accent: '#ff006e',
    background: '#ffffff',
    text: '#333333',
    textLight: '#6c757d',
    divider: '#e9ecef',
    cardBg: '#f8f9fa',
    codeBg: '#343a40',
    codeText: '#f8f9fa'
  },
  dark: {
    primary: '#4cc9f0',
    secondary: '#8338ec',
    accent: '#ff006e',
    background: '#212529',
    text: '#f8f9fa',
    textLight: '#adb5bd',
    divider: '#495057',
    cardBg: '#343a40',
    codeBg: '#1a1d20',
    codeText: '#f8f9fa'
  },
  earthy: {
    primary: '#588157',
    secondary: '#3a5a40',
    accent: '#dad7cd',
    background: '#fefae0',
    text: '#283618',
    textLight: '#606c38',
    divider: '#dda15e',
    cardBg: '#faedcd',
    codeBg: '#283618',
    codeText: '#fefae0'
  },
  sunset: {
    primary: '#ff9e00',
    secondary: '#ff4d00',
    accent: '#ff0054',
    background: '#fff8f0',
    text: '#1a1a2e',
    textLight: '#4a4e69',
    divider: '#ffcdb2',
    cardBg: '#ffeddb',
    codeBg: '#1a1a2e',
    codeText: '#f8f9fa'
  }
};

export default function ThemeCreator() {
  const [theme, setTheme] = useState<ThemeColors>(themePresets.default);
  const [activePreset, setActivePreset] = useState<string>('default');
  const [cssOutput, setCssOutput] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  
  // Generate CSS from the theme
  useEffect(() => {
    const css = `:root {
  /* Base Colors */
  --theme-primary: ${theme.primary};
  --theme-secondary: ${theme.secondary};
  --theme-accent: ${theme.accent};
  --theme-background: ${theme.background};
  --theme-text: ${theme.text};
  --theme-text-light: ${theme.textLight};
  --theme-divider: ${theme.divider};
  
  /* Component Colors */
  --theme-card-bg: ${theme.cardBg};
  --theme-code-bg: ${theme.codeBg};
  --theme-code-text: ${theme.codeText};
}`;
    
    setCssOutput(css);
  }, [theme]);
  
  // Handle color change for a specific property
  const handleColorChange = (property: keyof ThemeColors, value: string) => {
    setTheme(prev => ({
      ...prev,
      [property]: value
    }));
    setActivePreset('custom');
  };
  
  // Handle loading a preset
  const handlePresetChange = (presetName: string) => {
    if (presetName === 'custom') return;
    
    setTheme(themePresets[presetName]);
    setActivePreset(presetName);
  };
  
  // Generate a harmonious color scheme based on primary color
  const generateHarmoniousScheme = () => {
    const primary = theme.primary;
    
    // Convert hex to HSL to make calculations easier
    const hexToHSL = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;
      
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0, s = 0, l = (max + min) / 2;
      
      if (max === min) {
        h = s = 0; // achromatic
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }
      
      return { h: h * 360, s: s * 100, l: l * 100 };
    };
    
    // Convert HSL to hex
    const HSLToHex = (h: number, s: number, l: number) => {
      s /= 100;
      l /= 100;
      
      const c = (1 - Math.abs(2 * l - 1)) * s;
      const x = c * (1 - Math.abs((h / 60) % 2 - 1));
      const m = l - c / 2;
      let r = 0, g = 0, b = 0;
      
      if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
      } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
      } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
      } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
      } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
      } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
      }
      
      const rHex = Math.round((r + m) * 255).toString(16).padStart(2, '0');
      const gHex = Math.round((g + m) * 255).toString(16).padStart(2, '0');
      const bHex = Math.round((b + m) * 255).toString(16).padStart(2, '0');
      
      return `#${rHex}${gHex}${bHex}`;
    };
    
    const hsl = hexToHSL(primary);
    
    // Generate secondary color (complementary: +180 degrees)
    const secondaryHue = (hsl.h + 180) % 360;
    const secondary = HSLToHex(secondaryHue, hsl.s, hsl.l);
    
    // Generate accent color (triadic: +120 degrees)
    const accentHue = (hsl.h + 120) % 360;
    const accent = HSLToHex(accentHue, hsl.s, hsl.l);
    
    // Generate background with very high lightness
    const background = HSLToHex(hsl.h, 10, 98);
    
    // Generate text with very low lightness
    const text = HSLToHex(hsl.h, 10, 13);
    
    // Generate text light with medium lightness
    const textLight = HSLToHex(hsl.h, 10, 45);
    
    // Generate divider with high lightness
    const divider = HSLToHex(hsl.h, 10, 85);
    
    // Generate card background
    const cardBg = HSLToHex(hsl.h, 10, 95);
    
    // Generate code background (dark)
    const codeBg = HSLToHex(hsl.h, 15, 13);
    
    // Generate code text (light)
    const codeText = HSLToHex(hsl.h, 10, 95);
    
    setTheme({
      primary,
      secondary,
      accent,
      background,
      text,
      textLight,
      divider,
      cardBg,
      codeBg,
      codeText
    });
    
    setActivePreset('custom');
  };
  
  // Copy CSS output to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssOutput).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  return (
    <div className="theme-creator">
      <div className="theme-controls">
        <div className="controls-header">
          <h2>Theme Controls</h2>
          <div className="preset-selector">
            <label htmlFor="preset-select">Load Preset:</label>
            <select 
              id="preset-select" 
              value={activePreset}
              onChange={(e) => handlePresetChange(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="dark">Dark Mode</option>
              <option value="earthy">Earthy</option>
              <option value="sunset">Sunset</option>
              {activePreset === 'custom' && <option value="custom">Custom</option>}
            </select>
          </div>
        </div>
        
        <div className="color-pickers">
          <h3>Base Colors</h3>
          <div className="color-group">
            <ColorPicker 
              label="Primary" 
              color={theme.primary} 
              onChange={(color: string) => handleColorChange('primary', color)} 
            />
            <ColorPicker 
              label="Secondary" 
              color={theme.secondary} 
              onChange={(color: string) => handleColorChange('secondary', color)} 
            />
            <ColorPicker 
              label="Accent" 
              color={theme.accent} 
              onChange={(color: string) => handleColorChange('accent', color)} 
            />
            <ColorPicker 
              label="Background" 
              color={theme.background} 
              onChange={(color: string) => handleColorChange('background', color)} 
            />
            <ColorPicker 
              label="Text" 
              color={theme.text} 
              onChange={(color: string) => handleColorChange('text', color)} 
            />
          </div>
          
          <h3>Component Colors</h3>
          <div className="color-group">
            <ColorPicker 
              label="Text Light" 
              color={theme.textLight} 
              onChange={(color: string) => handleColorChange('textLight', color)} 
            />
            <ColorPicker 
              label="Divider" 
              color={theme.divider} 
              onChange={(color: string) => handleColorChange('divider', color)} 
            />
            <ColorPicker 
              label="Card Background" 
              color={theme.cardBg} 
              onChange={(color: string) => handleColorChange('cardBg', color)} 
            />
            <ColorPicker 
              label="Code Background" 
              color={theme.codeBg} 
              onChange={(color: string) => handleColorChange('codeBg', color)} 
            />
            <ColorPicker 
              label="Code Text" 
              color={theme.codeText} 
              onChange={(color: string) => handleColorChange('codeText', color)} 
            />
          </div>
          
          <button 
            className="generate-button"
            onClick={generateHarmoniousScheme}
          >
            Generate Harmonious Scheme from Primary
          </button>
        </div>
        
        <div className="css-output">
          <h3>CSS Output</h3>
          <pre className="output-code">{cssOutput}</pre>
          <button 
            className={`copy-button ${copied ? 'copied' : ''}`}
            onClick={copyToClipboard}
          >
            {copied ? 'Copied!' : 'Copy CSS'}
          </button>
        </div>
      </div>
      
      <div className="theme-preview-container">
        <h2>Live Preview</h2>
        <ThemePreview theme={theme} />
      </div>
      
      <style>{`
        .theme-creator {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 3rem;
        }
        
        .theme-controls {
          background-color: var(--theme-bg-offset, #f8f9fa);
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .controls-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        
        .controls-header h2 {
          margin: 0;
        }
        
        .preset-selector {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .preset-selector select {
          padding: 0.5rem;
          border-radius: 4px;
          border: 1px solid var(--theme-divider);
          background-color: var(--theme-bg);
        }
        
        .color-pickers h3 {
          margin: 1.5rem 0 1rem;
          font-size: 1.2rem;
          border-bottom: 1px solid var(--theme-divider);
          padding-bottom: 0.5rem;
        }
        
        .color-group {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 1rem;
        }
        
        .generate-button {
          background-color: var(--theme-primary);
          color: white;
          border: none;
          border-radius: 4px;
          padding: 0.75rem 1rem;
          margin-top: 1.5rem;
          cursor: pointer;
          width: 100%;
          font-weight: bold;
          transition: background-color 0.2s;
        }
        
        .generate-button:hover {
          background-color: var(--theme-secondary);
        }
        
        .css-output {
          margin-top: 2rem;
        }
        
        .output-code {
          background-color: var(--theme-code-bg);
          color: var(--theme-code-text);
          padding: 1rem;
          border-radius: 4px;
          overflow-x: auto;
          font-family: monospace;
          font-size: 0.9rem;
          max-height: 200px;
          overflow-y: auto;
        }
        
        .copy-button {
          background-color: var(--theme-secondary);
          color: white;
          border: none;
          border-radius: 4px;
          padding: 0.5rem 1rem;
          margin-top: 0.5rem;
          cursor: pointer;
          float: right;
          transition: background-color 0.2s;
        }
        
        .copy-button:hover {
          background-color: var(--theme-accent);
        }
        
        .copy-button.copied {
          background-color: #2ecc71;
        }
        
        .theme-preview-container {
          background-color: var(--theme-bg-offset, #f8f9fa);
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .theme-preview-container h2 {
          margin-top: 0;
          margin-bottom: 1.5rem;
        }
        
        @media (max-width: 900px) {
          .theme-creator {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
} 