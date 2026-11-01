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
  AuditLogEntry
} from '../types';

export const KENYA_COUNTIES = [
  'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Kiambu', 'Machakos', 'Uasin Gishu',
  'Kajiado', 'Kilifi', 'Kakamega', 'Meru', 'Nyeri', 'Bungoma', 'Kisii',
  'Murang\'a', 'Trans Nzoia', 'Kericho', 'Bomet', 'Embu', 'Laikipia',
  'Kirinyaga', 'Kitui', 'Homa Bay', 'Migori', 'Siaya', 'Busia', 'Nandi',
  'Baringo', 'Narok', 'Makueni', 'Nyandarua', 'Isiolo', 'Tharaka-Nithi',
  'Taita-Taveta', 'Kwale', 'Lamu', 'Tana River', 'Garissa', 'Wajir',
  'Mandera', 'Marsabit', 'Samburu', 'Turkana', 'West Pokot', 'Elgeyo-Marakwet',
  'Vihiga', 'Nyamira'
];

export const SUB_COUNTIES_MAP: Record<string, string[]> = {
  'Nairobi': ['Westlands', 'Starehe', 'Dagoretti North', 'Dagoretti South', 'Lang\'ata', 'Kibra', 'Roysambu', 'Kasarani', 'Ruaraka', 'Embakasi Central', 'Embakasi East', 'Embakasi North', 'Embakasi South', 'Embakasi West', 'Makadara', 'Kamukunji'],
  'Mombasa': ['Mvita', 'Nyali', 'Changamwe', 'Jomvu', 'Kisauni', 'Likoni'],
  'Kisumu': ['Kisumu Central', 'Kisumu East', 'Kisumu West', 'Seme', 'Nyando', 'Muhoroni', 'Nyakach'],
  'Nakuru': ['Nakuru Town East', 'Nakuru Town West', 'Naivasha', 'Gilgil', 'Molo', 'Rongai', 'Subukia', 'Bahati', 'Kuresoi North', 'Kuresoi South', 'Njoro'],
  'Kiambu': ['Thika Town', 'Ruiru', 'Juja', 'Kiambu', 'Githunguri', 'Limuru', 'Kikuyu', 'Kabete', 'Lari', 'Gatundu South', 'Gatundu North']
};

