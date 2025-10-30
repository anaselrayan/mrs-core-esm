import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/services/auth.service';
import { ThemeService } from './core/services/theme.service';
import { LayoutComponent } from './features/layout/layout.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, LayoutComponent],
  template: `
    <app-layout *ngIf="isAuthenticated()">
      <router-outlet></router-outlet>
    </app-layout>
    <router-outlet *ngIf="!isAuthenticated()"></router-outlet>
  `,
  styleUrl: './app.scss'
})
export class App {
  private readonly authService = inject(AuthService);
  private readonly themeService = inject(ThemeService);

  readonly isAuthenticated = this.authService.isAuthenticated;

  constructor() {
    // Initialize theme on app start
    this.themeService.setTheme('light');
  }
}
