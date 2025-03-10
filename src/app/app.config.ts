/**
 * Archivo de configuración principal de la aplicación Angular
 * Este archivo configura los proveedores y servicios principales
 */

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { appRoutes } from './app.routes';
import { AuthInterceptor } from './interceptors/auth.interceptor';

/**
 * Configuración principal de la aplicación
 * Define los proveedores globales necesarios para el funcionamiento de la app
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Proveedor del sistema de rutas
    provideRouter(appRoutes),
    
    // Proveedor del cliente HTTP con interceptor de autenticación
    provideHttpClient(
      withInterceptors([
        (req, next) => {
          // Verificamos si estamos en el navegador antes de acceder a localStorage
          // Esto es necesario porque el código puede ejecutarse en el servidor (SSR)
          if (typeof window !== 'undefined') {
            // Obtenemos el token de autenticación del almacenamiento local
            const token = localStorage.getItem('token');
            
            // Si existe un token y no estamos en la ruta de login
            // añadimos el header de autorización
            if (token && !req.url.includes('/auth/login')) {
              req = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${token}` // Añadimos el token en formato Bearer
                }
              });
            }
          }
          // Continuamos con la siguiente función en la cadena de interceptores
          return next(req);
        }
      ])
    )
  ]
};
