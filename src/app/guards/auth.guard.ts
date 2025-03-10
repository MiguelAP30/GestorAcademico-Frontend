/**
 * Guard de autenticación
 * Protege las rutas que requieren que el usuario esté autenticado
 * Si el usuario no está autenticado, redirige a la página de login
 */

import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

/**
 * Función guard que verifica si el usuario está autenticado
 * @returns true si el usuario está autenticado, false en caso contrario
 */
export const authGuard = () => {
  // Inyectamos los servicios necesarios
  const loginService = inject(LoginService);
  const router = inject(Router);

  // Verificamos si el usuario está autenticado
  if (loginService.isLoggedIn()) {
    return true; // Permite el acceso a la ruta
  }

  // Si no está autenticado, redirige al login
  router.navigate(['/auth/login']);
  return false; // Bloquea el acceso a la ruta
}; 