import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts';
import { TrendingUp, Calendar, Zap } from 'lucide-react';

const forecastData = [
  { day: 'Mon', actual: 4000, predicted: 4100 },
  { day: 'Tue', actual: 3000, predicted: 3200 },
  { day: 'Wed', actual: 2000, predicted: 2400 },
  { day: 'Thu', actual: 2780, predicted: 2900 },
  { day: 'Fri', actual: 1890, predicted: 2100 },
  { day: 'Sat', actual: 2390, predicted: 2500 },
  { day: 'Sun', actual: 3490, predicted: 3600 },
];

const Prediction: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Load Forecasting</h1>
          <p className="text-grid-muted">AI-driven demand prediction for the next 7 days.</p>
        </div>
        <div className="flex gap-2 bg-grid-card p-1 rounded-lg border border-white/10">
          <button className="px-3 py-1.5 text-xs font-medium bg-grid-cyan/10 text-grid-cyan rounded">7 Days</button>
          <button className="px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-white rounded">14 Days</button>
          <button className="px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-white rounded">30 Days</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-grid-card border border-white/5 p-6 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <TrendingUp size={60} className="text-grid-cyan" />
          </div>
          <h3 className="text-grid-muted text-sm font-medium mb-1">Peak Load Prediction</h3>
          <div className="text-3xl font-bold text-white mb-2">4,250 MW</div>
          <div className="text-xs text-green-400 flex items-center">
            <TrendingUp size={12} className="mr-1" /> +5.2% vs last week
          </div>
        </div>

        <div className="bg-grid-card border border-white/5 p-6 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Calendar size={60} className="text-grid-purple" />
          </div>
          <h3 className="text-grid-muted text-sm font-medium mb-1">Accuracy Score</h3>
          <div className="text-3xl font-bold text-white mb-2">98.4%</div>
          <div className="text-xs text-gray-400">
            Model confidence level
          </div>
        </div>

        <div className="bg-grid-card border border-white/5 p-6 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Zap size={60} className="text-yellow-500" />
          </div>
          <h3 className="text-grid-muted text-sm font-medium mb-1">Grid Stress Level</h3>
          <div className="text-3xl font-bold text-yellow-500 mb-2">Moderate</div>
          <div className="text-xs text-gray-400">
            Expected for Thursday 14:00
          </div>
        </div>
      </div>

      <div className="bg-grid-card border border-white/5 rounded-xl p-6 h-[450px]">
        <h3 className="text-lg font-semibold mb-6">Actual vs Predicted Load</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={forecastData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="day" stroke="#64748B" tickLine={false} axisLine={false} dy={10} />
            <YAxis stroke="#64748B" tickLine={false} axisLine={false} />
            <Tooltip 
              cursor={{fill: 'rgba(255,255,255,0.05)'}}
              contentStyle={{ backgroundColor: '#131B2C', borderColor: '#1e293b', borderRadius: '8px' }}
            />
            <Legend wrapperStyle={{paddingTop: '20px'}} />
            <Bar dataKey="actual" name="Actual Load" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
            <Bar dataKey="predicted" name="AI Prediction" fill="#00F5FF" radius={[4, 4, 0, 0]} barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-grid-card border border-white/5 rounded-xl p-6 h-[350px]">
        <h3 className="text-lg font-semibold mb-6">Confidence Interval</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={forecastData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="day" stroke="#64748B" tickLine={false} axisLine={false} dy={10} />
            <YAxis stroke="#64748B" tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#131B2C', borderColor: '#1e293b', borderRadius: '8px' }}
            />
            <Line type="monotone" dataKey="predicted" stroke="#7C3AED" strokeWidth={3} dot={{r: 4, fill: '#7C3AED'}} activeDot={{r: 8}} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Prediction;
