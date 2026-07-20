import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface CreateStaffRequest {
  username: string;
  firstName: string;
  middleName?: string;
  surName: string;
  county: string;
  grossSalary: number;
  idNumber: string;
  employmentDate: string;
  phoneNumber: string;
  email: string;
  profilePicture?: string;
}

export interface StaffCreatedResponse {
  id: string;
  username: string;
  email: string;
  temporaryPassword: string;
}

export interface StaffResponse {
  id: string;
  username: string;
  firstName: string;
  middleName?: string;
  surName: string;
  grossSalary: number;
  idNumber: string;
  employmentDate: string;
  status: string;
  county: string;
  phoneNumber: string;
  email: string;
  mustChangePassword: boolean;
  profilePicture?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface RoleResponse {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface PermissionResponse {
  id: string;
  code: string;
  description: string;
  category: string;
}

export interface StaffAccessResponse {
  staffId: string;
  roles: RoleResponse[];
  overrides: {
    permissionId: string;
    permissionCode: string;
    effect: string;
  }[];
  effectivePermissions: string[];
}

export interface AssignmentResponse {
  id: string;
  staffId: string;
  businessId: string;
  status: string;
  businessResponse: {
    id: string;
    businessName: string;
    businessEmail: string;
    businessPhone: string;
    businessType: string;
    approvalStatus: string;
    county: string;
    joinDate: string;
  };
  createdAt: string;
  updatedAt: string;
}

@Injectable({ providedIn: 'root' })
export class StaffService {
  private http = inject(HttpClient);
  private base = environment.authApiUrl;

  // Staff Auth
  registerStaff(data: CreateStaffRequest): Observable<StaffCreatedResponse> {
    return this.http.post<StaffCreatedResponse>(`${this.base}/api/staff/auth/register`, data);
  }

  getMyStaffProfile(): Observable<StaffResponse> {
    return this.http.get<StaffResponse>(`${this.base}/api/staff/me`);
  }

  // Admin — Roles
  getAllRoles(): Observable<RoleResponse[]> {
    return this.http.get<RoleResponse[]>(`${this.base}/api/admin/roles`);
  }

  // Admin — Permissions
  getAllPermissions(): Observable<PermissionResponse[]> {
    return this.http.get<PermissionResponse[]>(`${this.base}/api/admin/permissions`);
  }

  // Admin — Staff Access
  getStaffAccess(staffId: string): Observable<StaffAccessResponse> {
    return this.http.get<StaffAccessResponse>(`${this.base}/api/admin/staff/${staffId}/access`);
  }

  assignRole(staffId: string, roleId: string): Observable<void> {
    return this.http.post<void>(`${this.base}/api/admin/staff/${staffId}/roles`, { roleId });
  }

  removeRole(staffId: string, roleId: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/api/admin/staff/${staffId}/roles/${roleId}`);
  }

  grantPermission(staffId: string, permissionId: string): Observable<void> {
    return this.http.post<void>(
      `${this.base}/api/admin/staff/${staffId}/permissions/grant`, { permissionId }
    );
  }

  revokePermission(staffId: string, permissionId: string): Observable<void> {
    return this.http.post<void>(
      `${this.base}/api/admin/staff/${staffId}/permissions/revoke`, { permissionId }
    );
  }

  // Admin — Approvals
  getUnassignedApprovals(): Observable<AssignmentResponse[]> {
    return this.http.get<AssignmentResponse[]>(`${this.base}/api/admin/approvals/unassigned`);
  }

  assignStaffToApproval(assignmentId: string, staffId: string): Observable<any> {
    return this.http.post(`${this.base}/api/admin/approvals/${assignmentId}/assign`, { staffId });
  }

  getBusinessApproval(businessId: string): Observable<any> {
    return this.http.get(`${this.base}/api/admin/approvals/business/${businessId}`);
  }

  // Staff Assignments
  getPendingAssignments(): Observable<AssignmentResponse[]> {
    return this.http.get<AssignmentResponse[]>(`${this.base}/api/staff/assignments/pending`);
  }

  getCompletedAssignments(): Observable<AssignmentResponse[]> {
    return this.http.get<AssignmentResponse[]>(`${this.base}/api/staff/assignments/completed`);
  }

  getAllAssignments(): Observable<AssignmentResponse[]> {
    return this.http.get<AssignmentResponse[]>(`${this.base}/api/staff/assignments/all`);
  }
}