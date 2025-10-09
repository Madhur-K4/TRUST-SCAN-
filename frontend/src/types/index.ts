// src/types/index.ts
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'PATIENT' | 'DOCTOR';
  token: string;
}

export interface Patient {
  id: string;
  patientCode: string;
  fullName: string;
  dateOfBirth?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  contactNumber: string;
  address?: string;
  emergencyContact?: string;
}

export interface Document {
  id: string;
  title: string;
  documentType: 'REPORT' | 'PRESCRIPTION' | 'SCAN' | 'OTHER';
  filePath: string;
  uploadDate: string;
  description?: string;
  uploadedBy?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
  email: string;
  role: 'PATIENT' | 'DOCTOR';
  fullName?: string;
  contactNumber?: string;
}