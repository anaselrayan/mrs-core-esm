import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User, AuthResponse, LoginRequest } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  
  private readonly API_URL = environment.apiUrl;
  private readonly TOKEN_KEY = 'auth_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly USER_KEY = 'user_data';

  // Signals for reactive state management
  private readonly _isAuthenticated = signal<boolean>(false);
  private readonly _currentUser = signal<User | null>(null);
  private readonly _isLoading = signal<boolean>(false);

  // Public readonly signals
  readonly isAuthenticated = this._isAuthenticated.asReadonly();
  readonly currentUser = this._currentUser.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();

  // Computed signals
  readonly userFullName = computed(() => {
    const user = this._currentUser();
    return user ? `${user.firstName} ${user.lastName}` : '';
  });

  readonly userRole = computed(() => {
    return this._currentUser()?.role?.name || '';
  });

  constructor() {
    this.initializeAuth();
  }

  private initializeAuth(): void {
    const token = this.getToken();
    const user = this.getStoredUser();
    
    if (token && user) {
      this._isAuthenticated.set(true);
      this._currentUser.set(user);
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    this._isLoading.set(true);
    
    return this.http.post<ApiResponse<AuthResponse>>(
      `${this.API_URL}${environment.apiEndpoints.auth.login}`,
      credentials
    ).pipe(
      map(response => response.data),
      tap(authResponse => {
        this.setAuthData(authResponse);
        this._isAuthenticated.set(true);
        this._currentUser.set(authResponse.user);
      }),
      catchError(error => {
        this._isLoading.set(false);
        return throwError(() => error);
      }),
      tap(() => this._isLoading.set(false))
    );
  }

  logout(): Observable<void> {
    const refreshToken = this.getRefreshToken();
    
    return this.http.post<void>(
      `${this.API_URL}${environment.apiEndpoints.auth.logout}`,
      { refreshToken }
    ).pipe(
      tap(() => {
        this.clearAuthData();
        this._isAuthenticated.set(false);
        this._currentUser.set(null);
        this.router.navigate(['/auth/login']);
      }),
      catchError(() => {
        // Even if logout fails on server, clear local data
        this.clearAuthData();
        this._isAuthenticated.set(false);
        this._currentUser.set(null);
        this.router.navigate(['/auth/login']);
        return of(void 0);
      })
    );
  }

  refreshToken(): Observable<AuthResponse> {
    const refreshToken = this.getRefreshToken();
    
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http.post<ApiResponse<AuthResponse>>(
      `${this.API_URL}${environment.apiEndpoints.auth.refresh}`,
      { refreshToken }
    ).pipe(
      map(response => response.data),
      tap(authResponse => {
        this.setAuthData(authResponse);
        this._currentUser.set(authResponse.user);
      }),
      catchError(error => {
        this.clearAuthData();
        this._isAuthenticated.set(false);
        this._currentUser.set(null);
        this.router.navigate(['/auth/login']);
        return throwError(() => error);
      })
    );
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<ApiResponse<User>>(
      `${this.API_URL}${environment.apiEndpoints.auth.profile}`
    ).pipe(
      map(response => response.data),
      tap(user => this._currentUser.set(user))
    );
  }

  hasPermission(permission: string): boolean {
    const user = this._currentUser();
    if (!user) return false;
    
    return user.permissions.some(p => p.name === permission);
  }

  hasRole(role: string): boolean {
    const user = this._currentUser();
    return user?.role?.name === role;
  }

  private setAuthData(authResponse: AuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, authResponse.token);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, authResponse.refreshToken);
    localStorage.setItem(this.USER_KEY, JSON.stringify(authResponse.user));
  }

  private clearAuthData(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  private getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  private getStoredUser(): User | null {
    const userData = localStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  getAuthToken(): string | null {
    return this.getToken();
  }
}

// Re-export the ApiResponse interface
interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
  timestamp: string;
}

