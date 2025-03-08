import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from '../../services/enrollment.service';
import { StudentService } from '../../services/student.service';
import { CourseService } from '../../services/course.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-enrollment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enrollment.component.html',
  styleUrl: './enrollment.component.css'
})
export class EnrollmentComponent implements OnInit {
  enrollments: any[] = [];
  students: any[] = [];
  courses: any[] = [];
  selectedEnrollment: any | null = null;
  selectedEnrollmentForEdit: any | null = null;
  showCreateEnrollmentModal = false;
  newEnrollment = { enrollmentDate: '', studentId: '', courseId: null };

  constructor(
    private enrollmentService: EnrollmentService,
    private studentService: StudentService,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.loadEnrollments();
    this.loadStudents();
    this.loadCourses();
  }

  loadStudents() {
    this.studentService.getStudents().subscribe((data) => {
      this.students = data;
    });
  }

  loadCourses() {
    this.courseService.getCourses().subscribe((data) => {
      this.courses = data;
    });
  }

  loadEnrollments() {
    this.enrollmentService.getEnrollments().subscribe((data) => {
      this.enrollments = data;
    });
  }

  openCreateEnrollmentModal() {
    this.showCreateEnrollmentModal = true;
    this.newEnrollment = { enrollmentDate: new Date().toISOString().split('T')[0], studentId: '', courseId: null };
  }

  closeCreateEnrollmentModal() {
    this.showCreateEnrollmentModal = false;
    this.newEnrollment = { enrollmentDate: '', studentId: '', courseId: null };
  }

  openEditEnrollmentModal(enrollment: any) {
    this.selectedEnrollmentForEdit = {
      ...enrollment,
      studentId: enrollment.student.identification,
      courseId: enrollment.course.id,
      enrollmentDate: enrollment.enrollmentDate.split('T')[0]
    };
  }

  closeEditEnrollmentModal() {
    this.selectedEnrollmentForEdit = null;
  }

  createEnrollment() {
    if (this.validateEnrollment(this.newEnrollment)) {
      this.enrollmentService.createEnrollment(this.newEnrollment).subscribe(
        () => {
          this.loadEnrollments();
          this.closeCreateEnrollmentModal();
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Matrícula creada correctamente',
            showConfirmButton: false,
            timer: 1500
          });
        },
        error => {
          console.error('Error creating enrollment:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo crear la matrícula',
          });
        }
      );
    }
  }

  updateEnrollment() {
    if (this.validateEnrollment(this.selectedEnrollmentForEdit)) {
      this.enrollmentService.updateEnrollment(this.selectedEnrollmentForEdit.id, this.selectedEnrollmentForEdit).subscribe(
        () => {
          this.closeEditEnrollmentModal();
          this.loadEnrollments();
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Matrícula actualizada correctamente',
            showConfirmButton: false,
            timer: 1500
          });
        },
        error => {
          console.error('Error updating enrollment:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo actualizar la matrícula',
          });
        }
      );
    }
  }

  deleteEnrollment(id: string) {
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
        this.enrollmentService.deleteEnrollment(id).subscribe(
          () => {
            this.loadEnrollments();
            Swal.fire({
              icon: 'success',
              title: '¡Eliminado!',
              text: 'Matrícula eliminada correctamente',
              showConfirmButton: false,
              timer: 1500
            });
          },
          error => {
            console.error('Error deleting enrollment:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar la matrícula',
            });
          }
        );
      }
    });
  }

  openModal(enrollment: any) {
    this.selectedEnrollment = enrollment;
  }

  closeModal() {
    this.selectedEnrollment = null;
  }

  getAverageGrade(evaluations: any[]): number {
    if (!evaluations || evaluations.length === 0) return 0;
    const sum = evaluations.reduce((acc, evaluation) => acc + evaluation.grade, 0);
    return sum / evaluations.length;
  }

  private validateEnrollment(enrollment: any): boolean {
    if (!enrollment.studentId || !enrollment.courseId || !enrollment.enrollmentDate) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos de la matrícula',
      });
      return false;
    }
    return true;
  }
}
