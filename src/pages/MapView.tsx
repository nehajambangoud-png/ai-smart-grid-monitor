import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Maximize, Navigation, Layers, Zap, AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';
import { transformersData } from '../data/transformers';

const MapView: React.FC = () => {
  const navigate = useNavigate();

  // Calculate bounds with padding to normalize coordinates
  const { minLat, maxLat, minLon, maxLon } = useMemo(() => {
    const lats = transformersData.map(t => t.latitude);
    const lons = transformersData.map(t => t.longitude);
    const paddingLat = (Math.max(...lats) - Math.min(...lats)) * 0.1 || 0.01;
    const paddingLon = (Math.max(...lons) - Math.min(...lons)) * 0.1 || 0.01;
    
    return {
      minLat: Math.min(...lats) - paddingLat,
      maxLat: Math.max(...lats) + paddingLat,
      minLon: Math.min(...lons) - paddingLon,
      maxLon: Math.max(...lons) + paddingLon,
    };
  }, []);

  // Helper to project coordinates to percentage
  const getPosition = (lat: number, lon: number) => {
    const x = ((lon - minLon) / (maxLon - minLon)) * 100;
    const y = 100 - ((lat - minLat) / (maxLat - minLat)) * 100; // Invert Y because screen Y goes down
    return { x: `${x}%`, y: `${y}%` };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Healthy': return 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)] border-green-300';
      case 'Warning': return 'bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.6)] border-orange-300';
      case 'Critical': return 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)] border-red-300';
      default: return 'bg-gray-500';
    }
  };

  const handleMarkerClick = (id: string) => {
    navigate(`/details/${id}`);
  };

  const stats = useMemo(() => ({
    critical: transformersData.filter(t => t.status === 'Critical').length,
    warning: transformersData.filter(t => t.status === 'Warning').length,
    healthy: transformersData.filter(t => t.status === 'Healthy').length
  }), []);

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col relative animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Geospatial Network</h1>
          <p className="text-grid-muted text-sm">Real-time infrastructure topology</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 bg-grid-card border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-grid-cyan">
            <Layers size={18} />
          </button>
          <button className="p-2 bg-grid-card border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-white">
            <Maximize size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 bg-grid-card border border-white/5 rounded-xl relative overflow-hidden group">
        {/* Abstract Grid Map Background */}
        <div className="absolute inset-0 opacity-20" style={{ 
          backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}></div>

        {/* Floating Glass Panel (STEP 4) */}
        <div className="absolute top-4 right-4 z-30 bg-gray-900/90 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-2xl min-w-[220px]">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3 border-b border-white/10 pb-2">Live Alerts</h3>
            <div className="space-y-3">
                <div 
                    className="flex items-center justify-between cursor-pointer hover:bg-white/5 p-1 rounded transition-colors group/item"
                    onClick={() => {
                        const critical = transformersData.find(t => t.status === 'Critical');
                        if(critical) handleMarkerClick(critical.id);
                    }}
                >
                    <div className="flex items-center gap-2 text-sm text-red-400 font-medium">
                        <AlertTriangle size={16} />
                        <span>Critical</span>
                    </div>
                    <span className="text-white font-bold bg-red-500/20 px-2 py-0.5 rounded text-xs border border-red-500/30 group-hover/item:bg-red-500 group-hover/item:text-white transition-colors">{stats.critical}</span>
                </div>
                <div 
                    className="flex items-center justify-between cursor-pointer hover:bg-white/5 p-1 rounded transition-colors group/item"
                    onClick={() => {
                        const warning = transformersData.find(t => t.status === 'Warning');
                        if(warning) handleMarkerClick(warning.id);
                    }}
                >
                    <div className="flex items-center gap-2 text-sm text-orange-400 font-medium">
                        <AlertCircle size={16} />
                        <span>Overload</span>
                    </div>
                    <span className="text-white font-bold bg-orange-500/20 px-2 py-0.5 rounded text-xs border border-orange-500/30 group-hover/item:bg-orange-500 group-hover/item:text-white transition-colors">{stats.warning}</span>
                </div>
                <div className="flex items-center justify-between p-1">
                    <div className="flex items-center gap-2 text-sm text-green-400 font-medium">
                        <CheckCircle size={16} />
                        <span>Healthy</span>
                    </div>
                    <span className="text-white font-bold bg-green-500/20 px-2 py-0.5 rounded text-xs border border-green-500/30">{stats.healthy}</span>
                </div>
            </div>
            <div className="mt-3 pt-2 border-t border-white/5 text-[10px] text-gray-500 text-center">
                Click alert to isolate unit
            </div>
        </div>

        {/* Simulated Connection Lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
            {transformersData.map((t, i) => {
                // Connect each node to the next one for visual effect, loop back to start
                const next = transformersData[(i + 1) % transformersData.length];
                const start = getPosition(t.latitude, t.longitude);
                const end = getPosition(next.latitude, next.longitude);
                return (
                    <line 
                        key={`link-${i}`}
                        x1={start.x} y1={start.y} 
                        x2={end.x} y2={end.y} 
                        stroke="#00F5FF" 
                        strokeWidth="1" 
                        strokeDasharray={t.status === 'Critical' ? "4 2" : "0"}
                    />
                );
            })}
        </svg>

        {/* Transformer Markers */}
        {transformersData.map((t) => {
          const pos = getPosition(t.latitude, t.longitude);
          return (
            <div 
              key={t.id}
              className={`absolute w-4 h-4 rounded-full border-2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-150 transition-all duration-200 z-10 ${getStatusColor(t.status)}`}
              style={{ left: pos.x, top: pos.y }}
              onClick={() => handleMarkerClick(t.id)}
            >
              {/* Pulse effect for critical/warning */}
              {t.status !== 'Healthy' && (
                <div className={`absolute inset-0 rounded-full animate-ping opacity-75 ${t.status === 'Critical' ? 'bg-red-500' : 'bg-orange-500'}`}></div>
              )}

              {/* Tooltip */}
              <div className="hidden group-hover:block absolute bottom-6 left-1/2 -translate-x-1/2 bg-gray-900/90 backdrop-blur border border-white/10 text-xs px-3 py-2 rounded-lg whitespace-nowrap pointer-events-none z-20 min-w-[120px]">
                <div className="font-semibold text-white mb-1">{t.name}</div>
                <div className="text-gray-400 flex items-center justify-between gap-4">
                  <span>Load: {t.load_percentage}%</span>
                  <span className={`${
                    t.status === 'Healthy' ? 'text-green-400' : 
                    t.status === 'Warning' ? 'text-orange-400' : 'text-red-400'
                  }`}>{t.status}</span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Legend */}
        <div className="absolute bottom-6 left-6 bg-gray-900/80 backdrop-blur rounded-lg p-3 border border-white/5 shadow-lg">
          <div className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Transformer Status</div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span> 
              Healthy
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]"></span> 
              Warning
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)] animate-pulse"></span> 
              Critical
            </div>
          </div>
        </div>

        {/* Floating Map Controls */}
        <div className="absolute bottom-6 right-6 flex flex-col gap-2">
            <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-gray-700 border border-white/10">
                <Navigation size={18} />
            </button>
            <div className="bg-gray-800/80 backdrop-blur rounded-lg p-2 shadow-lg border border-white/5 text-center">
              <div className="text-[10px] text-grid-muted mb-1">NODES</div>
              <div className="text-lg font-bold text-white">{transformersData.length}</div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
