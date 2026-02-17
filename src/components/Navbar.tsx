import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Zap, Map, Activity, FileText, Home, ArrowLeft, LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    // If on main dashboard, returns to landing page
    if (location.pathname === '/dashboard') {
      navigate('/');
    } else {
      // Returns user to previous screen
      navigate(-1);
    }
  };

  const handleLogout = () => {
    // Clears session
    localStorage.removeItem('userRole');
    localStorage.removeItem('isAuthenticated');
    
    // Shows message
    window.alert("You have been securely logged out.");
    
    // Returns user to landing screen
    navigate('/');
  };

  const navItems = [
    { label: 'Control Center', path: '/dashboard', icon: <Home size={18} /> },
    { label: 'Map View', path: '/map', icon: <Map size={18} /> },
    { label: 'Transformer Details', path: '/details', icon: <Zap size={18} /> },
    { label: 'Prediction', path: '/prediction', icon: <Activity size={18} /> },
    { label: 'Reports', path: '/reports', icon: <FileText size={18} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-grid-bg/90 backdrop-blur-md border-b border-white/10 z-50 flex items-center px-6 shadow-sm">
      
      {/* Left side: Back Button & Logo */}
      <div className="flex items-center gap-4 mr-8">
        <button 
          onClick={handleBack}
          className="p-2 rounded-full border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-colors group"
          title="Go Back"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
        </button>

        <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-grid-cyan/10 flex items-center justify-center border border-grid-cyan/50 shadow-[0_0_15px_rgba(0,245,255,0.2)]">
                <Zap size={20} className="text-grid-cyan" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white hidden md:block">
                Grid<span className="text-grid-cyan">Flow</span>
                <span className="text-[10px] ml-2 px-1.5 py-0.5 rounded border border-white/10 text-gray-400 font-medium uppercase tracking-wider">AI System</span>
            </span>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-1 h-full">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-2 px-4 h-10 rounded-lg transition-all duration-200 text-sm font-medium
              ${isActive 
                ? 'bg-grid-cyan/10 text-grid-cyan border border-grid-cyan/30 shadow-[0_0_10px_rgba(0,245,255,0.1)]' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'}
            `}
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </div>

      {/* Right side: Logout Button & Status */}
      <div className="ml-auto flex items-center gap-6">
        <div className="flex flex-col items-end hidden sm:flex">
          <span className="text-[10px] text-grid-muted uppercase tracking-wider">System Status</span>
          <span className="text-xs font-semibold text-green-400 flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Operational
          </span>
        </div>
        
        <div className="h-8 w-[1px] bg-white/10 hidden sm:block"></div>
        
        <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
                <div className="text-xs text-white font-medium">Admin Node</div>
                <div className="text-[10px] text-grid-cyan">Level 5 Access</div>
            </div>
            
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-grid-purple to-blue-600 border border-white/20 flex items-center justify-center shadow-lg relative group cursor-pointer">
                <span className="text-xs font-bold text-white">AD</span>
            </div>
            
            <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/40 transition-all text-xs font-medium ml-2"
                title="Logout"
            >
                <LogOut size={14} />
                <span className="hidden sm:inline">Logout</span>
            </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
