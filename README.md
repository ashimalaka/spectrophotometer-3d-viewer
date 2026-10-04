# Spectrophotometer 3D Viewer

An interactive 3D web application for viewing a spectrophotometer in 360 degrees with labeled internal and external components.

## Features

✨ **Interactive 3D Visualization**
- 360-degree rotation view of the spectrophotometer
- Real-time 3D rendering using Three.js
- Smooth camera controls with orbit functionality
- Auto-rotate feature for hands-free viewing

🔍 **Component Identification**
- 15+ internal and external components
- Detailed descriptions for each part
- Color-coded visualization
- Click-to-select component highlighting

📊 **Multiple View Modes**
- Internal components only
- External components only
- Combined view of all components
- Tabbed interface for easy browsing

💻 **Technical Stack**
- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, JavaScript
- **3D Graphics**: Three.js
- **UI Framework**: Responsive Design

## Installation

### Prerequisites
- Python 3.7+
- pip (Python package manager)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ashimalaka/spectrophotometer-3d-viewer.git
   cd spectrophotometer-3d-viewer
   ```

2. **Create a virtual environment** (optional but recommended)
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

## Running the Application

1. **Start the Flask server**
   ```bash
   python app.py
   ```

2. **Open your browser**
   Navigate to `http://localhost:5000`

## Usage

### Controls

**Mouse Controls:**
- Click and drag to rotate the view
- Scroll to zoom in/out
- Right-click and drag to pan

**Button Controls:**
- 🔄 **Rotate** - Toggle auto-rotation
- 🔍 **Internal** - Show only internal components
- 📦 **External** - Show only external components
- 🔗 **All** - Show all components
- ↺ **Reset** - Reset to default view

**Keyboard Shortcuts:**
- `R` - Reset view
- `1` - Show internal components
- `2` - Show external components
- `3` - Show all components

### Component Interaction

1. Click on any component in the 3D view or in the component list
2. Selected component will highlight
3. Details appear in the information panel
4. Switch between tabs to view internal/external/all components

## Components Included

### Internal Components
- Light Source (Halogen lamp/LED)
- Entrance Slit
- Monochromator
- Exit Slit
- Cuvette Holder
- Detector (Photodiode)
- Reference Beam Path

### External Components
- Power Button
- Display Screen
- Keypad/Control Buttons
- Sample Compartment
- Wavelength Selector
- Data Port (USB/RS232)
- Power Cord
- Main Housing/Chassis

## Project Structure

```
spectrophotometer-3d-viewer/
├── app.py                 # Flask application
├── requirements.txt       # Python dependencies
├── data/
│   └── components.json   # Component definitions
├── templates/
│   └── index.html        # Main HTML template
└── static/
    ├── css/
    │   └── style.css     # Styling
    └── js/
        ├── scene.js      # Three.js scene setup
        ├── components.js # Component management
        └── ui.js         # UI interactions
```

## API Endpoints

- `GET /` - Main application page
- `GET /api/components` - Get all components
- `GET /api/components/<id>` - Get specific component
- `GET /api/components/category/<category>` - Get components by category

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Performance Tips

- Use modern browsers for best performance
- Enable hardware acceleration in your browser settings
- For large datasets, consider implementing component clustering

## Future Enhancements

- [ ] Add 3D model import (OBJ, GLB format)
- [ ] Implement measurement animation
- [ ] Add AR/VR support
- [ ] Export 3D scene as image
- [ ] Multi-language support
- [ ] Component search functionality
- [ ] Interactive tutorials

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please open an issue on the GitHub repository.

## Author

**Ashimalaka** - [GitHub Profile](https://github.com/ashimalaka)

---

**Last Updated**: October 2026
