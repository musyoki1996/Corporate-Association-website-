import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DigitalCard } from '../../components/shared/DigitalCard';
import {
  User,
  ShieldCheck,
  CreditCard,
  LifeBuoy,
  Bell,
  Calendar,
  FileText,
  LogOut,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowRight,
  Send,
  Download,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

interface MemberPortalProps {
  onNavigate: (path: string) => void;
}

export const MemberPortal: React.FC<MemberPortalProps> = ({ onNavigate }) => {
  const {
    currentUser,
    loginAsMember,
    logout,
    payments,
    tickets,
    events,
    news,
    policies,
    submitTicket,
    submitPayment
  } = useApp();

  // Login form state
  const [loginInput, setLoginInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Portal tabs
  const [activeTab, setActiveTab] = useState<'card' | 'payments' | 'tickets' | 'events' | 'documents'>('card');

  // Ticket creation state
  const [ticketCategory, setTicketCategory] = useState<any>('Safety Incidents');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDesc, setTicketDesc] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  // M-Pesa renewal state
  const [payingRenewal, setPayingRenewal] = useState(false);
  const [mpesaPhone, setMpesaPhone] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const member = currentUser.memberData;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = loginAsMember(loginInput);
    if (!success) {
      setLoginError('No matching member found. Please verify your National ID or Membership Number.');
    }
  };

  const handleQuickLogin = (query: string) => {
    setLoginInput(query);
    setLoginError('');
    loginAsMember(query);
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!member) return;
    submitTicket({
      memberId: member.id,
      memberName: member.fullName,
      category: ticketCategory,
      subject: ticketSubject,
      description: ticketDesc,
      priority: ticketCategory === 'Safety Incidents' ? 'High' : 'Medium'
    });
    setTicketSubmitted(true);
    setTicketSubject('');
    setTicketDesc('');
    setTimeout(() => setTicketSubmitted(false), 4000);
  };

  const handleSimulateMpesaPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!member) return;
    submitPayment({
      memberId: member.id,
      membershipNumber: member.membershipNumber,
      payerName: member.fullName,
      phoneNumber: mpesaPhone || member.phoneNumber,
      amount: member.renewalDueAmount > 0 ? member.renewalDueAmount : 1500,
      purpose: 'Annual Renewal',
      channel: 'M-PESA Daraja'
    });
    setPaymentSuccess(true);
    setTimeout(() => {
      setPaymentSuccess(false);
      setPayingRenewal(false);
    }, 3000);
  };

  // If NOT logged in, show Login Screen with 1-click Demo selectors
  if (!member) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6">
        <div className="max-w-md mx-auto space-y-6">
          <div className="text-center space-y-2">
            <img
              src="/public/assets/aistudio/images__12__99a96338.jpeg"
              alt="DBDDAK Logo"
              className="w-16 h-16 rounded-full mx-auto shadow-md border border-slate-200 bg-white p-0.5"
            />
            <h1 className="text-2xl font-bold text-[#101F68]">DBDDAK Member Portal</h1>
            <p className="text-xs text-slate-600">
              Enter your Kenyan National ID Number or Membership Number to access your account.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-5">
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  National ID or Membership ID
                </label>
                <input
                  type="text"
                  value={loginInput}
                  onChange={e => setLoginInput(e.target.value)}
                  placeholder="e.g. 28914523 or DBDDAK-NRB-2026-0842"
                  className="w-full px-4 py-3 text-sm font-medium font-mono rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#101F68]"
                  required
                />
              </div>

              {loginError && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-[#101F68] hover:bg-[#0D1850] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
              >
                Sign In to Member Portal
              </button>
            </form>

            <div className="border-t border-slate-200 pt-4 space-y-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 text-center">
                Instant 1-Click Demo Accounts:
              </p>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => handleQuickLogin('28914523')}
                  className="w-full text-left p-2.5 rounded-lg border border-slate-200 hover:border-orange-400 hover:bg-orange-50/50 transition-all text-xs flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-[#101F68] block">Kennedy Mwangi (Active Rider)</span>
                    <span className="text-[10px] text-slate-500 font-mono">ID: 28914523 · Westlands Nairobi</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Active</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLogin('31456789')}
                  className="w-full text-left p-2.5 rounded-lg border border-slate-200 hover:border-orange-400 hover:bg-orange-50/50 transition-all text-xs flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-[#101F68] block">Faith Chebet (Delivery Courier)</span>
                    <span className="text-[10px] text-slate-500 font-mono">ID: 31456789 · Nairobi CBD</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Active</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLogin('DBDDAK-MSA-2025-0318')}
                  className="w-full text-left p-2.5 rounded-lg border border-slate-200 hover:border-orange-400 hover:bg-orange-50/50 transition-all text-xs flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-[#101F68] block">Omar Bakari (Suspended Account)</span>
                    <span className="text-[10px] text-slate-500 font-mono">Member: DBDDAK-MSA-2025-0318</span>
                  </div>
                  <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">Suspended</span>
                </button>
              </div>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => onNavigate('/membership/register')}
                className="text-xs font-semibold text-orange-600 hover:underline"
              >
                Not a member yet? Register online here
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // LOGGED-IN MEMBER DASHBOARD
  const memberPayments = payments.filter(p => p.memberId === member.id || p.membershipNumber === member.membershipNumber);
  const memberTickets = tickets.filter(t => t.memberId === member.id);

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Member Header Strip */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center md:text-left">
            <img
              src={member.photoUrl}
              alt={member.fullName}
              className="w-16 h-16 rounded-xl object-cover border-2 border-[#101F68] shadow-sm bg-slate-100"
            />
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <h1 className="text-xl font-bold text-[#101F68]">{member.fullName}</h1>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                  member.status === 'VERIFIED / ACTIVE'
                    ? 'bg-emerald-100 text-emerald-800'
                    : member.status === 'SUSPENDED'
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {member.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                ID: {member.membershipNumber} · {member.county} County ({member.subCounty})
              </p>
              <p className="text-xs text-slate-600 mt-1">
                Base: <strong>{member.operatingBase}</strong> {member.motorcycleRegNo && `· Bike: ${member.motorcycleRegNo}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate(`/verify-member?number=${encodeURIComponent(member.membershipNumber)}`)}
              className="px-3 py-2 rounded-lg bg-orange-50 text-orange-700 hover:bg-orange-100 text-xs font-bold flex items-center gap-1.5 transition-colors border border-orange-200"
            >
              <ShieldCheck className="w-4 h-4 text-orange-600" />
              <span>Verify Live Link</span>
            </button>

            <button
              onClick={logout}
              className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Warning if suspended or expired */}
        {member.status === 'SUSPENDED' && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm">Action Required: Your Membership is Currently Suspended</p>
              <p className="mt-1">{member.suspensionReason || 'Subject to formal disciplinary inquiry.'}</p>
              <p className="mt-2 font-medium">Please submit a support ticket below or contact the Secretariat at +254 710 353 974.</p>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('card')}
            className={`py-2 px-4 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'card' ? 'bg-[#101F68] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Digital Membership Card
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`py-2 px-4 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'payments' ? 'bg-[#101F68] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            M-Pesa Payments & Renewal
          </button>
          <button
            onClick={() => setActiveTab('tickets')}
            className={`py-2 px-4 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'tickets' ? 'bg-[#101F68] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Support Tickets & Safety ({memberTickets.length})
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`py-2 px-4 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'events' ? 'bg-[#101F68] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Upcoming Workshops & Events
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`py-2 px-4 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'documents' ? 'bg-[#101F68] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Association Constitution & Policies
          </button>
        </div>

        {/* TAB 1: DIGITAL CARD */}
        {activeTab === 'card' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col items-center">
              <h3 className="text-base font-bold text-[#101F68] mb-4">
                Official Digital Membership ID
              </h3>
              <DigitalCard member={member} />
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#101F68]">
                  Membership Validity & Status
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Issued On:</span>
                    <span className="font-mono font-medium">{member.issueDate}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Renewal Due Date:</span>
                    <span className="font-mono font-medium">{member.expiryDate}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Platform Affiliations:</span>
                    <span className="font-medium text-slate-800">{member.platformAffiliation.join(', ')}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Emergency Kin:</span>
                    <span className="font-medium text-slate-800">{member.nextOfKin.name} ({member.nextOfKin.phoneNumber})</span>
                  </div>
                </div>
              </div>

              {/* Welfare Benevolent Cover */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#101F68] uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>DBDDAK Group Boda Care Coverage</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  As an active member, you are enrolled under the DBDDAK emergency roadside assistance and benevolent fund. In case of road crash hospitalization, call <strong>+254 710 353 974</strong> for 4-hour settlement.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PAYMENTS & M-PESA */}
        {activeTab === 'payments' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <h3 className="text-base font-bold text-[#101F68]">Financial Records & M-Pesa Checkoff</h3>
                  <p className="text-xs text-slate-500">Review your past registration receipts and submit annual renewal fees.</p>
                </div>

                <button
                  onClick={() => setPayingRenewal(!payingRenewal)}
                  className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-all shadow"
                >
                  {payingRenewal ? 'Hide Payment Form' : 'Pay via M-PESA STK Push'}
                </button>
              </div>

              {/* M-PESA Simulation Form */}
              {payingRenewal && (
                <div className="my-6 p-6 rounded-2xl bg-slate-50 border border-orange-200 max-w-lg mx-auto space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-700">
                    <CreditCard className="w-4 h-4" />
                    <span>M-Pesa Daraja STK Push Simulator</span>
                  </div>

                  <form onSubmit={handleSimulateMpesaPayment} className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">M-Pesa Mobile Number</label>
                      <input
                        type="tel"
                        required
                        value={mpesaPhone || member.phoneNumber}
                        onChange={e => setMpesaPhone(e.target.value)}
                        placeholder="e.g. 0712345678"
                        className="w-full px-3.5 py-2.5 text-sm font-mono rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#101F68]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Amount Payable (KSh)</label>
                      <input
                        type="number"
                        disabled
                        value={member.renewalDueAmount > 0 ? member.renewalDueAmount : 1500}
                        className="w-full px-3.5 py-2.5 text-sm font-mono bg-slate-200 rounded-lg border border-slate-300"
                      />
                      <p className="text-[11px] text-slate-500 mt-0.5">Annual Membership Renewal Fee</p>
                    </div>

                    {paymentSuccess && (
                      <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span>M-Pesa Daraja callback received! Payment reconciled successfully.</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow"
                    >
                      Trigger M-Pesa STK Prompt
                    </button>
                  </form>
                </div>
              )}

              {/* Transactions Table */}
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[10px] font-bold">
                    <tr>
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-3">Receipt / Ref</th>
                      <th className="py-2.5 px-3">Channel</th>
                      <th className="py-2.5 px-3">Purpose</th>
                      <th className="py-2.5 px-3 text-right">Amount (KSh)</th>
                      <th className="py-2.5 px-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {memberPayments.map(pay => (
                      <tr key={pay.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-mono text-slate-600">{pay.createdAt.split('T')[0]}</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-slate-800">{pay.transactionReference}</td>
                        <td className="py-2.5 px-3 text-slate-600">{pay.channel}</td>
                        <td className="py-2.5 px-3 font-medium text-slate-800">{pay.purpose}</td>
                        <td className="py-2.5 px-3 text-right font-mono font-bold text-[#101F68]">KSh {pay.amount.toLocaleString()}</td>
                        <td className="py-2.5 px-3 text-center">
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                            {pay.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {memberPayments.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-6 text-center text-slate-400">
                          No payment records found for this account.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SUPPORT TICKETS & SAFETY */}
        {activeTab === 'tickets' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Create Ticket Form */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-[#101F68]">Lodge a Member Support Request</h3>
              <p className="text-xs text-slate-500">Report safety incidents, arbitrary arrests, county impoundments, or welfare requests.</p>

              <form onSubmit={handleCreateTicket} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={ticketCategory}
                    onChange={e => setTicketCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#101F68]"
                  >
                    <option value="Safety Incidents">Safety Incidents / Road Crash</option>
                    <option value="Harassment / Impoundment">Harassment / Council Impoundment</option>
                    <option value="Welfare Requests">Welfare & Hospitalization Grant</option>
                    <option value="Payment Disputes">Payment & Renewal Inquiries</option>
                    <option value="Technical Support">Technical & Digital ID Support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={ticketSubject}
                    onChange={e => setTicketSubject(e.target.value)}
                    placeholder="Brief description of incident..."
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#101F68]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Description</label>
                  <textarea
                    rows={4}
                    required
                    value={ticketDesc}
                    onChange={e => setTicketDesc(e.target.value)}
                    placeholder="Provide details including exact location, time, and assistance required..."
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#101F68]"
                  />
                </div>

                {ticketSubmitted && (
                  <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    Ticket logged! An association officer will follow up shortly.
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#F04416] hover:bg-[#D9380F] text-white text-xs font-bold uppercase tracking-wider transition-all shadow"
                >
                  Submit Ticket
                </button>
              </form>
            </div>

            {/* Past Tickets List */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-[#101F68]">Your Ticket History</h3>
              <div className="space-y-3">
                {memberTickets.map(t => (
                  <div key={t.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-orange-600">{t.ticketNumber}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        t.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {t.status}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900">{t.subject}</h4>
                    <p className="text-slate-600 text-[11px] leading-relaxed">{t.description}</p>
                    {t.resolutionNotes && (
                      <div className="p-2.5 rounded bg-white border border-slate-200 text-[11px] text-slate-700 mt-2">
                        <strong>Resolution Notes:</strong> {t.resolutionNotes}
                      </div>
                    )}
                  </div>
                ))}
                {memberTickets.length === 0 && (
                  <p className="text-xs text-slate-400 py-4 text-center">
                    No support tickets submitted yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: EVENTS */}
        {activeTab === 'events' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-[#101F68]">Upcoming Member Seminars & Clinics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {events.map(evt => (
                <div key={evt.id} className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-orange-700 bg-orange-100 px-2 py-0.5 rounded">
                      {evt.eventType}
                    </span>
                    <span className="font-mono text-slate-500">{evt.date}</span>
                  </div>
                  <h4 className="font-bold text-sm text-[#101F68]">{evt.title}</h4>
                  <p className="text-slate-600 text-[11px] leading-relaxed">{evt.description}</p>
                  <p className="text-[11px] text-slate-500 font-medium">
                    <strong>Venue:</strong> {evt.location} ({evt.county})
                  </p>
                  <button
                    onClick={() => alert(`Confirmed: You are registered for ${evt.title}. An SMS confirmation has been simulated to ${member.phoneNumber}.`)}
                    className="w-full py-2 rounded-lg bg-[#101F68] hover:bg-[#0D1850] text-white font-bold text-xs transition-colors"
                  >
                    Confirm Attendance
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: DOCUMENTS & POLICIES */}
        {activeTab === 'documents' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-[#101F68]">DBDDAK Official Policy Library</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {policies.map(pol => (
                <div key={pol.id} className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[10px] font-bold text-orange-600">{pol.code}</span>
                    <h5 className="font-bold text-slate-800">{pol.title}</h5>
                    <p className="text-[10px] text-slate-500">Version {pol.version} · Effective: {pol.effectiveDate}</p>
                  </div>
                  <button
                    onClick={() => alert(`Downloading official document: ${pol.title} (PDF ${pol.fileSize})`)}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                    title="Download Policy Document"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
