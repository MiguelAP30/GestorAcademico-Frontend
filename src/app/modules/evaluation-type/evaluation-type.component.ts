import { Component, OnInit } from '@angular/core';
import { EvaluationTypeService } from '../../services/evaluation-type.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-evaluation-type',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './evaluation-type.component.html',
  styleUrl: './evaluation-type.component.css',
})
export class EvaluationTypeComponent implements OnInit {
  evaluationTypes: any[] = [];
  selectedEvaluationType: any = null;
  isEditing = false;
  newEvaluationType = { name: '', percentage: 0 };

  constructor(private evaluationTypeService: EvaluationTypeService) {}

  ngOnInit() {
    this.loadEvaluationTypes();
  }

  loadEvaluationTypes() {
    this.evaluationTypeService.getAll().subscribe((data) => {
      this.evaluationTypes = data as any[];
    });
  }

  createEvaluationType() {
    this.selectedEvaluationType = { name: '', percentage: 0 };
    this.isEditing = false;
  }

  editEvaluationType(evaluation: any) {
    this.selectedEvaluationType = { ...evaluation }; // Clonar para evitar mutaciones
    this.isEditing = true;
  }

  saveEvaluationType() {
    if (!this.selectedEvaluationType.name.trim() || this.selectedEvaluationType.percentage < 0) return;

    if (this.isEditing) {
      this.evaluationTypeService.update(this.selectedEvaluationType.id, this.selectedEvaluationType)
        .subscribe(() => {
          this.loadEvaluationTypes();
          this.closeModal();
        });
    } else {
      
      this.evaluationTypeService.create(this.selectedEvaluationType)
        .subscribe(() => {
          this.newEvaluationType = { name: '', percentage: 0 };
          this.closeModal();
        });
      console.log(this.newEvaluationType);
    }
  }

  deleteEvaluationType(id: number) {
    this.evaluationTypeService.delete(id).subscribe(() => this.loadEvaluationTypes());
  }

  closeModal() {
    this.selectedEvaluationType = null;
    this.isEditing = false;
  }
}
