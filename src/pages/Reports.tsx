import React from 'react';
import { FileText, Download, Filter, CheckCircle, Clock, AlertOctagon, ShieldCheck, TrendingUp } from 'lucide-react';
import { ReportItem } from '../types';

const Reports: React.FC = () => {
  const reports: ReportItem[] = [
    { id: 'RPT-2023-001', title: 'Monthly Grid Efficiency Analysis', date: 'Oct 24, 2023', status: 'Complete', type: 'Performance' },
    { id: 'RPT-2023-002', title: 'Transformer A12 Anomaly Detection', date: 'Oct 22, 2023', status: 'Pending', type: 'Incident' },
    { id: 'RPT-2023-003', title: 'Substation Load Balancing Log', date: 'Oct 20, 2023', status: 'Complete', type: 'Maintenance' },
    { id: 'RPT-2023-004', title: 'Q3 Financial Impact Report', date: 'Oct 15, 2023', status: 'Failed', type: 'Financial' },
    { id: 'RPT-2023-005', title: 'Weekly Maintenance Schedule', date: 'Oct 12, 2023', status: 'Complete', type: 'Maintenance' },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Complete': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Pending': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Failed': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Complete': return <CheckCircle size={14} className="mr-1.5" />;
      case 'Pending': return <Clock size={14} className="mr-1.5" />;
      case 'Failed': return <AlertOctagon size={14} className="mr-1.5" />;
      default: return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      {/* STEP 7: SUMMARY HEADER */}
      <div className="bg-grid-card border border-white/5 rounded-xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
        <div>
            <h1 className="text-3xl font-bold text-white mb-2">System Reports</h1>
            <p className="text-grid-muted">Centralized audit logs and compliance documentation.</p>
        </div>
        
        <div className="flex items-center gap-6 bg-black/20 px-6 py-3 rounded-lg border border-white/5">
            <div className="text-right">
                <p className="text-xs text-grid-muted uppercase tracking-wider mb-1">Grid Stability Score</p>
                <div className="flex items-center justify-end gap-2">
                    <span className="text-2xl font-bold text-white">84%</span>
                    <span className="text-sm font-medium text-orange-400">Moderate Risk</span>
                </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500">
                <ShieldCheck size={24} />
            </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
         <h2 className="text-lg font-bold text-white">Recent Documents</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-grid-cyan text-black font-semibold rounded-lg hover:bg-cyan-400 transition-colors shadow-lg shadow-grid-cyan/10">
          <Download size={18} />
          Export All
        </button>
      </div>

      <div className="bg-grid-card border border-white/5 rounded-xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-white/5 flex gap-4">
          <div className="relative flex-1">
            <input 
              type="text" 
              placeholder="Search by ID or Title..." 
              className="w-full bg-black/20 border border-white/10 rounded-lg py-2 px-4 text-sm text-white focus:outline-none focus:border-grid-cyan/50 transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
            <Filter size={16} />
            Filter
          </button>
        </div>

        <div className="w-full">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 text-xs font-semibold text-grid-muted uppercase tracking-wider bg-black/20">
            <div className="col-span-4 pl-2">Report Name</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-2">Date Generated</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2 text-right pr-2">Actions</div>
          </div>

          <div className="divide-y divide-white/5">
            {reports.map((report) => (
              <div key={report.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/5 transition-all group border-l-2 border-l-transparent hover:border-l-grid-cyan">
                <div className="col-span-4 flex items-center gap-3 pl-2">
                  <div className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center text-gray-400 group-hover:text-grid-cyan transition-colors">
                    <FileText size={16} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-grid-cyan transition-colors">{report.title}</div>
                    <div className="text-xs text-gray-500">{report.id}</div>
                  </div>
                </div>
                <div className="col-span-2">
                  <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/5">
                    {report.type}
                  </span>
                </div>
                <div className="col-span-2 text-sm text-gray-400">
                  {report.date}
                </div>
                <div className="col-span-2">
                  <span className={`inline-flex items-center text-xs font-medium px-2 py-1 rounded-full border ${getStatusColor(report.status)}`}>
                    {getStatusIcon(report.status)}
                    {report.status}
                  </span>
                </div>
                <div className="col-span-2 flex justify-end gap-2 pr-2 opacity-50 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors">
                    <Download size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-4 border-t border-white/5 flex justify-between items-center text-xs text-gray-500 bg-black/10">
          <div>Showing 5 of 128 results</div>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-white/5 rounded hover:bg-white/10 disabled:opacity-50 transition-colors">Previous</button>
            <button className="px-3 py-1 bg-white/5 rounded hover:bg-white/10 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
