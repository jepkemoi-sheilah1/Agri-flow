import { Role } from './enums/role.enum';
import { KycStatus } from './enums/kyc-status.enum';

export interface User {
    id: string;
    username: string;
    firstName: string;
    surName: string;
    email: string;
    phoneNumber: string;
    address: string;
    roles: Role[];
    kycStatus: KycStatus;
    createdAt: Date;
    
}