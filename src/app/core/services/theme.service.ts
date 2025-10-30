import { Injectable, signal, computed } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Theme = 'light' | 'dark' | 'auto';

export interface ThemeConfig {
  name: string;
  displayName: string;
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    background: string;
    surface: string;
    text: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'app_theme';
  private readonly THEME_CONFIG_KEY = 'theme_config';
  
  // Default themes
  private readonly defaultThemes: Record<string, ThemeConfig> = {
    light: {
      name: 'light',
      displayName: 'Light',
      colors: {
        primary: '#3b82f6',
        secondary: '#64748b',
        success: '#22c55e',
        warning: '#f59e0b',
        error: '#ef4444',
        background: '#ffffff',
        surface: '#f8fafc',
        text: '#1e293b',
      }
    },
    dark: {
      name: 'dark',
      displayName: 'Dark',
      colors: {
        primary: '#60a5fa',
        secondary: '#94a3b8',
        success: '#4ade80',
        warning: '#fbbf24',
        error: '#f87171',
        background: '#0f172a',
        surface: '#1e293b',
        text: '#f1f5f9',
      }
    }
  };

  // Signals for reactive state management
  private readonly _currentTheme = signal<Theme>('light');
  private readonly _customThemes = signal<Record<string, ThemeConfig>>({});
  private readonly _isDarkMode = signal<boolean>(false);

  // Public readonly signals
  readonly currentTheme = this._currentTheme.asReadonly();
  readonly customThemes = this._customThemes.asReadonly();
  readonly isDarkMode = this._isDarkMode.asReadonly();

  // Computed signals
  readonly availableThemes = computed(() => {
    const custom = this._customThemes();
    return { ...this.defaultThemes, ...custom };
  });

  readonly currentThemeConfig = computed(() => {
    const themes = this.availableThemes();
    return themes[this._currentTheme()] || this.defaultThemes['light'];
  });

  constructor() {
    this.initializeTheme();
    this.setupSystemThemeListener();
  }

  private initializeTheme(): void {
    const savedTheme = this.getStoredTheme();
    this.setTheme(savedTheme);
  }

  setTheme(theme: Theme): void {
    this._currentTheme.set(theme);
    this.applyTheme(theme);
    this.saveTheme(theme);
  }

  toggleTheme(): void {
    const newTheme = this._isDarkMode() ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  createCustomTheme(name: string, config: Omit<ThemeConfig, 'name'>): void {
    const customThemes = { ...this._customThemes() };
    customThemes[name] = { ...config, name };
    this._customThemes.set(customThemes);
    this.saveCustomThemes(customThemes);
  }

  updateCustomTheme(name: string, updates: Partial<ThemeConfig>): void {
    const customThemes = { ...this._customThemes() };
    if (customThemes[name]) {
      customThemes[name] = { ...customThemes[name], ...updates };
      this._customThemes.set(customThemes);
      this.saveCustomThemes(customThemes);
    }
  }

  deleteCustomTheme(name: string): void {
    const customThemes = { ...this._customThemes() };
    delete customThemes[name];
    this._customThemes.set(customThemes);
    this.saveCustomThemes(customThemes);
  }

  private applyTheme(theme: Theme): void {
    const isDark = this.shouldUseDarkMode(theme);
    this._isDarkMode.set(isDark);
    
    // Apply theme to document
    const root = document.documentElement;
    root.classList.toggle('dark', isDark);
    
    // Apply custom CSS variables
    const themeConfig = this.getThemeConfig(theme);
    if (themeConfig) {
      this.applyThemeColors(themeConfig);
    }
  }

  private shouldUseDarkMode(theme: Theme): boolean {
    if (theme === 'dark') return true;
    if (theme === 'light') return false;
    if (theme === 'auto') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  }

  private getThemeConfig(theme: Theme): ThemeConfig | null {
    const themes = this.availableThemes();
    return themes[theme] || null;
  }

  private applyThemeColors(config: ThemeConfig): void {
    const root = document.documentElement;
    Object.entries(config.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  }

  private setupSystemThemeListener(): void {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', () => {
        if (this._currentTheme() === 'auto') {
          this.applyTheme('auto');
        }
      });
    }
  }

  private getStoredTheme(): Theme {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(this.THEME_KEY);
      return (stored as Theme) || 'light';
    }
    return 'light';
  }

  private saveTheme(theme: Theme): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.THEME_KEY, theme);
    }
  }

  private saveCustomThemes(themes: Record<string, ThemeConfig>): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.THEME_CONFIG_KEY, JSON.stringify(themes));
    }
  }

  private loadCustomThemes(): Record<string, ThemeConfig> {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(this.THEME_CONFIG_KEY);
      return stored ? JSON.parse(stored) : {};
    }
    return {};
  }
}
