/**
 * Interceptor de autenticación
 * Intercepta todas las peticiones HTTP y añade el token de autenticación
 * si existe y la petición no es de login
 */

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private loginService: LoginService // Servicio de autenticación
  ) {}

  /**
   * Intercepta las peticiones HTTP
   * @param request - La petición HTTP original
   * @param next - El siguiente manejador en la cadena
   * @returns Observable con la respuesta HTTP
   */
  intercept(
    request: HttpRequest<unknown>, 
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Obtiene el token de autenticación
    const token = localStorage.getItem('token');

    // Si hay token y la petición no es de login
    // añade el header de autorización
    if (token && !request.url.includes('/auth/login')) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}` // Añade el token en formato Bearer
        }
      });
    }

    // Continúa con la cadena de interceptores
    return next.handle(request);
  }
} 