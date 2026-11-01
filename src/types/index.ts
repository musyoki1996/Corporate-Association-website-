// Data types and interfaces for DBDDAK Platform

export type MembershipStatus =
  | 'VERIFIED / ACTIVE'
  | 'PENDING APPROVAL'
  | 'EXPIRED'
  | 'SUSPENDED'
  | 'INACTIVE'
  | 'REVOKED'
  | 'NOT FOUND';

export type MembershipCategory =
  | 'Digital Boda Rider'
  | 'Delivery Rider'
  | 'Ordinary Member'
  | 'Corporate Member'
  | 'Associate Member'
  | 'Honorary Member'
  | 'Strategic Partner';

export type UserRole =
  | 'Super Administrator'
  | 'National Chairperson'
  | 'National Secretary'
  | 'Membership Administrator'
  | 'Finance Officer'
  | 'County Coordinator'
  | 'Safety and Security Officer'
  | 'Welfare Officer'
  | 'Member';

export interface Member {
  id: string; // Database internal UUID
  membershipNumber: string; // e.g. DBDDAK-NRB-2026-0842
  nationalId: string; // e.g. 28914523
  fullName: string;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth: string;
  phoneNumber: string;
  alternativePhone?: string;
  email: string;
  county: string;
  subCounty: string;
  ward: string;
  operatingBase: string; // Stage or delivery hub
  platformAffiliation: string[]; // e.g. ['Uber Boda', 'Bolt']
  motorcycleRegNo?: string; // e.g. KMFE 412C
  motorcycleOwnership: 'Owner' | 'Leased / Financed' | 'Employed Rider';
  yearsExperience: number;
  category: MembershipCategory;
  status: MembershipStatus;
  issueDate: string;
  expiryDate: string;
  photoUrl: string;
  qrVerificationToken: string;
  suspensionReason?: string;
  renewalDueAmount: number;
  lastPaymentDate?: string;
  bloodGroup?: string;
  nextOfKin: {
    name: string;
    relationship: string;
    phoneNumber: string;
  };
}

export interface MembershipApplication {
  id: string;
  applicationRef: string; // e.g. APP-2026-8941
  submittedAt: string;
  fullName: string;
  nationalId: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  phoneNumber: string;
  alternativePhone?: string;
  email: string;
  county: string;
  subCounty: string;
  ward: string;
  physicalLocation: string;
  category: MembershipCategory;
  occupation: string;
  motorcycleRegNo?: string;
  motorcycleOwnership: 'Owner' | 'Leased / Financed' | 'Employed Rider';
  platformAffiliation: string[];
  yearsExperience: number;
  documents: {
    idCardUrl?: string;
    drivingLicenseUrl?: string;
    logbookUrl?: string;
    insuranceUrl?: string;
    photoUrl: string;
  };
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'ADDITIONAL_DOCS_REQUESTED';
  reviewNotes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  declarationAccepted: boolean;
  assignedMembershipNumber?: string;
}

export interface PaymentRecord {
  id: string;
  transactionReference: string; // e.g. MPESA-QHD891234
  memberId?: string;
  membershipNumber?: string;
  payerName: string;
  phoneNumber: string;
  amount: number;
  purpose: 'Registration Fee' | 'Annual Renewal' | 'Welfare Benevolent Fund' | 'Event Registration' | 'ID Card Replacement';
  status: 'Successful' | 'Pending' | 'Failed' | 'Reversed';
  createdAt: string;
  channel: 'M-PESA Daraja' | 'Bank Transfer' | 'Direct SACCO Checkoff';
  receiptNumber: string;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string; // e.g. TKT-2026-0412
  memberId: string;
  memberName: string;
  category: 'Membership Inquiries' | 'Payment Disputes' | 'Welfare Requests' | 'Safety Incidents' | 'Harassment / Impoundment' | 'Technical Support';
  subject: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Emergency';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  createdAt: string;
  updatedAt: string;
  assignedOfficer?: string;
  resolutionNotes?: string;
}

export interface PolicyDocument {
  id: string;
  title: string;
  code: string;
  category: string;
  version: string;
  effectiveDate: string;
  responsibleDepartment: string;
  summary: string;
  fileSize: string;
  downloadUrl: string;
  content: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  category: 'Official Statement' | 'Safety Alert' | 'Regulatory Update' | 'Advocacy' | 'Member Story';
  publishedAt: string;
  author: string;
  summary: string;
  content: string;
  imageUrl: string;
  featured?: boolean;
}

export interface AssociationEvent {
  id: string;
  title: string;
  eventType: 'Safety Sensitization' | 'County Forum' | 'First Aid Training' | 'National AGM' | 'Stakeholder Dialogue';
  date: string;
  time: string;
  location: string;
  county: string;
  targetAudience: string;
  attendeesCount: number;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  description: string;
  registrationOpen: boolean;
}

export interface ProjectImpact {
  id: string;
  title: string;
  tagline: string;
  location: string;
  county: string;
  implementationDate: string;
  partners: string[];
  metrics: { label: string; value: string }[];
  description: string;
  imageUrl: string;
  status: 'Active' | 'Completed' | 'Expanding';
}

export interface LeadershipMember {
  id: string;
  name: string;
  position: string;
  level: 'National Executive' | 'National Secretariat' | 'County Leadership' | 'Advisory Board';
  county?: string;
  term: string;
  bio: string;
  phone?: string;
  email?: string;
  photoUrl: string;
  active: boolean;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actorName: string;
  actorRole: string;
  action: string;
  target: string;
  ipAddress: string;
  details: string;
}
