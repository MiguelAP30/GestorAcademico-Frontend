import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfessorService } from '../../services/professor.service';
import { DepartmentService } from '../../services/department.service';
import { Professor, Department } from '../../models/department.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-professor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.css']
})
export class ProfessorComponent implements OnInit {
  professors: any[] = [];
  departments: Department[] = [];
  selectedProfessorForEdit: any = null;
  selectedProfessor: any = null;
  showCreateProfessorModal: boolean = false;
  newProfessor = { firstName: '', lastName: '', departmentId: '' };

  constructor(
    private professorService: ProfessorService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit() {
    this.loadProfessors();
    this.loadDepartments();
  }

  loadDepartments() {
    this.departmentService.getDepartments().subscribe((data) => {
      this.departments = data;
    });
  }

  loadProfessors() {
    this.professorService.getProfessors().subscribe((data) => {
      this.professors = data;
    });
  }

  openCreateProfessorModal() {
    this.showCreateProfessorModal = true;
  }

  closeCreateProfessorModal() {
    this.showCreateProfessorModal = false;
  }

  addProfessor(): void {
    if (this.validateProfessor(this.newProfessor)) {
      this.professorService.createProfessor(this.newProfessor).subscribe(
        () => {
          this.loadProfessors();
          this.closeCreateProfessorModal();
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Profesor agregado correctamente',
            showConfirmButton: false,
            timer: 1500
          });
        },
        error => {
          console.error('Error creating professor:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo agregar el profesor',
          });
        }
      );
    }
  }

  deleteProfessor(identification: string): void {
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
        this.professorService.deleteProfessor(identification).subscribe(
          () => {
            this.loadProfessors();
            Swal.fire({
              icon: 'success',
              title: '¡Eliminado!',
              text: 'Profesor eliminado correctamente',
              showConfirmButton: false,
              timer: 1500
            });
          },
          error => {
            console.error('Error deleting professor:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar el profesor',
            });
          }
        );
      }
    });
  }

  openEditProfessorModal(professor: any) {
    this.selectedProfessorForEdit = { ...professor };
  }

  closeEditProfessorModal() {
    this.selectedProfessorForEdit = null;
  }

  updateProfessor(): void {
    if (this.validateProfessor(this.selectedProfessorForEdit)) {
      this.professorService.updateProfessor(this.selectedProfessorForEdit).subscribe(
        () => {
          this.loadProfessors();
          this.closeEditProfessorModal();
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Profesor actualizado correctamente',
            showConfirmButton: false,
            timer: 1500
          });
        },
        error => {
          console.error('Error updating professor:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo actualizar el profesor',
          });
        }
      );
    }
  }

  openProfessorCoursesModal(professor: any) {
    this.selectedProfessor = professor;
  }

  closeProfessorCoursesModal() {
    this.selectedProfessor = null;
  }

  private validateProfessor(professor: any): boolean {
    if (!professor.firstName?.trim() || !professor.lastName?.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos del profesor',
      });
      return false;
    }
    return true;
  }
}
