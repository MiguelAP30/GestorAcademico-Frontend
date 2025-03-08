import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DepartmentService } from '../../services/department.service';
import { UniversityService } from '../../services/university.service';
import { Department, University } from '../../models/department.model';

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
        },
        error => console.error('Error creating department:', error)
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
        },
        error => console.error('Error updating department:', error)
      );
    }
  }

  deleteDepartment(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este departamento?')) {
      this.departmentService.deleteDepartment(id).subscribe(
        () => this.loadDepartments(),
        error => console.error('Error deleting department:', error)
      );
    }
  }
}
