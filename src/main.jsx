import { createRoot } from 'react-dom/client';
import './index.css';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter } from 'react-router-dom';
import PositionProvider from './context/PositionContext.jsx';

// Lazy load the App component
const App = lazy(() => import('./App.jsx'));

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <PositionProvider>
      <Suspense fallback={<div>Loading...</div>}>  {/* Fallback UI while loading */}
        <App />
      </Suspense>
    </PositionProvider>
  </BrowserRouter>
);
