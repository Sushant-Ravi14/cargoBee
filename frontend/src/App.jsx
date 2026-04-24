import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import our Chunk 1 Pages
import SplashScreen from './pages/SplashScreen';
import Onboarding from './pages/Onboarding';

// Simple loading screen for suspense if we lazy load later
const LoadingScreen = () => (
  <div className="h-screen w-screen flex items-center justify-center bg-background">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#F5A623] border-t-transparent"></div>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          {/* Default Route redirects to Splash */}
          <Route path="/" element={<Navigate to="/splash" replace />} />
          
          {/* Chunk 1 Routes */}
          <Route path="/splash" element={<SplashScreen />} />
          <Route path="/onboarding" element={<Onboarding />} />

          {/* Placeholder for Chunk 2 (so the 'Log In' button doesn't crash) */}
          <Route path="/login" element={
            <div className="min-h-screen flex items-center justify-center bg-background">
              <h1 className="text-2xl font-bold text-accent">Login Page (Coming in Chunk 2)</h1>
            </div>
          } />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
