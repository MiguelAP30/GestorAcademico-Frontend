// /src/modules/university/university.component.ts
import { Component, ChangeDetectionStrategy  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UniversityService } from '../../services/university.service';

@Component({
  selector: 'app-university',
  standalone: true,
  imports: [CommonModule, FormsModule], // ❌ Elimina HttpClientModule, ya está en provideHttpClient()
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UniversityComponent {
  universities: any[] = [];
  newUniversity = { name: '' };

  constructor(private universityService: UniversityService) {}

  ngOnInit() {
    this.loadUniversities();
  }

  loadUniversities() {
    this.universityService.getUniversities().subscribe((data) => {
      this.universities = data;
    });
  }

  addUniversity() {
    if (!this.newUniversity.name.trim()) return;
    console.log('Agregando universidad:', this.newUniversity.name);
    
    this.universityService.createUniversity(this.newUniversity).subscribe(() => {
      console.log('Universidad agregada correctamente');
      this.newUniversity.name = '';
      this.loadUniversities();
    }, error => console.error('Error al agregar universidad', error));
  }
  
  deleteUniversity(id: number) {
    console.log('Eliminando universidad con ID:', id);
    
    this.universityService.deleteUniversity(id).subscribe(() => {
      console.log('Universidad eliminada correctamente');
      this.loadUniversities();
    }, error => console.error('Error al eliminar universidad', error));
  }
}
