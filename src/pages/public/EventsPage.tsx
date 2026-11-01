import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, MapPin, Users, CheckCircle, ArrowRight } from 'lucide-react';

interface EventsPageProps {
  onNavigate: (path: string) => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ onNavigate }) => {
  const { events } = useApp();
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);

  const handleRegisterEvent = (title: string, id: string) => {
    if (!registeredEvents.includes(id)) {
      setRegisteredEvents([...registeredEvents, id]);
      alert(`Registration Confirmed! You have reserved a seat for: ${title}. A confirmation SMS has been dispatched.`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <section className="bg-[#101F68] text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-orange-400 text-xs font-semibold uppercase tracking-wider">
            <Calendar className="w-4 h-4" />
            <span>Activities & Capacity Building</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Association Events & Training Workshops
          </h1>
          <p className="text-base sm:text-lg text-slate-200 max-w-2xl font-normal leading-relaxed">
            Upcoming safety clinics, financial empowerment seminars, county forums, and national delegate conferences.
          </p>
        </div>
      </section>

      {/* Events List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(evt => {
            const isReg = registeredEvents.includes(evt.id);
            return (
              <div
                key={evt.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-orange-700 bg-orange-100 px-2.5 py-0.5 rounded">
                      {evt.eventType}
                    </span>
                    <span className="font-mono text-xs font-bold text-[#101F68] bg-slate-100 px-2 py-0.5 rounded">
                      {evt.date}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#101F68]">{evt.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{evt.description}</p>

                  <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                    <p className="flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                      <span>{evt.location} ({evt.county} County)</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                      <span>Target: {evt.targetAudience}</span>
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono">
                      Expected Capacity: ~{evt.attendeesCount} participants
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => handleRegisterEvent(evt.title, evt.id)}
                    disabled={isReg}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                      isReg
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                        : 'bg-[#101F68] hover:bg-[#0D1850] text-white shadow'
                    }`}
                  >
                    {isReg ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span>Registered Successfully</span>
                      </>
                    ) : (
                      <>
                        <span>Reserve Attendance Seat</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
