import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ThemeService } from '../../core/services/theme.service';
import { NotificationService } from '../../core/services/notification.service';
import { LoadingService } from '../../core/services/loading.service';
import { I18nService } from '../../core/services/i18n.service';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { NotificationComponent } from '../../shared/components/notification/notification.component';
import { LanguageSelectorComponent } from '../../shared/components/language-selector/language-selector.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonComponent,
    LoadingSpinnerComponent,
    NotificationComponent,
      LanguageSelectorComponent,
    TranslatePipe,
  ],
  template: `
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900" [class.dark]="isDarkMode()">
      <!-- Navigation -->
      <nav class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <!-- Logo and Title -->
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <h1 class="text-xl font-bold text-gray-900 dark:text-white">
                  Hospital Information System
                </h1>
              </div>
            </div>

            <!-- Navigation Links -->
            <div class="hidden md:flex items-center space-x-8">
              <a
                routerLink="/dashboard"
                routerLinkActive="text-primary-600"
                class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {{ 'navigation.dashboard' | translate }}
              </a>
              <a
                routerLink="/patients"
                routerLinkActive="text-primary-600"
                class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {{ 'navigation.patients' | translate }}
              </a>
              <a
                routerLink="/appointments"
                routerLinkActive="text-primary-600"
                class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {{ 'navigation.appointments' | translate }}
              </a>
            </div>

            <!-- User Menu and Actions -->
            <div class="flex items-center space-x-4">
                <!-- Language Selector -->
                <app-language-selector />

              <!-- Theme Toggle -->
              <button
                type="button"
                (click)="toggleTheme()"
                class="p-2 rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <svg *ngIf="!isDarkMode()" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                <svg *ngIf="isDarkMode()" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </button>

              <!-- Notifications -->
              <button
                type="button"
                class="p-2 rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 relative"
              >
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5-5-5 5h5z" />
                </svg>
                <span *ngIf="unreadCount() > 0" class="absolute -top-1 -right-1 h-4 w-4 bg-error-500 text-white text-xs rounded-full flex items-center justify-center">
                  {{ unreadCount() }}
                </span>
              </button>

              <!-- User Menu -->
              <div class="relative">
                <button
                  type="button"
                  class="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <div class="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
                    <span class="text-sm font-medium text-white">
                      {{ userInitials() }}
                    </span>
                  </div>
                  <span class="ml-2 text-gray-700 dark:text-gray-300">
                    {{ userFullName() }}
                  </span>
                </button>
              </div>

              <!-- Logout -->
              <app-button
                variant="outline"
                size="sm"
                (onClick)="logout()"
              >
                {{ 'auth.logout' | translate }}
              </app-button>
            </div>
          </div>
        </div>
      </nav>

      <!-- Main Content -->
      <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <router-outlet></router-outlet>
      </main>

      <!-- Notifications -->
      <div class="fixed top-4 right-4 z-50 space-y-2">
        <app-notification
          *ngFor="let notification of notifications()"
          [notification]="createNotificationSignal(notification)"
          (onClose)="removeNotification($event)"
        />
      </div>

      <!-- Loading Overlay -->
      <div *ngIf="isLoading()" class="fixed inset-0 z-50">
        <app-loading-spinner
          [overlay]="createSignal(true)"
          [message]="loadingMessage()"
          [progress]="loadingProgress()"
        />
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class LayoutComponent {
  private readonly authService = inject(AuthService);
  private readonly themeService = inject(ThemeService);
  private readonly notificationService = inject(NotificationService);
  private readonly loadingService = inject(LoadingService);
  private readonly i18nService = inject(I18nService);
  private readonly router = inject(Router);

  // Signals
  readonly isDarkMode = this.themeService.isDarkMode;
  readonly currentUser = this.authService.currentUser;
  readonly userFullName = this.authService.userFullName;
  readonly isLoading = computed(() => this.loadingService.isLoading());
  readonly loadingMessage = computed(() => this.loadingService.loadingMessage());
  readonly loadingProgress = computed(() => this.loadingService.loadingProgress());
  readonly notifications = this.notificationService.notifications;
  readonly unreadCount = this.notificationService.unreadCount;

  // Computed properties
  readonly userInitials = computed(() => {
    const user = this.currentUser();
    if (!user) return 'U';
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  });

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.notificationService.showSuccess(
          this.i18nService.translate('auth.loggedOut'),
          this.i18nService.translate('auth.loggedOutMessage')
        );
      },
      error: (error) => {
        this.notificationService.showError(
          this.i18nService.translate('errors.generic'),
          this.i18nService.translate('errors.generic')
        );
      }
    });
  }

  removeNotification(notificationId: string): void {
    this.notificationService.removeNotification(notificationId);
  }

  createNotificationSignal(notification: any) {
    return signal(notification);
  }

  createSignal(value: any) {
    return signal(value);
  }
}
