import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  ArrowRight,
  Shield,
  Award,
  Users,
  Compass,
  Zap,
  HeartHandshake,
  CheckCircle2,
  Calendar,
  Building,
  Smartphone,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { members, news, events } = useApp();

  const activeMembersCount = members.filter(m => m.status === 'VERIFIED / ACTIVE').length;
  const totalRegisteredCount = members.length;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#101F68] text-white overflow-hidden">
        {/* Subtle decorative background circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-orange-600/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Headline and CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 border border-white/15 text-orange-400 text-xs font-semibold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span>The National Apex Mobility Body · Kenya</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-white">
                Driving Kenya Towards a <span className="text-orange-400">Safer, Smarter</span> and More Professional Boda Boda Industry.
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
                Empowering digital boda boda riders and delivery professionals through representation, safety, technology, economic opportunities and collective responsibility.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <button
                  onClick={() => onNavigate('/membership/register')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#F04416] hover:bg-[#D9380F] text-white font-bold text-sm shadow-xl shadow-orange-950/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>Become a Member</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('/verify-member')}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white text-[#101F68] hover:bg-slate-100 font-bold text-sm shadow-md transition-all"
                >
                  <ShieldCheck className="w-4 h-4 text-orange-600" />
                  <span>Verify a Member</span>
                </button>

                <button
                  onClick={() => onNavigate('/organization')}
                  className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white font-semibold text-sm transition-colors border border-white/20"
                >
                  <span>Explore Our Organization</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Key Trust Highlights */}
              <div className="pt-4 border-t border-white/15 grid grid-cols-3 gap-4 text-left">
                <div>
                  <p className="text-2xl font-bold font-mono text-white">47</p>
                  <p className="text-xs text-slate-300">Counties Represented</p>
                </div>
                <div>
                  <p className="text-2xl font-bold font-mono text-orange-400">100%</p>
                  <p className="text-xs text-slate-300">Digital QR Verification</p>
                </div>
                <div>
                  <p className="text-2xl font-bold font-mono text-white">14</p>
                  <p className="text-xs text-slate-300">Welfare Pillars</p>
                </div>
              </div>
            </div>

            {/* Right Column: High Quality Photographic Hero Frame */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/15 bg-slate-900 group">
                <img
                  src="/src/assets/images/hero_kenyan_boda_riders_1793478786224.jpg"
                  alt="Kenyan Digital Boda and Delivery Riders"
                  className="w-full h-[360px] sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
                  <div className="flex items-center gap-2 text-orange-400 text-xs font-bold uppercase tracking-wider">
                    <Shield className="w-4 h-4" />
                    <span>Official Association Motto</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mt-1">
                    &ldquo;Safety and Sanity&rdquo;
                  </h3>
                  <p className="text-xs text-slate-200 mt-1">
                    Promoting dignified livelihoods and road discipline for motorcycle transport across the Republic of Kenya.
                  </p>
                </div>
              </div>

              {/* Floating Quick Verification Badge */}
              <div className="absolute -bottom-4 -left-4 bg-white text-[#101F68] p-3 rounded-xl shadow-xl border border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Instant Check</p>
                  <p className="text-xs font-bold text-[#101F68]">Live QR Member Engine</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS & INSTITUTIONAL STRIP */}
      <section className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#101F68] flex items-center justify-center shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-[#101F68] font-mono tabular-nums">
                  {totalRegisteredCount * 12500 + 42000}+
                </p>
                <p className="text-xs font-medium text-slate-600">Registered Riders Nationally</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-[#101F68] font-mono tabular-nums">
                  {activeMembersCount * 18000 + 35000}+
                </p>
                <p className="text-xs font-medium text-slate-600">Active Verified Cards</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-[#101F68] font-mono tabular-nums">140+</p>
                <p className="text-xs font-medium text-slate-600">Safety Clinics Hosted</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-[#101F68] font-mono tabular-nums">47</p>
                <p className="text-xs font-medium text-slate-600">County Secretariats</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT / MANDATE SUMMARY */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600">
              <Compass className="w-4 h-4" />
              <span>Who We Are & Our Mandate</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101F68] tracking-tight leading-tight">
              A Unified Voice for Kenya's Digital Motorcycle Transport Ecosystem
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              The <strong>Digital Boda Drivers and Deliveries Association of Kenya (DBDDAK)</strong> was formed to bring order, professional dignity, comprehensive road safety, and social protection to the motorcycle transport and courier delivery industry.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              Operating under our guiding slogan <em>"Safety and Sanity"</em>, DBDDAK serves as the official national bridge between digital app riders, traditional boda boda operators, regulatory authorities such as NTSA, the National Police Service, county governments, and corporate technology platforms.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#101F68]">Legal Representation</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Defending member rights against unlawful harassment and impoundment.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#101F68]">Road Safety First</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Dual KEBS certified helmets and high-visibility reflector gear enforcement.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#101F68]">SACCO & Welfare</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Micro-savings, benevolent crash emergency funds, and asset loans.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#101F68]">Digital ID & Verification</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Instant tamper-proof QR verification for clients and security gates.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('/about')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#101F68] hover:text-orange-600 transition-colors"
              >
                <span>Read Full Association History and Governance</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right: Photographic Feature */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white">
                <img
                  src="/src/assets/images/safety_training_workshop_1793478786811.jpg"
                  alt="Road Safety Training by DBDDAK"
                  className="w-full h-48 object-cover hover:scale-105 transition-transform"
                />
                <div className="p-3">
                  <p className="text-[10px] uppercase font-bold text-orange-600">Pillar 01</p>
                  <p className="text-xs font-bold text-[#101F68] mt-0.5">Certified Safety Clinics</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#101F68] text-white shadow-lg space-y-2">
                <Zap className="w-6 h-6 text-orange-400" />
                <h4 className="text-sm font-bold">Emergency Response</h4>
                <p className="text-[11px] text-slate-300 leading-snug">
                  24/7 dedicated telephone desk for crash notifications, hospital admission coordination, and legal bail assistance.
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 text-[#202633] space-y-2">
                <ShieldCheck className="w-6 h-6 text-orange-600" />
                <h4 className="text-sm font-bold text-[#101F68]">Anti-Mob Injustice</h4>
                <p className="text-[11px] text-slate-600 leading-snug">
                  Zero tolerance for retaliation. We enforce strict legal protocols in partnership with the National Police Service.
                </p>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white">
                <img
                  src="/src/assets/images/delivery_rider_digital_1793478788227.jpg"
                  alt="Modern Digital Delivery Courier in Nairobi"
                  className="w-full h-48 object-cover hover:scale-105 transition-transform"
                />
                <div className="p-3">
                  <p className="text-[10px] uppercase font-bold text-orange-600">Pillar 02</p>
                  <p className="text-xs font-bold text-[#101F68] mt-0.5">E-Commerce & Courier Growth</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE 14 DEDICATED SERVICE PILLARS (Preview) */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-600">
              <Sparkles className="w-4 h-4" />
              <span>Comprehensive Association Services</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101F68] tracking-tight">
              Fourteen Dedicated Pillars Serving Our Members
            </h2>
            <p className="text-sm text-slate-600">
              From roadside crash protection to e-mobility financing, explore how DBDDAK supports drivers, passengers, and delivery companies every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                num: '01',
                title: 'Road Safety and Professionalism',
                desc: 'KEBS dual-helmet enforcement, defensive riding clinics, and strict speed discipline on Kenyan highways.'
              },
              {
                num: '02',
                title: 'Member Welfare & Social Protection',
                desc: 'Hospitalization emergency subsidies, bereavement grants, and family assistance for injured riders.'
              },
              {
                num: '03',
                title: 'Economic Empowerment',
                desc: 'Collective bargaining, discounted bulk fuel procurement, and negotiation for fair app commission rates.'
              },
              {
                num: '04',
                title: 'Financial Inclusion & SACCO Support',
                desc: 'Digital micro-savings checkoff, asset financing for clean motorcycles, and cooperative credit access.'
              },
              {
                num: '05',
                title: 'Insurance & Risk Management',
                desc: 'Empanelled group personal accident policies, pillion rider passenger covers, and third-party protection.'
              },
              {
                num: '06',
                title: 'Training & Capacity Building',
                desc: 'First-aid certification, customer care excellence, mechanical upkeep, and road ethics certification.'
              },
              {
                num: '07',
                title: 'Legal Advocacy & Representation',
                desc: 'Standing legal counsel countering arbitrary city council harassment, illegal impoundment, and extortion.'
              },
              {
                num: '08',
                title: 'Fair Working Conditions',
                desc: 'Advocating for sustainable gig-economy compensation, resting stage amenities, and platform transparency.'
              },
              {
                num: '09',
                title: 'Regulatory Compliance',
                desc: 'Seamless assistance with NTSA inspections, valid driving licenses, and county parking operator stickers.'
              }
            ].map(pillar => (
              <div
                key={pillar.num}
                onClick={() => onNavigate('/services')}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-orange-300 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-sm font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                    {pillar.num}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-sm font-bold text-[#101F68] group-hover:text-orange-600 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => onNavigate('/services')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#101F68] hover:bg-[#0D1850] text-white text-xs font-bold transition-all shadow-md"
            >
              <span>Explore All 14 Dedicated Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. VERIFICATION SYSTEM SPOTLIGHT */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-br from-[#101F68] to-[#0A1445] text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
            <ShieldCheck className="w-96 h-96 -mr-16 -mb-16" />
          </div>

          <div className="relative z-10 max-w-2xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-500/20 text-orange-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Public Digital Identity Infrastructure</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Instantly Verify Any DBDDAK Member in Real-Time
            </h2>

            <p className="text-sm text-slate-200 leading-relaxed">
              Whether you are an estate security manager, a corporate logistics client, a law enforcement officer, or a concerned passenger, you can verify the authentic identity and active standing of any rider in seconds without logging in.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('/verify-member')}
                className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all"
              >
                Launch Verification Portal
              </button>

              <button
                onClick={() => onNavigate('/membership')}
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors border border-white/20"
              >
                Learn Card Anti-Fraud Features
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. LATEST NEWS & EVENTS */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-orange-600">
                Official Updates & Activities
              </p>
              <h2 className="text-2xl font-extrabold text-[#101F68] tracking-tight mt-1">
                Announcements, Press & Upcoming Events
              </h2>
            </div>
            <button
              onClick={() => onNavigate('/news')}
              className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors"
            >
              <span>View All News</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Featured Articles */}
            {news.slice(0, 2).map(article => (
              <div
                key={article.id}
                onClick={() => onNavigate(`/news/${article.slug}`)}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-[#101F68] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {article.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="text-[11px] text-slate-500 font-medium">
                      {new Date(article.publishedAt).toLocaleDateString('en-KE', { dateStyle: 'medium' })} · {article.author}
                    </p>
                    <h3 className="text-sm font-bold text-[#101F68] mt-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>
                </div>
                <div className="px-5 pb-4">
                  <span className="text-xs font-semibold text-orange-600 group-hover:underline flex items-center gap-1">
                    Read Full Statement <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}

            {/* Upcoming Event Card */}
            <div className="rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50/50 to-white p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-orange-700 uppercase tracking-wider mb-3">
                  <Calendar className="w-4 h-4 text-orange-600" />
                  <span>Upcoming Official Event</span>
                </div>

                {events[0] && (
                  <div>
                    <span className="inline-block px-2 py-0.5 bg-orange-600 text-white rounded text-[10px] font-bold uppercase mb-2">
                      {events[0].eventType}
                    </span>
                    <h4 className="text-base font-bold text-[#101F68]">
                      {events[0].title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {events[0].description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-orange-200/60 space-y-1.5 text-xs text-slate-600">
                      <p><strong>Date:</strong> {events[0].date} ({events[0].time})</p>
                      <p><strong>Venue:</strong> {events[0].location}</p>
                      <p><strong>Target:</strong> {events[0].targetAudience}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <button
                  onClick={() => onNavigate('/events')}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#101F68] hover:bg-[#0D1850] text-white text-xs font-bold transition-all text-center shadow-sm"
                >
                  Register / View All Association Events
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. STRATEGIC PARTNERS */}
      <section className="py-12 bg-[#F8FAFC] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-6">
            Engaged in Collaborative Dialogue with Regulatory and Industry Partners
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-80">
            <span className="font-bold text-base tracking-tight text-slate-700">NTSA Kenya</span>
            <span className="font-bold text-base tracking-tight text-slate-700">Ministry of Roads & Transport</span>
            <span className="font-bold text-base tracking-tight text-slate-700">National Police Service</span>
            <span className="font-bold text-base tracking-tight text-slate-700">Kenya Red Cross</span>
            <span className="font-bold text-base tracking-tight text-slate-700">M-PESA / Safaricom</span>
            <span className="font-bold text-base tracking-tight text-slate-700">Co-operative Bank</span>
          </div>
        </div>
      </section>
    </div>
  );
};
