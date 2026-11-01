import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Member,
  MembershipApplication,
  PaymentRecord,
  SupportTicket,
  PolicyDocument,
  NewsArticle,
  AssociationEvent,
  ProjectImpact,
  LeadershipMember,
  AuditLogEntry,
  UserRole
} from '../types';
import {
  INITIAL_MEMBERS,
  INITIAL_APPLICATIONS,
  INITIAL_PAYMENTS,
  INITIAL_TICKETS,
  INITIAL_POLICIES,
  INITIAL_LEADERSHIP,
  INITIAL_NEWS,
  INITIAL_EVENTS,
  INITIAL_PROJECTS,
  INITIAL_AUDIT_LOGS
} from '../data/mockDatabase';

interface CurrentUser {
  type: 'guest' | 'member' | 'admin';
  role?: UserRole;
  memberData?: Member;
  adminName?: string;
  adminEmail?: string;
  assignedCounty?: string;
}

interface AppContextType {
  members: Member[];
  applications: MembershipApplication[];
  payments: PaymentRecord[];
  tickets: SupportTicket[];
  policies: PolicyDocument[];
  leadership: LeadershipMember[];
  news: NewsArticle[];
  events: AssociationEvent[];
  projects: ProjectImpact[];
  auditLogs: AuditLogEntry[];
  currentUser: CurrentUser;
  
  // Auth methods
  loginAsMember: (nationalIdOrNumber: string) => boolean;
  loginAsAdmin: (role: UserRole, county?: string) => void;
  logout: () => void;
  
  // Membership lifecycle
  submitApplication: (applicationData: Omit<MembershipApplication, 'id' | 'applicationRef' | 'submittedAt' | 'status'>) => MembershipApplication;
  approveApplication: (appId: string, notes?: string) => Member | null;
  rejectApplication: (appId: string, reason: string) => void;
  requestAdditionalDocs: (appId: string, notes: string) => void;
  
  // Member status management
  suspendMember: (memberId: string, reason: string) => void;
  reactivateMember: (memberId: string) => void;
  revokeMember: (memberId: string, reason: string) => void;
  updateMemberDetails: (memberId: string, updates: Partial<Member>) => void;
  
  // Public Verification
  verifyMemberRecord: (query: string, method: 'number' | 'qr' | 'id') => { member: Member | null; statusText: string };
  
  // Support & Payments
  submitTicket: (ticket: Omit<SupportTicket, 'id' | 'ticketNumber' | 'createdAt' | 'updatedAt' | 'status'>) => SupportTicket;
  resolveTicket: (ticketId: string, notes: string) => void;
  submitPayment: (payment: Omit<PaymentRecord, 'id' | 'transactionReference' | 'receiptNumber' | 'createdAt' | 'status'>) => PaymentRecord;
  
  // Content management
  addPolicy: (policy: Omit<PolicyDocument, 'id'>) => void;
  addAnnouncement: (article: Omit<NewsArticle, 'id'>) => void;
  addEvent: (event: Omit<AssociationEvent, 'id'>) => void;
  
  // System reset
  resetDatabase: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Persistence with localStorage
  const [members, setMembers] = useState<Member[]>(() => {
    const saved = localStorage.getItem('dbddak_members');
    return saved ? JSON.parse(saved) : INITIAL_MEMBERS;
  });

