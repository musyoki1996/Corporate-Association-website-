import React from 'react';
import { ShieldCheck, CheckCircle2, ArrowRight, UserPlus, FileCheck, CreditCard, Award } from 'lucide-react';

interface MembershipPageProps {
  onNavigate: (path: string) => void;
}

export const MembershipPage: React.FC<MembershipPageProps> = ({ onNavigate }) => {
  const categories = [
    {
      name: 'Digital Boda Rider',
      desc: 'Motorcycle taxi operators active on smartphone ride-hailing applications (Uber, Bolt, Faras, Little, etc.) as well as independent stages.',
      fee: 'KSh 1,500 Initial Reg · KSh 1,200 Annual Renewal',
      features: [
        'Tamper-proof Digital Membership Card with live QR verification',
        '24/7 Road Crash Emergency Hotline & Hospitalization Assistance',
        'Legal defence against unlawful city council harassment and impoundment',
        'Subsidized dual KEBS certified helmet procurement',
        'Cooperative micro-savings & asset credit eligibility'
      ]
    },
    {
      name: 'Delivery Rider & Courier',
      desc: 'App-based courier riders, e-commerce delivery specialists, food delivery operators (Glovo, Jumia, Sendy, QuickPack), and parcel dispatch riders.',
      fee: 'KSh 1,500 Initial Reg · KSh 1,200 Annual Renewal',
      features: [
        'Recognized commercial delivery operator accreditation',
        'Expedited clearance at gated residential estates and commercial CBD zones',
        'Courier cargo theft & crash mitigation liaison',
        'Discounted high-durability thermal delivery boxes and motorcycle phone mounts',
        'Access to group medical & outpatient accident coverage'
      ]
    },
    {
      name: 'Ordinary Member (Independent Stage)',
      desc: 'Grassroots motorcycle operators operating from registered county stages without reliance on smartphone digital platforms.',
      fee: 'KSh 1,200 Initial Reg · KSh 1,000 Annual Renewal',
      features: [
        'Official membership ID & verification in national database',
        'Stage dispute mediation and sub-county elder council representation',
        'Benevolent emergency fund access for road crash hospitalization',
        'Defensive driving refresher clinics and license regularisation'
      ]
    },
    {
      name: 'Corporate Fleet Member',
      desc: 'Logistics firms, delivery startups, quick-commerce businesses, and motorcycle fleet management enterprises with 5+ commercial riders.',
      fee: 'Custom fleet tiers based on registered motorcycle volume',
      features: [
        'API verification integration for fleet safety tracking',
        'Centralized driver background checks & driving license verification',
        'Fleet insurance discounts & bulk maintenance partnerships',
        'Dedicated corporate liaison officer at National Secretariat'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <section className="bg-[#101F68] text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-orange-400 text-xs font-semibold uppercase tracking-wider">
            <UserPlus className="w-4 h-4" />
            <span>Membership Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            DBDDAK Membership Categories & Benefits
          </h1>
          <p className="text-base sm:text-lg text-slate-200 max-w-2xl font-normal leading-relaxed">
            Gain official national recognition, legal representation, digital identity verification, and comprehensive social protection.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-16">
        {/* Categories Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-extrabold text-[#101F68]">
              Configured Membership Categories
            </h2>
            <p className="text-xs text-slate-600">
              Select the category matching your commercial transport or delivery operations in Kenya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#101F68]">{cat.name}</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{cat.desc}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-orange-50 border border-orange-100 text-xs">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Fee Structure:</span>
                    <span className="font-mono font-bold text-orange-700">{cat.fee}</span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Included Benefits:
                    </span>
                    <ul className="space-y-2 text-xs text-slate-700">
                      {cat.features.map((f, fidx) => (
                        <li key={fidx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <button
                    onClick={() => onNavigate('/membership/register')}
                    className="w-full py-3 rounded-xl bg-[#F04416] hover:bg-[#D9380F] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Apply for {cat.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workflow Summary */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#101F68]">
              The 10-Step Registration to Verification Journey
            </h2>
            <p className="text-xs text-slate-600">
              Clear institutional process ensuring verified credentials and complete anti-fraud integrity.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4 text-center text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="font-mono text-orange-600 font-bold">01</span>
              <p className="font-bold text-slate-800">Online Form</p>
              <p className="text-[10px] text-slate-500">Submit IDs & details</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="font-mono text-orange-600 font-bold">02</span>
              <p className="font-bold text-slate-800">Ref Code</p>
              <p className="text-[10px] text-slate-500">APP-2026-XXXX issued</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="font-mono text-orange-600 font-bold">03</span>
              <p className="font-bold text-slate-800">Officer Review</p>
              <p className="text-[10px] text-slate-500">NTSA & Police vetting</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="font-mono text-orange-600 font-bold">04</span>
              <p className="font-bold text-slate-800">Member #</p>
              <p className="text-[10px] text-slate-500">Permanent ID allocated</p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 space-y-1">
              <span className="font-mono text-emerald-700 font-bold">05</span>
              <p className="font-bold text-emerald-900">QR Digital Card</p>
              <p className="text-[10px] text-emerald-600">Active verification live</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
