// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'universities', pathMatch: 'full' },
  { path: 'universities', loadComponent: () => import('./modules/university/university.component').then(m => m.UniversityComponent) }, 
  { path: 'professors', loadComponent: () => import('./modules/professor/professor.component').then(m => m.ProfessorComponent) },
  { path: 'departments', loadComponent: () => import('./modules/department/department.component').then(m => m.DepartmentComponent) },
  { path: 'courses', loadComponent: () => import('./modules/course/course.component').then(m => m.CourseComponent) },
  { path: 'students', loadComponent: () => import('./modules/student/student.component').then(m => m.StudentComponent) },
  { path: 'evaluation-type', loadComponent: () => import('./modules/evaluation-type/evaluation-type.component').then(m => m.EvaluationTypeComponent) },
  { path: 'enrollments', loadComponent: () => import('./modules/enrollment/enrollment.component').then(m => m.EnrollmentComponent) }
];

