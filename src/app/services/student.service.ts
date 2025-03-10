import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'http://localhost:3000/students';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createStudent(student: any): Observable<any> {
    const studentData = {
      firstName: student.firstName,
      lastName: student.lastName,
      birthDate: student.birthDate
    };
    return this.http.post(this.apiUrl, studentData);
  }

  deleteStudent(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateStudent(student: any) {
    return this.http.put(`${this.apiUrl}/${student.identification}`, student);
  }
}
