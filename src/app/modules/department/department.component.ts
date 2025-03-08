import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DepartmentService } from '../../services/department.service';
import { UniversityService } from '../../services/university.service';
import { Department, University } from '../../models/department.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  
  departments: Department[] = [];
  universities: University[] = [];
  newDepartment: Department = {
    id: 0,
    name: '',
    universityId: 0
  };
  showCreateDepartmentModal = false;
  selectedDepartmentForEdit: Department | null = null;

  constructor(
    private departmentService: DepartmentService,
    private universityService: UniversityService
  ) {}

  ngOnInit(): void {
    this.loadDepartments();
    this.loadUniversities();
  }

  loadDepartments(): void {
    this.departmentService.getDepartments().subscribe(
      departments => this.departments = departments,
      error => console.error('Error loading departments:', error)
    );
  }

  loadUniversities(): void {
    this.universityService.getUniversities().subscribe(
      universities => this.universities = universities,
      error => console.error('Error loading universities:', error)
    );
  }

  getUniversityName(universityId: number): string {
    const university = this.universities.find(u => u.id === universityId);
    return university ? university.name : 'Desconocida';
  }

  openCreateDepartmentModal(): void {
    this.showCreateDepartmentModal = true;
  }

  closeCreateDepartmentModal(): void {
    this.showCreateDepartmentModal = false;
    this.newDepartment = {
      id: 0,
      name: '',
      universityId: 0
    };
  }

  addDepartment(): void {
    if (this.newDepartment.name.trim() && this.newDepartment.universityId) {
      this.departmentService.createDepartment(this.newDepartment).subscribe(
        () => {
          this.loadDepartments();
          this.closeCreateDepartmentModal();
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Departamento creado correctamente',
            showConfirmButton: false,
            timer: 1500
          });
        },
        error => {
          console.error('Error creating department:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo crear el departamento',
          });
        }
      );
    }
  }

  editDepartment(department: Department): void {
    this.selectedDepartmentForEdit = { ...department };
  }

  closeEditDepartmentModal(): void {
    this.selectedDepartmentForEdit = null;
  }

  updateDepartment(): void {
    if (this.selectedDepartmentForEdit && 
        this.selectedDepartmentForEdit.name.trim() && 
        this.selectedDepartmentForEdit.universityId) {
      this.departmentService.updateDepartment(this.selectedDepartmentForEdit).subscribe(
        () => {
          this.loadDepartments();
          this.closeEditDepartmentModal();
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Departamento actualizado correctamente',
            showConfirmButton: false,
            timer: 1500
          });
        },
        error => {
          console.error('Error updating department:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo actualizar el departamento',
          });
        }
      );
    }
  }

  deleteDepartment(id: number): void {
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
        this.departmentService.deleteDepartment(id).subscribe(
          () => {
            this.loadDepartments();
            Swal.fire({
              icon: 'success',
              title: '¡Eliminado!',
              text: 'Departamento eliminado correctamente',
              showConfirmButton: false,
              timer: 1500
            });
          },
          error => {
            console.error('Error deleting department:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar el departamento',
            });
          }
        );
      }
    });
  }
}
