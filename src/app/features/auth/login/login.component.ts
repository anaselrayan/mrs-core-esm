import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { LoadingService } from '../../../core/services/loading.service';
import { I18nService } from '../../../core/services/i18n.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    CardComponent,
    TranslatePipe,
  ],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <!-- Header -->
        <div class="text-center">
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            {{ 'auth.login' | translate }}
          </h2>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Hospital Information System
          </p>
        </div>

        <!-- Login Form -->
        <app-card>
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <!-- Username Field -->
            <div>
              <label for="username" class="form-label">
                {{ 'auth.username' | translate }}
              </label>
              <input
                id="username"
                type="text"
                formControlName="username"
                class="form-input"
                [class.border-error-500]="isFieldInvalid('username')"
                [placeholder]="'auth.username' | translate"
                autocomplete="username"
              />
              <div *ngIf="isFieldInvalid('username')" class="mt-1 text-sm text-error-600">
                <span *ngIf="loginForm.get('username')?.errors?.['required']">
                  {{ 'errors.required' | translate }}
                </span>
              </div>
            </div>

            <!-- Password Field -->
            <div>
              <label for="password" class="form-label">
                {{ 'auth.password' | translate }}
              </label>
              <div class="relative">
                <input
                  id="password"
                  [type]="showPassword() ? 'text' : 'password'"
                  formControlName="password"
                  class="form-input pr-10"
                  [class.border-error-500]="isFieldInvalid('password')"
                  [placeholder]="'auth.password' | translate"
                  autocomplete="current-password"
                />
                <button
                  type="button"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                  (click)="togglePasswordVisibility()"
                >
                  <svg *ngIf="!showPassword()" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg *ngIf="showPassword()" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                </button>
              </div>
              <div *ngIf="isFieldInvalid('password')" class="mt-1 text-sm text-error-600">
                <span *ngIf="loginForm.get('password')?.errors?.['required']">
                  {{ 'errors.required' | translate }}
                </span>
                <span *ngIf="loginForm.get('password')?.errors?.['minlength']">
                  {{ 'errors.minLength' | translate: {'0': 6} }}
                </span>
              </div>
            </div>

            <!-- Remember Me -->
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="rememberMe"
                  type="checkbox"
                  formControlName="rememberMe"
                  class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label for="rememberMe" class="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                  {{ 'auth.rememberMe' | translate }}
                </label>
              </div>

              <div class="text-sm">
                <a href="#" class="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
                  {{ 'auth.forgotPassword' | translate }}
                </a>
              </div>
            </div>

            <!-- Submit Button -->
            <div>
              <app-button
                type="submit"
                variant="primary"
                size="lg"
                [fullWidth]="createSignal(true)"
                [loading]="isLoading()"
                [disabled]="createSignal(loginForm.invalid)"
              >
                <span *ngIf="!isLoading()">{{ 'auth.login' | translate }}</span>
                <span *ngIf="isLoading()">{{ 'common.loading' | translate }}</span>
              </app-button>
            </div>
          </form>
        </app-card>

        <!-- Footer -->
        <div class="text-center">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            © 2024 Hospital Information System. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly notificationService = inject(NotificationService);
  private readonly loadingService = inject(LoadingService);
  private readonly i18nService = inject(I18nService);
  private readonly router = inject(Router);

  // Signals
  readonly showPassword = signal(false);
  readonly isLoading = computed(() => this.authService.isLoading());

  // Form
  readonly loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false]
  });

  // Computed properties
  readonly isFormValid = computed(() => this.loginForm.valid);

  constructor() {
    // Check if user is already authenticated
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      
      this.authService.login(credentials).subscribe({
        next: (response) => {
          this.notificationService.showSuccess(
            this.i18nService.translate('auth.welcomeBack'),
            `${this.i18nService.translate('auth.welcomeBack')}, ${response.user.firstName}!`
          );
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.notificationService.showError(
            this.i18nService.translate('auth.loginFailed'),
            error.error?.message || this.i18nService.translate('auth.invalidCredentials')
          );
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword.set(!this.showPassword());
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  createSignal(value: any) {
    return signal(value);
  }
}
