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
  businessType: string;       // ← new
  approvalStatus: string;
  businessProfile?: string;
  county: string;             // ← new
  joinDate: Date;
}

export interface RegisterBusinessRequest {
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  county: string;
  businessType: 'FARM' | 'ENTERPRISE';   
  businessProfile?: string;
}