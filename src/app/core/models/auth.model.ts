
export interface AuthResponse {
    accessToken: string;   
    refreshToken: string;   
    role: string;
    username: string;
}

export interface LoginRequest {
    email: string;
    password: string;   
}

export interface  RegisterRequest {
    username: string;
    firstName: string;
    middleName?: string;
    surName: string;
    email: string;
    password: string;
    phoneNumber: string;
    role: 'farmer'; // e.g. ['BUYER', 'SELLER']
    
}