import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<any>(null);

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  
  // Skip auth for login and refresh token endpoints
  if (isAuthEndpoint(req.url)) {
    return next(req);
  }

  // Add auth token to request
  const authReq = addAuthToken(req, authService);
  
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !isRefreshing) {
        return handle401Error(authReq, next, authService);
      }
      return throwError(() => error);
    })
  );
};

function addAuthToken(req: any, authService: AuthService): any {
  const token = authService.getAuthToken();
  
  if (token) {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  
  return req;
}

function isAuthEndpoint(url: string): boolean {
  const authEndpoints = ['/auth/login', '/auth/refresh'];
  return authEndpoints.some(endpoint => url.includes(endpoint));
}

function handle401Error(req: any, next: any, authService: AuthService): Observable<any> {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return authService.refreshToken().pipe(
      switchMap((authResponse: any) => {
        isRefreshing = false;
        refreshTokenSubject.next(authResponse.token);
        return next(addAuthToken(req, authService));
      }),
      catchError((error) => {
        isRefreshing = false;
        authService.logout().subscribe();
        return throwError(() => error);
      })
    );
  }

  return refreshTokenSubject.pipe(
    filter(token => token !== null),
    take(1),
    switchMap(() => next(addAuthToken(req, authService)))
  );
}
