import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfessorService } from '../../services/professor.service';
import { DepartmentService } from '../../services/department.service';

interface Department {
  id: number;
  name: string;
}

@Component({
  selector: 'app-professor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.css']
})
export class ProfessorComponent {
  professors: any[] = [];
  departments: Department[] = [];
  selectedProfessorForEdit: any = null;
  selectedProfessor: any = null;
  showCreateProfessorModal: boolean = false;
  newProfessor = { identification: '', firstName: '', lastName: '', departmentId: '' };

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

  addProfessor() {
    if (!this.newProfessor.identification.trim() || !this.newProfessor.firstName.trim() || !this.newProfessor.lastName.trim()) return;
    this.professorService.createProfessor(this.newProfessor).subscribe(() => {
      this.newProfessor = { identification: '', firstName: '', lastName: '', departmentId: '' };
      this.closeCreateProfessorModal();
      this.loadProfessors();
    });
  }

  deleteProfessor(id: string) {
    this.professorService.deleteProfessor(id).subscribe(() => {
      this.loadProfessors();
    });
  }

  openEditProfessorModal(professor: any) {
    this.selectedProfessorForEdit = { ...professor };
  }

  closeEditProfessorModal() {
    this.selectedProfessorForEdit = null;
  }

  updateProfessor() {
    if (!this.selectedProfessorForEdit) return;

    this.professorService.updateProfessor(this.selectedProfessorForEdit).subscribe(() => {
      this.closeEditProfessorModal();
      this.loadProfessors();
    });
  }

  openProfessorCoursesModal(professor: any) {
    this.selectedProfessor = professor;
  }

  closeProfessorCoursesModal() {
    this.selectedProfessor = null;
  }
}
