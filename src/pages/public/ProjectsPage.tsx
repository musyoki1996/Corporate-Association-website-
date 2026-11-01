import React from 'react';
import { useApp } from '../../context/AppContext';
import { Award, CheckCircle, ArrowRight, MapPin, Calendar, Users } from 'lucide-react';

interface ProjectsPageProps {
  onNavigate: (path: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate }) => {
  const { projects } = useApp();

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <section className="bg-[#101F68] text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-orange-400 text-xs font-semibold uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Community & Industry Transformation</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Projects, Impact & Community CSR
          </h1>
          <p className="text-base sm:text-lg text-slate-200 max-w-2xl font-normal leading-relaxed">
            Tangible initiatives improving road safety, transitioning to zero-emission mobility, and uplifting Kenyan families.
          </p>
        </div>
      </section>

      {/* Projects Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-12">
        {projects.map((prj, index) => (
          <div
            key={prj.id}
            className={`bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Image Frame */}
            <div className="lg:col-span-5 h-72 lg:h-full relative overflow-hidden bg-slate-900">
              <img
                src={prj.imageUrl}
                alt={prj.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#101F68] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                {prj.status} Project
              </div>
            </div>

            {/* Details & Metrics */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-5">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                  {prj.tagline}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#101F68]">
                  {prj.title}
                </h3>
                <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-orange-600" />
                    {prj.location}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-orange-600" />
                    {prj.implementationDate}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {prj.description}
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                {prj.metrics.map((m, idx) => (
                  <div key={idx} className="text-center">
                    <p className="text-lg sm:text-xl font-bold font-mono text-[#101F68]">{m.value}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{m.label}</p>
                  </div>
                ))}
              </div>

              {/* Partner tags */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="text-slate-400 font-semibold text-[11px]">Key Partners:</span>
                {prj.partners.map((partner, pidx) => (
                  <span
                    key={pidx}
                    className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#101F68] font-medium text-[11px] border border-blue-100"
                  >
                    {partner}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
