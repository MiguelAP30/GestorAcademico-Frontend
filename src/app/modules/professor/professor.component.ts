// src/app/modules/professor/professor.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfessorService } from '../../services/professor.service';

@Component({
  selector: 'app-professor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.css']
})
export class ProfessorComponent {
  professors: any[] = [];
  newProfessor = { identification: '', firstName: '', lastName: '', departmentId: '' };

  constructor(private professorService: ProfessorService) {}

  ngOnInit() {
    this.loadProfessors();
  }

  loadProfessors() {
    this.professorService.getProfessors().subscribe((data) => {
      this.professors = data;
    });
  }

  addProfessor() {
    if (!this.newProfessor.identification.trim() || !this.newProfessor.firstName.trim() || !this.newProfessor.lastName.trim()) return;
    this.professorService.createProfessor(this.newProfessor).subscribe(() => {
      this.newProfessor = { identification: '', firstName: '', lastName: '', departmentId: '' };
      this.loadProfessors();
    });
  }

  deleteProfessor(id: string) {
    this.professorService.deleteProfessor(id).subscribe(() => {
      this.loadProfessors();
    });
  }
}
