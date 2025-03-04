import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EvaluationTypeService {
  private apiUrl = 'http://localhost:3000/evaluation-type';
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.apiUrl);
  }

  getById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  create(data: any): Observable<any>  {
    console.log(data);
    return this.http.post(this.apiUrl, { body: data });
  }

  
  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
