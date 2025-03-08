import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Course {
  id?: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CourseComponent implements OnInit {
  courses: Course[] = [];
  selectedCourse: any = null;
  modalType: string = '';
  showCreateModal = false;
  newCourse: Course = {
    name: '',
    description: ''
  };

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
    });
  }

  openCreateModal(): void {
    this.showCreateModal = true;
    this.newCourse = {
      name: '',
      description: ''
    };
  }

  closeCreateModal(): void {
    this.showCreateModal = false;
  }

  createCourse(): void {
    if (this.newCourse.name && this.newCourse.description) {
      this.courseService.createCourse(this.newCourse).subscribe(() => {
        this.loadCourses();
        this.closeCreateModal();
      });
    }
  }

  editCourse(course: Course): void {
    this.selectedCourse = { ...course };
    this.modalType = 'edit';
  }

  updateCourse(): void {
    if (this.selectedCourse.name && this.selectedCourse.description) {
      this.courseService.updateCourse(this.selectedCourse.id, this.selectedCourse).subscribe(() => {
        this.loadCourses();
        this.closeModal();
      });
    }
  }

  deleteCourse(id: number | undefined): void {
    if (id === undefined) {
      console.error('No se puede eliminar un curso sin ID');
      return;
    }
    
      this.courseService.deleteCourse(id).subscribe(() => {
        this.loadCourses();
      });
    
  }

  openModal(course: Course, type: string) {
    this.selectedCourse = { ...course };
    this.modalType = type;
  }

  closeModal() {
    this.selectedCourse = null;
    this.modalType = '';
  }
}
