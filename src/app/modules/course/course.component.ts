import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  imports: [CommonModule]
})

export class CourseComponent implements OnInit {
  courses: any[] = [];
  selectedCourse: any = null;
  modalType: string = '';

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
      console.log(data)
    });
  }

  createCourse(): void {
    const newCourse = { name: 'Nuevo Curso', description: 'Descripción...' };
    this.courseService.createCourse(newCourse).subscribe(() => {
      this.loadCourses();
    });
  }

  editCourse(course: any): void {
    const updatedCourse = { ...course, name: 'Curso Editado' };
    this.courseService.updateCourse(course.id, updatedCourse).subscribe(() => {
      this.loadCourses();
    });
  }

  deleteCourse(id: number): void {
    this.courseService.deleteCourse(id).subscribe(() => {
      this.loadCourses();
    });
  }

  openModal(course: any, type: string) {
    console.log('Curso seleccionado:', type); 
    this.closeModal();
    this.selectedCourse = course;
    this.modalType = type;
  }

  closeModal() {
    this.selectedCourse = null;
    this.modalType = '';
  }
}
