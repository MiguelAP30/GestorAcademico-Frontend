import { Component } from '@angular/core';
import { EnrollmentService } from '../../services/enrollment.service';
import { StudentService } from '../../services/student.service';
import { CourseService } from '../../services/course.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-enrollment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enrollment.component.html',
  styleUrl: './enrollment.component.css'
})
export class EnrollmentComponent {
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

  addEnrollment() {
    if (!this.newEnrollment.studentId || !this.newEnrollment.courseId) return;
  
    this.enrollmentService.createEnrollment(this.newEnrollment).subscribe(() => {
      this.closeCreateEnrollmentModal();
      this.loadEnrollments();
    });
  }

  updateEnrollment() {
    if (!this.selectedEnrollmentForEdit) return;
    
    this.enrollmentService.updateEnrollment(this.selectedEnrollmentForEdit.id, this.selectedEnrollmentForEdit).subscribe(() => {
      this.closeEditEnrollmentModal();
      this.loadEnrollments();
    });
  }

  deleteEnrollment(id: string) {
    this.enrollmentService.deleteEnrollment(id).subscribe(() => {
      this.loadEnrollments();
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
}
