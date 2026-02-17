import React, { useMemo } from 'react';
import { Zap, Activity, AlertTriangle, Battery, TrendingUp, Brain, Cpu, Server } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { transformersData } from '../data/transformers';

const data = [
  { name: '00:00', load: 4000 },
  { name: '04:00', load: 3000 },
  { name: '08:00', load: 5500 },
  { name: '12:00', load: 8000 },
  { name: '16:00', load: 7500 },
  { name: '20:00', load: 6000 },
  { name: '23:59', load: 4500 },
];

const Home: React.FC = () => {
  const stats = useMemo(() => {
    const total = transformersData.length;
    const critical = transformersData.filter(t => t.status === 'Critical').length;
    const warning = transformersData.filter(t => t.status === 'Warning').length;
    const avgEfficiency = transformersData.reduce((acc, curr) => acc + curr.efficiency, 0) / total;
    
    return { total, critical, warning, avgEfficiency };
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* STEP 3: TOP STRIP (Critical Overview Bar) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-grid-card border border-white/5 p-4 rounded-xl flex items-center justify-between group hover:border-white/10 transition-all">
            <div>
                <p className="text-xs text-grid-muted uppercase tracking-wider font-semibold mb-1">Active Units</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                <Server size={20} />
            </div>
        </div>

        <div className={`bg-grid-card border ${stats.critical > 0 ? 'border-red-500/30 bg-red-500/5' : 'border-white/5'} p-4 rounded-xl flex items-center justify-between group hover:border-red-500/50 transition-all relative overflow-hidden`}>
            {stats.critical > 0 && <div className="absolute inset-0 bg-red-500/5 animate-pulse"></div>}
            <div className="relative z-10">
                <p className="text-xs text-red-300 uppercase tracking-wider font-semibold mb-1">Critical Faults</p>
                <p className="text-2xl font-bold text-red-400">{stats.critical}</p>
            </div>
            <div className="relative z-10 w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400 border border-red-500/30">
                <AlertTriangle size={20} />
            </div>
        </div>

        <div className="bg-grid-card border border-white/5 p-4 rounded-xl flex items-center justify-between group hover:border-orange-500/30 transition-all">
            <div>
                <p className="text-xs text-orange-300 uppercase tracking-wider font-semibold mb-1">Overload Risk</p>
                <p className="text-2xl font-bold text-orange-400">{stats.warning}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400">
                <Activity size={20} />
            </div>
        </div>

        <div className="bg-grid-card border border-white/5 p-4 rounded-xl flex items-center justify-between group hover:border-green-500/30 transition-all">
            <div>
                <p className="text-xs text-green-300 uppercase tracking-wider font-semibold mb-1">Sys. Efficiency</p>
                <p className="text-2xl font-bold text-green-400">{stats.avgEfficiency.toFixed(1)}%</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400">
                <Zap size={20} />
            </div>
        </div>
      </div>

      {/* STEP 3: CENTER MAIN ZONE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Grid Overview Graph */}
        <div className="lg:col-span-2 bg-grid-card border border-white/5 rounded-xl p-6 relative overflow-hidden flex flex-col h-[450px]">
          <div className="flex justify-between items-start mb-6 z-10">
            <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <TrendingUp size={18} className="text-grid-cyan" />
                    Real-Time Grid Load
                </h3>
                <p className="text-sm text-grid-muted">System-wide power consumption trends</p>
            </div>
            <div className="px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-grid-cyan">
                LIVE: 50.02 Hz
            </div>
          </div>
          
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00F5FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00F5FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#131B2C', borderColor: '#1e293b', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#00F5FF' }}
                />
                <Area 
                    type="monotone" 
                    dataKey="load" 
                    stroke="#00F5FF" 
                    strokeWidth={2} 
                    fillOpacity={1} 
                    fill="url(#colorLoad)" 
                    animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Side: AI Insight Panel (NEW ADDITION) */}
        <div className="bg-gradient-to-br from-grid-card to-grid-bg border border-white/10 rounded-xl p-6 relative overflow-hidden flex flex-col">
            <div className="absolute top-0 right-0 w-32 h-32 bg-grid-purple/20 blur-[60px] pointer-events-none"></div>
            
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-grid-purple/10 flex items-center justify-center border border-grid-purple/30 text-grid-purple shadow-[0_0_15px_rgba(124,58,237,0.2)]">
                    <Brain size={20} />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white">Neural Engine</h3>
                    <p className="text-xs text-grid-purple font-medium uppercase tracking-wide">Analysis Active</p>
                </div>
            </div>

            <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
                {/* AI Insight Card 1 */}
                <div className="bg-black/30 border border-white/5 p-4 rounded-lg backdrop-blur-sm hover:bg-white/5 transition-colors cursor-default border-l-2 border-l-red-500">
                    <div className="flex justify-between mb-2">
                        <span className="text-xs font-bold text-red-400 uppercase">Alert Detected</span>
                        <span className="text-[10px] text-gray-500">2 mins ago</span>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                        <span className="text-white font-semibold">Transformer TR-2045-C</span> operating at 94% load with rising thermal variation. Risk of insulation degradation detected.
                    </p>
                    <div className="mt-3 flex gap-2">
                         <button className="px-3 py-1.5 bg-red-500/10 text-red-400 text-xs font-medium rounded hover:bg-red-500/20 border border-red-500/20 transition-colors">
                            View Diagnostics
                         </button>
                    </div>
                </div>

                {/* AI Insight Card 2 */}
                <div className="bg-black/30 border border-white/5 p-4 rounded-lg backdrop-blur-sm hover:bg-white/5 transition-colors cursor-default border-l-2 border-l-orange-500">
                    <div className="flex justify-between mb-2">
                        <span className="text-xs font-bold text-orange-400 uppercase">Optimization</span>
                        <span className="text-[10px] text-gray-500">15 mins ago</span>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                        Load imbalance predicted in <span className="text-white font-semibold">North District</span> between 14:00-16:00. Recommend load shifting to Substation B.
                    </p>
                </div>
                
                 {/* AI Insight Card 3 */}
                 <div className="bg-black/30 border border-white/5 p-4 rounded-lg backdrop-blur-sm hover:bg-white/5 transition-colors cursor-default border-l-2 border-l-grid-cyan">
                    <div className="flex justify-between mb-2">
                        <span className="text-xs font-bold text-grid-cyan uppercase">System Health</span>
                        <span className="text-[10px] text-gray-500">1 hr ago</span>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                        Grid frequency stable at 50.02Hz. No significant deviations recorded in the last 24 hours.
                    </p>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-grid-muted">AI Confidence Score</span>
                <span className="text-sm font-bold text-green-400">98.4%</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
