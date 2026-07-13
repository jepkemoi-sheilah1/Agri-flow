import { KycStatus } from './enums/kyc-status.enum';

export interface Kyc {
  id: string;
  userId: string;
  documentType: string;
  documentUrl: string;
  status: KycStatus;
  reviewedBy?: string;
  rejectionReason?: string;
  submittedAt: Date;
}

export interface BusinessResponse {
  id: string;
  userId: string;
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  approvalStatus: string;
  businessProfile?: string;
  county: string;
  joinDate: Date;
}

export interface RegisterBusinessRequest {
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  county: string;
  businessProfile?: string;
}

export interface User {
  id: string;
  username: string;
  firstName: string;
  surName: string;
  email: string;
  phoneNumber: string;
  role: 'FARMER' | 'BUYER' | 'ADMIN';
}