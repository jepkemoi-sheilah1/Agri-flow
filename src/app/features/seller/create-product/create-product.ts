import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

import { DashboardLayout } from '../../../shared/components/dashboard-layout/dashboard-layout';
import { ProductService } from '../../../core/services/product.service';
import { Category, Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    DashboardLayout,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatCardModule,
    MatDividerModule,
  ],
  templateUrl: './create-product.html',
  styleUrl: './create-product.css',
})
export class CreateProduct implements OnInit {

  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  productForm!: FormGroup;
  categories: Category[] = [];
  isLoading = false;
  errorMessage = '';

  imageFile: File | null = null;
  imagePreviewUrl: string | null = null;

  readonly units = ['kg', 'g', 'litre', 'piece'];

  ngOnInit(): void {
    this.buildForm();
    this.loadCategories();
  }

  private buildForm(): void {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      description: ['', Validators.required],
      price:       [null, [Validators.required, Validators.min(0)]],
      quantity:    [null, [Validators.required, Validators.min(0)]],
      unit:        ['', Validators.required],
      categoryId:  ['', Validators.required],
    });
  }

  private loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (cats) => (this.categories = cats),
      error: () => (this.errorMessage = 'Failed to load categories.'),
    });
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    this.imageFile = input.files[0];

    const reader = new FileReader();
    reader.onload = () => (this.imagePreviewUrl = reader.result as string);
    reader.readAsDataURL(this.imageFile);
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const payload = this.productForm.getRawValue();

    this.productService.createProduct(payload).subscribe({
      next: (createdProduct) => {
        if (this.imageFile) {
          this.uploadImage(createdProduct.id);
        } else {
          this.onSuccess();
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err?.error?.message ?? 'Failed to create product. Please try again.';
      },
    });
  }

  private uploadImage(productId: string): void {
    const formData = new FormData();
    formData.append('image', this.imageFile!);

   this.productService.uploadProductImage(productId, this.imageFile!) .subscribe({
      next: () => this.onSuccess(),
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Product created but image upload failed. You can add the image later.';
      },
    });
  }

  private onSuccess(): void {
    this.isLoading = false;
    this.snackBar.open('Product added successfully!', 'Close', { duration: 3000 });
    this.router.navigate(['/seller']);
  }

  removeImage(): void {
    this.imageFile = null;
    this.imagePreviewUrl = null;
  }

  get f() {
    return this.productForm.controls;
  }
}