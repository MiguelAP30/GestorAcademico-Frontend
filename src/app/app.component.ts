// src/app/app.components.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common'; 

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [RouterModule,NgIf],
  template: `
  <nav class="navbar">
    <button class="menu-toggle" (click)="toggleMenu()">☰</button>
    <div class="logo">📚 Gestor Académico</div>
  </nav>
  <!-- Menú lateral -->
  <div class="sidebar" [class.active]="menuOpen">
    <button class="close-btn" (click)="toggleMenu()">✖</button>
    <ul>
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
  <!-- Fondo oscuro cuando el menú está abierto -->
  <div class="overlay" *ngIf="menuOpen" (click)="closeMenu()"></div>
  <router-outlet></router-outlet> <!-- ✅ Aquí se renderizarán las rutas -->
  `,
  styles: [`
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
    .sidebar.active {
      left: 0;
    }
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
    .sidebar ul {
      list-style: none;
      padding: 0;
      margin: 50px 0 0 0;
    }
    .sidebar ul li {
      margin: 0;
    }
    .sidebar ul li a {
      display: flex;
      align-items: center;
      padding: 6px 25px;
      color: #fff;
      text-decoration: none;
      transition: all 0.3s ease;
    }
    .sidebar ul li a:hover {
      background: #333333;
      padding-left: 30px;
    }
    .sidebar ul li a.active {
      background: #3498db;
    }
    .icon {
      margin-right: 15px;
      font-size: 20px;
    }
    .text {
      font-size: 16px;
    }
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      z-index: 999;
    }
    .navbar {
      display: flex;
      align-items: center;
      padding: 1rem;
      background: #000000;
      color: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .menu-toggle {
      background: none;
      border: none;
      color: white;
      font-size: 24px;
      cursor: pointer;
      margin-right: 15px;
    }
    .logo {
      font-size: 20px;
      font-weight: bold;
    }
  `]
})
export class AppComponent {
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
}
