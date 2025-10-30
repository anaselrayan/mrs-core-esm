import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CalendarScheduleComponent } from "../calendar-schedule/calendar-schedule.component";

interface Appointment {
  id: string;
  patient: string;
  doctor: string;
  room: string;
  startTime: string;
  endTime: string;
  duration: number;
  type: 'exam' | 'surgery' | 'mri' | 'consultation';
  status: 'confirmed' | 'pending' | 'cancelled';
  color: string;
}

interface TimeSlot {
  time: string;
  hour: number;
  minute: number;
}

@Component({
  selector: 'app-calendar-view',
  standalone: true,
  imports: [CommonModule, CalendarScheduleComponent],
  template: `
    <calendar-schedule></calendar-schedule>
  `,
  styles: [``]
})
export class CalendarViewComponent {
}
