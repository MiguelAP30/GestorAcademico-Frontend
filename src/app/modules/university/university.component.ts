import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UniversityService } from '../../services/university.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-university',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UniversityComponent {
  universities: any[] = [];
  newUniversity = { name: '' };
  showCreateUniversityModal = false;
  selectedUniversityForEdit: any = null;

  constructor(private universityService: UniversityService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadUniversities();
  }

  loadUniversities() {
    this.universityService.getUniversities().subscribe((data) => {
      this.universities = [...data];
      this.cdr.markForCheck();
    });
  }

  openCreateUniversityModal() {
    this.showCreateUniversityModal = true;
    this.cdr.markForCheck();
  }

  closeCreateUniversityModal() {
    this.showCreateUniversityModal = false;
    this.newUniversity = { name: '' };
    this.cdr.markForCheck();
  }

  openEditUniversityModal(university: any) {
    this.selectedUniversityForEdit = { ...university };
    this.cdr.markForCheck();
  }

  closeEditUniversityModal() {
    this.selectedUniversityForEdit = null;
    this.cdr.markForCheck();
  }

  addUniversity() {
    if (!this.newUniversity.name.trim()) return;
    console.log(this.newUniversity);
    
    this.universityService.createUniversity(this.newUniversity).subscribe(() => {
      this.closeCreateUniversityModal();
      this.loadUniversities();
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Universidad creada correctamente',
        showConfirmButton: false,
        timer: 1500
      });
    }, error => {
      console.error('Error al agregar universidad', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo crear la universidad',
      });
    });
  }

  updateUniversity() {
    if (!this.selectedUniversityForEdit.name.trim()) return;

    this.universityService.updateUniversity(this.selectedUniversityForEdit.id, this.selectedUniversityForEdit).subscribe(() => {
      this.closeEditUniversityModal();
      this.loadUniversities();
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Universidad actualizada correctamente',
        showConfirmButton: false,
        timer: 1500
      });
    }, error => {
      console.error('Error al actualizar universidad', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar la universidad',
      });
    });
  }
  
  deleteUniversity(id: number) {
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
        this.universityService.deleteUniversity(id).subscribe(() => {
          this.loadUniversities();
          Swal.fire({
            icon: 'success',
            title: '¡Eliminado!',
            text: 'Universidad eliminada correctamente',
            showConfirmButton: false,
            timer: 1500
          });
        }, error => {
          console.error('Error al eliminar universidad', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo eliminar la universidad',
          });
        });
      }
    });
  }

  private validateUniversity(university: any): boolean {
    if (!university.name?.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, ingrese el nombre de la universidad',
      });
      return false;
    }
    return true;
  }
}
