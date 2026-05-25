import { KycStatus } from './enums/kyc-status.enum';

export interface Kyc {
    id: string; 
    userId: string;
    documentType: string;
    documentUrl: string;
    status: KycStatus;
    reviewedBy?: string; // admin who reviewed the KYC
    rejectionReason?: string; // reason for rejection if status is REJECTED
    submittedAt: Date;
}
   