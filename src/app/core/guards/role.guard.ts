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

  // 2. Extraer permisos requeridos para esta sub-ruta y validar restrictivamente
  const requiredPermiso = route.data?.['requiredPermiso'];
  
  if (requiredPermiso) {
    if (authService.hasPermiso(requiredPermiso)) {
      return true;
    }
  } else {
    // Si no exige permiso especial particular pero está logueado y llegamos aquí permitimos (ej. el padre Dashboard vacio)
    // Pero si queremos ser estrictos para todas las sub-secciones, validaremos solo el contenedor maestro.
    const role = authService.getRole();
    if (role === 'Administrador' || role === 'Taller') {
      return true;
    }
  }

  // Denegar acceso y redireccionar a pagina segura
  router.navigate(['/dashboard']);
  return false;
};
