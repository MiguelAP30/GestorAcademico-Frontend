import { Component } from '@angular/core';
import { EnrollmentService } from '../../services/enrollment.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-enrollment',
  imports: [CommonModule, FormsModule],
  templateUrl: './enrollment.component.html',
  styleUrl: './enrollment.component.css'
})
export class EnrollmentComponent {
  enrollments: any[] = [];
  selectedEnrollment: any | null = null;
  newEnrollment = { enrollmentDate: '', studentId: '', courseId: null };


  constructor(private enrollmentService: EnrollmentService) {}

  ngOnInit() {
    this.loadEnrollments();
  }

  loadEnrollments() {
    this.enrollmentService.getEnrollments().subscribe((data) => {
      this.enrollments = data;
      console.log(data)
    });
  }

  addEnrollment() {
    if (!this.newEnrollment.studentId.trim() || !this.newEnrollment.courseId) return;
    this.newEnrollment.enrollmentDate = new Date().toISOString().split('T')[0]; // Fecha actual
  
    this.enrollmentService.createEnrollment(this.newEnrollment).subscribe(() => {
      this.newEnrollment = { enrollmentDate: '', studentId: '', courseId: null };
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
}
