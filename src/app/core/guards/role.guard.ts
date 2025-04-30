import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
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

    // Caso especial para registro
    if (route.routeConfig?.path === 'register') {
      const users = this.authService.getAllUsers();
      // Si no hay usuarios, permitir acceso (primer usuario)
      if (users.length === 0) {
        return true;
      }
      // Si el usuario no es admin, redirigir
      if (currentUser.role !== 'admin') {
        this.router.navigate(['/dashboard']);
        return false;
      }
    }

    return true;
  }
}
