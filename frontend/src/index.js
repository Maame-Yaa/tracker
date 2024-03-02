// Import necessary elements and components from React and other files
import React from 'react'; // Basic building block of React apps, lets us write JSX
import ReactDOM from 'react-dom/client'; // Enables us to interact with the DOM
import './index.css'; // Global styles for the whole app
import App from './App'; // The main component that represents the entire app

// Find the HTML element with the ID 'root'. This is where our React app will show up.
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render our React application inside the 'root' element.
// React.StrictMode is a tool for highlighting potential problems in an app. It does extra checks and warnings.
root.render(
  <React.StrictMode>
    <App /> {/* This is our main app component, everything starts from here */}
  </React.StrictMode>
);

// Note: In a real-world app, you might see service workers being registered here for offline capabilities,
// but that's beyond the basics we're covering.
