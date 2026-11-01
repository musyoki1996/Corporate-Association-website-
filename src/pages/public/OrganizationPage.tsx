import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Building, Users, Phone, Mail, Award, CheckCircle } from 'lucide-react';

interface OrganizationPageProps {
  onNavigate: (path: string) => void;
}

export const OrganizationPage: React.FC<OrganizationPageProps> = ({ onNavigate }) => {
  const { leadership } = useApp();

  const [activeTier, setActiveTier] = useState<'All' | 'National Executive' | 'National Secretariat' | 'County Leadership'>('All');

  const filteredLeaders = activeTier === 'All'
    ? leadership
    : leadership.filter(l => l.level === activeTier);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <section className="bg-[#101F68] text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-orange-400 text-xs font-semibold uppercase tracking-wider">
            <Building className="w-4 h-4" />
            <span>Governance & Structure</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Leadership & Organizational Structure
          </h1>
          <p className="text-base sm:text-lg text-slate-200 max-w-2xl font-normal leading-relaxed">
            Democratic representation from grassroots stage chairpersons to the National Executive Committee across Kenya's 47 counties.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 space-y-16">
        {/* Organogram Chart */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#101F68]">
              Hierarchical Governance Flow
            </h2>
            <p className="text-xs text-slate-600">
              The constitutional authority of DBDDAK flows from individual riders through structured regional representation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-4">
            <div className="p-4 rounded-xl bg-[#101F68] text-white text-center space-y-1">
              <span className="text-[10px] uppercase font-bold text-orange-400">Tier 1</span>
              <h4 className="text-xs font-bold">National Delegates Conference (ADC)</h4>
              <p className="text-[10px] text-slate-300">Supreme policy & constitutional organ</p>
            </div>

            <div className="p-4 rounded-xl bg-blue-900 text-white text-center space-y-1">
              <span className="text-[10px] uppercase font-bold text-orange-400">Tier 2</span>
              <h4 className="text-xs font-bold">National Executive & Secretariat</h4>
              <p className="text-[10px] text-slate-300">Daily management & institutional dialogue</p>
            </div>

            <div className="p-4 rounded-xl bg-blue-800 text-white text-center space-y-1">
              <span className="text-[10px] uppercase font-bold text-orange-400">Tier 3</span>
              <h4 className="text-xs font-bold">47 County Coordinating Boards</h4>
              <p className="text-[10px] text-slate-300">Liaison with County Transport departments</p>
            </div>

            <div className="p-4 rounded-xl bg-blue-700 text-white text-center space-y-1">
              <span className="text-[10px] uppercase font-bold text-orange-400">Tier 4</span>
              <h4 className="text-xs font-bold">290 Sub-County Committees</h4>
              <p className="text-[10px] text-slate-300">Disciplinary oversight & police station desks</p>
            </div>

            <div className="p-4 rounded-xl bg-orange-600 text-white text-center space-y-1">
              <span className="text-[10px] uppercase font-bold text-white">Tier 5</span>
              <h4 className="text-xs font-bold">Grassroots Stages & Courier Nodes</h4>
              <p className="text-[10px] text-orange-100">Every individual rider, delivery hub & stage</p>
            </div>
          </div>
        </div>

        {/* Tier Filter Buttons */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-2xl font-extrabold text-[#101F68]">
                Association Leadership Directory
              </h2>
              <p className="text-xs text-slate-500">
                Elected officers and technical secretariat directors serving the boda boda industry.
              </p>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-bold">
              {(['All', 'National Executive', 'National Secretariat', 'County Leadership'] as const).map(tier => (
                <button
                  key={tier}
                  onClick={() => setActiveTier(tier)}
                  className={`py-1.5 px-3 rounded-lg transition-colors whitespace-nowrap ${
                    activeTier === tier
                      ? 'bg-[#101F68] text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>

          {/* Leadership Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLeaders.map(leader => (
              <div
                key={leader.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 bg-slate-900 overflow-hidden">
                    <img
                      src={leader.photoUrl}
                      alt={leader.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                      <span className="text-[10px] uppercase font-bold text-orange-400">
                        {leader.level} {leader.county && `· ${leader.county}`}
                      </span>
                      <h3 className="text-lg font-bold">{leader.name}</h3>
                      <p className="text-xs text-slate-300 font-medium">{leader.position}</p>
                    </div>
                  </div>

                  <div className="p-5 space-y-3 text-xs">
                    <p className="text-slate-600 leading-relaxed">{leader.bio}</p>
                    
                    <div className="pt-2 border-t border-slate-100 space-y-1.5 text-slate-600 text-[11px]">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Term of Office:</span>
                        <span className="font-mono font-medium">{leader.term}</span>
                      </div>
                      {leader.phone && (
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Contact:</span>
                          <span className="font-mono text-slate-800">{leader.phone}</span>
                        </div>
                      )}
                      {leader.email && (
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Official Email:</span>
                          <span className="font-mono text-slate-800">{leader.email}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-0">
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 text-[10px] font-bold text-center">
                    Active Accredited Leadership Profile
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
