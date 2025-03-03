// src/app/app.components.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [RouterModule], // ✅ Asegura que el router funciona
  template: `
    <h1>Gestor Académico</h1>
    <nav>
      <a routerLink="/universities">Universidades</a>
      <a routerLink="/professors">Profesores</a>
      <a routerLink="/departments">Departamentos</a>
      <a routerLink="/courses">Cursos</a>
    </nav>
    <router-outlet></router-outlet> <!-- ✅ Aquí se renderizarán las rutas -->
  `
})
export class AppComponent {}
