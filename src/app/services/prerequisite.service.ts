// /src/services/professor.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PrerequisiteService {


    private apiUrl = 'http://localhost:3000/prerequisites';

    constructor(private http: HttpClient) {}
  
    getPrerequisites(): Observable<any[]> {
      return this.http.get<any[]>(this.apiUrl);
    }
  
    createPrerequisite(prerequisite: any): Observable<any> {
      return this.http.post<any>(this.apiUrl, prerequisite);
    }
  
    deletePrerequisite(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${id}`);
    }
  
    updatePrerequisite(id: number, prerequisite: any) {
      return this.http.put(`${this.apiUrl}/${id}`, prerequisite);
    }

   
}
