export interface Patient {
  id: string;
  patientId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: Gender;
  phone: string;
  email?: string;
  address: Address;
  emergencyContact: EmergencyContact;
  medicalHistory: MedicalRecord[];
  allergies: Allergy[];
  medications: Medication[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

export interface MedicalRecord {
  id: string;
  date: Date;
  diagnosis: string;
  treatment: string;
  doctor: string;
  notes?: string;
}

export interface Allergy {
  id: string;
  allergen: string;
  severity: AllergySeverity;
  notes?: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: Date;
  endDate?: Date;
  prescribedBy: string;
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export enum AllergySeverity {
  MILD = 'MILD',
  MODERATE = 'MODERATE',
  SEVERE = 'SEVERE',
  LIFE_THREATENING = 'LIFE_THREATENING',
}

export interface PatientSearchFilters {
  searchTerm?: string;
  gender?: Gender;
  ageRange?: {
    min: number;
    max: number;
  };
  city?: string;
  isActive?: boolean;
}

