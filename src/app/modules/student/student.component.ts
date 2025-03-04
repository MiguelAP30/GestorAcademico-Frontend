import { Component } from "@angular/core";
import { StudentService } from "../../services/student.service";
import { FormsModule } from "@angular/forms";
import { CommonModule, NgIf, NgFor } from "@angular/common";

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgFor],
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
  students: any[] = [];
  selectedStudentForEdit: any = null;
  selectedStudentForCourses: any = null;
  showCreateStudentModal: boolean = false;
  newStudent = { identification: '', firstName: '', lastName: '', birthDate: '' };
  expandedEnrollment: { [key: number]: boolean } = {};

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getStudents().subscribe((data) => {
      this.students = data;
    });
  }

  openCreateStudentModal() {
    this.showCreateStudentModal = true;
  }

  closeCreateStudentModal() {
    this.showCreateStudentModal = false;
  }

  addStudent() {
    if (!this.newStudent.identification.trim() || 
        !this.newStudent.firstName.trim() || 
        !this.newStudent.lastName.trim() || 
        !this.newStudent.birthDate) return;

    this.studentService.createStudent(this.newStudent).subscribe((student) => {
      this.students.push(student);
      this.newStudent = { identification: '', firstName: '', lastName: '', birthDate: '' };
      this.closeCreateStudentModal();
    });
  }

  deleteStudent(id: string) {
    this.studentService.deleteStudent(id).subscribe(() => {
      this.students = this.students.filter(s => s.identification !== id);
    });
  }

  openEditModal(student: any) {
    this.selectedStudentForEdit = { ...student };
    this.selectedStudentForCourses = null;
  }

  updateStudent() {
    if (!this.selectedStudentForEdit) return;

    const updatedStudent = { ...this.selectedStudentForEdit };
    delete updatedStudent.enrollments;

    this.studentService.updateStudent(updatedStudent).subscribe((student:any) => {
      const index = this.students.findIndex(s => s.identification === student.identification);
      if (index !== -1) {
        this.students[index] = student;
      }
      this.closeEditModal();
    });
  }

  closeEditModal() {
    this.selectedStudentForEdit = null;
  }

  openCoursesModal(student: any) {
    this.selectedStudentForCourses = student;
    this.selectedStudentForEdit = null;
  }

  closeCoursesModal() {
    this.selectedStudentForCourses = null;
  }

  toggleEvaluations(courseId: number) {
    this.expandedEnrollment[courseId] = !this.expandedEnrollment[courseId];
  }
}
