import React, { useState } from 'react';
import { Handshake, Building, Send, CheckCircle, ArrowRight } from 'lucide-react';

interface PartnershipsPageProps {
  onNavigate: (path: string) => void;
}

export const PartnershipsPage: React.FC<PartnershipsPageProps> = ({ onNavigate }) => {
  const [partnerType, setPartnerType] = useState('Financial Institution / Bank');
  const [orgName, setOrgName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setOrgName('');
    setContactPerson('');
    setEmail('');
    setPhone('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  const partnerSectors = [
    {
      title: 'Government & Regulatory Agencies',
      desc: 'Collaborative taskforces on road crash prevention, licensing harmonization, and green mobility transition with NTSA, NPS, and County Transport Ministries.'
    },
    {
      title: 'Financial & Insurance Institutions',
      desc: 'Customized credit facilities, micro-savings SACCO integration, and specialized personal accident policies covering riders and pillions.'
    },
    {
      title: 'Motorcycle OEMs & EV Manufacturers',
      desc: 'Clean electric motorcycle manufacturing, battery swapping station infrastructure, and concessionary asset financing for youth.'
    },
    {
      title: 'Ride-Hailing & E-Commerce Platforms',
      desc: 'Institutional MoUs with mobility applications (Uber, Bolt, Glovo, Jumia) establishing minimum fare protections and rider safety protocols.'
    },
    {
      title: 'Energy & Fuel Retailers',
      desc: 'Bulk discount fuel cards and engine lubricant subsidies at major highway service stations for registered association members.'
    },
    {
      title: 'Development Partners & Civil Society',
      desc: 'Capacity building, female rider mentorship, trauma first aid, and youth employment grants.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <section className="bg-[#101F68] text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-orange-400 text-xs font-semibold uppercase tracking-wider">
            <Handshake className="w-4 h-4" />
            <span>Institutional Collaboration</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Strategic Partnerships
          </h1>
          <p className="text-base sm:text-lg text-slate-200 max-w-2xl font-normal leading-relaxed">
            Uniting public sector authorities, technology leaders, and financial partners to elevate Kenya’s 1.8M-strong motorcycle transport sector.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-16">
        {/* Sector Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-extrabold text-[#101F68]">
              Collaboration Priority Areas
            </h2>
            <p className="text-xs text-slate-600">
              DBDDAK provides private and public partners with verified, coordinated access to nationwide grassroots rider stages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnerSectors.map((sector, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2.5">
                <span className="font-mono text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                  Sector {idx + 1}
                </span>
                <h3 className="text-sm font-bold text-[#101F68]">{sector.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{sector.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Partnership Inquiry Form */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-12 max-w-3xl mx-auto space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="text-xl font-bold text-[#101F68]">
              Submit a Strategic Partnership Inquiry
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Connect directly with the DBDDAK Strategic Alliances and Executive Committee.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Organization / Institution Name *</label>
                <input
                  type="text"
                  required
                  value={orgName}
                  onChange={e => setOrgName(e.target.value)}
                  placeholder="e.g. APA Insurance / Roam Motors"
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#101F68]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Sector Category *</label>
                <select
                  value={partnerType}
                  onChange={e => setPartnerType(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#101F68]"
                >
                  <option value="Financial Institution / Bank">Financial Institution / Bank</option>
                  <option value="Insurance Provider">Insurance Provider</option>
                  <option value="Government Agency / County">Government Agency / County</option>
                  <option value="Ride-Hailing / Delivery App">Ride-Hailing / Delivery App</option>
                  <option value="EV / Motorcycle OEM">EV / Motorcycle OEM</option>
                  <option value="Development NGO">Development Partner / NGO</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Contact Officer Name *</label>
                <input
                  type="text"
                  required
                  value={contactPerson}
                  onChange={e => setContactPerson(e.target.value)}
                  placeholder="e.g. Dr. Jane Mutua"
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#101F68]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Official Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="e.g. partnerships@organization.co.ke"
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#101F68]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Official Telephone / Mobile *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="e.g. +254 700 000 000"
                  className="w-full px-3.5 py-2.5 text-xs font-mono rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#101F68]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Partnership Proposal Summary *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Outline proposed program objectives, scope, targeted counties, and benefits to members..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#101F68]"
                />
              </div>
            </div>

            {submitted && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Partnership proposal received. The National Secretariat will contact your office within 2 business days.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#F04416] hover:bg-[#D9380F] text-white font-bold text-xs uppercase tracking-wider transition-all shadow"
            >
              Submit Partnership Proposal
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
