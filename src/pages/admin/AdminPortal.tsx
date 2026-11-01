import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole, Member, MembershipApplication } from '../../types';
import { KENYA_COUNTIES } from '../../data/mockDatabase';
import { DigitalCard } from '../../components/shared/DigitalCard';
import {
  Shield,
  Users,
  UserCheck,
  Clock,
  AlertTriangle,
  CreditCard,
  FileCheck,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Eye,
  Download,
  RotateCcw,
  LogOut,
  MapPin,
  Building,
  History,
  AlertCircle
} from 'lucide-react';

interface AdminPortalProps {
  onNavigate: (path: string) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onNavigate }) => {
  const {
    currentUser,
    loginAsAdmin,
    logout,
    members,
    applications,
    payments,
    auditLogs,
    approveApplication,
    rejectApplication,
    requestAdditionalDocs,
    suspendMember,
    reactivateMember,
    revokeMember,
    resetDatabase
  } = useApp();

  // Admin section navigation
  const [activeTab, setActiveTab] = useState<'overview' | 'applications' | 'members' | 'payments' | 'audit'>('overview');

  // Filter & Search states
  const [memberSearch, setMemberSearch] = useState('');
  const [countyFilter, setCountyFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modal / Selected Item
  const [viewingMember, setViewingMember] = useState<Member | null>(null);
  const [viewingApp, setViewingApp] = useState<MembershipApplication | null>(null);
  const [suspensionReasonInput, setSuspensionReasonInput] = useState('');
  const [suspendingMemberId, setSuspendingMemberId] = useState<string | null>(null);

  // Role Switcher for testing RBAC
  const rolesList: UserRole[] = [
    'Super Administrator',
    'National Chairperson',
    'National Secretary',
    'Membership Administrator',
    'Finance Officer',
    'County Coordinator',
    'Safety and Security Officer',
    'Welfare Officer'
  ];

  // If not logged in as Admin, show role picker
  if (currentUser.type !== 'admin') {
    return (
      <div className="min-h-screen bg-[#0A1445] text-white py-16 px-4 sm:px-6">
        <div className="max-w-md mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-orange-600/20 text-orange-500 border border-orange-500/30 flex items-center justify-center mx-auto">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">DBDDAK Executive Portal</h1>
            <p className="text-xs text-slate-300">
              Role-Based Access Control (RBAC) Administrative Backend
            </p>
          </div>

          <div className="bg-[#101F68] rounded-2xl border border-white/10 p-6 shadow-2xl space-y-4">
            <p className="text-xs font-bold uppercase tracking-wider text-orange-400">
              Select Executive Role to Authenticate:
            </p>

            <div className="space-y-2">
              {rolesList.map(role => (
                <button
                  key={role}
                  onClick={() => loginAsAdmin(role, role === 'County Coordinator' ? 'Nairobi' : undefined)}
                  className="w-full text-left p-3 rounded-xl border border-white/10 hover:border-orange-500 hover:bg-white/5 transition-all flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-white block">{role}</span>
                    <span className="text-[10px] text-slate-400">
                      {role === 'County Coordinator' ? 'Authorized for Nairobi County' : 'National Scope Authorization'}
                    </span>
                  </div>
                  <Shield className="w-4 h-4 text-orange-400" />
                </button>
              ))}
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => onNavigate('/')}
                className="text-xs text-slate-400 hover:text-white underline"
              >
                Return to Public Website
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate live database metrics
  const totalRegistered = members.length;
  const activeMembers = members.filter(m => m.status === 'VERIFIED / ACTIVE').length;
  const pendingApplications = applications.filter(a => a.status === 'PENDING').length;
  const suspendedMembers = members.filter(m => m.status === 'SUSPENDED').length;
  const expiredMembers = members.filter(m => m.status === 'EXPIRED').length;
  const totalCollections = payments.reduce((acc, p) => p.status === 'Successful' ? acc + p.amount : acc, 0);

  // Filter members table
  const filteredMembers = members.filter(m => {
    // If user is a County Coordinator, enforce regional scoping
    if (currentUser.role === 'County Coordinator' && currentUser.assignedCounty && m.county !== currentUser.assignedCounty) {
      return false;
    }
    if (countyFilter !== 'ALL' && m.county !== countyFilter) return false;
    if (statusFilter !== 'ALL' && m.status !== statusFilter) return false;
    if (memberSearch.trim()) {
      const q = memberSearch.toLowerCase();
      return (
        m.fullName.toLowerCase().includes(q) ||
        m.membershipNumber.toLowerCase().includes(q) ||
        m.nationalId.includes(q) ||
        m.phoneNumber.includes(q)
      );
    }
    return true;
  });

  // Export CSV
  const handleExportCSV = () => {
    const headers = 'Membership Number,Full Name,National ID,Phone,County,Sub-County,Category,Status\n';
    const rows = filteredMembers.map(m =>
      `"${m.membershipNumber}","${m.fullName}","${m.nationalId}","${m.phoneNumber}","${m.county}","${m.subCounty}","${m.category}","${m.status}"`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `DBDDAK_Member_Register_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#F4F6FA] text-slate-800">
      {/* Top Admin Bar */}
      <header className="bg-[#101F68] text-white py-3 px-4 sm:px-6 shadow-md border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/public/assets/aistudio/images__12__99a96338.jpeg"
              alt="DBDDAK Emblem"
              className="w-9 h-9 rounded-full object-cover bg-white p-0.5"
            />
            <div>
              <span className="text-sm font-bold tracking-tight text-white block">
                DBDDAK Administration Console
              </span>
              <span className="text-[10px] text-orange-400 font-mono">
                {currentUser.role} · {currentUser.adminName} {currentUser.assignedCounty && `(${currentUser.assignedCounty})`}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('/')}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-200 transition-colors"
            >
              Public Site
            </button>
            <button
              onClick={logout}
              className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-xs font-bold text-white transition-colors flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <div className="flex items-center gap-2 overflow-x-auto text-xs font-bold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-4 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'overview' ? 'bg-[#101F68] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              Executive Overview
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`py-2 px-4 rounded-lg transition-colors whitespace-nowrap relative ${
                activeTab === 'applications' ? 'bg-[#101F68] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              Applications Queue ({pendingApplications})
            </button>
            <button
              onClick={() => setActiveTab('members')}
              className={`py-2 px-4 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'members' ? 'bg-[#101F68] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              Member Directory ({totalRegistered})
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`py-2 px-4 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'payments' ? 'bg-[#101F68] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              M-Pesa Finance & Reconciliation
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={`py-2 px-4 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'audit' ? 'bg-[#101F68] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              Audit Trail ({auditLogs.length})
            </button>
          </div>

          <button
            onClick={() => {
              if (confirm('Reset database to clean initial demonstration state?')) {
                resetDatabase();
              }
            }}
            className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW & STATS */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                <span className="text-[11px] font-bold uppercase text-slate-500">Total Registered Members</span>
                <p className="text-3xl font-extrabold text-[#101F68] font-mono tabular-nums">{totalRegistered}</p>
                <p className="text-[11px] text-slate-500">Live Database Records</p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                <span className="text-[11px] font-bold uppercase text-emerald-600">Active & Verified</span>
                <p className="text-3xl font-extrabold text-emerald-700 font-mono tabular-nums">{activeMembers}</p>
                <p className="text-[11px] text-slate-500">In good association standing</p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                <span className="text-[11px] font-bold uppercase text-orange-600">Pending Review</span>
                <p className="text-3xl font-extrabold text-orange-600 font-mono tabular-nums">{pendingApplications}</p>
                <p className="text-[11px] text-slate-500">Awaiting officer verification</p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                <span className="text-[11px] font-bold uppercase text-rose-600">Suspended / Expired</span>
                <p className="text-3xl font-extrabold text-rose-700 font-mono tabular-nums">
                  {suspendedMembers + expiredMembers}
                </p>
                <p className="text-[11px] text-slate-500">Requiring compliance follow-up</p>
              </div>
            </div>

            {/* Quick Actions & Recent Applications */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-bold text-[#101F68]">Pending Applications Requiring Approval</h3>
                  <button onClick={() => setActiveTab('applications')} className="text-xs text-orange-600 font-bold hover:underline">
                    View All
                  </button>
                </div>

                <div className="space-y-3">
                  {applications.filter(a => a.status === 'PENDING').slice(0, 3).map(app => (
                    <div key={app.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-mono text-orange-600 font-bold">{app.applicationRef}</span>
                        <h4 className="font-bold text-slate-900">{app.fullName}</h4>
                        <p className="text-slate-500 text-[11px]">{app.county} · {app.subCounty} · {app.category}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            approveApplication(app.id);
                            alert(`Approved: ${app.fullName} is now an active member!`);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                        >
                          Approve
                        </button>
                      </div>
                    </div>
                  ))}
                  {applications.filter(a => a.status === 'PENDING').length === 0 && (
                    <p className="text-xs text-slate-400 py-4 text-center">
                      No pending applications at this time.
                    </p>
                  )}
                </div>
              </div>

              {/* County Distribution */}
              <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
                <h3 className="text-sm font-bold text-[#101F68] border-b border-slate-100 pb-3">
                  Active Regional Distribution
                </h3>
                <div className="space-y-2 text-xs">
                  {['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Kiambu'].map(c => {
                    const count = members.filter(m => m.county === c).length;
                    return (
                      <div key={c} className="flex items-center justify-between py-1.5 border-b border-slate-50">
                        <span className="font-medium text-slate-700">{c} County</span>
                        <span className="font-mono font-bold text-[#101F68] bg-slate-100 px-2 py-0.5 rounded">
                          {count} members
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: APPLICATIONS REVIEW QUEUE */}
        {activeTab === 'applications' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div>
              <h3 className="text-base font-bold text-[#101F68]">Membership Applications Review Queue</h3>
              <p className="text-xs text-slate-500">
                Review applicant credentials, verify NTSA driving license numbers, and approve or reject submissions.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[10px] font-bold">
                  <tr>
                    <th className="py-2.5 px-3">Ref</th>
                    <th className="py-2.5 px-3">Applicant Name</th>
                    <th className="py-2.5 px-3">National ID</th>
                    <th className="py-2.5 px-3">County / Stage</th>
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3 text-center">Status</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {applications.map(app => (
                    <tr key={app.id} className="hover:bg-slate-50">
                      <td className="py-3 px-3 font-mono font-bold text-orange-600">{app.applicationRef}</td>
                      <td className="py-3 px-3 font-bold text-slate-900">{app.fullName}</td>
                      <td className="py-3 px-3 font-mono text-slate-600">{app.nationalId}</td>
                      <td className="py-3 px-3 text-slate-700">{app.county} · {app.subCounty}</td>
                      <td className="py-3 px-3 text-slate-700">{app.category}</td>
                      <td className="py-3 px-3 text-center">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          app.status === 'APPROVED'
                            ? 'bg-emerald-50 text-emerald-700'
                            : app.status === 'REJECTED'
                            ? 'bg-rose-50 text-rose-700'
                            : app.status === 'ADDITIONAL_DOCS_REQUESTED'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-blue-50 text-blue-700'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        {app.status === 'PENDING' || app.status === 'ADDITIONAL_DOCS_REQUESTED' ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                const approved = approveApplication(app.id);
                                if (approved) {
                                  alert(`Application Approved!\nAssigned ID: ${approved.membershipNumber}`);
                                }
                              }}
                              className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px]"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => {
                                const reason = prompt('State rejection grounds:');
                                if (reason) rejectApplication(app.id, reason);
                              }}
                              className="px-2.5 py-1 rounded bg-rose-600 hover:bg-rose-700 text-white font-bold text-[11px]"
                            >
                              Reject
                            </button>
                            <button
                              onClick={() => {
                                const notes = prompt('Specify additional documents required:');
                                if (notes) requestAdditionalDocs(app.id, notes);
                              }}
                              className="px-2 py-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-700 text-[11px]"
                            >
                              Req Docs
                            </button>
                          </div>
                        ) : (
                          <span className="text-[11px] text-slate-400 font-mono">
                            {app.assignedMembershipNumber || 'Reviewed'}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: MEMBER DIRECTORY & STATUS MANAGEMENT */}
        {activeTab === 'members' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-[#101F68]">Official National Member Register</h3>
                <p className="text-xs text-slate-500">Manage member privileges, suspend violations, and export official lists.</p>
              </div>

              <button
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#101F68] text-white hover:bg-[#0D1850] text-xs font-bold transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Member Register (CSV)</span>
              </button>
            </div>

            {/* Filter Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="relative">
                <input
                  type="text"
                  value={memberSearch}
                  onChange={e => setMemberSearch(e.target.value)}
                  placeholder="Search name, ID, member #..."
                  className="w-full px-3.5 py-2 pl-9 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#101F68]"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>

              <div>
                <select
                  value={countyFilter}
                  onChange={e => setCountyFilter(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#101F68]"
                >
                  <option value="ALL">All Counties ({totalRegistered})</option>
                  {KENYA_COUNTIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#101F68]"
                >
                  <option value="ALL">All Membership Statuses</option>
                  <option value="VERIFIED / ACTIVE">VERIFIED / ACTIVE</option>
                  <option value="SUSPENDED">SUSPENDED</option>
                  <option value="EXPIRED">EXPIRED</option>
                  <option value="REVOKED">REVOKED</option>
                </select>
              </div>
            </div>

            {/* Members Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[10px] font-bold">
                  <tr>
                    <th className="py-2.5 px-3">Membership Number</th>
                    <th className="py-2.5 px-3">Full Legal Name</th>
                    <th className="py-2.5 px-3">National ID</th>
                    <th className="py-2.5 px-3">County / Base</th>
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3 text-center">Status</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredMembers.map(m => (
                    <tr key={m.id} className="hover:bg-slate-50">
                      <td className="py-3 px-3 font-mono font-bold text-orange-600">{m.membershipNumber}</td>
                      <td className="py-3 px-3 font-bold text-slate-900">{m.fullName}</td>
                      <td className="py-3 px-3 font-mono text-slate-600">{m.nationalId}</td>
                      <td className="py-3 px-3 text-slate-700">{m.county} · {m.subCounty}</td>
                      <td className="py-3 px-3 text-slate-700">{m.category}</td>
                      <td className="py-3 px-3 text-center">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          m.status === 'VERIFIED / ACTIVE'
                            ? 'bg-emerald-50 text-emerald-700'
                            : m.status === 'SUSPENDED'
                            ? 'bg-rose-50 text-rose-700'
                            : m.status === 'EXPIRED'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {m.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setViewingMember(m)}
                            className="p-1.5 rounded hover:bg-slate-200 text-slate-600"
                            title="View Digital Card"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {m.status === 'VERIFIED / ACTIVE' ? (
                            <button
                              onClick={() => {
                                const reason = prompt(`Reason for suspending ${m.fullName}:`);
                                if (reason) suspendMember(m.id, reason);
                              }}
                              className="px-2 py-1 rounded bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold text-[10.5px]"
                            >
                              Suspend
                            </button>
                          ) : (
                            <button
                              onClick={() => reactivateMember(m.id)}
                              className="px-2 py-1 rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-[10.5px]"
                            >
                              Reactivate
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredMembers.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400">
                        No members matching current filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: M-PESA PAYMENTS */}
        {activeTab === 'payments' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-base font-bold text-[#101F68]">Financial Administration & M-Pesa Daraja Log</h3>
                <p className="text-xs text-slate-500">Total verified collections: KSh {totalCollections.toLocaleString()}</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[10px] font-bold">
                  <tr>
                    <th className="py-2.5 px-3">M-Pesa Reference</th>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Payer Name & Phone</th>
                    <th className="py-2.5 px-3">Purpose</th>
                    <th className="py-2.5 px-3 text-right">Amount (KSh)</th>
                    <th className="py-2.5 px-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {payments.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="py-3 px-3 font-mono font-bold text-slate-800">{p.transactionReference}</td>
                      <td className="py-3 px-3 font-mono text-slate-600">{p.createdAt.split('T')[0]}</td>
                      <td className="py-3 px-3">
                        <span className="font-bold text-slate-900 block">{p.payerName}</span>
                        <span className="font-mono text-[10px] text-slate-500">{p.phoneNumber}</span>
                      </td>
                      <td className="py-3 px-3 text-slate-700">{p.purpose}</td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-[#101F68]">
                        KSh {p.amount.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: AUDIT LOGS */}
        {activeTab === 'audit' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div>
              <h3 className="text-base font-bold text-[#101F68]">Cryptographic System Audit Trail</h3>
              <p className="text-xs text-slate-500">Immutable record of all verification inquiries, application reviews, and member status transitions.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[10px] font-bold">
                  <tr>
                    <th className="py-2.5 px-3">Timestamp</th>
                    <th className="py-2.5 px-3">Actor & Role</th>
                    <th className="py-2.5 px-3">Action</th>
                    <th className="py-2.5 px-3">Target ID</th>
                    <th className="py-2.5 px-3">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {auditLogs.map(log => (
                    <tr key={log.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-mono text-[11px] text-slate-600">
                        {new Date(log.timestamp).toLocaleString('en-KE')}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="font-bold text-slate-800 block">{log.actorName}</span>
                        <span className="text-[10px] text-slate-500">{log.actorRole}</span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="font-mono text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded text-[#101F68]">
                          {log.action}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-orange-600 font-bold">{log.target}</td>
                      <td className="py-2.5 px-3 text-slate-600 text-[11px] max-w-xs truncate">{log.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Viewing Digital Card Modal */}
      {viewingMember && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-sm font-bold text-[#101F68]">Digital Card: {viewingMember.fullName}</h3>
              <button onClick={() => setViewingMember(null)} className="text-slate-400 hover:text-slate-700">
                ✕
              </button>
            </div>
            <DigitalCard member={viewingMember} />
            <div className="pt-2 text-center">
              <button
                onClick={() => setViewingMember(null)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
