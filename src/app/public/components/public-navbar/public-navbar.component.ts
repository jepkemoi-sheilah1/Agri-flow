
// public-navbar.component.ts
import { Component, HostListener, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
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
  private router = inject(Router);

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

  navigateTo(fragment: string, event?: MouseEvent) {
    if (event) event.preventDefault();
    // Close menu immediately for better UX
    this.closeMenu();

    // Use the Router to set the fragment, then smooth-scroll to the element if present
    this.router.navigate(['/'], { fragment }).then(() => {
      const el = document.getElementById(fragment);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
}