import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrerequisiteService } from '../../services/prerequisite.service';
import { CourseService } from '../../services/course.service';

interface Course {
  id: number;
  name: string;
  description: string;
}

interface Prerequisite {
  id: number;
  course: Course;
  prerequisite: Course;
}

@Component({
  selector: 'app-prerequisite',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './prerequisite.component.html',
  styleUrls: ['./prerequisite.component.css']
})
export class PrerequisiteComponent implements OnInit {
  prerequisites: Prerequisite[] = [];
  courses: Course[] = [];
  availablePrerequisites: Course[] = [];
  selectedPrerequisite: any = null;
  showCreateModal = false;
  newPrerequisite = {
    courseId: '',
    prerequisiteId: ''
  };

  constructor(
    private prerequisiteService: PrerequisiteService,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.loadPrerequisites();
    this.loadCourses();
  }

  loadPrerequisites() {
    this.prerequisiteService.getPrerequisites().subscribe(data => {
      this.prerequisites = data;
    });
  }

  loadCourses() {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
    });
  }

  onCourseSelect(event: Event) {
    const select = event.target as HTMLSelectElement;
    if (select) {
      this.updateAvailablePrerequisites(select.value);
    }
  }

  updateAvailablePrerequisites(courseId: string) {
    // Filtrar el curso seleccionado y sus prerrequisitos existentes
    this.availablePrerequisites = this.courses.filter(course => {
      // No mostrar el curso actual
      if (course.id.toString() === courseId) return false;
      
      // Si estamos en modo edición, permitir el prerrequisito actual
      if (this.selectedPrerequisite && 
          course.id.toString() === this.selectedPrerequisite.prerequisiteId) {
        return true;
      }
      
      // No mostrar cursos que ya son prerrequisitos
      const isAlreadyPrerequisite = this.prerequisites.some(prereq => 
        prereq.course.id.toString() === courseId && 
        prereq.prerequisite.id.toString() === course.id.toString()
      );
      
      return !isAlreadyPrerequisite;
    });
  }

  openCreatePrerequisiteModal() {
    this.showCreateModal = true;
    this.newPrerequisite = {
      courseId: '',
      prerequisiteId: ''
    };
  }

  closeCreateModal() {
    this.showCreateModal = false;
    this.newPrerequisite = {
      courseId: '',
      prerequisiteId: ''
    };
  }

  createPrerequisite() {
    if (!this.newPrerequisite.courseId || !this.newPrerequisite.prerequisiteId) {
      return;
    }

    const prerequisiteData = {
      courseId: parseInt(this.newPrerequisite.courseId),
      prerequisiteId: parseInt(this.newPrerequisite.prerequisiteId)
    };

    this.prerequisiteService.createPrerequisite(prerequisiteData).subscribe(() => {
      this.loadPrerequisites();
      this.closeCreateModal();
    });
  }

  editPrerequisite(prerequisite: Prerequisite) {
    this.selectedPrerequisite = {
      id: prerequisite.id,
      courseId: prerequisite.course.id.toString(),
      prerequisiteId: prerequisite.prerequisite.id.toString()
    };
    this.updateAvailablePrerequisites(prerequisite.course.id.toString());
  }

  closeEditModal() {
    this.selectedPrerequisite = null;
  }

  updatePrerequisite() {
    if (!this.selectedPrerequisite.courseId || !this.selectedPrerequisite.prerequisiteId) {
      return;
    }

    const prerequisiteData = {
      courseId: parseInt(this.selectedPrerequisite.courseId),
      prerequisiteId: parseInt(this.selectedPrerequisite.prerequisiteId)
    };

    this.prerequisiteService.updatePrerequisite(
      this.selectedPrerequisite.id,
      prerequisiteData
    ).subscribe(() => {
      this.loadPrerequisites();
      this.closeEditModal();
    });
  }

  deletePrerequisite(id: number) {
    this.prerequisiteService.deletePrerequisite(id).subscribe(() => {
      this.loadPrerequisites();
    });
  }
}
