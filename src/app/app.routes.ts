// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/universities', pathMatch: 'full' },
  { path: 'universities', loadComponent: () => import('./modules/university/university.component').then(m => m.UniversityComponent) }, 
  { path: 'professors', loadComponent: () => import('./modules/professor/professor.component').then(m => m.ProfessorComponent) },
  { path: 'departments', loadComponent: () => import('./modules/department/department.component').then(m => m.DepartmentComponent) }
];

