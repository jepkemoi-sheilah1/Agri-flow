
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PublicNavbarComponent } from '../components/public-navbar/public-navbar.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink, PublicNavbarComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {}