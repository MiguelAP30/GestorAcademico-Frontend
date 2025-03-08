import { Component, OnInit } from '@angular/core';
import { EvaluationTypeService } from '../../services/evaluation-type.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

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
  originalPercentage = 0;

  constructor(private evaluationTypeService: EvaluationTypeService) {}

  ngOnInit() {
    this.loadEvaluationTypes();
  }

  loadEvaluationTypes() {
    this.evaluationTypeService.getAll().subscribe((data) => {
      this.evaluationTypes = data as any[];
    });
  }

  getRemainingPercentage(): number {
    const totalPercentage = this.evaluationTypes.reduce((sum, type) => {
      if (this.isEditing && type.id === this.selectedEvaluationType?.id) {
        return sum;
      }
      return sum + (type.percentage || 0);
    }, 0);
    return 100 - totalPercentage;
  }

  validatePercentage(percentage: number): boolean {
    if (!percentage) return false;
    const remaining = this.getRemainingPercentage();
    if (this.isEditing) {
      return percentage <= (remaining + (this.selectedEvaluationType?.percentage || 0));
    }
    return percentage <= remaining;
  }

  createEvaluationType() {
    this.isEditing = false;
    this.originalPercentage = 0;
    const remaining = this.getRemainingPercentage();
    this.selectedEvaluationType = {
      name: '',
      percentage: 0,
      maxPercentage: remaining
    };
  }

  editEvaluationType(evaluation: any) {
    this.isEditing = true;
    this.originalPercentage = evaluation.percentage;
    this.selectedEvaluationType = { ...evaluation };
    const remaining = this.getRemainingPercentage();
    this.selectedEvaluationType.maxPercentage = remaining + evaluation.percentage;
  }

  saveEvaluationType() {
    if (!this.selectedEvaluationType.name.trim() || 
        !this.validatePercentage(this.selectedEvaluationType.percentage)) {
      return;
    }

    if (this.isEditing) {
      this.evaluationTypeService.update(this.selectedEvaluationType.id, this.selectedEvaluationType)
        .subscribe(() => {
          this.loadEvaluationTypes();
          this.closeModal();
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Tipo de evaluación actualizado correctamente',
            showConfirmButton: false,
            timer: 1500
          });
        },
        error => {
          console.error('Error updating evaluation type:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo actualizar el tipo de evaluación',
          });
        });
    } else {
      this.evaluationTypeService.create(this.selectedEvaluationType).subscribe(() => {
        this.loadEvaluationTypes();
        this.closeModal();
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Tipo de evaluación creado correctamente',
          showConfirmButton: false,
          timer: 1500
        });
      },
      error => {
        console.error('Error creating evaluation type:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo crear el tipo de evaluación',
        });
      });
    }    
  }

  deleteEvaluationType(id: number) {
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
        this.evaluationTypeService.delete(id).subscribe(() => {
          this.loadEvaluationTypes();
          Swal.fire({
            icon: 'success',
            title: '¡Eliminado!',
            text: 'Tipo de evaluación eliminado correctamente',
            showConfirmButton: false,
            timer: 1500
          });
        },
        error => {
          console.error('Error deleting evaluation type:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo eliminar el tipo de evaluación',
          });
        });
      }
    });
  }

  closeModal() {
    this.selectedEvaluationType = null;
    this.isEditing = false;
    this.originalPercentage = 0;
  }

  closeModalOutside(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }
}
