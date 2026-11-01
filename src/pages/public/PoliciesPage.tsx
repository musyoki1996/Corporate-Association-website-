import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, Download, ShieldCheck, Search, Filter, CheckCircle } from 'lucide-react';

interface PoliciesPageProps {
  onNavigate: (path: string) => void;
}

export const PoliciesPage: React.FC<PoliciesPageProps> = ({ onNavigate }) => {
  const { policies } = useApp();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = ['ALL', ...Array.from(new Set(policies.map(p => p.category)))];

  const filtered = policies.filter(p => {
    if (selectedCategory !== 'ALL' && p.category !== selectedCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q) || p.code.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <section className="bg-[#101F68] text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-orange-400 text-xs font-semibold uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            <span>Governance & Legal Library</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Policies, Governance & Guidelines
          </h1>
          <p className="text-base sm:text-lg text-slate-200 max-w-2xl font-normal leading-relaxed">
            The regulatory framework upholding safety standards, member discipline, data privacy, and ethical operations across Kenya.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 space-y-8">
        {/* Filters and Search Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search policy name, code or keyword..."
              className="w-full px-3.5 py-2 pl-9 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#101F68] focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto text-xs font-bold">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`py-1.5 px-3 rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#101F68] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Policy Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(pol => (
            <div
              key={pol.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                    {pol.code}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">
                    Version {pol.version} · Effective: {pol.effectiveDate}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#101F68]">{pol.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{pol.summary}</p>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 space-y-1">
                  <p><strong>Custodial Directorate:</strong> {pol.responsibleDepartment}</p>
                  <p><strong>Legal Weight:</strong> Binding on all members under Societies Act Cap 108</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">PDF · {pol.fileSize}</span>
                <button
                  onClick={() => alert(`Simulating PDF download for ${pol.title} (${pol.code}). Document verified by National Secretariat.`)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#101F68] hover:bg-[#0D1850] text-white text-xs font-bold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Document</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
