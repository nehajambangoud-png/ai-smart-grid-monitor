import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ShieldCheck, ArrowRight } from 'lucide-react';
import AuthModal from '../components/AuthModal';

const RoleSelection: React.FC = () => {
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);

  const handleSelect = (role: 'citizen' | 'authority') => {
    if (role === 'citizen') {
      localStorage.setItem('userRole', 'citizen');
      // Citizen doesn't need auth, but we clear it to be safe or keep it as is.
      // Prompt says "Logout in Citizen View simply returns to landing screen", implying no strict auth.
      // But step 3 says "Back button should NOT bypass authentication".
      // We'll treat Citizen as a non-authenticated role.
      localStorage.removeItem('isAuthenticated');
      navigate('/dashboard');
    } else {
      setShowAuth(true);
    }
  };

  const handleAuthSuccess = () => {
    localStorage.setItem('userRole', 'authority');
    localStorage.setItem('isAuthenticated', 'true');
    setShowAuth(false);
    navigate('/dashboard');
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center relative bg-grid-bg">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-grid-purple/5 rounded-full blur-[120px] pointer-events-none"></div>

      <AuthModal 
        isOpen={showAuth} 
        onClose={() => setShowAuth(false)} 
        onSuccess={handleAuthSuccess} 
      />

      <div className="z-10 max-w-5xl w-full px-6">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Select Access Level</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Citizen View */}
            <div 
                onClick={() => handleSelect('citizen')}
                className="group relative bg-grid-card border border-white/10 rounded-2xl p-8 cursor-pointer hover:border-grid-cyan/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,245,255,0.1)] hover:-translate-y-1"
            >
                <div className="w-16 h-16 rounded-xl bg-grid-cyan/10 flex items-center justify-center text-grid-cyan mb-6 group-hover:bg-grid-cyan group-hover:text-black transition-colors">
                    <User size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Citizen View</h3>
                <p className="text-grid-muted mb-8 leading-relaxed">
                    Access simplified public health status, report local outages, and view nearby transformer safety ratings.
                </p>
                <div className="flex items-center text-sm font-medium text-grid-cyan opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300">
                    Proceed as Citizen <ArrowRight size={16} className="ml-2" />
                </div>
            </div>

            {/* Authority View */}
            <div 
                onClick={() => handleSelect('authority')}
                className="group relative bg-grid-card border border-white/10 rounded-2xl p-8 cursor-pointer hover:border-grid-purple/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.1)] hover:-translate-y-1"
            >
                <div className="absolute top-4 right-4 px-2 py-1 bg-grid-purple/20 border border-grid-purple/30 rounded text-[10px] text-grid-purple font-bold uppercase tracking-wider">
                    Restricted
                </div>
                <div className="w-16 h-16 rounded-xl bg-grid-purple/10 flex items-center justify-center text-grid-purple mb-6 group-hover:bg-grid-purple group-hover:text-white transition-colors">
                    <ShieldCheck size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Electrical Authority</h3>
                <p className="text-grid-muted mb-8 leading-relaxed">
                    Full system control. Access predictive maintenance logs, real-time load analytics, and deep-dive diagnostics.
                </p>
                <div className="flex items-center text-sm font-medium text-grid-purple opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300">
                    Authenticate & Enter <ArrowRight size={16} className="ml-2" />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
