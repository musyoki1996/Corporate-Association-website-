import React from 'react';
import { ShieldCheck, Compass, Eye, Heart, Target, Award, CheckCircle2, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Page Header */}
      <section className="bg-[#101F68] text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-orange-400 text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-4 h-4" />
            <span>Institutional Profile</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            About the Association
          </h1>
          <p className="text-base sm:text-lg text-slate-200 max-w-2xl font-normal leading-relaxed">
            The Digital Boda Drivers and Deliveries Association of Kenya (DBDDAK) is the national apex organization advocating for professionalism, safety, and economic transformation in motorcycle logistics.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-16">
        {/* Mandate & History Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-5 text-sm text-slate-700 leading-relaxed">
            <h2 className="text-2xl font-extrabold text-[#101F68]">
              Our Foundation & Historical Journey
            </h2>
            <p>
              Kenya's commercial motorcycle industry has grown over the past two decades into one of the country's largest economic engines, sustaining over 1.8 million livelihoods and carrying more than 10 million passengers daily. However, the sector has historically faced severe challenges: high road fatality rates, lack of regulatory coherence, exploitation by middlemen, and harassment by local authorities.
            </p>
            <p>
              With the rapid advent of smartphone ride-hailing and e-commerce delivery platforms in Kenya (such as Uber Boda, Bolt, Glovo, and Jumia Food), a new generation of digital transport operators emerged. In response to the need for structured advocacy, standardized safety protocols, and collective bargaining, the <strong>Digital Boda Drivers and Deliveries Association of Kenya (DBDDAK)</strong> was formally constituted.
            </p>
            <p>
              Guided by our national slogan <em>"Safety and Sanity"</em>, DBDDAK bridges the gap between grassroots motorcycle stages, corporate tech platforms, the National Transport and Safety Authority (NTSA), and law enforcement.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white">
              <img
                src="/src/assets/images/community_welfare_boda_1793478788981.jpg"
                alt="Kenyan Boda Boda Association Chapter"
                className="w-full h-72 object-cover"
              />
              <div className="p-5 bg-[#101F68] text-white">
                <span className="text-xs uppercase font-bold text-orange-400">Official Slogan</span>
                <p className="text-xl font-bold mt-1">&ldquo;Safety and Sanity&rdquo;</p>
                <p className="text-xs text-slate-300 mt-1">
                  National Headquarters: Westlands Market, C41, 2nd Floor, Nairobi, Kenya.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission, Vision, and Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#101F68] flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#101F68]">Our Mission</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              To organize, professionalize, and champion the welfare of digital motorcycle operators and delivery couriers through relentless safety enforcement, institutional representation, technological inclusion, and sustainable wealth creation.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#101F68]">Our Vision</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              A modern, respected, and crash-free motorcycle transport and delivery ecosystem in Kenya where every rider enjoys dignity, fair income, social security, and safe passage on every trip.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#101F68]">Core Values</h3>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
              <li><strong>Safety & Discipline:</strong> Dual-helmet and speed moderation.</li>
              <li><strong>Integrity:</strong> Zero tolerance for crime or mob action.</li>
              <li><strong>Inclusivity:</strong> Empowering female riders and youth.</li>
              <li><strong>Solidarity:</strong> United fraternal support in times of crisis.</li>
            </ul>
          </div>
        </div>

        {/* Legal & Institutional Compliance */}
        <div className="rounded-2xl bg-white border border-slate-200 p-8 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-[#101F68]">
            Legal Mandate & Regulatory Compliance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700 leading-relaxed">
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-[#101F68]">1. Registration Under Kenyan Law</h4>
              <p>
                DBDDAK is formally registered as a recognized national association representing motorcycle operators under the Societies Act (Cap 108) of the Laws of Kenya. All association bylaws and disciplinary codes are legally vetted and enforceable across all 47 counties.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-sm text-[#101F68]">2. NTSA & Traffic Act Cap 403 Compliance</h4>
              <p>
                The association maintains active technical consultation with the National Transport and Safety Authority (NTSA) to ensure all registered members hold valid Class A driving licenses, third-party and passenger insurance, and KEBS-certified protective gear.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-sm text-[#101F68]">3. Data Protection Act, 2019 Adherence</h4>
              <p>
                As a registered data controller and processor in Kenya, DBDDAK handles all member biometrics, National ID copies, and transaction telemetry with bank-grade encryption in strict accordance with Office of the Data Protection Commissioner (ODPC) guidelines.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-sm text-[#101F68]">4. National Police Service Security Liaison</h4>
              <p>
                DBDDAK operates a formal security desk liaising with the National Police Service (NPS) and County Askaris to coordinate scene protection, recover stolen motorcycles, and eliminate illegal stage extortion.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => onNavigate('/policies')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors"
            >
              <span>Download Association Constitution and Full Policies</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onNavigate('/membership/register')}
              className="px-4 py-2 rounded-xl bg-[#101F68] text-white text-xs font-bold hover:bg-[#0D1850]"
            >
              Become a Member Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
