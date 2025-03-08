import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EvaluationService } from '../../services/evaluation.service';
import { StudentService } from '../../services/student.service';
import { CourseService } from '../../services/course.service';
import { EvaluationTypeService } from '../../services/evaluation-type.service';
import { EnrollmentService } from '../../services/enrollment.service';
import Swal from 'sweetalert2';

interface EvaluationType {
  id: number;
  name: string;
  percentage: number;
}

interface Enrollment {
  id: number;
  enrollmentDate: string;
  studentId: string;
  courseId: number;
}

interface Evaluation {
  id: number;
  evaluationDate: string;
  grade: number;
  enrollment: Enrollment;
  evaluationType: EvaluationType;
}

interface Student {
  identification: string;
  firstName: string;
  lastName: string;
}

interface Course {
  id: number;
  name: string;
}

@Component({
  selector: 'app-evaluation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {
  evaluations: Evaluation[] = [];
  filteredEvaluations: Evaluation[] = [];
  students: Student[] = [];
  courses: Course[] = [];
  evaluationTypes: EvaluationType[] = [];
  enrollments: Enrollment[] = [];
  selectedEvaluation: any = null;
  showCreateModal = false;
  filters = {
    studentId: '',
    courseId: ''
  };
  newEvaluation = {
    evaluationDate: '',
    grade: 0,
    enrollmentId: '',
    evaluationTypeId: '',
    studentId: '',
    courseId: ''
  };

  constructor(
    private evaluationService: EvaluationService,
    private studentService: StudentService,
    private courseService: CourseService,
    private evaluationTypeService: EvaluationTypeService,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit() {
    this.loadEvaluations();
    this.loadStudents();
    this.loadCourses();
    this.loadEvaluationTypes();
    this.loadEnrollments();
  }

  loadEvaluations() {
    this.evaluationService.getEvaluations().subscribe(data => {
      this.evaluations = data;
      this.applyFilters();
    });
  }

  loadStudents() {
    this.studentService.getStudents().subscribe(data => {
      this.students = data;
    });
  }

  loadCourses() {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
    });
  }

  loadEvaluationTypes() {
    this.evaluationTypeService.getAll().subscribe({
      next: (data: any) => this.evaluationTypes = data
    });
  }

  loadEnrollments() {
    this.enrollmentService.getEnrollments().subscribe(data => {
      this.enrollments = data;
    });
  }

  onCourseSelect() {
    if (this.newEvaluation.studentId && this.newEvaluation.courseId) {
      const enrollment = this.enrollments.find(e => 
        e.studentId === this.newEvaluation.studentId && 
        e.courseId === parseInt(this.newEvaluation.courseId)
      );
      
      if (enrollment) {
        this.newEvaluation.enrollmentId = enrollment.id.toString();
      } else {
        this.newEvaluation.courseId = '';
        alert('No se encontró una matrícula para este estudiante en el curso seleccionado');
      }
    }
  }

  getStudentName(studentId: string): string {
    const student = this.students.find(s => s.identification === studentId);
    return student ? `${student.firstName} ${student.lastName}` : studentId;
  }

  getCourseName(courseId: number): string {
    const course = this.courses.find(c => c.id === courseId);
    return course ? course.name : courseId.toString();
  }

  getEnrollmentId(studentId: string, courseId: string): string {
    const enrollment = this.enrollments.find(e => 
      e.studentId === studentId && e.courseId === parseInt(courseId)
    );
    return enrollment ? enrollment.id.toString() : '';
  }

  openCreateEvaluationModal() {
    this.showCreateModal = true;
    this.newEvaluation = {
      evaluationDate: new Date().toISOString().split('T')[0],
      grade: 0,
      enrollmentId: '',
      evaluationTypeId: '',
      studentId: '',
      courseId: ''
    };
  }

  closeCreateModal() {
    this.showCreateModal = false;
    this.newEvaluation = {
      evaluationDate: '',
      grade: 0,
      enrollmentId: '',
      evaluationTypeId: '',
      studentId: '',
      courseId: ''
    };
  }

  createEvaluation(): void {
    if (this.validateEvaluation(this.newEvaluation)) {
      this.evaluationService.createEvaluation(this.newEvaluation).subscribe(
        () => {
          this.loadEvaluations();
          this.closeCreateModal();
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Evaluación creada correctamente',
            showConfirmButton: false,
            timer: 1500
          });
        },
        error => {
          console.error('Error creating evaluation:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo crear la evaluación',
          });
        }
      );
    }
  }

  editEvaluation(evaluation: Evaluation) {
    this.selectedEvaluation = {
      id: evaluation.id,
      evaluationDate: evaluation.evaluationDate.split('T')[0],
      grade: evaluation.grade,
      enrollmentId: evaluation.enrollment.id.toString(),
      evaluationTypeId: evaluation.evaluationType.id.toString(),
      studentId: evaluation.enrollment.studentId,
      courseId: evaluation.enrollment.courseId.toString()
    };
  }

  closeEditModal() {
    this.selectedEvaluation = null;
  }

  updateEvaluation(): void {
    if (this.validateEvaluation(this.selectedEvaluation)) {
      this.evaluationService.updateEvaluation(this.selectedEvaluation.id, this.selectedEvaluation).subscribe(
        () => {
          this.loadEvaluations();
          this.closeEditModal();
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Evaluación actualizada correctamente',
            showConfirmButton: false,
            timer: 1500
          });
        },
        error => {
          console.error('Error updating evaluation:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo actualizar la evaluación',
          });
        }
      );
    }
  }

  deleteEvaluation(id: number): void {
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
        this.evaluationService.deleteEvaluation(id).subscribe(
          () => {
            this.loadEvaluations();
            Swal.fire({
              icon: 'success',
              title: '¡Eliminado!',
              text: 'Evaluación eliminada correctamente',
              showConfirmButton: false,
              timer: 1500
            });
          },
          error => {
            console.error('Error deleting evaluation:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar la evaluación',
            });
          }
        );
      }
    });
  }

  validateEvaluation(evaluation: any): boolean {
    if (!evaluation.enrollmentId || !evaluation.evaluationTypeId || !evaluation.grade || evaluation.grade < 0 || evaluation.grade > 5) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos correctamente. La nota debe estar entre 0 y 5.',
      });
      return false;
    }
    return true;
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

  applyFilters() {
    this.filteredEvaluations = this.evaluations.filter(evaluation => {
      const matchesStudent = !this.filters.studentId || 
                           evaluation.enrollment.studentId === this.filters.studentId;
      const matchesCourse = !this.filters.courseId || 
                           evaluation.enrollment.courseId.toString() === this.filters.courseId;
      return matchesStudent && matchesCourse;
    });
  }

  clearFilters() {
    this.filters = {
      studentId: '',
      courseId: ''
    };
    this.applyFilters();
  }
}
