import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UniversityService } from '../../services/university.service';

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
    }, error => console.error('Error al agregar universidad', error));
  }

  updateUniversity() {
    if (!this.selectedUniversityForEdit.name.trim()) return;

    this.universityService.updateUniversity(this.selectedUniversityForEdit.id, this.selectedUniversityForEdit).subscribe(() => {
      this.closeEditUniversityModal();
      this.loadUniversities();
    }, error => console.error('Error al actualizar universidad', error));
  }
  
  deleteUniversity(id: number) {
      this.universityService.deleteUniversity(id).subscribe(() => {
        this.loadUniversities();
      }, error => console.error('Error al eliminar universidad', error));
    
  }
}
