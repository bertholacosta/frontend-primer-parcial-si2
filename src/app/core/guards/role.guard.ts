import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // 1. Validar que esté logueado
  if (!authService.isLoggedIn()) {
    return router.parseUrl('/login');
  }

  // 2. Validar que tenga el rol permitido
  const role = authService.getRole();
  if (role === 'Administrador' || role === 'Taller') {
    return true;
  }

  // Si no tiene el rol exacto, cerrar sesión (quizá era un Conductor) y redirigir
  authService.logout();
  return router.parseUrl('/login');
};
