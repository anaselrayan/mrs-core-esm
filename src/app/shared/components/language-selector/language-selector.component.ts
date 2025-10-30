import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService, Locale } from '../../../core/services/i18n.service';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative">
      <button
        type="button"
        class="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
        (click)="toggleDropdown()"
      >
        <span>{{ currentLocaleInfo().flag }} {{ currentLocaleInfo().name }}</span>
        <svg class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        *ngIf="isDropdownOpen()"
        class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
      >
        <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="language-menu">
          <a
            *ngFor="let locale of availableLocales()"
            (click)="selectLocale(locale.code); toggleDropdown()"
            class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            [class.font-semibold]="currentLocale() === locale.code"
            role="menuitem"
          >
            {{ locale.flag }} {{ locale.name }}
          </a>
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
export class LanguageSelectorComponent {
  private readonly i18nService = inject(I18nService);

  readonly isDropdownOpen = signal(false);

  // Expose i18n service signals
  readonly currentLocale = this.i18nService.currentLocale;
  readonly currentLocaleInfo = this.i18nService.currentLocaleInfo;
  readonly availableLocales = computed(() => this.i18nService.getAvailableLocales());

  toggleDropdown(): void {
    this.isDropdownOpen.update(value => !value);
  }

  selectLocale(localeCode: string): void {
    this.i18nService.setLocale(localeCode);
  }
}