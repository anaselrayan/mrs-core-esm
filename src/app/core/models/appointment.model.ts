export interface Appointment {
  id: string;
  patientId: string;
  patient: {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
  doctorId: string;
  doctor: {
    id: string;
    firstName: string;
    lastName: string;
    specialization: string;
  };
  date: Date;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  type: AppointmentType;
  status: AppointmentStatus;
  reason: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AppointmentSlot {
  date: Date;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  doctorId: string;
  doctorName: string;
}

export interface CreateAppointmentRequest {
  patientId: string;
  doctorId: string;
  date: Date;
  startTime: string;
  endTime: string;
  type: AppointmentType;
  reason: string;
  notes?: string;
}

export interface UpdateAppointmentRequest {
  id: string;
  date?: Date;
  startTime?: string;
  endTime?: string;
  type?: AppointmentType;
  status?: AppointmentStatus;
  reason?: string;
  notes?: string;
}

export enum AppointmentType {
  CONSULTATION = 'CONSULTATION',
  FOLLOW_UP = 'FOLLOW_UP',
  EMERGENCY = 'EMERGENCY',
  SURGERY = 'SURGERY',
  CHECK_UP = 'CHECK_UP',
  VACCINATION = 'VACCINATION',
}

export enum AppointmentStatus {
  SCHEDULED = 'SCHEDULED',
  CONFIRMED = 'CONFIRMED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW',
}

export interface AppointmentFilters {
  dateFrom?: Date;
  dateTo?: Date;
  status?: AppointmentStatus;
  type?: AppointmentType;
  doctorId?: string;
  patientId?: string;
}

