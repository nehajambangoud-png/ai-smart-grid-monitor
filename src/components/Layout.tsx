import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isOnboarding = location.pathname === '/' || location.pathname === '/role-select';

  if (isOnboarding) {
    return (
      <div className="min-h-screen bg-grid-bg text-grid-text font-sans">
        {children}
        {/* Background effects for onboarding */}
        <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-grid-cyan/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-grid-purple/5 rounded-full blur-[120px] pointer-events-none"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-grid-bg text-grid-text selection:bg-grid-cyan/30 selection:text-grid-cyan font-sans">
      <Navbar />
      <main className="pt-24 px-6 pb-12 max-w-7xl mx-auto animate-fade-in">
        {children}
      </main>
      
      {/* Ambient background glow effects */}
      <div className="fixed top-20 left-1/4 w-96 h-96 bg-grid-cyan/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      <div className="fixed bottom-20 right-1/4 w-96 h-96 bg-grid-purple/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
    </div>
  );
};

export default Layout;
