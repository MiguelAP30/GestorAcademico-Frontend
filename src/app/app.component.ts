/**
 * Componente principal de la aplicación
 * Implementa la estructura base de la interfaz de usuario incluyendo
 * la barra de navegación, menú lateral y sistema de rutas
 */

import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root', // Selector del componente raíz
  standalone: true,     // Indica que es un componente independiente
  imports: [RouterModule, NgIf], // Importaciones necesarias
  template: `
    <!-- Barra de navegación superior - Solo visible si el usuario está autenticado -->
    <nav class="navbar" *ngIf="loginService.isLoggedIn()">
      <button class="menu-toggle" (click)="toggleMenu()">☰</button>
      <div class="logo">📚 Gestor Académico</div>
      <button class="logout-btn" (click)="logout()">
        <span class="icon">⬅️</span>
        <span class="text">Cerrar Sesión</span>
      </button>
    </nav>

    <!-- Menú lateral - Solo visible si el usuario está autenticado -->
    <div class="sidebar" [class.active]="menuOpen" *ngIf="loginService.isLoggedIn()">
      <button class="close-btn" (click)="toggleMenu()">✖</button>
      <ul>
        <!-- Enlaces de navegación con iconos -->
        <li>
          <a routerLink="/universities" (click)="closeMenu()" routerLinkActive="active">
            <span class="icon">🏫</span><span class="text">Universidades</span>
          </a>
        </li>
        <li>
          <a routerLink="/professors" (click)="closeMenu()" routerLinkActive="active">
            <span class="icon">👨‍🏫</span><span class="text">Profesores</span>
          </a>
        </li>
        <li>
          <a routerLink="/departments" (click)="closeMenu()" routerLinkActive="active">
            <span class="icon">🏢</span><span class="text">Departamentos</span>
          </a>
        </li>
        <li>
          <a routerLink="/courses" (click)="closeMenu()" routerLinkActive="active">
            <span class="icon">📖</span><span class="text">Cursos</span>
          </a>
        </li>
        <li>
          <a routerLink="/prerequisites" (click)="closeMenu()" routerLinkActive="active">
            <span class="icon">✅</span><span class="text">Prerrequisitos</span>
          </a>
        </li>
        <li>
          <a routerLink="/enrollments" (click)="closeMenu()" routerLinkActive="active">
            <span class="icon">📝</span><span class="text">Matrículas</span>
          </a>
        </li>
        <li>
          <a routerLink="/schedules" (click)="closeMenu()" routerLinkActive="active">
            <span class="icon">📅</span><span class="text">Horarios</span>
          </a>
        </li>
        <li>
          <a routerLink="/evaluation-type" (click)="closeMenu()" routerLinkActive="active">
            <span class="icon">📋</span><span class="text">Tipos de evaluaciones</span>
          </a>
        </li>
        <li>
          <a routerLink="/evaluations" (click)="closeMenu()" routerLinkActive="active">
            <span class="icon">📊</span><span class="text">Evaluaciones</span>
          </a>
        </li>
        <li>
          <a routerLink="/students" (click)="closeMenu()" routerLinkActive="active">
            <span class="icon">🎓</span><span class="text">Estudiantes</span>
          </a>
        </li>
      </ul>
    </div>

    <!-- Overlay para cerrar el menú en dispositivos móviles -->
    <div class="overlay" *ngIf="menuOpen && loginService.isLoggedIn()" (click)="closeMenu()"></div>

    <!-- Contenedor principal donde se renderizarán las rutas -->
    <router-outlet></router-outlet>
  `,
  styles: [`
    /* Estilos de la barra de navegación */
    .navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      background: #000000;
      color: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    /* Botón de toggle del menú */
    .menu-toggle {
      background: none;
      border: none;
      color: white;
      font-size: 24px;
      cursor: pointer;
      margin-right: 15px;
    }

    /* Estilo del logo */
    .logo {
      font-size: 20px;
      font-weight: bold;
      flex-grow: 1;
      padding-left: 40%;
    }

    /* Botón de cierre de sesión */
    .logout-btn {
      display: flex;
      align-items: center;
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      padding: 8px 16px;
      border-radius: 4px;
      transition: background-color 0.3s;
    }

    .logout-btn:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .logout-btn .icon {
      margin-right: 8px;
    }

    /* Estilos del menú lateral */
    .sidebar {
      position: fixed;
      top: 0;
      left: -280px;
      height: 100vh;
      width: 280px;
      background: #000000;
      transition: left 0.3s ease;
      z-index: 1000;
      padding: 20px 0;
      box-shadow: 2px 0 5px rgba(0,0,0,0.2);
    }

    /* Clase para mostrar/ocultar el menú */
    .sidebar.active {
      left: 0;
    }

    /* Botón para cerrar el menú */
    .close-btn {
      position: absolute;
      right: 20px;
      top: 20px;
      background: none;
      border: none;
      color: #fff;
      font-size: 20px;
      cursor: pointer;
    }

    /* Lista de enlaces del menú */
    .sidebar ul {
      list-style: none;
      padding: 0;
      margin: 50px 0 0 0;
    }

    .sidebar ul li {
      margin: 0;
    }

    /* Estilos de los enlaces del menú */
    .sidebar ul li a {
      display: flex;
      align-items: center;
      padding: 4px 15px;
      color: #fff;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    /* Efectos hover en los enlaces */
    .sidebar ul li a:hover {
      background: #333333;
      padding-left: 20px;
    }

    /* Estilo para el enlace activo */
    .sidebar ul li a.active {
      background: #3498db;
    }

    /* Estilos para los iconos */
    .icon {
      margin-right: 10px;
      font-size: 20px;
    }

    /* Estilos para el texto */
    .text {
      font-size: 16px;
    }

    /* Overlay para cerrar el menú en móviles */
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      z-index: 999;
    }
  `]
})
export class AppComponent {
  // Estado del menú (abierto/cerrado)
  menuOpen = false;

  constructor(
    public loginService: LoginService, // Servicio de autenticación
    private router: Router            // Servicio de enrutamiento
  ) {}

  /**
   * Alterna el estado del menú lateral
   */
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  /**
   * Cierra el menú lateral
   */
  closeMenu() {
    this.menuOpen = false;
  }

  /**
   * Cierra la sesión del usuario y redirige al login
   */
  logout() {
    this.loginService.logout();
    this.router.navigate(['/auth/login']);
  }
}
