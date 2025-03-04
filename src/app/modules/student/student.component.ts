import { Component } from "@angular/core";
import { StudentService } from "../../services/student.service";
import { FormsModule } from "@angular/forms";
import { CommonModule, NgIf, NgFor } from "@angular/common";

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgFor],
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
  students: any[] = [];
  newStudent = { identification: '', firstName: '', lastName: '', birthDate: '' };
  
  selectedStudent: any = null;  // ✅ Para almacenar el estudiante seleccionado
  expandedEnrollment: any = {}; // ✅ Para controlar qué cursos están expandidos
  
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
        !this.newStudent.birthDate) return;

    this.studentService.createStudent(this.newStudent).subscribe((student) => {
      this.students.push(student);
      this.newStudent = { identification: '', firstName: '', lastName: '', birthDate: '' };
    });
  }

  deleteStudent(id: string) {
    this.studentService.deleteStudent(id).subscribe(() => {
      this.students = this.students.filter(s => s.identification !== id);
    });
  }

  // ✅ Método para abrir el modal y asignar el estudiante seleccionado
  openCoursesModal(student: any) {
    this.selectedStudent = student;
  }

  // ✅ Método para cerrar el modal
  closeModal() {
    this.selectedStudent = null;
  }

  // ✅ Método para alternar la visibilidad de evaluaciones dentro del modal
  toggleEvaluations(enrollmentId: number) {
    if (enrollmentId === undefined) return;
    this.expandedEnrollment[enrollmentId] = !this.expandedEnrollment[enrollmentId];
  }
}
