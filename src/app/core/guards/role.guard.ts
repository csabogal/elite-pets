import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const users = this.authService.getAllUsers();

    // Si no hay usuarios, permitir acceso al registro (primer usuario)
    if (users.length === 0 && route.routeConfig?.path === 'register') {
      return true;
    }

    const currentUser = this.authService.currentUserValue;
    const requiredRole = route.data['role'];

    // Si no hay usuario logueado, redirigir al login
    if (!currentUser) {
      this.router.navigate(['/login']);
      return false;
    }

    // Si la ruta requiere un rol específico
    if (requiredRole && currentUser.role !== requiredRole) {
      this.router.navigate(['/dashboard']);
      return false;
    }

    return true;
  }
}