export const INITIAL_MEMBERS: Member[] = [
  {
    id: 'mem-001',
    membershipNumber: 'DBDDAK-NRB-2026-0842',
    nationalId: '28914523',
    fullName: 'Kennedy Mwangi Gitau',
    gender: 'Male',
    dateOfBirth: '1993-04-12',
    phoneNumber: '+254712345678',
    alternativePhone: '+254722998877',
    email: 'kennedy.mwangi@digitalboda.co.ke',
    county: 'Nairobi',
    subCounty: 'Westlands',
    ward: 'Parklands/Highridge',
    operatingBase: 'Westlands Commercial Hub & Sarit Stage',
    platformAffiliation: ['Uber Boda', 'Bolt Boda', 'Glovo Courier'],
    motorcycleRegNo: 'KMFE 412C',
    motorcycleOwnership: 'Owner',
    yearsExperience: 7,
    category: 'Digital Boda Rider',
    status: 'VERIFIED / ACTIVE',
    issueDate: '2024-01-15',
    expiryDate: '2027-01-15',
    photoUrl: '/src/assets/images/delivery_rider_digital_1793478788227.jpg',
    qrVerificationToken: 'vtok_8f912a78129034ec',
    renewalDueAmount: 0,
    lastPaymentDate: '2024-01-15',
    bloodGroup: 'O+',
    nextOfKin: {
      name: 'Mary Wanjiku Gitau',
      relationship: 'Spouse',
      phoneNumber: '+254722114433'
    }
  },
  {
    id: 'mem-002',
    membershipNumber: 'DBDDAK-NRB-2026-1104',
    nationalId: '31456789',
    fullName: 'Faith Chebet Korir',
    gender: 'Female',
    dateOfBirth: '1996-08-23',
    phoneNumber: '+254723456789',
    email: 'faith.chebet@digitalboda.co.ke',
    county: 'Nairobi',
    subCounty: 'Starehe',
    ward: 'CBD Nairobi',
    operatingBase: 'Moi Avenue QuickPack Delivery Node',
    platformAffiliation: ['Jumia Food', 'Glovo Courier'],
    motorcycleRegNo: 'KDP 452R',
    motorcycleOwnership: 'Leased / Financed',
    yearsExperience: 4,
    category: 'Delivery Rider',
    status: 'VERIFIED / ACTIVE',
    issueDate: '2024-05-10',
    expiryDate: '2027-05-10',
    photoUrl: '/src/assets/images/hero_kenyan_boda_riders_1793478786224.jpg',
    qrVerificationToken: 'vtok_4bc91238910fed33',
    renewalDueAmount: 0,
    lastPaymentDate: '2024-05-10',
    bloodGroup: 'A+',
    nextOfKin: {
      name: 'David Kiprotich',
      relationship: 'Brother',
      phoneNumber: '+254711889922'
    }
  },
  {
    id: 'mem-003',
    membershipNumber: 'DBDDAK-MSA-2025-0318',
    nationalId: '24567890',
    fullName: 'Omar Bakari Mtwana',
    gender: 'Male',
    dateOfBirth: '1989-11-04',
    phoneNumber: '+254733445566',
    email: 'omar.bakari@digitalboda.co.ke',
    county: 'Mombasa',
    subCounty: 'Mvita',
    ward: 'Old Town',
    operatingBase: 'Docks & Posta Boda Stage',
    platformAffiliation: ['Bolt Boda'],
    motorcycleRegNo: 'KTB 901A',
    motorcycleOwnership: 'Owner',
    yearsExperience: 9,
    category: 'Digital Boda Rider',
    status: 'SUSPENDED',
    suspensionReason: 'Pending review under Disciplinary Code: Incident investigation regarding non-compliance with association safety gear directives.',
    issueDate: '2023-02-14',
    expiryDate: '2026-02-14',
    photoUrl: '/src/assets/images/safety_training_workshop_1793478786811.jpg',
    qrVerificationToken: 'vtok_9918237190adce55',
    renewalDueAmount: 1500,
    bloodGroup: 'B+',
    nextOfKin: {
      name: 'Amina Mtwana',
      relationship: 'Mother',
      phoneNumber: '+254711223344'
    }
  },
  {
    id: 'mem-004',
    membershipNumber: 'DBDDAK-KSM-2024-0091',
    nationalId: '22341982',
    fullName: 'Silas Otieno Onyango',
    gender: 'Male',
    dateOfBirth: '1987-03-19',
    phoneNumber: '+254722556677',
    email: 'silas.otieno@digitalboda.co.ke',
    county: 'Kisumu',
    subCounty: 'Kisumu Central',
    ward: 'Milimani/Market',
    operatingBase: 'Kondele Mega Plaza Stage',
    platformAffiliation: ['Faras', 'Independent'],
    motorcycleRegNo: 'KMC 112L',
    motorcycleOwnership: 'Owner',
    yearsExperience: 11,
    category: 'Ordinary Member',
    status: 'EXPIRED',
    issueDate: '2022-01-10',
    expiryDate: '2025-01-10',
    photoUrl: '/src/assets/images/community_welfare_boda_1793478788981.jpg',
    qrVerificationToken: 'vtok_31a09d7890ecba11',
    renewalDueAmount: 1200,
    bloodGroup: 'O-',
    nextOfKin: {
      name: 'Grace Achieng',
      relationship: 'Spouse',
      phoneNumber: '+254733990011'
    }
  }
];

