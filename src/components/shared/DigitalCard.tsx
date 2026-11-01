import React, { useState } from 'react';
import { Member } from '../../types';
import { QrCodeGenerator } from './QrCodeGenerator';
import { ShieldCheck, AlertTriangle, AlertCircle, Printer, Download, RotateCw } from 'lucide-react';

interface DigitalCardProps {
  member: Member;
  compact?: boolean;
}

export const DigitalCard: React.FC<DigitalCardProps> = ({ member, compact = false }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Status visual configurations
  const getStatusDisplay = () => {
    switch (member.status) {
      case 'VERIFIED / ACTIVE':
        return {
          bg: 'bg-emerald-600',
          badgeText: 'VERIFIED ACTIVE',
          icon: <ShieldCheck className="w-3.5 h-3.5 inline mr-1" />
        };
      case 'SUSPENDED':
        return {
          bg: 'bg-rose-600',
          badgeText: 'SUSPENDED',
          icon: <AlertTriangle className="w-3.5 h-3.5 inline mr-1" />
        };
      case 'EXPIRED':
        return {
          bg: 'bg-amber-600',
          badgeText: 'EXPIRED',
          icon: <AlertCircle className="w-3.5 h-3.5 inline mr-1" />
        };
      default:
        return {
          bg: 'bg-slate-600',
          badgeText: member.status,
          icon: null
        };
    }
  };

  const statusConfig = getStatusDisplay();
  const verificationUrl = `${window.location.origin}/verify-member?number=${encodeURIComponent(member.membershipNumber)}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col items-center">
      <div
        id="printable-membership-card"
        className="w-full max-w-[430px] select-none perspective"
      >
        {!isFlipped ? (
          // FRONT OF CARD
          <div className="relative w-full aspect-[1.586] rounded-2xl overflow-hidden shadow-2xl border border-slate-700/30 bg-gradient-to-br from-[#101F68] via-[#0D1850] to-[#0A123C] text-white p-5 flex flex-col justify-between">
            {/* Background watermark graphic */}
            <div className="absolute -right-10 -bottom-10 w-52 h-52 rounded-full border-[18px] border-white/5 pointer-events-none" />
            <div className="absolute -left-12 -top-12 w-44 h-44 rounded-full border-[12px] border-orange-500/10 pointer-events-none" />

            {/* Header: Logo, Name of Association, Card Type */}
            <div className="flex items-center justify-between gap-3 relative z-10 border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2.5">
                <img
                  src="/public/assets/aistudio/images__12__99a96338.jpeg"
                  alt="DBDDAK Official Logo"
                  className="w-12 h-12 rounded-full object-cover shadow-md bg-white p-0.5 border border-white/20"
                />
                <div>
                  <h3 className="text-[12px] font-bold tracking-tight uppercase leading-tight text-white">
                    Digital Boda Drivers & Deliveries
                  </h3>
                  <p className="text-[10px] text-orange-400 font-semibold tracking-wider uppercase">
                    Association of Kenya (DBDDAK)
                  </p>
                  <p className="text-[8.5px] italic text-slate-300">
                    &ldquo;Safety and Sanity&rdquo;
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase text-white shadow-sm ${statusConfig.bg}`}>
                  {statusConfig.icon}
                  {statusConfig.badgeText}
                </span>
                <p className="text-[8px] text-slate-400 mt-1 uppercase tracking-wider font-mono">
                  Official Member ID
                </p>
              </div>
            </div>

            {/* Body: Photo, Member Info, QR Code */}
            <div className="flex items-center gap-4 my-2 relative z-10">
              {/* Member Photo */}
              <div className="relative shrink-0">
                <img
                  src={member.photoUrl}
                  alt={member.fullName}
                  className="w-20 h-24 rounded-lg object-cover border-2 border-orange-500 shadow-lg bg-slate-800"
                />
                <div className="absolute -bottom-1 -right-1 bg-[#101F68] text-white text-[7px] font-bold px-1 rounded border border-white/20">
                  {member.bloodGroup ? `BLOOD ${member.bloodGroup}` : 'KENYA'}
                </div>
              </div>

              {/* Data fields */}
              <div className="flex-1 min-w-0 space-y-1">
                <div>
                  <p className="text-[8.5px] text-slate-400 uppercase tracking-wider font-medium">Full Legal Name</p>
                  <h4 className="text-[13px] font-bold text-white tracking-tight leading-tight truncate">
                    {member.fullName}
                  </h4>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div>
                    <p className="text-[8px] text-slate-400 uppercase font-medium">Member ID</p>
                    <p className="font-mono font-bold text-orange-400 text-[10.5px]">
                      {member.membershipNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-[8px] text-slate-400 uppercase font-medium">Category</p>
                    <p className="font-medium text-white truncate text-[9.5px]">
                      {member.category}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[9px]">
                  <div>
                    <p className="text-[8px] text-slate-400 uppercase font-medium">County / Sub-County</p>
                    <p className="font-medium text-slate-200 truncate">
                      {member.county} · {member.subCounty}
                    </p>
                  </div>
                  {member.motorcycleRegNo && (
                    <div>
                      <p className="text-[8px] text-slate-400 uppercase font-medium">Reg / Plate No.</p>
                      <p className="font-mono font-semibold text-white">
                        {member.motorcycleRegNo}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* QR Code */}
              <div className="shrink-0 flex flex-col items-center">
                <QrCodeGenerator value={verificationUrl} size={64} className="shadow-md" />
                <span className="text-[7px] text-slate-400 mt-1 font-mono tracking-tighter">
                  SCAN TO VERIFY
                </span>
              </div>
            </div>

            {/* Footer strip: Issue Date, Expiry Date & Token */}
            <div className="flex items-center justify-between border-t border-white/10 pt-1.5 text-[8.5px] text-slate-300 relative z-10 font-mono">
              <div>
                <span>ISSUED: </span>
                <span className="font-semibold text-white">{member.issueDate}</span>
              </div>
              <div>
                <span>EXPIRY: </span>
                <span className="font-semibold text-white">{member.expiryDate}</span>
              </div>
              <div className="text-[7.5px] text-slate-400 truncate max-w-[120px]">
                SEC-ID: {member.qrVerificationToken.substring(0, 10)}...
              </div>
            </div>
          </div>
        ) : (
          // BACK OF CARD
          <div className="relative w-full aspect-[1.586] rounded-2xl overflow-hidden shadow-2xl border border-slate-700/30 bg-gradient-to-br from-[#0D1850] via-[#101F68] to-[#0A123C] text-white p-5 flex flex-col justify-between">
            {/* Top Bar on Back */}
            <div className="border-b border-white/10 pb-2">
              <h4 className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">
                Association Code & Emergency Terms
              </h4>
              <p className="text-[9px] text-slate-300">
                Property of the Digital Boda Drivers and Deliveries Association of Kenya (DBDDAK).
              </p>
            </div>

            {/* Instructions & Emergency Hotline */}
            <div className="space-y-2 text-[9px] text-slate-200">
              <p className="leading-relaxed">
                1. This card is valid only when verified in the live association database at <span className="font-mono text-orange-400">digitalboda.co.ke/verify-member</span>.
              </p>
              <p className="leading-relaxed">
                2. If found, please return to any Police Station, NTSA Office, or DBDDAK National Headquarters at Westlands Market, C41, 2nd Floor, Nairobi.
              </p>
              
              <div className="bg-white/5 border border-white/10 rounded-lg p-2 mt-2">
                <div className="grid grid-cols-2 gap-2 text-[9.5px]">
                  <div>
                    <span className="text-slate-400 block text-[8px] uppercase">Emergency Response:</span>
                    <span className="font-bold font-mono text-orange-400">+254 710 353 974</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[8px] uppercase">Official Helpline:</span>
                    <span className="font-bold font-mono text-white">+254 702 423 004</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Signature & Legal Notice */}
            <div className="flex items-end justify-between border-t border-white/10 pt-2 text-[8px] text-slate-400">
              <div>
                <p className="font-semibold text-slate-200">National Chairperson</p>
                <p className="italic">Kevin Mubadi</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-orange-300">www.digitalboda.co.ke</p>
                <p>Nairobi, Republic of Kenya</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Controls (Flip, Print, Download) - hidden in print */}
      {!compact && (
        <div className="flex items-center gap-3 mt-4 no-print">
          <button
            type="button"
            onClick={() => setIsFlipped(!isFlipped)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-colors shadow-sm"
          >
            <RotateCw className="w-3.5 h-3.5" />
            {isFlipped ? 'Show Front' : 'Show Back / Emergency'}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#101F68] text-white hover:bg-[#0D1850] transition-colors shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            Print Card
          </button>

          <a
            href={verificationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-orange-600 text-white hover:bg-orange-700 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            Verify Live Link
          </a>
        </div>
      )}
    </div>
  );
};
