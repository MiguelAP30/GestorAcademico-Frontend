// src/app/app.routes.ts
/**
 * Configuración de rutas principales de la aplicación
 * Define todas las rutas disponibles y sus respectivos componentes
 */

import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

/**
 * Array de rutas de la aplicación
 * Cada ruta define un path y su componente asociado
 * La mayoría de rutas están protegidas por el authGuard
 */
export const appRoutes: Routes = [
  // Ruta por defecto - redirige a la página de universidades
  { 
    path: '', 
    redirectTo: 'universities', 
    pathMatch: 'full' 
  },
  
  // Ruta de login - no requiere autenticación
  { 
    path: 'auth/login', 
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
  },
  
  // Gestión de universidades
  { 
    path: 'universities', 
    loadComponent: () => import('./modules/university/university.component').then(m => m.UniversityComponent),
    canActivate: [authGuard] // Protegida por autenticación
  }, 
  
  // Gestión de profesores
  { 
    path: 'professors', 
    loadComponent: () => import('./modules/professor/professor.component').then(m => m.ProfessorComponent),
    canActivate: [authGuard]
  },
  
  // Gestión de departamentos
  { 
    path: 'departments', 
    loadComponent: () => import('./modules/department/department.component').then(m => m.DepartmentComponent),
    canActivate: [authGuard]
  },
  
  // Gestión de cursos
  { 
    path: 'courses', 
    loadComponent: () => import('./modules/course/course.component').then(m => m.CourseComponent),
    canActivate: [authGuard]
  },
  
  // Gestión de estudiantes
  { 
    path: 'students', 
    loadComponent: () => import('./modules/student/student.component').then(m => m.StudentComponent),
    canActivate: [authGuard]
  },
  
  // Gestión de tipos de evaluación
  { 
    path: 'evaluation-type', 
    loadComponent: () => import('./modules/evaluation-type/evaluation-type.component').then(m => m.EvaluationTypeComponent),
    canActivate: [authGuard]
  },
  
  // Gestión de matrículas
  { 
    path: 'enrollments', 
    loadComponent: () => import('./modules/enrollment/enrollment.component').then(m => m.EnrollmentComponent),
    canActivate: [authGuard]
  },
  
  // Gestión de prerrequisitos
  { 
    path: 'prerequisites', 
    loadComponent: () => import('./modules/prerequisite/prerequisite.component').then(m => m.PrerequisiteComponent),
    canActivate: [authGuard]
  },
  
  // Gestión de evaluaciones
  { 
    path: 'evaluations', 
    loadComponent: () => import('./modules/evaluation/evaluation.component').then(m => m.EvaluationComponent),
    canActivate: [authGuard]
  },
  
  // Gestión de horarios
  {
    path: 'schedules',
    loadComponent: () => import('./modules/schedules/schedule.component').then(m => m.ScheduleComponent),
    canActivate: [authGuard]
  }
];

