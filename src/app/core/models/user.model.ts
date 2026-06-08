import { Role } from './enums/role.enum';
import { KycStatus } from './enums/kyc-status.enum';

export interface User {
    id: string;
    username: string;
    firstName: string;
    middleName?: string;
    surName: string;
    email: string;
    phoneNumber: string;
    role: string;              
    mustChangePassword: boolean;
    kycVerified: boolean;
    profilePicture?: string;
    approvedBy?: string;
    createdAt: Date;
    updatedAt: Date;
}