export const INITIAL_APPLICATIONS: MembershipApplication[] = [
  {
    id: 'app-001',
    applicationRef: 'APP-2026-9814',
    submittedAt: '2026-10-30T10:14:00Z',
    fullName: 'Peter Kamau Ndung\'u',
    nationalId: '34120984',
    dateOfBirth: '1998-05-15',
    gender: 'Male',
    phoneNumber: '+254790112233',
    email: 'peter.kamau@gmail.com',
    county: 'Nairobi',
    subCounty: 'Kasarani',
    ward: 'Clay City',
    physicalLocation: 'Thika Road, Roysambu Roundabout Stage',
    category: 'Digital Boda Rider',
    occupation: 'Full-time Motorcycle Taxi Operator',
    motorcycleRegNo: 'KME 789D',
    motorcycleOwnership: 'Owner',
    platformAffiliation: ['Uber Boda', 'Bolt Boda'],
    yearsExperience: 3,
    documents: {
      photoUrl: '/src/assets/images/delivery_rider_digital_1793478788227.jpg',
      idCardUrl: 'https://placehold.co/600x400/101F68/white?text=National+ID+Copy',
      drivingLicenseUrl: 'https://placehold.co/600x400/F04416/white?text=Driving+License+Class+A'
    },
    status: 'PENDING',
    reviewNotes: 'Documents uploaded. NTSA driving license verification pending membership officer sign-off.',
    declarationAccepted: true
  },
  {
    id: 'app-002',
    applicationRef: 'APP-2026-9788',
    submittedAt: '2026-10-29T14:45:00Z',
    fullName: 'Beatrice Wambui Karanja',
    nationalId: '32091482',
    dateOfBirth: '1995-12-08',
    gender: 'Female',
    phoneNumber: '+254715447788',
    email: 'beatrice.karanja@outlook.com',
    county: 'Kiambu',
    subCounty: 'Ruiru',
    ward: 'Membley / By-pass',
    physicalLocation: 'Eastern Bypass Kamakis Node',
    category: 'Delivery Rider',
    occupation: 'E-commerce Courier Rider',
    motorcycleRegNo: 'KMG 334X',
    motorcycleOwnership: 'Owner',
    platformAffiliation: ['Glovo Courier', 'Sendy Logistics'],
    yearsExperience: 5,
    documents: {
      photoUrl: '/src/assets/images/hero_kenyan_boda_riders_1793478786224.jpg'
    },
    status: 'ADDITIONAL_DOCS_REQUESTED',
    reviewNotes: 'Kindly upload a clearer scan of your comprehensive motorcycle insurance certificate.',
    declarationAccepted: true
  }
];

export const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: 'pay-001',
    transactionReference: 'MPESA-QHA9812456',
    memberId: 'mem-001',
    membershipNumber: 'DBDDAK-NRB-2026-0842',
    payerName: 'Kennedy Mwangi Gitau',
    phoneNumber: '+254712345678',
    amount: 1500,
    purpose: 'Registration Fee',
    status: 'Successful',
    createdAt: '2024-01-15T09:24:00Z',
    channel: 'M-PESA Daraja',
    receiptNumber: 'REC-2024-00192'
  },
  {
    id: 'pay-002',
    transactionReference: 'MPESA-QKB3381902',
    memberId: 'mem-002',
    membershipNumber: 'DBDDAK-NRB-2026-1104',
    payerName: 'Faith Chebet Korir',
    phoneNumber: '+254723456789',
    amount: 1500,
    purpose: 'Registration Fee',
    status: 'Successful',
    createdAt: '2024-05-10T11:15:00Z',
    channel: 'M-PESA Daraja',
    receiptNumber: 'REC-2024-00481'
  },
  {
    id: 'pay-003',
    transactionReference: 'MPESA-QLC7721839',
    memberId: 'mem-001',
    membershipNumber: 'DBDDAK-NRB-2026-0842',
    payerName: 'Kennedy Mwangi Gitau',
    phoneNumber: '+254712345678',
    amount: 500,
    purpose: 'Welfare Benevolent Fund',
    status: 'Successful',
    createdAt: '2026-08-01T08:12:00Z',
    channel: 'M-PESA Daraja',
    receiptNumber: 'REC-2026-00994'
  }
];

