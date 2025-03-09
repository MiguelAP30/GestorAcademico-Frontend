import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScheduleService } from '../../services/schedule.service';
import { CourseService } from '../../services/course.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  schedules: any[] = [];
  filteredSchedules: any[] = [];
  courses: any[] = [];
  selectedSchedule: any = null;
  showCreateModal = false;
  newSchedule = {
    startTime: '',
    endTime: '',
    dayOfWeek: '',
    courseId: null
  };

  filters = {
    courseId: '',
    dayOfWeek: '',
    startTime: '',
    endTime: ''
  };

  constructor(
    private scheduleService: ScheduleService,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.loadSchedules();
    this.loadCourses();
  }

  loadSchedules() {
    this.scheduleService.getSchedules().subscribe(data => {
      this.schedules = data;
      this.applyFilters();
    });
  }

  loadCourses() {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
    });
  }

  applyFilters() {
    this.filteredSchedules = this.schedules.filter(schedule => {
      let matchesCourse = true;
      let matchesDay = true;
      let matchesStartTime = true;
      let matchesEndTime = true;

      if (this.filters.courseId) {
        matchesCourse = schedule.course.id === parseInt(this.filters.courseId);
      }

      if (this.filters.dayOfWeek) {
        matchesDay = schedule.dayOfWeek === this.filters.dayOfWeek;
      }

      if (this.filters.startTime) {
        matchesStartTime = schedule.startTime >= this.filters.startTime;
      }

      if (this.filters.endTime) {
        matchesEndTime = schedule.endTime <= this.filters.endTime;
      }

      return matchesCourse && matchesDay && matchesStartTime && matchesEndTime;
    });
  }

  clearFilters() {
    this.filters = {
      courseId: '',
      dayOfWeek: '',
      startTime: '',
      endTime: ''
    };
    this.applyFilters();
  }

  openCreateModal() {
    this.showCreateModal = true;
    this.newSchedule = {
      startTime: '',
      endTime: '',
      dayOfWeek: '',
      courseId: null
    };
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }

  createSchedule() {
    if (this.validateSchedule(this.newSchedule)) {
      this.scheduleService.createSchedule(this.newSchedule).subscribe(
        () => {
          this.loadSchedules();
          this.closeCreateModal();
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Horario creado correctamente',
            showConfirmButton: false,
            timer: 1500
          });
        },
        error => {
          console.error('Error creating schedule:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo crear el horario',
          });
        }
      );
    }
  }

  editSchedule(schedule: any) {
    this.selectedSchedule = {
      id: schedule.id,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      dayOfWeek: schedule.dayOfWeek,
      courseId: schedule.course.id
    };
  }

  closeEditModal() {
    this.selectedSchedule = null;
  }

  updateSchedule() {
    if (this.validateSchedule(this.selectedSchedule)) {
      this.scheduleService.updateSchedule(this.selectedSchedule.id, this.selectedSchedule).subscribe(
        () => {
          this.loadSchedules();
          this.closeEditModal();
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Horario actualizado correctamente',
            showConfirmButton: false,
            timer: 1500
          });
        },
        error => {
          console.error('Error updating schedule:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo actualizar el horario',
          });
        }
      );
    }
  }

  deleteSchedule(id: number) {
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
        this.scheduleService.deleteSchedule(id).subscribe(
          () => {
            this.loadSchedules();
            Swal.fire({
              icon: 'success',
              title: '¡Eliminado!',
              text: 'Horario eliminado correctamente',
              showConfirmButton: false,
              timer: 1500
            });
          },
          error => {
            console.error('Error deleting schedule:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar el horario',
            });
          }
        );
      }
    });
  }

  private validateSchedule(schedule: any): boolean {
    if (!schedule.startTime || !schedule.endTime || !schedule.dayOfWeek || !schedule.courseId) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos del horario',
      });
      return false;
    }
    return true;
  }
} 