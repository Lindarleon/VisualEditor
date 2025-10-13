# Visual Editor

## Overview

This is a browser-based visual canvas editor that allows users to create, position, and manipulate visual elements on a drag-and-drop canvas. The application provides an interactive workspace where users can double-click to create elements, drag them around, adjust their size, and manage them through a simple UI. It's built as a pure client-side application using vanilla HTML, CSS, and JavaScript with no backend dependencies.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Pure Vanilla JavaScript**: No frameworks or libraries used, providing a lightweight and dependency-free implementation
- **Event-Driven Design**: User interactions (double-click, drag, click) trigger element creation and manipulation
- **DOM Manipulation**: Direct DOM API usage for creating, styling, and managing canvas elements dynamically
- **State Management**: Simple in-memory array (`elements`) tracks all created elements with their properties (id, position, dimensions)

### UI/UX Design Patterns
- **Canvas-Based Workspace**: Central canvas area serves as the primary interaction zone for element creation and manipulation
- **Sidebar Panel**: Slide-out control panel for adjusting element properties (currently size via slider)
- **Top Bar Navigation**: Fixed header with view and menu toggle controls
- **Bottom Action Bar**: Persistent controls for remove and generate operations
- **Visual Feedback**: Hover states and transitions provide interactive feedback

### Element Management System
- **Creation Pattern**: Double-click on canvas creates new elements at cursor position
- **Selection Model**: Click-to-select pattern with single element selection tracking
- **Drag and Drop**: Mouse-based dragging with offset tracking for precise positioning
- **Size Control**: Real-time size adjustment through slider input (50-200px range)
- **Auto-positioning**: Elements are constrained within canvas boundaries to prevent overflow

### Styling Architecture
- **Dark Theme**: Modern dark color scheme (#1e1e1e background, #2d2d2d panels)
- **Flexbox Layout**: Primary layout uses flexbox for responsive structure
- **Fixed Positioning**: Sidebar uses fixed positioning with CSS transitions for slide-in/out effect
- **CSS Variables Approach**: Direct color values used (could be refactored to CSS custom properties for theming)

### Data Flow
1. User interaction triggers event listeners
2. Event handlers update application state (elements array, selected element tracking)
3. DOM updates reflect state changes visually
4. Position and size data stored in element objects for future operations

## External Dependencies

### Core Technologies
- **HTML5**: Standard markup with semantic structure
- **CSS3**: Modern styling with transitions, flexbox, and box-shadow effects
- **Vanilla JavaScript (ES6+)**: No external libraries or frameworks

### Browser APIs Used
- **DOM API**: Element creation, manipulation, and event handling
- **getBoundingClientRect()**: Canvas position calculation for accurate element placement
- **classList API**: Dynamic class toggling for UI state management

### No External Services
- This is a fully client-side application with no:
  - Backend server requirements
  - Database connections
  - Third-party API integrations
  - External CDN dependencies
  - Authentication systems

### Development Considerations
- **Browser Compatibility**: Relies on modern JavaScript and CSS features (may require transpilation for older browsers)
- **State Persistence**: Currently no local storage or session persistence (elements lost on page refresh)
- **Export/Import**: "Generate" button suggests future code generation or export functionality (not yet implemented)