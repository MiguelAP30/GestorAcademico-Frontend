export interface University {
  id: number;
  name: string;
}

export interface Department {
  id: number;
  name: string;
  university?: University;
  universityId: number;
  professors?: Professor[];
  courses?: Course[];
}

export interface Professor {
  id: number;
  identification: string;
  firstName: string;
  lastName: string;
  department?: Department;
}

export interface Course {
  id: number;
  name: string;
  description: string;
  code?: string;
  credits?: number;
} 