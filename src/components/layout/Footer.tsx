import React from 'react';
import { ShieldCheck, Phone, Mail, MapPin, ExternalLink, ArrowRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#101F68] text-white border-t border-white/10 mt-auto">
      {/* Newsletter / Action Banner */}
      <div className="bg-[#0A1445] py-8 px-4 sm:px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Join Kenya's Foremost Digital Mobility Association
            </h3>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              Get officially registered, access legal representation, group accident insurance, and verified national identification.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                onNavigate('/membership/register');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#F04416] hover:bg-[#D9380F] text-white font-bold text-sm shadow-md transition-all"
            >
              <span>Register as a Rider</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                onNavigate('/verify-member');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-colors border border-white/20"
            >
              <ShieldCheck className="w-4 h-4 text-orange-400" />
              <span>Verify Any Rider</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Identity & Slogan */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/public/assets/aistudio/images__12__99a96338.jpeg"
                alt="DBDDAK Emblem"
                className="w-14 h-14 rounded-full object-cover bg-white p-0.5 shadow-md border border-white/20"
              />
              <div>
                <h4 className="text-base font-bold uppercase tracking-tight text-white leading-tight">
                  Digital Boda Drivers & Deliveries
                </h4>
                <p className="text-xs text-orange-400 font-semibold uppercase tracking-wider">
                  Association of Kenya (DBDDAK)
                </p>
                <p className="text-xs italic text-slate-300 mt-0.5">
                  &ldquo;Safety and Sanity&rdquo;
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed pr-6">
              The apex national association representing digital boda boda riders, app-based couriers, delivery professionals and motorcycle logistics stakeholders across Kenya’s 47 counties.
            </p>

            <div className="pt-2 text-xs text-slate-300 space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span>Westlands Market, C41, Second Floor, Nairobi, Kenya</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <span className="font-mono text-slate-200">+254 710 353 974 / +254 702 423 004</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                <span className="font-mono text-slate-200">info@digitalboda.co.ke</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-orange-400">
              The Association
            </h5>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => onNavigate('/')} className="hover:text-white transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/about')} className="hover:text-white transition-colors">
                  About Our Mission
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/organization')} className="hover:text-white transition-colors">
                  Leadership & Hierarchy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/services')} className="hover:text-white transition-colors">
                  Our 14 Service Pillars
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/projects')} className="hover:text-white transition-colors">
                  Projects & Impact
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/partnerships')} className="hover:text-white transition-colors">
                  Strategic Partners
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Membership & Verification */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-orange-400">
              Membership
            </h5>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => onNavigate('/membership')} className="hover:text-white transition-colors">
                  Membership Categories
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/membership/register')} className="hover:text-white transition-colors">
                  Online Registration
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/verify-member')} className="hover:text-white transition-colors">
                  Public Member Verification
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/member-portal')} className="hover:text-white transition-colors">
                  Member Portal Login
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/policies')} className="hover:text-white transition-colors">
                  Constitution & Bylaws
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/contact')} className="hover:text-white transition-colors">
                  County Offices & Contacts
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Governance & Legal */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-orange-400">
              Governance & Policies
            </h5>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => onNavigate('/policies')} className="hover:text-white transition-colors">
                  Road Safety & Helmet Code
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/policies')} className="hover:text-white transition-colors">
                  Disciplinary Regulations
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/policies')} className="hover:text-white transition-colors">
                  Data Protection Act 2019
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/policies')} className="hover:text-white transition-colors">
                  Gender & Anti-Harassment
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/policies')} className="hover:text-white transition-colors">
                  Anti-Mob Injustice Protocols
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/admin')} className="text-orange-400 hover:text-orange-300 font-semibold transition-colors flex items-center gap-1">
                  <span>Executive Admin Access</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright and Regulatory Statement */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} Digital Boda Drivers and Deliveries Association of Kenya (DBDDAK). All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Slogan: <strong className="text-orange-400">"Safety and Sanity"</strong></span>
            <span>·</span>
            <span>Registered Under Kenyan Societies Act</span>
            <span>·</span>
            <span>NTSA Accredited Liaison</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
