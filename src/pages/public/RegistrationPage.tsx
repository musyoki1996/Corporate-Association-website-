import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MembershipCategory } from '../../types';
import { KENYA_COUNTIES, SUB_COUNTIES_MAP } from '../../data/mockDatabase';
import {
  ShieldCheck,
  User,
  Bike,
  FileCheck,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Upload,
  AlertCircle,
  Lock,
  Copy
} from 'lucide-react';

interface RegistrationPageProps {
  onNavigate: (path: string) => void;
}

export const RegistrationPage: React.FC<RegistrationPageProps> = ({ onNavigate }) => {
  const { submitApplication } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Form State
  const [fullName, setFullName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [alternativePhone, setAlternativePhone] = useState('');
  const [email, setEmail] = useState('');
  const [county, setCounty] = useState('Nairobi');
  const [subCounty, setSubCounty] = useState('Westlands');
  const [ward, setWard] = useState('Parklands/Highridge');
  const [physicalLocation, setPhysicalLocation] = useState('');

  // Step 2: Professional
  const [category, setCategory] = useState<MembershipCategory>('Digital Boda Rider');
  const [occupation, setOccupation] = useState('Digital Motorcycle Taxi Operator');
  const [motorcycleRegNo, setMotorcycleRegNo] = useState('');
  const [motorcycleOwnership, setMotorcycleOwnership] = useState<'Owner' | 'Leased / Financed' | 'Employed Rider'>('Owner');
  const [platformAffiliations, setPlatformAffiliations] = useState<string[]>(['Uber Boda']);
  const [yearsExperience, setYearsExperience] = useState(3);

  // Step 3: Documents
  const [photoPreview, setPhotoPreview] = useState<string>('/src/assets/images/delivery_rider_digital_1793478788227.jpg');
  const [idCardFile, setIdCardFile] = useState<string>('Uploaded_National_ID_Scan.pdf');
  const [drivingLicenseFile, setDrivingLicenseFile] = useState<string>('Uploaded_NTSA_Class_A_License.pdf');
  const [logbookFile, setLogbookFile] = useState<string>('Motorcycle_Logbook_Copy.pdf');

  // Step 4: Declaration
  const [agreeConstitution, setAgreeConstitution] = useState(false);
  const [agreeDataConsent, setAgreeDataConsent] = useState(false);
  const [agreeAccuracy, setAgreeAccuracy] = useState(false);

  // Submission Result
  const [submittedRef, setSubmittedRef] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // Available sub-counties for selected county
  const currentSubCounties = SUB_COUNTIES_MAP[county] || ['Central', 'North', 'South', 'East', 'West'];

  const togglePlatform = (platform: string) => {
    if (platformAffiliations.includes(platform)) {
      setPlatformAffiliations(platformAffiliations.filter(p => p !== platform));
    } else {
      setPlatformAffiliations([...platformAffiliations, platform]);
    }
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      setStep((step + 1) as 1 | 2 | 3 | 4 | 5);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else if (step === 4) {
      // Execute submission
      const newApp = submitApplication({
        fullName,
        nationalId,
        dateOfBirth,
        gender,
        phoneNumber,
        alternativePhone,
        email,
        county,
        subCounty,
        ward,
        physicalLocation,
        category,
        occupation,
        motorcycleRegNo,
        motorcycleOwnership,
        platformAffiliation: platformAffiliations,
        yearsExperience,
        documents: {
          photoUrl: photoPreview,
          idCardUrl: idCardFile,
          drivingLicenseUrl: drivingLicenseFile,
          logbookUrl: logbookFile
        },
        declarationAccepted: true
      });

      setSubmittedRef(newApp.applicationRef);
      setStep(5);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const copyRefToClipboard = () => {
    navigator.clipboard.writeText(submittedRef);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-[#101F68] text-xs font-bold uppercase tracking-wider">
            <User className="w-4 h-4 text-orange-600" />
            <span>Digital Membership Registration Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#101F68] tracking-tight">
            Apply to Join DBDDAK
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Complete the official 4-step registration to obtain your verified digital membership card, legal representation, and welfare benefits.
          </p>
        </div>

        {/* Progress Step Indicators (When not in success state) */}
        {step !== 5 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div className="grid grid-cols-4 gap-2 text-center">
              {[
                { s: 1, label: '1. Personal' },
                { s: 2, label: '2. Professional' },
                { s: 3, label: '3. Compliance' },
                { s: 4, label: '4. Declaration' }
              ].map(item => (
                <div
                  key={item.s}
                  className={`py-2 px-1 rounded-lg text-xs font-bold transition-colors ${
                    step === item.s
                      ? 'bg-[#101F68] text-white shadow'
                      : step > item.s
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-slate-400 bg-slate-50'
                  }`}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Form Container */}
        {step !== 5 ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8">
            <form onSubmit={handleNextStep} className="space-y-6">
              {/* STEP 1: PERSONAL INFORMATION */}
              {step === 1 && (
                <div className="space-y-5">
                  <div className="border-b border-slate-200 pb-3">
                    <h3 className="text-base font-bold text-[#101F68]">Step 1: Personal Identification</h3>
                    <p className="text-xs text-slate-500">Provide your official identification details matching your National ID card.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Full Legal Name *</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        placeholder="e.g. Kennedy Mwangi Gitau"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#101F68] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Kenyan National ID Number *</label>
                      <input
                        type="text"
                        required
                        value={nationalId}
                        onChange={e => setNationalId(e.target.value)}
                        placeholder="e.g. 28914523"
                        className="w-full px-3.5 py-2.5 text-sm font-mono rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#101F68] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Date of Birth *</label>
                      <input
                        type="date"
                        required
                        value={dateOfBirth}
                        onChange={e => setDateOfBirth(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#101F68] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Gender *</label>
                      <select
                        value={gender}
                        onChange={e => setGender(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#101F68] focus:outline-none"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Primary Phone Number (M-Pesa active) *</label>
                      <input
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e.target.value)}
                        placeholder="e.g. +254 712 345 678"
                        className="w-full px-3.5 py-2.5 text-sm font-mono rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#101F68] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Alternative Phone / Next of Kin</label>
                      <input
                        type="tel"
                        value={alternativePhone}
                        onChange={e => setAlternativePhone(e.target.value)}
                        placeholder="e.g. +254 722 998 877"
                        className="w-full px-3.5 py-2.5 text-sm font-mono rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#101F68] focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="e.g. rider@example.com"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#101F68] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">County *</label>
                      <select
                        value={county}
                        onChange={e => {
                          setCounty(e.target.value);
                          const newSubs = SUB_COUNTIES_MAP[e.target.value] || ['Central'];
                          setSubCounty(newSubs[0]);
                        }}
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#101F68] focus:outline-none"
                      >
                        {KENYA_COUNTIES.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Sub-County *</label>
                      <select
                        value={subCounty}
                        onChange={e => setSubCounty(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#101F68] focus:outline-none"
                      >
                        {currentSubCounties.map(sub => (
                          <option key={sub} value={sub}>{sub}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Ward *</label>
                      <input
                        type="text"
                        required
                        value={ward}
                        onChange={e => setWard(e.target.value)}
                        placeholder="e.g. Parklands/Highridge"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#101F68] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Physical Stage / Base Location *</label>
                      <input
                        type="text"
                        required
                        value={physicalLocation}
                        onChange={e => setPhysicalLocation(e.target.value)}
                        placeholder="e.g. Sarit Centre Stage, Westlands"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#101F68] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: PROFESSIONAL INFORMATION */}
              {step === 2 && (
                <div className="space-y-5">
                  <div className="border-b border-slate-200 pb-3">
                    <h3 className="text-base font-bold text-[#101F68]">Step 2: Professional & Logistics Profile</h3>
                    <p className="text-xs text-slate-500">Provide details regarding your motorcycle operations, ride-hailing apps, and experience.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Membership Category *</label>
                      <select
                        value={category}
                        onChange={e => setCategory(e.target.value as MembershipCategory)}
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#101F68] focus:outline-none"
                      >
                        <option value="Digital Boda Rider">Digital Boda Rider (Passenger App)</option>
                        <option value="Delivery Rider">Delivery Rider (E-Commerce / Food Logistics)</option>
                        <option value="Ordinary Member">Ordinary Member (Independent Stage)</option>
                        <option value="Corporate Member">Corporate Member (Fleet / Logistics)</option>
                        <option value="Associate Member">Associate Member</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Primary Occupation *</label>
                      <input
                        type="text"
                        required
                        value={occupation}
                        onChange={e => setOccupation(e.target.value)}
                        placeholder="e.g. Courier & Passenger Rider"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#101F68] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Motorcycle Number Plate / Reg No.</label>
                      <input
                        type="text"
                        value={motorcycleRegNo}
                        onChange={e => setMotorcycleRegNo(e.target.value.toUpperCase())}
                        placeholder="e.g. KMFE 412C"
                        className="w-full px-3.5 py-2.5 text-sm font-mono uppercase rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#101F68] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Motorcycle Ownership *</label>
                      <select
                        value={motorcycleOwnership}
                        onChange={e => setMotorcycleOwnership(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#101F68] focus:outline-none"
                      >
                        <option value="Owner">Outright Owner (Logbook in My Name)</option>
                        <option value="Leased / Financed">Financed / Hire Purchase (Watu, Mogo, etc.)</option>
                        <option value="Employed Rider">Employed Rider (Riding for an Investor)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Years of Riding Experience *</label>
                      <input
                        type="number"
                        min="1"
                        max="35"
                        value={yearsExperience}
                        onChange={e => setYearsExperience(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#101F68] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Platform affiliations checkbox selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      Affiliated Digital Platforms (Select all that apply):
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                      {['Uber Boda', 'Bolt Boda', 'Glovo Courier', 'Jumia Food', 'Little Cab', 'Faras', 'Sendy', 'Independent Stage'].map(platform => {
                        const checked = platformAffiliations.includes(platform);
                        return (
                          <button
                            type="button"
                            key={platform}
                            onClick={() => togglePlatform(platform)}
                            className={`p-2.5 rounded-lg border text-left transition-colors flex items-center justify-between ${
                              checked
                                ? 'bg-orange-50 border-orange-500 text-orange-950 font-bold'
                                : 'bg-slate-50 border-slate-200 text-slate-700'
                            }`}
                          >
                            <span>{platform}</span>
                            {checked && <CheckCircle className="w-3.5 h-3.5 text-orange-600" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: COMPLIANCE & DOCUMENTS */}
              {step === 3 && (
                <div className="space-y-5">
                  <div className="border-b border-slate-200 pb-3">
                    <h3 className="text-base font-bold text-[#101F68]">Step 3: Regulatory Compliance Documents</h3>
                    <p className="text-xs text-slate-500">Attach verification documents required by association security regulations.</p>
                  </div>

                  {/* Photo selector / upload */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">Passport-Size Member Photograph *</label>
                    <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50">
                      <img
                        src={photoPreview}
                        alt="Applicant Preview"
                        className="w-20 h-24 rounded-lg object-cover border-2 border-orange-500 shadow-sm"
                      />
                      <div className="space-y-1.5 text-xs">
                        <p className="font-semibold text-slate-800">Clear frontal photo with clean background.</p>
                        <p className="text-slate-500 text-[11px]">This photo will be printed directly on your Digital Membership Card.</p>
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => setPhotoPreview('/src/assets/images/hero_kenyan_boda_riders_1793478786224.jpg')}
                            className="px-2.5 py-1 text-[11px] rounded bg-white border border-slate-300 hover:bg-slate-100 font-medium"
                          >
                            Use Profile A
                          </button>
                          <button
                            type="button"
                            onClick={() => setPhotoPreview('/src/assets/images/delivery_rider_digital_1793478788227.jpg')}
                            className="px-2.5 py-1 text-[11px] rounded bg-white border border-slate-300 hover:bg-slate-100 font-medium"
                          >
                            Use Profile B
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* File Document Upload Mock Rows */}
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#101F68] flex items-center justify-center">
                          <FileCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">National ID Card (Front & Back Copy) *</p>
                          <p className="text-[11px] text-slate-500 font-mono">{idCardFile}</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                        Attached
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                          <Bike className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">NTSA Driving License (Class A Endorsed) *</p>
                          <p className="text-[11px] text-slate-500 font-mono">{drivingLicenseFile}</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                        Attached
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">Motorcycle Logbook or Hire-Purchase Agreement</p>
                          <p className="text-[11px] text-slate-500 font-mono">{logbookFile}</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                        Attached
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: DECLARATION & TERMS */}
              {step === 4 && (
                <div className="space-y-5">
                  <div className="border-b border-slate-200 pb-3">
                    <h3 className="text-base font-bold text-[#101F68]">Step 4: Membership Declaration & Lawful Consent</h3>
                    <p className="text-xs text-slate-500">Confirm your voluntary adherence to the DBDDAK Constitution and Kenyan Data Protection laws.</p>
                  </div>

                  <div className="space-y-3.5 text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={agreeConstitution}
                        onChange={e => setAgreeConstitution(e.target.checked)}
                        className="mt-0.5 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                      />
                      <span>
                        I agree to abide unconditionally by the <strong>Constitution and Bylaws</strong> of the Digital Boda Drivers and Deliveries Association of Kenya, including the Road Safety and Helmet Standards Policy and Disciplinary Code.
                      </span>
                    </label>

                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={agreeDataConsent}
                        onChange={e => setAgreeDataConsent(e.target.checked)}
                        className="mt-0.5 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                      />
                      <span>
                        Under the <strong>Kenya Data Protection Act, 2019</strong>, I consent to the lawful processing of my personal details, photograph, and contact numbers exclusively for association membership administration, verification, and welfare benefits.
                      </span>
                    </label>

                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={agreeAccuracy}
                        onChange={e => setAgreeAccuracy(e.target.checked)}
                        className="mt-0.5 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                      />
                      <span>
                        I confirm that all information and documentation provided in this registration is true and accurate. I understand that submitting false credentials constitutes grounds for immediate disqualification.
                      </span>
                    </label>
                  </div>

                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span>
                      <strong>Important Notice:</strong> Submission enters your profile into the pending verification queue. Membership approval is contingent upon verification by authorized association officers.
                    </span>
                  </div>
                </div>
              )}

              {/* Form Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep((step - 1) as 1 | 2 | 3 | 4 | 5)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                ) : <div />}

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F04416] hover:bg-[#D9380F] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
                >
                  <span>{step === 4 ? 'Submit Application' : 'Continue to Next Step'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          // STEP 5: SUCCESS ACKNOWLEDGEMENT RECEIPT
          <div className="bg-white rounded-2xl border border-emerald-200 shadow-2xl p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Application Lodged Successfully</span>
              <h2 className="text-2xl font-extrabold text-[#101F68]">
                Welcome, {fullName}!
              </h2>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Your membership application has been received and routed to the <strong>{county} County Membership Secretariat</strong> for review.
              </p>
            </div>

            {/* Application Reference Box */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 max-w-md mx-auto text-center space-y-2">
              <p className="text-xs uppercase font-bold text-slate-500 tracking-wider">Unique Application Reference</p>
              <div className="flex items-center justify-center gap-2">
                <span className="font-mono text-xl font-bold text-[#101F68]">{submittedRef}</span>
                <button
                  onClick={copyRefToClipboard}
                  className="p-1.5 rounded hover:bg-slate-200 text-slate-600"
                  title="Copy Reference"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              {copied && <p className="text-[10px] text-emerald-600 font-semibold">Copied to clipboard!</p>}
              <p className="text-[11px] text-slate-500">
                Keep this reference number safe to track your application status.
              </p>
            </div>

            {/* Next Steps Workflow */}
            <div className="max-w-md mx-auto text-left text-xs text-slate-700 bg-blue-50/60 p-4 rounded-xl border border-blue-200 space-y-2">
              <h4 className="font-bold text-[#101F68]">What happens next?</h4>
              <ol className="list-decimal pl-4 space-y-1 text-[11px] text-slate-600">
                <li>A DBDDAK Membership Review Officer will verify your National ID and driving credentials.</li>
                <li>Upon approval, your official Membership Number (e.g. <em>DBDDAK-{county.substring(0,3).toUpperCase()}-2026-XXXX</em>) will be assigned.</li>
                <li>Your Digital Membership Card will be generated with a live encrypted QR verification code.</li>
              </ol>
            </div>

            {/* Navigation links */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => onNavigate('/admin')}
                className="px-5 py-2.5 rounded-lg bg-[#101F68] hover:bg-[#0D1850] text-white text-xs font-bold transition-all"
              >
                Open Admin Portal to Review & Approve
              </button>

              <button
                onClick={() => onNavigate('/')}
                className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-medium"
              >
                Return to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
