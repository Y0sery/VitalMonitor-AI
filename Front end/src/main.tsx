/**
 * main.tsx
 * 
 * Role: Application Entry Point
 * Responsibilities:
 * - Mounts the React application into the DOM.
 * - Wraps the App component with React.StrictMode for development checks.
 * - Imports global styles.
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css' // Global styles including Tailwind directives

// Find the root element in the HTML and render the React app into it
ReactDOM.createRoot(document.getElementById('root')!).render(
    // StrictMode activates additional checks and warnings for its descendants.
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
