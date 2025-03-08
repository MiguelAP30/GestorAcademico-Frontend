// /src/services/professor.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private apiUrl = 'http://localhost:3000/enrollment';

  constructor(private http: HttpClient) {}

  getEnrollments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createEnrollment(professor: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, professor);
  }

  deleteEnrollment(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateEnrollment(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
}

