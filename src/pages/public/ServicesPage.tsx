import React, { useState } from 'react';
import {
  ShieldCheck,
  HeartHandshake,
  TrendingUp,
  CreditCard,
  FileText,
  GraduationCap,
  Scale,
  Briefcase,
  CheckCircle,
  Leaf,
  Smartphone,
  Users,
  AlertTriangle,
  Handshake,
  ArrowRight
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (path: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const services = [
    {
      id: 1,
      title: 'Road Safety and Professionalism',
      icon: <ShieldCheck className="w-6 h-6 text-orange-600" />,
      tag: 'Core Mandate',
      purpose: 'Eliminate motorcycle fatalities and establish an unassailable culture of safety, helmet discipline, and mutual respect on Kenyan roads.',
      benefits: [
        'Subsidized KEBS certified dual helmets for rider and pillion passenger',
        'High-visibility reflector jackets with unique stage identification',
        'Defensive riding clinics conducted with certified NTSA master trainers',
        'Quarterly road safety audits and blackspot hazard mapping'
      ],
      eligibility: 'All active DBDDAK registered riders and stage marshals.',
      access: 'Available through County Safety Directors and scheduled county road clinics.'
    },
    {
      id: 2,
      title: 'Member Welfare and Social Protection',
      icon: <HeartHandshake className="w-6 h-6 text-emerald-600" />,
      tag: 'Social Protection',
      purpose: 'Provide a resilient safety net for riders and their dependents in times of road crashes, sudden illness, or bereavement.',
      benefits: [
        'Immediate benevolent grant of up to KSh 50,000 upon verified hospital admission',
        'Bereavement compassionate support for next-of-kin',
        'Wheelchair and physical rehabilitation liaison for permanently injured operators',
        'Orphan and dependent education assistance schemes'
      ],
      eligibility: 'Members in good standing with up-to-date welfare benevolent checkoff.',
      access: 'Lodge claims via the 24/7 National Emergency Hotline or member portal ticket.'
    },
    {
      id: 3,
      title: 'Economic Empowerment',
      icon: <TrendingUp className="w-6 h-6 text-blue-600" />,
      tag: 'Livelihoods',
      purpose: 'Boost rider take-home revenue through collective purchasing power and structured bargaining with delivery applications.',
      benefits: [
        'Discounted bulk fuel arrangements at partner petrol stations across major highways',
        'Negotiated spare parts and high-mileage motorcycle tyre discounts',
        'Structured collective dialogues with ride-hailing app platforms on commission fairness',
        'Fleet procurement and courier subcontracting opportunities'
      ],
      eligibility: 'Any registered DBDDAK digital rider or delivery courier.',
      access: 'Present active digital membership card at participating partner fuel and retail hubs.'
    },
    {
      id: 4,
      title: 'Financial Inclusion and SACCO Support',
      icon: <CreditCard className="w-6 h-6 text-purple-600" />,
      tag: 'Finance',
      purpose: 'Transition informal daily cash earnings into formal savings, cooperative credit, and asset ownership.',
      benefits: [
        'Automated daily micro-savings checkoff via M-Pesa Daraja integration',
        'Cooperative asset financing for clean motorcycles, three-wheelers, and electric bikes',
        'Access to low-interest emergency development loans (3x savings multiplier)',
        'Comprehensive financial literacy, budgeting, and retirement preparation training'
      ],
      eligibility: 'DBDDAK registered members affiliated with our cooperative SACCO wing.',
      access: 'Enroll through the Member Portal under Financial Services or at county desks.'
    },
    {
      id: 5,
      title: 'Insurance and Risk Management',
      icon: <FileText className="w-6 h-6 text-indigo-600" />,
      tag: 'Risk Mitigation',
      purpose: 'Shield operators from catastrophic out-of-pocket medical expenses and third-party liabilities.',
      benefits: [
        'Group Personal Accident (GPA) coverage covering accidental disability and death',
        'Inpatient and outpatient hospitalization cover at empanelled healthcare centers nationwide',
        'Discounted commercial motorcycle third-party and comprehensive insurance covers',
        'Dedicated insurance claims processing desk for speedy compensation settlement'
      ],
      eligibility: 'Members holding verified driving licenses and registered motorcycles.',
      access: 'Enrolled upon annual membership registration with premium add-ons in portal.'
    },
    {
      id: 6,
      title: 'Training and Capacity Building',
      icon: <GraduationCap className="w-6 h-6 text-amber-600" />,
      tag: 'Education',
      purpose: 'Elevate technical skills, customer service, emergency response, and digital proficiency across the workforce.',
      benefits: [
        'Certified St. John Ambulance first-aid crash responder certification',
        'Customer relations, app navigation, and conflict de-escalation workshops',
        'Motorcycle mechanical maintenance and fuel economy mastery courses',
        'Entrepreneurship and small business management coaching'
      ],
      eligibility: 'Open to all registered members and probationary applicants.',
      access: 'Registration opens monthly on the association events calendar.'
    },
    {
      id: 7,
      title: 'Legal Advocacy and Member Representation',
      icon: <Scale className="w-6 h-6 text-rose-600" />,
      tag: 'Legal Protection',
      purpose: 'Protect members from unlawful harassment, extortive municipal impoundments, and arbitrary police crackdowns.',
      benefits: [
        'Standing retainers with regional advocates across Nairobi, Mombasa, Kisumu, and Nakuru',
        'Rapid bond and bail facilitation for operators arrested without lawful cause',
        'Public interest litigation challenging anti-poor municipal transport bylaws',
        'Legal education on Traffic Act provisions and motorist rights'
      ],
      eligibility: 'All active DBDDAK members with valid digital cards.',
      access: 'Contact the 24-hour legal desk or open an emergency incident ticket in the portal.'
    },
    {
      id: 8,
      title: 'Fair Working Conditions',
      icon: <Briefcase className="w-6 h-6 text-teal-600" />,
      tag: 'Gig Economy',
      purpose: 'Champion humane working hours, resting amenities, and transparent algorithmic dispatch from digital apps.',
      benefits: [
        'Negotiation for decent pickup zones and sanitised sanitation facilities in commercial CBDs',
        'Engagement with gig platforms to eliminate arbitrary algorithmic deactivations',
        'Advocacy for fair wait-time compensations and delivery base fare floors',
        'Dispute mediation between delivery couriers and merchant partners'
      ],
      eligibility: 'All app-based courier and passenger boda operators.',
      access: 'Submit complaints and platform grievances through the welfare desk.'
    },
    {
      id: 9,
      title: 'Regulatory Compliance Assistance',
      icon: <CheckCircle className="w-6 h-6 text-blue-700" />,
      tag: 'Compliance',
      purpose: 'Streamline statutory compliance and eliminate corrupt roadside exploitation.',
      benefits: [
        'One-stop assistance for NTSA driving license renewals and endorsements',
        'County transport parking sticker harmonization and electronic permit issuance',
        'Logbook transfer and hire-purchase discharge facilitation',
        'KRA tax compliance and PIN regularization desks'
      ],
      eligibility: 'All operators and fleet owners.',
      access: 'Visit your respective County Secretariat or apply through member portal.'
    },
    {
      id: 10,
      title: 'Sustainable Transport & Environmental Protection',
      icon: <Leaf className="w-6 h-6 text-green-600" />,
      tag: 'Sustainability',
      purpose: 'Spearhead Kenya’s transition to zero-emission electric motorcycles and responsible urban stewardship.',
      benefits: [
        'Subsidized financing and battery-swap concessions for electric boda bodas (EVs)',
        'Responsible collection and recycling of used motor oils and toxic lead-acid batteries',
        'Association urban tree-planting drives and carbon credit participation',
        'Rider incentives for reduced fuel consumption and clean air advocacy'
      ],
      eligibility: 'Members wishing to upgrade to electric two-wheelers.',
      access: 'Register interest under the Green E-Boda Project portal.'
    },
    {
      id: 11,
      title: 'Technology Adoption and Digital Inclusion',
      icon: <Smartphone className="w-6 h-6 text-sky-600" />,
      tag: 'Technology',
      purpose: 'Equip riders with digital tools, encrypted identity credentials, and modern smart logistics applications.',
      benefits: [
        'Instant tamper-proof digital membership cards with live QR verification',
        'Device asset financing for water-resistant smartphones and secure motorcycle mounts',
        'Digital route optimization and real-time incident broadcast alerts',
        'Data-driven rider credit scoring based on verifiable platform earnings'
      ],
      eligibility: 'Active registered members.',
      access: 'Built directly into the DBDDAK Member Portal.'
    },
    {
      id: 12,
      title: 'Community Development & Social Responsibility',
      icon: <Users className="w-6 h-6 text-yellow-600" />,
      tag: 'Community',
      purpose: 'Foster warm community relationships, support vulnerable Kenyans, and eliminate negative societal stigma.',
      benefits: [
        'Annual association charity runs, blood donation drives, and children’s home support',
        'Youth mentorship programs diverting at-risk youth from crime into certified transport careers',
        'Partnerships with schools for safe child scholar transit programs',
        'Clean-up campaigns and road hazard clearance at urban market stages'
      ],
      eligibility: 'Open to all members and community partners.',
      access: 'Organized through local sub-county chapters.'
    },
    {
      id: 13,
      title: 'Security and Emergency Support',
      icon: <AlertTriangle className="w-6 h-6 text-red-600" />,
      tag: 'Emergency',
      purpose: 'Protect riders from armed hijacking, recover stolen bikes, and eradicate mob justice.',
      benefits: [
        '24/7 dedicated emergency toll-free hotline with police dispatch integration',
        'Stolen motorcycle tracking and alert broadcast to over 40,000 riders in minutes',
        'Crash scene security to prevent looting of cargo or motorcycle components',
        'Strict anti-mob justice operational enforcement and peaceful mediation'
      ],
      eligibility: 'Available nationwide to all registered members.',
      access: 'Immediate toll-free hotline: +254 710 353 974.'
    },
    {
      id: 14,
      title: 'Partnerships & Investment Opportunities',
      icon: <Handshake className="w-6 h-6 text-indigo-700" />,
      tag: 'Strategic',
      purpose: 'Open commercial avenues with government bodies, commercial banks, telecom operators, and international donors.',
      benefits: [
        'Direct advertising and brand ambassador contract opportunities for riders',
        'Corporate delivery service tenders reserved for verified association members',
        'Bulk asset investment programs in transport infrastructure and real estate',
        'Development partner grants for gender inclusion and youth empowerment'
      ],
      eligibility: 'Corporate logistics partners and active member cooperatives.',
      access: 'Inquire via the Strategic Partnerships Desk.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Page Header */}
      <section className="bg-[#101F68] text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-orange-400 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Our Service Mandate</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Our 14 Service Pillars
          </h1>
          <p className="text-base sm:text-lg text-slate-200 max-w-2xl font-normal leading-relaxed">
            A comprehensive institutional suite designed to safeguard rider safety, foster financial independence, and elevate Kenya’s motorcycle delivery industry.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(svc => (
            <div
              key={svc.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                    {svc.icon}
                  </div>
                  <span className="font-mono text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                    Pillar {svc.id.toString().padStart(2, '0')}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#101F68]">{svc.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{svc.purpose}</p>

                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                    Key Member Benefits:
                  </span>
                  <ul className="text-xs text-slate-700 space-y-1">
                    {svc.benefits.slice(0, 3).map((b, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-[11px]">
                        <span className="text-orange-500 font-bold shrink-0">✓</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[10px] text-slate-500 font-medium truncate max-w-[170px]">
                  {svc.tag}
                </span>
                <button
                  onClick={() => setSelectedService(svc.id)}
                  className="font-bold text-orange-600 hover:text-orange-700 inline-flex items-center gap-1"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for viewing detailed drilldown */}
        {selectedService !== null && (() => {
          const detail = services.find(s => s.id === selectedService);
          if (!detail) return null;
          return (
            <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2.5">
                    {detail.icon}
                    <h3 className="text-base font-bold text-[#101F68]">{detail.title}</h3>
                  </div>
                  <button onClick={() => setSelectedService(null)} className="text-slate-400 hover:text-slate-700 text-lg">
                    ✕
                  </button>
                </div>

                <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
                  <div>
                    <strong className="block text-slate-900 mb-1">Purpose & Institutional Mandate:</strong>
                    <p>{detail.purpose}</p>
                  </div>

                  <div>
                    <strong className="block text-slate-900 mb-1">Full Service Benefits:</strong>
                    <ul className="space-y-1 pl-4 list-disc text-[11.5px]">
                      {detail.benefits.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                    <p><strong>Eligibility:</strong> {detail.eligibility}</p>
                    <p><strong>How to Access:</strong> {detail.access}</p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <button
                    onClick={() => {
                      setSelectedService(null);
                      onNavigate('/membership/register');
                    }}
                    className="px-4 py-2 rounded-xl bg-[#F04416] text-white text-xs font-bold hover:bg-[#D9380F]"
                  >
                    Register to Access This Service
                  </button>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="px-3 py-2 text-xs text-slate-500 hover:text-slate-800"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};