export const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 'tkt-001',
    ticketNumber: 'TKT-2026-0182',
    memberId: 'mem-001',
    memberName: 'Kennedy Mwangi Gitau',
    category: 'Safety Incidents',
    subject: 'Assistance requested with City Council impoundment at Ring Road Westlands',
    description: 'Motorcycle impounded while picking up passenger outside commercial complex despite valid county sticker. Seeking legal advisory and county liaison support.',
    priority: 'High',
    status: 'In Progress',
    createdAt: '2026-10-28T09:30:00Z',
    updatedAt: '2026-10-29T14:00:00Z',
    assignedOfficer: 'Welfare Officer - Nairobi West',
    resolutionNotes: 'Liaison officer engaged Nairobi County Transport Department inspector. Case documented for resolution.'
  },
  {
    id: 'tkt-002',
    ticketNumber: 'TKT-2026-0195',
    memberId: 'mem-002',
    memberName: 'Faith Chebet Korir',
    category: 'Welfare Requests',
    subject: 'Inquiry on Association Group Medical & Personal Accident Insurance coverage',
    description: 'Requesting confirmation of participating clinics in Nairobi CBD for the rider outpatient scheme.',
    priority: 'Medium',
    status: 'Resolved',
    createdAt: '2026-10-25T11:20:00Z',
    updatedAt: '2026-10-26T16:10:00Z',
    assignedOfficer: 'Member Services Lead',
    resolutionNotes: 'List of 42 empanelled facilities in Nairobi sent to member email and SMS.'
  }
];

