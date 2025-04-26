
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/shared/Header';

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-6 md:py-8">
          <Outlet />
        </div>
      </main>
      <footer className="bg-muted py-6">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Sauveur Food. All rights reserved.</p>
          <p className="mt-1">Reducing food waste, one meal at a time.</p>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
