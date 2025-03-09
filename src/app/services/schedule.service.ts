import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private apiUrl = 'http://localhost:3000/schedules';

  constructor(private http: HttpClient) {}

  getSchedules(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createSchedule(schedule: any): Observable<any> {
    return this.http.post(this.apiUrl, schedule);
  }

  updateSchedule(id: number, schedule: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, schedule);
  }

  deleteSchedule(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
