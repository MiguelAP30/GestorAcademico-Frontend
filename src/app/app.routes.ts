// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'universities', pathMatch: 'full' },
  { 
    path: 'auth/login', 
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
  },
  { 
    path: 'universities', 
    loadComponent: () => import('./modules/university/university.component').then(m => m.UniversityComponent),
    canActivate: [authGuard]
  }, 
  { 
    path: 'professors', 
    loadComponent: () => import('./modules/professor/professor.component').then(m => m.ProfessorComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'departments', 
    loadComponent: () => import('./modules/department/department.component').then(m => m.DepartmentComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'courses', 
    loadComponent: () => import('./modules/course/course.component').then(m => m.CourseComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'students', 
    loadComponent: () => import('./modules/student/student.component').then(m => m.StudentComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'evaluation-type', 
    loadComponent: () => import('./modules/evaluation-type/evaluation-type.component').then(m => m.EvaluationTypeComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'enrollments', 
    loadComponent: () => import('./modules/enrollment/enrollment.component').then(m => m.EnrollmentComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'prerequisites', 
    loadComponent: () => import('./modules/prerequisite/prerequisite.component').then(m => m.PrerequisiteComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'evaluations', 
    loadComponent: () => import('./modules/evaluation/evaluation.component').then(m => m.EvaluationComponent),
    canActivate: [authGuard]
  },
  {
    path: 'schedules',
    loadComponent: () => import('./modules/schedules/schedule.component').then(m => m.ScheduleComponent),
    canActivate: [authGuard]
  }
];

