import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Globe, ArrowRight } from 'lucide-react';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated Background Lines */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-20" 
             style={{ 
               backgroundImage: 'linear-gradient(rgba(0, 245, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 245, 255, 0.1) 1px, transparent 1px)', 
               backgroundSize: '40px 40px',
               maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
             }}>
        </div>
      </div>

      <div className="z-10 text-center max-w-4xl px-6 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-grid-cyan/30 bg-grid-cyan/10 text-grid-cyan text-xs font-medium tracking-wider uppercase mb-6 shadow-[0_0_15px_rgba(0,245,255,0.2)]">
            <div className="w-1.5 h-1.5 rounded-full bg-grid-cyan animate-pulse"></div>
            System Online v4.2
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4 drop-shadow-2xl">
          Smart Grid <span className="text-transparent bg-clip-text bg-gradient-to-r from-grid-cyan to-grid-purple">Intelligence</span>
        </h1>
        
        <p className="text-xl text-grid-muted mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          AI-Powered Transformer Monitoring & Predictive Failure Detection. 
          Real-time geospatial analytics for the modern electrical infrastructure.
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <button 
            onClick={() => navigate('/role-select')}
            className="group relative px-8 py-4 bg-white text-grid-bg font-bold rounded-lg hover:bg-grid-cyan transition-all duration-300 w-full md:w-auto min-w-[240px] shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(0,245,255,0.4)] flex items-center justify-center gap-3 overflow-hidden"
          >
            <span className="relative z-10">Enter Control Center</span>
            <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={() => {
                localStorage.setItem('userRole', 'authority'); // Default to auth for direct map view
                navigate('/map');
            }}
            className="group px-8 py-4 bg-transparent border border-white/20 text-white font-medium rounded-lg hover:border-grid-cyan/50 hover:bg-grid-cyan/5 transition-all duration-300 w-full md:w-auto min-w-[240px] flex items-center justify-center gap-3"
          >
            <Globe size={20} className="text-grid-muted group-hover:text-grid-cyan transition-colors" />
            View Live Grid Map
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-12 text-center text-xs text-gray-500 tracking-widest uppercase opacity-60">
        Secure Connection • Neural Network Active • Latency 12ms
      </div>
    </div>
  );
};

export default Landing;
