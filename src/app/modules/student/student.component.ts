import { Component } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student',
  imports: [CommonModule, FormsModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {
  students: any[] = [];
  newStudent = { 
    identification: '', 
    firstName: '', 
    lastName: '',
    birthDate: ''
  };

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getStudents().subscribe((data) => {
      this.students = data;
      console.log(data);
    });
  }

  addStudent() {
    if (!this.newStudent.identification.trim() || 
        !this.newStudent.firstName.trim() || 
        !this.newStudent.lastName.trim() ||
        !this.newStudent.birthDate.trim()) return; 

    this.studentService.createStudent(this.newStudent).subscribe(() => {
      this.newStudent = { 
        identification: '', 
        firstName: '', 
        lastName: '', 
        birthDate: ''
      };
      this.loadStudents();
    });
  }

  deleteStudent(id: string) {
    this.studentService.deleteStudent(id).subscribe(() => {
      this.loadStudents();
    });
  }
}
