import { Component ,OnInit,inject }  from '@angular/core';
import { ReactiveFormsModule,
FormBuilder, 
FormGroup,
Validators ,
AbstractControl,
ValidationErrors,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


//angular material Modules 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/auth/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

// function to confirm and validate the passwords

function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
     return password === confirmPassword ? null : { passwordMismatch: true };
}


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule,

  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent implements  OnInit{
  registerForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  showPassword = false;
  showConfirmPassword = false;
  
  
private formBuilder = inject(FormBuilder);
private authService = inject(AuthService);
private router = inject(Router);


  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        username: ['', Validators.required],
        firstName: ['', Validators.required],
        surName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
        phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      },
      { validators: passwordMatchValidator }
    );
  }
  get f() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    //Destructure confirm password from the form value and rest of the data
    const { confirmPassword, ...formData } = this.registerForm.value;
    const registerPayload = { ...formData, role: 'FARMER' as const };
    this.authService.register(registerPayload).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/verify-otp'],
           { queryParams: { email: registerPayload.email } });
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
        this.isLoading = false;
      }
    });
  }

  // to show password and confirm password
  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleShowConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}

    



  
