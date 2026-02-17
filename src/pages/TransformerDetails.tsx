import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Activity, 
  Zap, 
  Thermometer, 
  Gauge, 
  ArrowDownLeft, 
  ArrowUpRight, 
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  Brain,
  Shield,
  Eye,
  Cpu,
  Info,
  TrendingUp,
  FileText,
  Calendar,
  CheckSquare
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area 
} from 'recharts';
import { transformersData } from '../data/transformers';
import { Transformer } from '../types';

const TransformerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<Transformer | null>(null);
  const [isValid, setIsValid] = useState<boolean>(true);
  
  // STEP 2 alignment: Initialize viewMode from localStorage role, default to 'citizen' if role is citizen
  const [viewMode, setViewMode] = useState<'citizen' | 'core'>(() => {
      const role = localStorage.getItem('userRole');
      return role === 'authority' ? 'core' : 'citizen';
  });

  useEffect(() => {
    if (id) {
      const found = transformersData.find(t => t.id === id);
      if (found) {
        setData(found);
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    } else {
      setIsValid(false);
    }
  }, [id]);

  // Generate deterministic mock history data based on transformer ID
  const historyData = useMemo(() => {
    if (!data) return [];
    
    const mockData = [];
    const now = new Date();
    // Create a seed from the ID string for consistent randomization
    const seed = data.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    // Pseudo-random number generator
    const pseudoRandom = (i: number) => {
        const x = Math.sin(seed + i) * 10000;
        return x - Math.floor(x);
    };

    for (let i = 12; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60 * 60 * 1000);
      const label = time.getHours().toString().padStart(2, '0') + ':00';
      
      // Calculate variations
      const loadNoise = (pseudoRandom(i) - 0.5) * 30; 
      const effNoise = (pseudoRandom(i + 100) - 0.5) * 4;
      const powerNoise = (pseudoRandom(i + 200) - 0.5) * (data.power_output * 0.2);

      mockData.push({
        time: label,
        load: Math.max(0, Math.min(100, data.load_percentage + loadNoise)),
        efficiency: Math.max(0, Math.min(100, data.efficiency + effNoise)),
        power: Math.max(0, data.power_output + powerNoise)
      });
    }
    return mockData;
  }, [data]);

  if (!isValid || !data) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center max-w-md mx-auto">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20 text-red-500">
          <AlertTriangle size={32} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Transformer Not Found</h2>
        <button onClick={() => navigate('/map')} className="text-grid-cyan hover:underline">Return to Map</button>
      </div>
    );
  }

  // Risk Score Calculation
  const riskScore = (100 - data.efficiency) + data.load_percentage + (data.oil_temperature / 2);
  const riskPercentage = Math.min(Math.max(riskScore / 200 * 100, 0), 100);

  const MetricCard = ({ 
    label, value, unit, icon: Icon, colorClass, subtext 
  }: any) => (
    <div className="bg-grid-card border border-white/5 p-4 rounded-xl flex items-center gap-4 hover:border-white/10 transition-colors">
      <div className={`p-3 rounded-lg bg-white/5 ${colorClass} bg-opacity-10`}>
        <Icon size={20} className={colorClass.replace('bg-', 'text-').split(' ')[0]} />
      </div>
      <div>
        <p className="text-xs text-grid-muted uppercase font-semibold">{label}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-bold text-white">{value}</span>
          <span className="text-xs text-gray-500">{unit}</span>
        </div>
        {subtext && <p className="text-[10px] text-gray-500 mt-1">{subtext}</p>}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto animate-fade-in pb-12">
      {/* Navigation & Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
        <div>
            <button 
                onClick={() => navigate('/map')}
                className="group flex items-center gap-2 text-sm text-grid-muted hover:text-white transition-colors mb-2"
            >
                <ArrowLeft size={16} /> Back to Map
            </button>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                {data.name}
                <span className={`text-sm px-3 py-1 rounded-full border ${
                    data.status === 'Healthy' ? 'text-green-400 border-green-500/30 bg-green-500/10' : 
                    data.status === 'Warning' ? 'text-orange-400 border-orange-500/30 bg-orange-500/10' : 
                    'text-red-400 border-red-500/30 bg-red-500/10'
                }`}>
                    {data.status}
                </span>
            </h1>
        </div>
        
        {/* View Mode Toggle */}
        <div className="bg-grid-card border border-white/10 p-1 rounded-lg flex items-center">
            <button 
                onClick={() => setViewMode('citizen')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wide transition-all ${
                    viewMode === 'citizen' ? 'bg-grid-cyan text-black' : 'text-gray-400 hover:text-white'
                }`}
            >
                <Eye size={14} /> Citizen
            </button>
            <button 
                onClick={() => setViewMode('core')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wide transition-all ${
                    viewMode === 'core' ? 'bg-grid-purple text-white' : 'text-gray-400 hover:text-white'
                }`}
            >
                <Cpu size={14} /> Engineer
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Data Sections */}
        <div className="lg:col-span-2 space-y-8">
            
            {/* SECTION 1: LIVE PERFORMANCE */}
            <section className="bg-grid-card border border-white/5 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-grid-cyan to-transparent"></div>
                <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <Activity size={20} className="text-grid-cyan" />
                    Live Performance Analysis
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <MetricCard 
                        label="Efficiency" 
                        value={data.efficiency} 
                        unit="%" 
                        icon={Zap} 
                        colorClass="text-emerald-400" 
                        subtext="Optimal > 95%"
                    />
                    <MetricCard 
                        label="Power Output" 
                        value={data.power_output.toLocaleString()} 
                        unit="kW" 
                        icon={Zap} 
                        colorClass="text-grid-cyan"
                        subtext="Nominal Capacity" 
                    />
                    <MetricCard 
                        label="Voltage Delta" 
                        value={(data.input_voltage - data.output_voltage).toFixed(0)} 
                        unit="kV" 
                        icon={ArrowDownLeft} 
                        colorClass="text-indigo-400"
                        subtext="Step-down Ratio"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {/* Power Trend */}
                     <div className="h-[180px] bg-black/20 rounded-xl p-4 border border-white/5">
                        <p className="text-xs text-gray-500 mb-2">Power Output Trend</p>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={historyData}>
                                <Line type="monotone" dataKey="power" stroke="#00F5FF" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                     </div>
                     {/* Efficiency Trend */}
                     <div className="h-[180px] bg-black/20 rounded-xl p-4 border border-white/5">
                        <p className="text-xs text-gray-500 mb-2">Efficiency Stability</p>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={historyData}>
                                <Line type="monotone" dataKey="efficiency" stroke="#10b981" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                     </div>
                </div>
            </section>

            {/* SECTION 2: HEALTH ANALYSIS */}
            <section className="bg-grid-card border border-white/5 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-orange-500 to-transparent"></div>
                <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <Shield size={20} className="text-orange-500" />
                    Health & Risk Diagnostics
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <MetricCard 
                        label="Oil Temp" 
                        value={data.oil_temperature} 
                        unit="°C" 
                        icon={Thermometer} 
                        colorClass="text-orange-400" 
                        subtext="Max Threshold: 95°C"
                    />
                    <MetricCard 
                        label="Current Load" 
                        value={data.load_percentage} 
                        unit="%" 
                        icon={Gauge} 
                        colorClass={data.load_percentage > 90 ? "text-red-400" : "text-blue-400"}
                        subtext="Peak Capacity Use"
                    />
                    <MetricCard 
                        label="Risk Score" 
                        value={riskScore.toFixed(0)} 
                        unit="/ 200" 
                        icon={AlertTriangle} 
                        colorClass="text-red-400"
                        subtext="Aggregate Risk Factor"
                    />
                </div>

                <div className="h-[200px] bg-black/20 rounded-xl p-4 border border-white/5">
                    <p className="text-xs text-gray-500 mb-2">Load Variation (12h)</p>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={historyData}>
                            <defs>
                                <linearGradient id="colorLoad2" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                            <XAxis dataKey="time" stroke="#64748B" fontSize={10} tickLine={false} axisLine={false} />
                            <Tooltip contentStyle={{ backgroundColor: '#131B2C', borderColor: '#1e293b' }} itemStyle={{ color: '#fff' }} />
                            <Area type="monotone" dataKey="load" stroke="#3b82f6" strokeWidth={2} fill="url(#colorLoad2)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </section>
        </div>

        {/* RIGHT COLUMN: AI & Actions */}
        <div className="space-y-6">
            
            {/* SECTION 3: AI PREDICTIVE SUMMARY */}
            <div className="bg-gradient-to-b from-grid-purple/10 to-grid-card border border-grid-purple/30 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-grid-purple/20 rounded-lg text-grid-purple">
                        <Brain size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-white">AI Diagnostic</h3>
                </div>
                
                <div className="bg-black/40 rounded-xl p-4 border border-white/5 mb-4">
                    <p className="text-sm text-gray-300 leading-relaxed font-light">
                        {data.status === 'Healthy' 
                            ? "System operating within optimal parameters. Predictive algorithms show 99.8% uptime probability for next 14 days. Routine maintenance schedule is adequate."
                            : data.status === 'Warning'
                            ? `Unit operating at ${data.load_percentage}% capacity with elevated thermal readings. Recommendation: Redistribute 15% of load to auxiliary substation within 24 hours to prevent degradation.`
                            : `CRITICAL ALERT: Failure probability 87% within 48 hours. Oil temperature exceeding safety variance. Immediate physical inspection required to prevent insulation breakdown.`
                        }
                    </p>
                </div>
                
                <div className="flex items-center justify-between text-xs text-grid-muted">
                    <span>Model: Transformer-Net v2</span>
                    <span className="flex items-center gap-1 text-green-400"><CheckCircle size={10} /> Confidence 98%</span>
                </div>
            </div>

            {/* SECTION 4: ACTION PANEL */}
            <div className="bg-grid-card border border-white/5 rounded-2xl p-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Control Actions</h3>
                <div className="space-y-3">
                    <button className="w-full py-3 bg-grid-cyan text-grid-bg font-bold rounded-lg hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-grid-cyan/20">
                        <Calendar size={18} />
                        Schedule Maintenance
                    </button>
                    <button className="w-full py-3 bg-white/5 text-white font-medium rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2 border border-white/10">
                        <FileText size={18} />
                        Generate PDF Report
                    </button>
                    <button className="w-full py-3 bg-white/5 text-white font-medium rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2 border border-white/10">
                        <CheckSquare size={18} />
                        Mark as Inspected
                    </button>
                </div>
            </div>

            {/* Micro Details */}
            <div className="bg-grid-card border border-white/5 rounded-2xl p-6">
                <h3 className="text-xs font-bold text-gray-500 uppercase mb-4">Asset Metadata</h3>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-grid-muted">Install Date</span>
                        <span className="text-white">Nov 12, 2019</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-grid-muted">Last Service</span>
                        <span className="text-white">Oct 02, 2023</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-grid-muted">Manufacturer</span>
                        <span className="text-white">Siemens Energy</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-grid-muted">Grid Zone</span>
                        <span className="text-white">Sector 7G</span>
                    </div>
                </div>
            </div>

        </div>

      </div>
    </div>
  );
};

export default TransformerDetails;
