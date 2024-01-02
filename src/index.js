import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Use createRoot from react-dom/client
const root = createRoot(document.getElementById('root'));

// Render your app using createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
