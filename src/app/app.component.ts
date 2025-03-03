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
      <li><a routerLink="/universities" (click)="closeMenu()">🏫 Universidades</a></li>
      <li><a routerLink="/professors" (click)="closeMenu()">👨‍🏫 Profesores</a></li>
      <li><a routerLink="/departments" (click)="closeMenu()">🏢 Departamentos</a></li>
      <li><a routerLink="/courses" (click)="closeMenu()">📖 Cursos</a></li>
      <li><a routerLink="/" (click)="closeMenu()">✅ Prerrequisitos</a></li>
      <li><a routerLink="/enrollments" (click)="closeMenu()">📝 Matrículas</a></li>
      <li><a routerLink="/" (click)="closeMenu()">📊 Evaluaciones</a></li>
      <li><a routerLink="/students" (click)="closeMenu()">🎓 Estudiantes</a></li>
    </ul>
  </div>

  <!-- Fondo oscuro cuando el menú está abierto -->
  <div class="overlay" *ngIf="menuOpen" (click)="closeMenu()"></div>


    <router-outlet></router-outlet> <!-- ✅ Aquí se renderizarán las rutas -->
  `,
  styleUrls: ['../styles.css']
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
