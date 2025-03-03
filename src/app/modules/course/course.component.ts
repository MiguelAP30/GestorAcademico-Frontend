import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  courses: any[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
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

  deleteCourse(id: string): void {
    this.courseService.deleteCourse(id).subscribe(() => {
      this.loadCourses();
    });
  }
}
