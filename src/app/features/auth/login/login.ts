import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,MatIconModule , RouterLink, MatProgressSpinnerModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent implements OnInit {

  // 1. Injected services
  private router = inject(Router);
  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);

  // 2. Properties
  loginForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  showPassword = false;

  // 3. Lifecycle hooks
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  // 4. Methods
  onSubmit(): void {
    
  // 1. Return early if form is invalid
  if (this.loginForm.invalid) {
    return;
  }

  // 2. Start loading
  this.isLoading = true;
  this.errorMessage = '';

  // 3. Get email and password from form
  const { email, password } = this.loginForm.value;

  // 4. Call login service
  this.authService.login({ email, password}).subscribe({
    next: (response) => {

      // 5. Check roles and navigate
      const roles: string[] = response.data.user.roles || [];

      if (roles.includes('SUPER_ADMIN')) {
    this.router.navigate(['/super-admin']);
} else if (roles.includes('ADMIN')) {
    this.router.navigate(['/admin']);
} else {
    this.router.navigate(['/buyer']);
}

      // 7. Stop loading
      this.isLoading = false;
    },

    error: (error) => {
      // 6. Set error message
      this.errorMessage =
        error?.error?.message || 'Login failed. Please try again.';

      // 7. Stop loading
      this.isLoading = false;
    }
  });
}
  }

