// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { appRoutes } from './app.routes';
import { AuthInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(
      withInterceptors([
        (req, next) => {
          // Verificar si estamos en el navegador antes de acceder a localStorage
          if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token && !req.url.includes('/auth/login')) {
              req = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${token}`
                }
              });
            }
          }
          return next(req);
        }
      ])
    )
  ]
};
