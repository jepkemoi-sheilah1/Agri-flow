
// public-navbar.component.ts
import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-public-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './public-navbar.component.html',
  styleUrl: './public-navbar.component.css',
})
export class PublicNavbarComponent {
  isScrolled = signal(false);
  menuOpen = signal(false);

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }

  toggleMenu() {
    this.menuOpen.update(v => !v);
  }

  closeMenu() {
    this.menuOpen.set(false);
  }
}