import React, { useState } from 'react';
import { X, Lock, ArrowRight, AlertCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, we accept any credentials to allow smooth access
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-grid-card border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-grid-purple/20 flex items-center justify-center text-grid-purple mb-4 border border-grid-purple/30">
            <Lock size={24} />
          </div>
          <h2 className="text-xl font-bold text-white">Authorized Access Required</h2>
          <p className="text-sm text-grid-muted mt-1 text-center">
            Security clearance needed for Electrical Authority view.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-grid-purple/50 transition-colors placeholder-gray-600"
              placeholder="Enter ID"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-grid-purple/50 transition-colors placeholder-gray-600"
              placeholder="Enter Password"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <button 
            type="submit"
            className="w-full py-3 bg-grid-purple text-white font-bold rounded-lg hover:bg-purple-600 transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] mt-2 flex items-center justify-center gap-2"
          >
            Authenticate & Enter
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
