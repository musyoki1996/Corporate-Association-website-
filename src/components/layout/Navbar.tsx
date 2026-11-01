import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, User, Menu, X, ArrowRight, UserCheck, Shield } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const { currentUser, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Organization', path: '/organization' },
    { label: 'Services', path: '/services' },
    { label: 'Membership', path: '/membership' },
    { label: 'Verification', path: '/verify-member' },
    { label: 'News & Alerts', path: '/news' },
    { label: 'Projects', path: '/projects' },
    { label: 'Policies', path: '/policies' },
    { label: 'Contact', path: '/contact' }
  ];

  const handleNav = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#101F68] text-white shadow-md border-b border-white/10">
      {/* Top emergency & trust ticker strip */}
      <div className="bg-[#0A1445] text-slate-300 text-[11px] py-1 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-orange-400 uppercase tracking-wider text-[10px]">
              Official National Headquarters
            </span>
            <span className="hidden sm:inline text-slate-400">·</span>
            <span className="hidden sm:inline text-slate-300">
              Westlands Market, C41, 2nd Floor, Nairobi
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-slate-200 hidden md:inline">
              Emergency: <strong className="text-orange-400">+254 710 353 974</strong>
            </span>
            <button
              onClick={() => handleNav('/verify-member')}
              className="text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
              <span>Verify Member</span>
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => handleNav('/admin')}
              className="text-slate-300 hover:text-white flex items-center gap-1 transition-colors text-[10.5px]"
            >
              <Shield className="w-3 h-3 text-slate-400" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Bar: 1-line brand mark, nav links, primary actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-6">
          {/* Brand mark */}
          <button
            onClick={() => handleNav('/')}
            className="flex items-center gap-3 text-left focus:outline-none group shrink-0"
          >
            <img
              src="/public/assets/aistudio/images__12__99a96338.jpeg"
              alt="DBDDAK Emblem"
              className="w-11 h-11 rounded-full object-cover shadow-sm bg-white p-0.5 border border-white/20 group-hover:scale-105 transition-transform"
            />
            <div className="leading-tight">
              <span className="text-base sm:text-lg font-bold tracking-tight text-white block">
                DBDDAK
              </span>
              <span className="text-[10px] text-orange-400 font-medium block uppercase tracking-wider">
                Digital Boda Kenya
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-5 text-[13px] font-medium text-slate-200">
            {navLinks.slice(0, 7).map(item => {
              const active = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNav(item.path)}
                  className={`hover:text-white transition-colors whitespace-nowrap ${
                    active ? 'text-orange-400 font-bold border-b-2 border-orange-400 pb-0.5' : ''
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            
            {/* More dropdown / remaining items */}
            <div className="relative group">
              <span className="cursor-pointer hover:text-white flex items-center gap-1 text-[13px]">
                More
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
              <div className="absolute right-0 top-full mt-2 w-48 bg-[#0D1850] rounded-xl shadow-xl border border-white/10 py-2 hidden group-hover:block text-xs z-50">
                {navLinks.slice(7).map(item => (
                  <button
                    key={item.path}
                    onClick={() => handleNav(item.path)}
                    className="block w-full text-left px-4 py-2 hover:bg-white/10 text-slate-200 hover:text-white"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="border-t border-white/10 my-1" />
                <button
                  onClick={() => handleNav('/partnerships')}
                  className="block w-full text-left px-4 py-2 hover:bg-white/10 text-orange-400 font-medium"
                >
                  Strategic Partnerships
                </button>
              </div>
            </div>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {currentUser.type === 'member' ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNav('/member-portal')}
                  className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20"
                >
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  <span>Portal: {currentUser.memberData?.fullName.split(' ')[0]}</span>
                </button>
                <button
                  onClick={logout}
                  className="text-xs text-slate-300 hover:text-white underline"
                >
                  Logout
                </button>
              </div>
            ) : currentUser.type === 'admin' ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNav('/admin')}
                  className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-orange-600 hover:bg-orange-700 text-white transition-colors"
                >
                  <Shield className="w-4 h-4" />
                  <span>Admin ({currentUser.role?.split(' ')[0]})</span>
                </button>
                <button
                  onClick={logout}
                  className="text-xs text-slate-300 hover:text-white underline"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNav('/member-portal')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Member Login</span>
                </button>

                <button
                  onClick={() => handleNav('/membership/register')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-[#F04416] hover:bg-[#D9380F] text-white shadow-md hover:shadow-lg transition-all"
                >
                  <span>Become a Member</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => handleNav('/verify-member')}
              className="p-1.5 text-orange-400 rounded-lg hover:bg-white/10"
              title="Verify Member"
            >
              <ShieldCheck className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-200 hover:text-white rounded-lg hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0D1850] border-t border-white/10 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            {navLinks.map(item => (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className={`text-left py-2 px-3 rounded-lg transition-colors ${
                  currentPath === item.path ? 'bg-orange-600 text-white font-bold' : 'text-slate-200 hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => handleNav('/membership/register')}
              className="w-full py-2.5 px-4 text-center text-sm font-bold rounded-lg bg-[#F04416] text-white hover:bg-[#D9380F]"
            >
              Become a Registered Member
            </button>

            <button
              onClick={() => handleNav('/member-portal')}
              className="w-full py-2 px-4 text-center text-sm font-medium rounded-lg bg-white/10 text-white hover:bg-white/20"
            >
              Member Portal Login
            </button>

            <button
              onClick={() => handleNav('/admin')}
              className="w-full py-2 px-4 text-center text-xs font-medium rounded-lg text-slate-300 hover:text-white"
            >
              Administrative Dashboard Access
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
