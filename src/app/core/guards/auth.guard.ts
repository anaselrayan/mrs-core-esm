import { Injectable, inject } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.checkAuth(route, state);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.checkAuth(route, state);
  }

  private checkAuth(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // Check if user is authenticated
    // if (!this.authService.isAuthenticated()) {
    //   this.router.navigate(['/auth/login'], { 
    //     queryParams: { returnUrl: state.url } 
    //   });
    //   return of(false);
    // }

    // // Check role-based access if specified in route data
    // const requiredRoles = route.data['roles'] as string[];
    // if (requiredRoles && requiredRoles.length > 0) {
    //   const hasRequiredRole = requiredRoles.some(role => 
    //     this.authService.hasRole(role)
    //   );
      
    //   if (!hasRequiredRole) {
    //     this.router.navigate(['/unauthorized']);
    //     return of(false);
    //   }
    // }

    // // Check permission-based access if specified in route data
    // const requiredPermissions = route.data['permissions'] as string[];
    // if (requiredPermissions && requiredPermissions.length > 0) {
    //   const hasRequiredPermission = requiredPermissions.some(permission => 
    //     this.authService.hasPermission(permission)
    //   );
      
    //   if (!hasRequiredPermission) {
    //     this.router.navigate(['/unauthorized']);
    //     return of(false);
    //   }
    // }

    return of(true);
  }
}