export const INITIAL_POLICIES: PolicyDocument[] = [
  {
    id: 'pol-001',
    title: 'Association Constitution and Bylaws',
    code: 'DBDDAK-POL-001',
    category: 'Governance',
    version: '2.4',
    effectiveDate: '2024-01-01',
    responsibleDepartment: 'National Executive Committee',
    summary: 'The supreme governing instrument establishing the legal mandate, membership rights, organizational structure, leadership elections and financial stewardship of DBDDAK.',
    fileSize: '1.8 MB',
    downloadUrl: '#',
    content: 'Full formal constitution outlining membership admission, rights of representation, regional chapter governance, disciplinary proceedings and dispute resolution mechanisms under Kenyan Law.'
  },
  {
    id: 'pol-002',
    title: 'Comprehensive Road Safety & Helmet Standards Policy',
    code: 'DBDDAK-POL-002',
    category: 'Safety & Compliance',
    version: '3.1',
    effectiveDate: '2024-06-01',
    responsibleDepartment: 'Safety and Enforcement Directorate',
    summary: 'Mandates strict compliance with KEBS-approved dual-helmet standards, reflector jackets, speed moderation, passenger protection and defensive riding protocols across Kenya.',
    fileSize: '850 KB',
    downloadUrl: '#',
    content: 'All registered DBDDAK riders must carry two KEBS certified helmets, wear high-visibility reflector vests with association branding, and observe Traffic Act Cap 403 regulations.'
  },
  {
    id: 'pol-003',
    title: 'Disciplinary Code and Code of Conduct',
    code: 'DBDDAK-POL-003',
    category: 'Governance & Ethics',
    version: '2.0',
    effectiveDate: '2023-11-15',
    responsibleDepartment: 'Legal Affairs & Ethics Committee',
    summary: 'Clear guidelines regarding rider decorum, non-harassment, dispute settlement, stage harmony and zero-tolerance measures for rogue behavior.',
    fileSize: '620 KB',
    downloadUrl: '#',
    content: 'Enforces strict professional standards, orderly stage operations, customer courtesy, dispute mediation through sub-county elders, and suspension criteria for violations.'
  },
  {
    id: 'pol-004',
    title: 'Anti-Mob Injustice and Emergency Support Protocol',
    code: 'DBDDAK-POL-004',
    category: 'Security & Legal Protection',
    version: '1.8',
    effectiveDate: '2024-03-10',
    responsibleDepartment: 'Safety and Security Directorate',
    summary: 'Categorical denunciation and operational protocols to prevent mob justice, coordinate immediately with National Police Service, and preserve rule of law in accidents.',
    fileSize: '540 KB',
    downloadUrl: '#',
    content: 'DBDDAK strictly prohibits retaliation or mob action in traffic incidents. Members are mandated to call the association emergency hotline and secure the scene peacefully.'
  },
  {
    id: 'pol-005',
    title: 'Gender Equality, Inclusivity and Anti-Sexual Harassment Policy',
    code: 'DBDDAK-POL-005',
    category: 'Welfare & Social Protection',
    version: '2.2',
    effectiveDate: '2024-05-01',
    responsibleDepartment: 'Gender and Social Welfare Desk',
    summary: 'Protects female boda operators, riders and passengers from verbal, physical, or sexual harassment, guaranteeing equal opportunities at all stages and leadership seats.',
    fileSize: '710 KB',
    downloadUrl: '#',
    content: 'Ensures equitable access for women in digital boda logistics, establishes confidential reporting hotlines, and enforces immediate membership revocation for sexual misconduct.'
  },
  {
    id: 'pol-006',
    title: 'Environmental Protection and E-Mobility Transition Policy',
    code: 'DBDDAK-POL-006',
    category: 'Sustainability',
    version: '1.2',
    effectiveDate: '2024-08-01',
    responsibleDepartment: 'Innovation & Sustainable Mobility',
    summary: 'Framework supporting the transition to clean electric motorcycles (EVs), battery-swapping infrastructure, responsible used-oil disposal, and carbon reduction in urban hubs.',
    fileSize: '940 KB',
    downloadUrl: '#',
    content: 'Outlines association partnerships with green energy providers, EV manufacturers, concessionary financing for electric bikes, and community tree planting drives.'
  },
  {
    id: 'pol-007',
    title: 'Data Protection and Privacy Policy (Kenya Data Protection Act 2019)',
    code: 'DBDDAK-POL-007',
    category: 'Compliance & Legal',
    version: '2.1',
    effectiveDate: '2024-01-10',
    responsibleDepartment: 'Digital Transformation & Legal Desk',
    summary: 'Defines how member identification data, biometric photos, GPS telemetry, and financial records are processed, secured, and retained under Office of the Data Protection Commissioner (ODPC) guidelines.',
    fileSize: '1.1 MB',
    downloadUrl: '#',
    content: 'Comprehensive safeguards ensuring member data is collected only for lawful membership administration, verification, and welfare benefits with zero unauthorized 3rd-party sharing.'
  },
  {
    id: 'pol-008',
    title: 'Welfare, SACCO and Benevolent Fund Operational Guidelines',
    code: 'DBDDAK-POL-008',
    category: 'Financial Inclusion',
    version: '3.0',
    effectiveDate: '2024-02-15',
    responsibleDepartment: 'Economic Empowerment & SACCO Desk',
    summary: 'SOPs governing emergency rider benevolent grants, hospitalization relief, funeral assistance, and cooperative savings mobilization.',
    fileSize: '780 KB',
    downloadUrl: '#',
    content: 'Rules governing the disbursement of benevolent funds in the event of rider hospitalization, road crash incapacitation, or bereavement.'
  }
];

