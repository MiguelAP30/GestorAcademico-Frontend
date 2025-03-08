import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

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
      this.courseService.createCourse(this.newCourse).subscribe(
        () => {
          this.loadCourses();
          this.closeCreateModal();
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Curso creado correctamente',
            showConfirmButton: false,
            timer: 1500
          });
        },
        error => {
          console.error('Error creating course:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo crear el curso',
          });
        }
      );
    }
  }

  editCourse(course: Course): void {
    this.selectedCourse = { ...course };
    this.modalType = 'edit';
  }

  updateCourse(): void {
    if (this.selectedCourse.name && this.selectedCourse.description) {
      this.courseService.updateCourse(this.selectedCourse.id, this.selectedCourse).subscribe(
        () => {
          this.loadCourses();
          this.closeModal();
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Curso actualizado correctamente',
            showConfirmButton: false,
            timer: 1500
          });
        },
        error => {
          console.error('Error updating course:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo actualizar el curso',
          });
        }
      );
    }
  }

  deleteCourse(id: number | undefined): void {
    if (id === undefined) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se puede eliminar un curso sin ID',
      });
      return;
    }

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
        this.courseService.deleteCourse(id).subscribe(
          () => {
            this.loadCourses();
            Swal.fire({
              icon: 'success',
              title: '¡Eliminado!',
              text: 'Curso eliminado correctamente',
              showConfirmButton: false,
              timer: 1500
            });
          },
          error => {
            console.error('Error deleting course:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar el curso',
            });
          }
        );
      }
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