  const [applications, setApplications] = useState<MembershipApplication[]>(() => {
    const saved = localStorage.getItem('dbddak_applications');
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  const [payments, setPayments] = useState<PaymentRecord[]>(() => {
    const saved = localStorage.getItem('dbddak_payments');
    return saved ? JSON.parse(saved) : INITIAL_PAYMENTS;
  });

  const [tickets, setTickets] = useState<SupportTicket[]>(() => {
    const saved = localStorage.getItem('dbddak_tickets');
    return saved ? JSON.parse(saved) : INITIAL_TICKETS;
  });

  const [policies, setPolicies] = useState<PolicyDocument[]>(() => {
    const saved = localStorage.getItem('dbddak_policies');
    return saved ? JSON.parse(saved) : INITIAL_POLICIES;
  });

  const [leadership, setLeadership] = useState<LeadershipMember[]>(() => {
    const saved = localStorage.getItem('dbddak_leadership');
    return saved ? JSON.parse(saved) : INITIAL_LEADERSHIP;
  });

  const [news, setNews] = useState<NewsArticle[]>(() => {
    const saved = localStorage.getItem('dbddak_news');
    return saved ? JSON.parse(saved) : INITIAL_NEWS;
  });

  const [events, setEvents] = useState<AssociationEvent[]>(() => {
    const saved = localStorage.getItem('dbddak_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [projects] = useState<ProjectImpact[]>(INITIAL_PROJECTS);

  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => {
    const saved = localStorage.getItem('dbddak_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  // Current logged in user state
  const [currentUser, setCurrentUser] = useState<CurrentUser>(() => {
    const saved = localStorage.getItem('dbddak_session');
    return saved ? JSON.parse(saved) : { type: 'guest' };
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('dbddak_members', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('dbddak_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('dbddak_payments', JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    localStorage.setItem('dbddak_tickets', JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    localStorage.setItem('dbddak_policies', JSON.stringify(policies));
  }, [policies]);

  useEffect(() => {
    localStorage.setItem('dbddak_leadership', JSON.stringify(leadership));
  }, [leadership]);

  useEffect(() => {
    localStorage.setItem('dbddak_news', JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem('dbddak_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('dbddak_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem('dbddak_session', JSON.stringify(currentUser));
  }, [currentUser]);

  // Helper to add audit log
  const logAudit = (action: string, target: string, details: string) => {
    const entry: AuditLogEntry = {
      id: `aud-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      actorName: currentUser.adminName || (currentUser.memberData ? currentUser.memberData.fullName : 'Public User'),
      actorRole: currentUser.role || (currentUser.type === 'member' ? 'Member' : 'Guest'),
      action,
      target,
      ipAddress: '197.237.142.20',
      details
    };
    setAuditLogs(prev => [entry, ...prev]);
  };

  // Auth methods
  const loginAsMember = (query: string): boolean => {
    const cleaned = query.trim().toUpperCase();
    const found = members.find(
      m => m.membershipNumber.toUpperCase() === cleaned || m.nationalId === cleaned || m.phoneNumber === cleaned
    );
    if (found) {
      setCurrentUser({
        type: 'member',
        memberData: found,
        role: 'Member'
      });
      logAudit('MEMBER_LOGIN', found.membershipNumber, `Member login successful for ${found.fullName}`);
      return true;
    }
    return false;
  };

  const loginAsAdmin = (role: UserRole, county?: string) => {
    const roleNames: Record<UserRole, string> = {
      'Super Administrator': 'Eng. Victor Kamau',
      'National Chairperson': 'Kevin Mubadi',
      'National Secretary': 'Samuel Mumo',
      'Membership Administrator': 'Sarah Achieng',
      'Finance Officer': 'Grace Kwamboka',
      'County Coordinator': county ? `${county} County Secretariat` : 'Nairobi County Coordinator',
      'Safety and Security Officer': 'Hassan Abdi',
      'Welfare Officer': 'Florence Nduku',
      'Member': 'Member User'
    };

    setCurrentUser({
      type: 'admin',
      role,
      adminName: roleNames[role] || 'Authorized Executive',
      adminEmail: `${role.toLowerCase().replace(/\s+/g, '.')}@digitalboda.co.ke`,
      assignedCounty: county
    });
    logAudit('ADMIN_LOGIN', role, `Admin logged in with role ${role}${county ? ` (County: ${county})` : ''}`);
  };

  const logout = () => {
    logAudit('USER_LOGOUT', currentUser.role || 'Guest', 'Session terminated');
    setCurrentUser({ type: 'guest' });
  };

  // Application submission
  const submitApplication = (data: Omit<MembershipApplication, 'id' | 'applicationRef' | 'submittedAt' | 'status'>) => {
    const randomSeq = Math.floor(1000 + Math.random() * 9000);
    const newApp: MembershipApplication = {
      ...data,
      id: `app-${Date.now()}`,
      applicationRef: `APP-2026-${randomSeq}`,
      submittedAt: new Date().toISOString(),
      status: 'PENDING'
    };

    setApplications(prev => [newApp, ...prev]);
    logAudit(
      'APPLICATION_SUBMITTED',
      newApp.applicationRef,
      `New membership application submitted for ${newApp.fullName} (${newApp.county} County)`
    );
    return newApp;
  };

  // Approval workflow
  const approveApplication = (appId: string, notes?: string): Member | null => {
    const app = applications.find(a => a.id === appId);
    if (!app) return null;

    // Generate unique sequential membership number: DBDDAK-[COUNTY_CODE]-[YEAR]-[NUMBER]
    const countyCode = app.county.substring(0, 3).toUpperCase();
    const seqNum = (members.length + 850).toString().padStart(4, '0');
    const newMembershipNumber = `DBDDAK-${countyCode}-2026-${seqNum}`;
    const token = `vtok_${Math.random().toString(36).substring(2, 10)}${Date.now().toString(36)}`;

    const newMember: Member = {
      id: `mem-${Date.now()}`,
      membershipNumber: newMembershipNumber,
      nationalId: app.nationalId,
      fullName: app.fullName,
      gender: app.gender,
      dateOfBirth: app.dateOfBirth,
      phoneNumber: app.phoneNumber,
      alternativePhone: app.alternativePhone,
      email: app.email,
      county: app.county,
      subCounty: app.subCounty,
      ward: app.ward,
      operatingBase: app.physicalLocation,
      platformAffiliation: app.platformAffiliation,
      motorcycleRegNo: app.motorcycleRegNo,
      motorcycleOwnership: app.motorcycleOwnership,
      yearsExperience: app.yearsExperience,
      category: app.category,
      status: 'VERIFIED / ACTIVE',
      issueDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      photoUrl: app.documents.photoUrl || '/src/assets/images/hero_kenyan_boda_riders_1793478786224.jpg',
      qrVerificationToken: token,
      renewalDueAmount: 0,
      lastPaymentDate: new Date().toISOString().split('T')[0],
      nextOfKin: {
        name: 'Primary Contact',
        relationship: 'Kin',
        phoneNumber: app.phoneNumber
      }
    };

    // Update application status
    setApplications(prev =>
      prev.map(a =>
        a.id === appId
          ? {
              ...a,
              status: 'APPROVED',
              reviewNotes: notes || 'Verified and approved by membership review board.',
              reviewedBy: currentUser.adminName || 'Membership Officer',
              reviewedAt: new Date().toISOString(),
              assignedMembershipNumber: newMembershipNumber
            }
          : a
      )
    );

    // Add to members database
    setMembers(prev => [newMember, ...prev]);

    logAudit(
      'APPLICATION_APPROVED',
      newMembershipNumber,
      `Application ${app.applicationRef} approved. Issued Membership ID: ${newMembershipNumber}`
    );

    return newMember;
  };

  const rejectApplication = (appId: string, reason: string) => {
    setApplications(prev =>
      prev.map(a =>
        a.id === appId
          ? {
              ...a,
              status: 'REJECTED',
              reviewNotes: reason,
              reviewedBy: currentUser.adminName || 'Membership Officer',
              reviewedAt: new Date().toISOString()
            }
          : a
      )
    );
    logAudit('APPLICATION_REJECTED', appId, `Application rejected. Reason: ${reason}`);
  };

  const requestAdditionalDocs = (appId: string, notes: string) => {
    setApplications(prev =>
      prev.map(a =>
        a.id === appId
          ? {
              ...a,
              status: 'ADDITIONAL_DOCS_REQUESTED',
              reviewNotes: notes,
              reviewedBy: currentUser.adminName || 'Membership Officer',
              reviewedAt: new Date().toISOString()
            }
          : a
      )
    );
    logAudit('DOCS_REQUESTED', appId, `Additional documentation requested: ${notes}`);
  };

  const suspendMember = (memberId: string, reason: string) => {
    setMembers(prev =>
      prev.map(m =>
        m.id === memberId
          ? {
              ...m,
              status: 'SUSPENDED',
              suspensionReason: reason
            }
          : m
      )
    );
    const target = members.find(m => m.id === memberId);
    logAudit(
      'MEMBER_SUSPENDED',
      target?.membershipNumber || memberId,
      `Membership suspended for ${target?.fullName}. Reason: ${reason}`
    );
  };

  const reactivateMember = (memberId: string) => {
    setMembers(prev =>
      prev.map(m =>
        m.id === memberId
          ? {
              ...m,
              status: 'VERIFIED / ACTIVE',
              suspensionReason: undefined
            }
          : m
      )
    );
    const target = members.find(m => m.id === memberId);
    logAudit(
      'MEMBER_REACTIVATED',
      target?.membershipNumber || memberId,
      `Membership reactivated to VERIFIED / ACTIVE for ${target?.fullName}`
    );
  };

  const revokeMember = (memberId: string, reason: string) => {
    setMembers(prev =>
      prev.map(m =>
        m.id === memberId
          ? {
              ...m,
              status: 'REVOKED',
              suspensionReason: reason
            }
          : m
      )
    );
    const target = members.find(m => m.id === memberId);
    logAudit(
      'MEMBER_REVOKED',
      target?.membershipNumber || memberId,
      `Membership permanently revoked for ${target?.fullName}. Reason: ${reason}`
    );
  };

  const updateMemberDetails = (memberId: string, updates: Partial<Member>) => {
    setMembers(prev =>
      prev.map(m => (m.id === memberId ? { ...m, ...updates } : m))
    );
    logAudit('MEMBER_UPDATED', memberId, 'Member record updated in system');
  };

  // Public verification engine
  const verifyMemberRecord = (
    query: string,
    method: 'number' | 'qr' | 'id'
  ): { member: Member | null; statusText: string } => {
    const cleaned = query.trim().toUpperCase();
    if (!cleaned) return { member: null, statusText: 'NOT FOUND' };

    let found: Member | undefined;

    if (method === 'number') {
      found = members.find(m => m.membershipNumber.toUpperCase() === cleaned);
    } else if (method === 'qr') {
      found = members.find(
        m => m.qrVerificationToken === query.trim() || m.membershipNumber.toUpperCase() === cleaned
      );
    } else if (method === 'id') {
      found = members.find(m => m.nationalId === cleaned);
    }

    if (found) {
      logAudit(
        'PUBLIC_VERIFICATION_HIT',
        found.membershipNumber,
        `Public record checked via ${method.toUpperCase()} query: ${found.membershipNumber} (${found.status})`
      );
      return { member: found, statusText: found.status };
    }

    logAudit('PUBLIC_VERIFICATION_MISS', cleaned, `Verification query not found: ${cleaned}`);
    return { member: null, statusText: 'NOT FOUND' };
  };

  // Tickets
  const submitTicket = (ticketData: Omit<SupportTicket, 'id' | 'ticketNumber' | 'createdAt' | 'updatedAt' | 'status'>) => {
    const seq = Math.floor(100 + Math.random() * 900);
    const newTicket: SupportTicket = {
      ...ticketData,
      id: `tkt-${Date.now()}`,
      ticketNumber: `TKT-2026-0${seq}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'Open'
    };
    setTickets(prev => [newTicket, ...prev]);
    logAudit('TICKET_CREATED', newTicket.ticketNumber, `Support ticket submitted: ${newTicket.subject}`);
    return newTicket;
  };

  const resolveTicket = (ticketId: string, notes: string) => {
    setTickets(prev =>
      prev.map(t =>
        t.id === ticketId
          ? {
              ...t,
              status: 'Resolved',
              resolutionNotes: notes,
              updatedAt: new Date().toISOString(),
              assignedOfficer: currentUser.adminName || 'DBDDAK Officer'
            }
          : t
      )
    );
    logAudit('TICKET_RESOLVED', ticketId, `Ticket resolved with notes: ${notes}`);
  };

  // Payments
  const submitPayment = (paymentData: Omit<PaymentRecord, 'id' | 'transactionReference' | 'receiptNumber' | 'createdAt' | 'status'>) => {
    const mpesaRef = `MPESA-Q${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const recNo = `REC-2026-${Math.floor(10000 + Math.random() * 90000)}`;

    const newPayment: PaymentRecord = {
      ...paymentData,
      id: `pay-${Date.now()}`,
      transactionReference: mpesaRef,
      receiptNumber: recNo,
      status: 'Successful',
      createdAt: new Date().toISOString()
    };

    setPayments(prev => [newPayment, ...prev]);

    // If payment was for member renewal or registration, update member balance
    if (paymentData.memberId) {
      setMembers(prev =>
        prev.map(m =>
          m.id === paymentData.memberId
            ? {
                ...m,
                renewalDueAmount: Math.max(0, m.renewalDueAmount - paymentData.amount),
                lastPaymentDate: new Date().toISOString().split('T')[0]
              }
            : m
        )
      );
    }

    logAudit(
      'PAYMENT_PROCESSED',
      newPayment.transactionReference,
      `Payment received: KSh ${newPayment.amount} from ${newPayment.payerName} (${newPayment.purpose})`
    );
    return newPayment;
  };

  // Content additions
  const addPolicy = (policy: Omit<PolicyDocument, 'id'>) => {
    const newPol: PolicyDocument = { ...policy, id: `pol-${Date.now()}` };
    setPolicies(prev => [newPol, ...prev]);
    logAudit('POLICY_ADDED', newPol.code, `New policy published: ${newPol.title}`);
  };

  const addAnnouncement = (article: Omit<NewsArticle, 'id'>) => {
    const newArt: NewsArticle = { ...article, id: `news-${Date.now()}` };
    setNews(prev => [newArt, ...prev]);
    logAudit('NEWS_PUBLISHED', newArt.slug, `New announcement published: ${newArt.title}`);
  };

  const addEvent = (event: Omit<AssociationEvent, 'id'>) => {
    const newEvt: AssociationEvent = { ...event, id: `evt-${Date.now()}` };
    setEvents(prev => [newEvt, ...prev]);
    logAudit('EVENT_ADDED', newEvt.title, `New event scheduled for ${newEvt.date}`);
  };

  const resetDatabase = () => {
    localStorage.removeItem('dbddak_members');
    localStorage.removeItem('dbddak_applications');
    localStorage.removeItem('dbddak_payments');
    localStorage.removeItem('dbddak_tickets');
    localStorage.removeItem('dbddak_policies');
    localStorage.removeItem('dbddak_leadership');
    localStorage.removeItem('dbddak_news');
    localStorage.removeItem('dbddak_events');
    localStorage.removeItem('dbddak_audit_logs');
    localStorage.removeItem('dbddak_session');

    setMembers(INITIAL_MEMBERS);
    setApplications(INITIAL_APPLICATIONS);
    setPayments(INITIAL_PAYMENTS);
    setTickets(INITIAL_TICKETS);
    setPolicies(INITIAL_POLICIES);
    setLeadership(INITIAL_LEADERSHIP);
    setNews(INITIAL_NEWS);
    setEvents(INITIAL_EVENTS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setCurrentUser({ type: 'guest' });
  };

  return (
    <AppContext.Provider
      value={{
        members,
        applications,
        payments,
        tickets,
        policies,
        leadership,
        news,
        events,
        projects,
        auditLogs,
        currentUser,
        loginAsMember,
        loginAsAdmin,
        logout,
        submitApplication,
        approveApplication,
        rejectApplication,
        requestAdditionalDocs,
        suspendMember,
        reactivateMember,
        revokeMember,
        updateMemberDetails,
        verifyMemberRecord,
        submitTicket,
        resolveTicket,
        submitPayment,
        addPolicy,
        addAnnouncement,
        addEvent,
        resetDatabase
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
