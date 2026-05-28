import { User } from './user.model';
import { Role } from './enums/role.enum';


export interface AuthResponse {
    data: {
        refreshToken: string;
        token: string;
        user: User;
    };
}
export interface LoginRequest {
    email: string;
    password: string;   
}

export interface  RegisterRequest {
    userName: string;
    firstName: string;
    surname: string;
    email: string;
    password: string;
    phoneNumber: string;
    role: 'FARMER'; // e.g. ['BUYER', 'SELLER']
    
}