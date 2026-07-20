import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { Role } from '../../../core/models/enums/role.enum';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);

  loginForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  showPassword = false;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    const { email, password } = this.loginForm.value;

    this.authService.login({ email, password }).subscribe({
      next: (response) => {
        this.isLoading = false;
        const role = response.role?.toUpperCase();
        const token = this.authService.getDecodedToken();
        const businessId = token?.businessId;

        switch (role) {
          case Role.SUPER_ADMIN:
            this.router.navigate(['/super-admin']);
            break;
          case Role.ADMIN:
            this.router.navigate(['/admin']);
            break;
          case Role.FARMER:
            if (businessId) {
              this.router.navigate(['/seller']);
            } else {
              this.router.navigate(['/buyer']);
            }
            break;
          case Role.BUYER:
          default:
            this.router.navigate(['/buyer']);
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err?.error?.message ?? 'Invalid email or password.';
      }
    });
  }
}