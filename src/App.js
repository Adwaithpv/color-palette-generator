import React, { useState } from 'react';
import './App.css';

function App() {
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState('#6366f1');
  const [showCopied, setShowCopied] = useState(false);
  const [colorMode, setColorMode] = useState('shades'); // 'shades' or 'hue'

  // Convert hex to HSL
  const hexToHSL = (hex) => {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;

    let cmin = Math.min(r, g, b);
    let cmax = Math.max(r, g, b);
    let delta = cmax - cmin;
    let h = 0;
    let s = 0;
    let l = 0;

    if (delta === 0) h = 0;
    else if (cmax === r) h = ((g - b) / delta) % 6;
    else if (cmax === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);
    if (h < 0) h += 360;

    l = (cmax + cmin) / 2;
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return { h, s, l };
  };

  // Convert HSL to hex
  const hslToHex = (h, s, l) => {
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s;
    let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    let m = l - c / 2;
    let r = 0;
    let g = 0;
    let b = 0;

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

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  const generateShades = (baseColor) => {
    const { h, s, l } = hexToHSL(baseColor);
    const shades = [];
    
    // Generate lighter shades
    for (let i = 1; i <= 2; i++) {
      const newL = Math.min(100, l + (i * 20));
      shades.push(hslToHex(h, s, newL));
    }
    
    // Add the base color
    shades.push(baseColor);
    
    // Generate darker shades
    for (let i = 1; i <= 2; i++) {
      const newL = Math.max(0, l - (i * 20));
      shades.push(hslToHex(h, s, newL));
    }
    
    return shades;
  };

  const generateHueVariations = (baseColor) => {
    const { h, s, l } = hexToHSL(baseColor);
    const variations = [];
    
    // Add the base color
    variations.push(baseColor);
    
    // Generate hue variations
    const hueOffsets = [-60, -30, 30, 60];
    hueOffsets.forEach(offset => {
      const newH = (h + offset + 360) % 360;
      variations.push(hslToHex(newH, s, l));
    });
    
    return variations;
  };

  const handleAddColor = (color) => {
    const newColors = colorMode === 'shades' 
      ? generateShades(color)
      : generateHueVariations(color);
    setColors(prevColors => [...prevColors, ...newColors]);
  };

  const copyToClipboard = async (color) => {
    try {
      await navigator.clipboard.writeText(color);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy color:', err);
    }
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  return (
    <div className="app-container">
      <h1 className="title">Color Palette Generator</h1>
      <div className="color-picker">
        <input
          type="color"
          value={selectedColor}
          onChange={handleColorChange}
          className="color-input"
        />
        <div className="mode-toggle">
          <button
            className={`mode-button ${colorMode === 'shades' ? 'active' : ''}`}
            onClick={() => setColorMode('shades')}
          >
            Shades
          </button>
          <button
            className={`mode-button ${colorMode === 'hue' ? 'active' : ''}`}
            onClick={() => setColorMode('hue')}
          >
            Hue Variations
          </button>
        </div>
        <button
          onClick={() => handleAddColor(selectedColor)}
          className="add-button"
        >
          Add Color
        </button>
      </div>
      <div className="palette">
        {colors.map((color, index) => (
          <div
            key={index}
            className="color-swatch"
            onClick={() => copyToClipboard(color)}
          >
            <div
              className="color-block"
              style={{ backgroundColor: color }}
            />
            <span className="color-code">{color}</span>
          </div>
        ))}
      </div>
      {showCopied && (
        <div className="copy-notification">
          Color copied to clipboard!
        </div>
      )}
    </div>
  );
}

export default App;
