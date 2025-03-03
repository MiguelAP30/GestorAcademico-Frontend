// src/app/services/course.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses'; // Ajusta según tu backend

  constructor(private http: HttpClient) {}

  getCourses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCourseById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createCourse(course: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, course);
  }

  updateCourse(id: string, course: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, course);
  }

  deleteCourse(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}

