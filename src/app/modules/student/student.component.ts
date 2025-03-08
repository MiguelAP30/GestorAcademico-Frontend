import { Component, OnInit } from "@angular/core";
import { StudentService } from "../../services/student.service";
import { FormsModule } from "@angular/forms";
import { CommonModule, NgIf, NgFor } from "@angular/common";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgFor],
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  students: any[] = [];
  selectedStudentForEdit: any = null;
  selectedStudentForCourses: any = null;
  showCreateStudentModal: boolean = false;
  newStudent = { identification: '', firstName: '', lastName: '', birthDate: '' };
  expandedEnrollment: { [key: number]: boolean } = {};

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getStudents().subscribe((data) => {
      this.students = data;
    });
  }

  openCreateStudentModal() {
    this.showCreateStudentModal = true;
  }

  closeCreateStudentModal() {
    this.showCreateStudentModal = false;
  }

  addStudent(): void {
    if (this.validateStudent(this.newStudent)) {
      this.studentService.createStudent(this.newStudent).subscribe(
        () => {
          this.loadStudents();
          this.closeCreateStudentModal();
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Estudiante agregado correctamente',
            showConfirmButton: false,
            timer: 1500
          });
        },
        error => {
          console.error('Error creating student:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo agregar el estudiante',
          });
        }
      );
    }
  }

  deleteStudent(identification: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.studentService.deleteStudent(identification).subscribe(
          () => {
            this.loadStudents();
            Swal.fire({
              icon: 'success',
              title: '¡Eliminado!',
              text: 'Estudiante eliminado correctamente',
              showConfirmButton: false,
              timer: 1500
            });
          },
          error => {
            console.error('Error deleting student:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar el estudiante',
            });
          }
        );
      }
    });
  }

  openEditModal(student: any) {
    this.selectedStudentForEdit = { ...student };
    this.selectedStudentForCourses = null;
  }

  updateStudent(): void {
    if (this.validateStudent(this.selectedStudentForEdit)) {
      this.studentService.updateStudent(this.selectedStudentForEdit).subscribe(
        () => {
          this.loadStudents();
          this.closeEditModal();
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Estudiante actualizado correctamente',
            showConfirmButton: false,
            timer: 1500
          });
        },
        error => {
          console.error('Error updating student:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo actualizar el estudiante',
          });
        }
      );
    }
  }

  closeEditModal() {
    this.selectedStudentForEdit = null;
  }

  openCoursesModal(student: any) {
    this.selectedStudentForCourses = student;
    this.selectedStudentForEdit = null;
  }

  closeCoursesModal() {
    this.selectedStudentForCourses = null;
  }

  toggleEvaluations(courseId: number) {
    this.expandedEnrollment[courseId] = !this.expandedEnrollment[courseId];
  }

  private validateStudent(student: any): boolean {
    if (!student.identification?.trim() || !student.firstName?.trim() || !student.lastName?.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos del estudiante',
      });
      return false;
    }
    return true;
  }
}
