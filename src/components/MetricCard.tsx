import React from 'react';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { MetricCardProps } from '../types';

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, trend, icon }) => {
  return (
    <div className="bg-grid-card border border-white/5 rounded-xl p-5 hover:border-grid-cyan/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 rounded-lg bg-white/5 text-gray-400 group-hover:text-grid-cyan group-hover:bg-grid-cyan/10 transition-colors">
          {icon}
        </div>
        <div className={`flex items-center text-xs font-medium px-2 py-1 rounded-full border ${
          trend === 'up' ? 'text-green-400 bg-green-400/10 border-green-400/20' :
          trend === 'down' ? 'text-red-400 bg-red-400/10 border-red-400/20' :
          'text-gray-400 bg-gray-400/10 border-gray-400/20'
        }`}>
          {trend === 'up' && <ArrowUp size={12} className="mr-1" />}
          {trend === 'down' && <ArrowDown size={12} className="mr-1" />}
          {trend === 'neutral' && <Minus size={12} className="mr-1" />}
          {change}
        </div>
      </div>
      <h3 className="text-grid-muted text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
    </div>
  );
};

export default MetricCard;