export const INITIAL_LEADERSHIP: LeadershipMember[] = [
  {
    id: 'lead-001',
    name: 'Kevin Mubadi',
    position: 'National Chairperson',
    level: 'National Executive',
    term: '2023 - 2028',
    bio: 'Pioneering mobility leader and visionary champion for the formalization, dignification, and policy representation of over 1.8 million boda boda riders across Kenya.',
    phone: '+254 710 353 974',
    email: 'chairperson@digitalboda.co.ke',
    photoUrl: '/src/assets/images/hero_kenyan_boda_riders_1793478786224.jpg',
    active: true
  },
  {
    id: 'lead-002',
    name: 'Samuel Mumo',
    position: 'National Secretary General',
    level: 'National Executive',
    term: '2023 - 2028',
    bio: 'Administrative strategist overseeing association governance, legal advocacy, multi-county secretariat coordination, and national regulatory dialogues.',
    phone: '+254 702 423 004',
    email: 'secretary@digitalboda.co.ke',
    photoUrl: '/src/assets/images/safety_training_workshop_1793478786811.jpg',
    active: true
  },
  {
    id: 'lead-003',
    name: 'Grace Kwamboka',
    position: 'National Treasurer & SACCO Liaison',
    level: 'National Executive',
    term: '2023 - 2028',
    bio: 'Financial inclusion specialist steering rider financial literacy, micro-savings, digital M-Pesa checkoff systems, and asset finance negotiations.',
    phone: '+254 723 983 222',
    email: 'finance@digitalboda.co.ke',
    photoUrl: '/src/assets/images/delivery_rider_digital_1793478788227.jpg',
    active: true
  },
  {
    id: 'lead-004',
    name: 'Hassan Abdi',
    position: 'Director of Road Safety & Enforcement',
    level: 'National Secretariat',
    term: '2024 - 2027',
    bio: 'Certified defensive riding master trainer working hand-in-hand with NTSA, Traffic Police, and county safety councils to curb road carnage.',
    email: 'safety@digitalboda.co.ke',
    photoUrl: '/src/assets/images/safety_training_workshop_1793478786811.jpg',
    active: true
  },
  {
    id: 'lead-005',
    name: 'Joshua Odhiambo',
    position: 'Nairobi County Coordinator',
    level: 'County Leadership',
    county: 'Nairobi',
    term: '2023 - 2026',
    bio: 'Oversees 17 sub-counties and over 400 stage chairpersons within Nairobi City County, coordinating stage peace and digital app rider rights.',
    phone: '+254 712 001 928',
    email: 'nairobi@digitalboda.co.ke',
    photoUrl: '/src/assets/images/community_welfare_boda_1793478788981.jpg',
    active: true
  },
  {
    id: 'lead-006',
    name: 'Amina Salim',
    position: 'Coast Region / Mombasa County Coordinator',
    level: 'County Leadership',
    county: 'Mombasa',
    term: '2023 - 2026',
    bio: 'Dedicated grassroots organizer mobilizing maritime and urban delivery riders, championing rider healthcare and coastal youth employment.',
    phone: '+254 733 441 992',
    email: 'mombasa@digitalboda.co.ke',
    photoUrl: '/src/assets/images/hero_kenyan_boda_riders_1793478786224.jpg',
    active: true
  }
];

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: 'news-001',
    slug: 'dbddak-partners-with-ntsa-for-national-rider-sensitization',
    title: 'DBDDAK Partners with NTSA for Nationwide Road Safety and Sensitization Campaign',
    category: 'Regulatory Update',
    publishedAt: '2026-10-24T08:00:00Z',
    author: 'National Secretariat',
    summary: 'Joint nationwide initiative rolls out free defensive driving refresher clinics, KEBS-compliant dual helmet distribution, and digital license verification for over 50,000 operators.',
    content: 'The Digital Boda Drivers and Deliveries Association of Kenya (DBDDAK), in conjunction with the National Transport and Safety Authority (NTSA) and the Ministry of Roads and Transport, has officially unveiled a nationwide road safety sensitization drive. The campaign aims to drastically reduce motorcycle road crashes through structured education on junction discipline, blind spots around heavy freight vehicles, and mandatory pillion helmet enforcement.',
    imageUrl: '/src/assets/images/safety_training_workshop_1793478786811.jpg',
    featured: true
  },
  {
    id: 'news-002',
    slug: 'digital-boda-id-system-curbs-crime-and-impersonation',
    title: 'Digital Membership ID & Live QR Verification Rollout Curbs Impersonation',
    category: 'Official Statement',
    publishedAt: '2026-10-18T10:30:00Z',
    author: 'Communications Desk',
    summary: 'Law enforcement and corporate clients commend DBDDAK for launching real-time QR card verification, protecting law-abiding digital riders and enhancing customer trust.',
    content: 'Following widespread reports of rogue operators masquerading as app-based couriers to breach secure estates and commercial parks, DBDDAK has activated its real-time public verification system. Estate security teams and customers can now scan the QR code on any member’s card to verify their genuine active standing in seconds, fostering transparency and safety.',
    imageUrl: '/src/assets/images/delivery_rider_digital_1793478788227.jpg'
  },
  {
    id: 'news-003',
    slug: 'e-boda-financing-partnership-announced',
    title: 'DBDDAK Secures Landmark Green Financing for 5,000 Electric Motorcycles',
    category: 'Advocacy',
    publishedAt: '2026-10-05T12:00:00Z',
    author: 'Economic Empowerment Desk',
    summary: 'Groundbreaking MoU provides registered members with subsidized asset financing for electric boda bodas, cutting daily fueling costs by up to 60%.',
    content: 'In alignment with the Kenya National Climate Change Action Plan, DBDDAK has signed an agreement with leading clean energy mobility providers and green financial institutions. Active members in good standing can now transition from internal combustion engines to high-performance electric motorcycles with battery swapping networks across Nairobi, Nakuru, and Kisumu.',
    imageUrl: '/src/assets/images/community_welfare_boda_1793478788981.jpg'
  }
];

