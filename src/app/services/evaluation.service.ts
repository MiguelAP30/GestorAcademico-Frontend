import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {
  private apiUrl = 'http://localhost:3000/evaluation';

  constructor(private http: HttpClient) { }

  getEvaluations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createEvaluation(evaluationData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, evaluationData);
  }

  updateEvaluation(id: number, evaluationData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, evaluationData);
  }

  deleteEvaluation(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getEvaluationById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  
}
