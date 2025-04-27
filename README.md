# Color Palette Generator

A React-based web application that helps you generate beautiful color palettes with different variations. Whether you're a designer, developer, or just someone who loves colors, this tool makes it easy to create and explore color combinations.

## Features

### Color Generation Modes

1. **Shades Mode**
   - Generates 5 shades for each selected color:
     - 2 lighter shades
     - The base color
     - 2 darker shades
   - Perfect for creating monochromatic color schemes

2. **Hue Variations Mode**
   - Generates 5 colors for each selected color:
     - The base color
     - 4 variations by rotating the hue:
       - -60° (two steps counter-clockwise)
       - -30° (one step counter-clockwise)
       - +30° (one step clockwise)
       - +60° (two steps clockwise)
   - Great for creating harmonious color combinations

### User Interface

- **Color Picker**: Select any color using the built-in color picker
- **Mode Toggle**: Switch between Shades and Hue Variations modes
- **Color Palette Display**: View all generated colors in a clean, organized grid
- **Copy to Clipboard**: Click on any color to copy its hex code
- **Responsive Design**: Works well on both desktop and mobile devices

## How to Use

1. **Select a Color**
   - Click on the color picker to choose your base color
   - The current color will be displayed in the picker

2. **Choose Generation Mode**
   - Click "Shades" to generate lighter and darker versions of your color
   - Click "Hue Variations" to generate colors with different hues

3. **Generate Colors**
   - Click "Add Color" to generate the color variations
   - The new colors will appear in the palette below

4. **Copy Colors**
   - Click on any color in the palette to copy its hex code
   - A notification will confirm the color has been copied

## Technical Details

- Built with React
- Uses HSL color space for accurate color manipulation
- Responsive design with CSS variables for consistent theming
- Modern UI with smooth animations and transitions

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser

## Project Structure

```
color-palette-generator/
├── public/
├── src/
│   ├── App.js
│   ├── App.css
│   └── index.js
└── package.json
```

## Contributing

Feel free to submit issues and enhancement requests! Contributions are welcome.

## License

This project is open source and available under the [MIT License](LICENSE).