export const INITIAL_EVENTS: AssociationEvent[] = [
  {
    id: 'evt-001',
    title: 'Nairobi County Boda Boda Road Safety Sensitization Clinic',
    eventType: 'Safety Sensitization',
    date: '2026-11-15',
    time: '08:30 AM - 04:00 PM',
    location: 'Nyayo National Stadium Gymnasium Grounds, Nairobi',
    county: 'Nairobi',
    targetAudience: 'All registered digital boda and delivery riders in Nairobi County',
    attendeesCount: 850,
    status: 'Upcoming',
    description: 'Comprehensive day-long road safety masterclass featuring practical obstacle maneuvering, helmet fitting certifications, first-aid crash response, and NTSA licensing desks.',
    registrationOpen: true
  },
  {
    id: 'evt-002',
    title: 'Coast Regional Chapter Stakeholder & SACCO Financial Forum',
    eventType: 'County Forum',
    date: '2026-11-28',
    time: '09:00 AM - 02:00 PM',
    location: 'Tudor Water Sports Conference Centre, Mombasa',
    county: 'Mombasa',
    targetAudience: 'Stage chairpersons, delivery fleet operators, and SACCO delegates',
    attendeesCount: 320,
    status: 'Upcoming',
    description: 'Strategic engagement focusing on group medical insurance, digital micro-savings via M-Pesa checkoff, and municipal parking permit harmonisation.',
    registrationOpen: true
  },
  {
    id: 'evt-003',
    title: 'DBDDAK National Annual Delegates Conference (ADC 2026)',
    eventType: 'National AGM',
    date: '2026-12-12',
    time: '08:00 AM - 05:00 PM',
    location: 'Bomas of Kenya Auditorium, Nairobi',
    county: 'Nairobi',
    targetAudience: 'Elected National, County, and Sub-County association delegates',
    attendeesCount: 1200,
    status: 'Upcoming',
    description: 'The supreme annual policy-setting convention of the association. Presentation of annual financial audits, constitutional amendments, and strategic elections.',
    registrationOpen: true
  }
];

