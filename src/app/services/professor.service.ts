// /src/services/professor.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
  private apiUrl = 'http://localhost:3000/professors';

  constructor(private http: HttpClient) {}

  getProfessors(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createProfessor(professor: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, professor);
  }

  deleteProfessor(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateProfessor(proffesor: any) {
    return this.http.put(`${this.apiUrl}/${proffesor.identification}`, proffesor);
  }
}

