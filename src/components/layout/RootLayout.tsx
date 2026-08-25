import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-ncrp-warmBg text-ncrp-text">
      {/* Skip to Main Content for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-ncrp-navy focus:text-white focus:rounded-subtle font-medium text-sm"
      >
        Skip to main content
      </a>

      {/* Global Institutional Header */}
      <Header />

      {/* Main Page Body */}
      <main id="main-content" className="flex-1 flex flex-col">
        <Outlet />
      </main>

      {/* Global Dark Navy Footer */}
      <Footer />
    </div>
  );
};
