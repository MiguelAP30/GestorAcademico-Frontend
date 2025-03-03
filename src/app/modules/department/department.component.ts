import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent {
  departments: any[] = [];
  newDepartment = { name: '', universityId: '' };

  constructor(private departmentService: DepartmentService) {}

  ngOnInit() {
    this.loadDepartments();
  }

  loadDepartments() {
    this.departmentService.getDepartments().subscribe((data) => {
      this.departments = data;
    });
  }

  addDepartment() {
    if (!this.newDepartment.name.trim() || !this.newDepartment.universityId) return;
    this.departmentService.createDepartment(this.newDepartment).subscribe(() => {
      this.newDepartment = { name: '', universityId: '' };
      this.loadDepartments();
    });
  }

  deleteDepartment(id: number) {
    this.departmentService.deleteDepartment(id).subscribe(() => {
      this.loadDepartments();
    });
  }
}
