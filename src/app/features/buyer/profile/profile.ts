import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';

import { DashboardLayout } from '../../../shared/components/dashboard-layout/dashboard-layout';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DashboardLayout,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDividerModule,
    MatTabsModule,
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  private userService = inject(UserService);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private cdr = inject(ChangeDetectorRef);

  user: User | null = null;
  isLoading = false;
  isSaving = false;
  isChangingPassword = false;
  errorMessage = '';

  profileForm!: FormGroup;
  passwordForm!: FormGroup;

  ngOnInit(): void {
    this.buildForms();
    this.loadProfile();
  }

  buildForms(): void {
    this.profileForm = this.fb.group({
      username:   ['', Validators.required],
      firstName:  ['', Validators.required],
      middleName: [''],
      surName:    ['', Validators.required],
      email:      ['', [Validators.required, Validators.email]],
      phoneNumber:['', Validators.required],
    });

    this.passwordForm = this.fb.group({
      oldPassword:        ['', Validators.required],
      newPassword:        ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', Validators.required],
    });
  }

  loadProfile(): void {
    this.isLoading = true;
    this.userService.getMyProfile().subscribe({
      next: (user) => {
        this.user = user;
        this.profileForm.patchValue({
          username:    user.username,
          firstName:   user.firstName,
          middleName:  user.middleName ?? '',
          surName:     user.surName,
          email:       user.email,
          phoneNumber: user.phoneNumber,
        });
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Failed to load profile.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  onSaveProfile(): void {
    if (this.profileForm.invalid || !this.user) return;
    this.isSaving = true;
    this.userService.updateProfile(this.user.id, this.profileForm.getRawValue()).subscribe({
      next: (updated) => {
        this.user = updated;
        this.isSaving = false;
        this.snackBar.open('Profile updated successfully!', 'Close', { duration: 3000 });
        this.cdr.detectChanges();
      },
      error: () => {
        this.isSaving = false;
        this.snackBar.open('Failed to update profile.', 'Close', { duration: 3000 });
        this.cdr.detectChanges();
      }
    });
  }

  onChangePassword(): void {
    if (this.passwordForm.invalid) return;
    const { newPassword, confirmNewPassword } = this.passwordForm.value;
    if (newPassword !== confirmNewPassword) {
      this.snackBar.open('Passwords do not match.', 'Close', { duration: 3000 });
      return;
    }
    this.isChangingPassword = true;
    this.userService.changePassword(this.passwordForm.getRawValue()).subscribe({
      next: () => {
        this.isChangingPassword = false;
        this.passwordForm.reset();
        this.snackBar.open('Password changed successfully!', 'Close', { duration: 3000 });
        this.cdr.detectChanges();
      },
      error: () => {
        this.isChangingPassword = false;
        this.snackBar.open('Failed to change password.', 'Close', { duration: 3000 });
        this.cdr.detectChanges();
      }
    });
  }
}