export const INITIAL_PROJECTS: ProjectImpact[] = [
  {
    id: 'prj-001',
    title: 'National Helmet Standards & Dual-Protection Campaign',
    tagline: 'Protecting Rider and Pillion on Every Trip',
    location: 'Nairobi, Kiambu, Machakos & Nakuru',
    county: 'Multi-County',
    implementationDate: '2024 - Present',
    partners: ['NTSA Kenya', 'Kenya Red Cross', 'County Governments'],
    metrics: [
      { label: 'Helmets Distributed', value: '45,000+' },
      { label: 'Crash Fatality Reduction', value: '-34%' },
      { label: 'Sensitized Riders', value: '78,000+' }
    ],
    description: 'A relentless nationwide initiative guaranteeing that every motorcycle on a commercial trip carries two certified helmets, complete with hygiene hair nets and reflective gear.',
    imageUrl: '/src/assets/images/safety_training_workshop_1793478786811.jpg',
    status: 'Active'
  },
  {
    id: 'prj-002',
    title: 'Electric Boda Transition & Urban Clean Mobility Project',
    tagline: 'Cutting Operating Costs While Cleaning Kenya’s Air',
    location: 'Nairobi CBD, Westlands, Upper Hill, Industrial Area',
    county: 'Nairobi',
    implementationDate: '2025 - Present',
    partners: ['Ministry of Environment', 'Spiro Africa', 'Roam Electric'],
    metrics: [
      { label: 'Active Electric Bikes', value: '3,200+' },
      { label: 'Rider Daily Savings', value: 'KSh 450/day' },
      { label: 'CO2 Abated', value: '1,800 Tons' }
    ],
    description: 'Empowering boda riders to switch from petrol to electric power with zero down-payment battery swap architecture, increasing daily net income by over 40%.',
    imageUrl: '/src/assets/images/delivery_rider_digital_1793478788227.jpg',
    status: 'Expanding'
  },
  {
    id: 'prj-003',
    title: 'Boda Care Benevolent & Community Welfare Fund',
    tagline: 'No Rider Left Behind in Times of Crisis',
    location: 'All 47 Counties',
    county: 'Nationwide',
    implementationDate: '2023 - Present',
    partners: ['APA Insurance', 'CIC Group', 'Co-operative Bank of Kenya'],
    metrics: [
      { label: 'Hospitalization Claims Settled', value: 'KSh 18.4M' },
      { label: 'Families Assisted', value: '1,420' },
      { label: 'Active Fund Contributors', value: '32,000+' }
    ],
    description: 'A community-financed safety net that provides immediate financial relief within 4 hours of a crash or medical emergency, ending distress harambees.',
    imageUrl: '/src/assets/images/community_welfare_boda_1793478788981.jpg',
    status: 'Active'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'aud-001',
    timestamp: '2026-10-31T09:15:22Z',
    actorName: 'Admin Secretariat',
    actorRole: 'Membership Administrator',
    action: 'MEMBER_VERIFIED',
    target: 'DBDDAK-NRB-2026-0842',
    ipAddress: '197.237.142.9',
    details: 'Verified standing for Kennedy Mwangi Gitau upon corporate client security query.'
  },
  {
    id: 'aud-002',
    timestamp: '2026-10-30T16:40:11Z',
    actorName: 'Director of Road Safety',
    actorRole: 'Safety and Security Officer',
    action: 'STATUS_SUSPENDED',
    target: 'DBDDAK-MSA-2025-0318',
    ipAddress: '197.237.88.4',
    details: 'Suspension enacted for Omar Bakari Mtwana pending disciplinary board review.'
  },
  {
    id: 'aud-003',
    timestamp: '2026-10-30T10:14:00Z',
    actorName: 'Applicant Self-Service',
    actorRole: 'Public Applicant',
    action: 'APPLICATION_SUBMITTED',
    target: 'APP-2026-9814',
    ipAddress: '105.163.2.144',
    details: 'New application registered for Peter Kamau Ndung\'u (Kasarani Sub-County).'
  }
];
