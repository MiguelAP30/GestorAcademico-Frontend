// /src/services/university.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {
  private apiUrl = 'http://localhost:3000/universities'; //ya esta bien asi

  constructor(private http: HttpClient) {}

  getUniversities(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  

  getUniversity(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createUniversity(university: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, university);
  }

  updateUniversity(id: number, university: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, university);
  }

  deleteUniversity(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
