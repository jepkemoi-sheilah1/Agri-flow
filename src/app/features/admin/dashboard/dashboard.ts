import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [MatButtonModule, MatCardModule, MatIconModule, RouterLink, Navbar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private authService = inject(AuthService);
  user$ = this.authService.getUser();
}