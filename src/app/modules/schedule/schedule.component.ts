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
  // ... existing properties ...

  createSchedule(): void {
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

  updateSchedule(): void {
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

  deleteSchedule(id: number): void {
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
    if (!schedule.day || !schedule.startTime || !schedule.endTime || !schedule.courseId) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos del horario',
      });
      return false;
    }
    return true;
  }

  // ... rest of the component code ...
}
