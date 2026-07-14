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
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileRequest {
  username: string;
  firstName: string;
  middleName?: string;
  surName: string;
  profilePicture?: string;
  phoneNumber: string;
  email: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}