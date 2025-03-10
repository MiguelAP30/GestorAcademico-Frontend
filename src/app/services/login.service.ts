/**
 * Servicio de autenticación
 * Maneja todas las operaciones relacionadas con el inicio de sesión,
 * cierre de sesión y verificación del estado de autenticación
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface LoginResponse {
  access_token: string;
}

@Injectable({
  providedIn: 'root' // El servicio está disponible en toda la aplicación
})
export class LoginService {
  // URL base de la API
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(
    private http: HttpClient // Cliente HTTP para realizar peticiones
  ) { }

  /**
   * Realiza el inicio de sesión del usuario
   * @param username - Nombre de usuario
   * @param password - Contraseña del usuario
   * @returns Observable con la respuesta del servidor que incluye el token
   */
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap((response: any) => {
          // Almacena el token en localStorage si la autenticación es exitosa
          if (response && response.token) {
            localStorage.setItem('token', response.token);
          }
        })
      );
  }

  /**
   * Cierra la sesión del usuario
   * Elimina el token del almacenamiento local
   */
  logout(): void {
    localStorage.removeItem('token');
  }

  /**
   * Verifica si el usuario está autenticado
   * @returns true si existe un token en localStorage, false en caso contrario
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
