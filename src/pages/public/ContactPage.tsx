import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageSquare } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [inquiryType, setInquiryType] = useState('General Inquiries');
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setSenderName('');
    setSenderEmail('');
    setSenderPhone('');
    setSubject('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <section className="bg-[#101F68] text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-orange-400 text-xs font-semibold uppercase tracking-wider">
            <MapPin className="w-4 h-4" />
            <span>National Secretariat & County Desks</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Contact & Public Engagement
          </h1>
          <p className="text-base sm:text-lg text-slate-200 max-w-2xl font-normal leading-relaxed">
            Reach our National Headquarters in Westlands, Nairobi or connect with your local county coordinating board.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Official Contact Information */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-2xl font-extrabold text-[#101F68]">
                National Headquarters
              </h2>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Physical secretariat and executive offices for member services, disciplinary arbitrations, and regulatory dialogues.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">Physical Office Address</h4>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">
                    Westlands Market, C41, Second Floor<br />
                    Westlands, Nairobi, Republic of Kenya
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
                <Phone className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900">Official Telephone Numbers</h4>
                  <p className="font-mono text-slate-700">+254 710 353 974 (Emergency / Toll-Free)</p>
                  <p className="font-mono text-slate-700">+254 702 423 004 (National Secretariat)</p>
                  <p className="font-mono text-slate-700">+254 723 983 222 (Finance & SACCO Desk)</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
                <Mail className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900">Official Email Addresses</h4>
                  <p className="font-mono text-slate-700">info@digitalboda.co.ke</p>
                  <p className="font-mono text-slate-700">admin@digitalboda.co.ke</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
                <Clock className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">Secretariat Operating Hours</h4>
                  <p className="text-slate-600 mt-0.5">
                    Monday – Friday: 08:00 AM – 05:00 PM<br />
                    Saturday: 09:00 AM – 01:00 PM<br />
                    <em>Emergency Roadside Desk: 24 Hours / 7 Days</em>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-10 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[#101F68]">
                Send an Official Message
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Your message will be automatically routed to the responsible association desk.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Inquiry Purpose *</label>
                  <select
                    value={inquiryType}
                    onChange={e => setInquiryType(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#101F68]"
                  >
                    <option value="General Inquiries">General Association Inquiry</option>
                    <option value="Membership Inquiries">Membership Registration & Card Status</option>
                    <option value="Partnership Inquiries">Corporate & Strategic Partnership</option>
                    <option value="Media Inquiries">Press & Media Communications</option>
                    <option value="Legal & Safety Desks">Legal Liaison & Incident Follow-Up</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={e => setSenderName(e.target.value)}
                    placeholder="e.g. John Ochieng"
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#101F68]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={senderEmail}
                    onChange={e => setSenderEmail(e.target.value)}
                    placeholder="e.g. john@example.com"
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#101F68]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Phone (Kenya) *</label>
                  <input
                    type="tel"
                    required
                    value={senderPhone}
                    onChange={e => setSenderPhone(e.target.value)}
                    placeholder="e.g. +254 712 000 000"
                    className="w-full px-3.5 py-2.5 text-xs font-mono rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#101F68]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subject Line *</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    placeholder="Brief description of inquiry..."
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#101F68]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Message Details *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Provide full details of your request or question..."
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#101F68]"
                  />
                </div>
              </div>

              {submitted && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Thank you. Your message has been dispatched to the DBDDAK Secretariat.</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#F04416] hover:bg-[#D9380F] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Official Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
