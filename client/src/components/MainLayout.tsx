// src/components/MainLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet
import Bottombar from './shared/Bottombar'; // Import your Bottombar

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen max-w-xs mx-auto">
      <main className="flex-grow">
        <Outlet /> {/* This is where the current page content will be rendered */}
      </main>
      <Bottombar className="fixed bottom-0 left-0 right-0" />
    </div>
  );
};

export default MainLayout;
