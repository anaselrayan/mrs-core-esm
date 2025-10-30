import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
// import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

interface DashboardStat {
  title: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: string;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    // CardComponent,
    ButtonComponent,
  ],
  template: `
    <div class="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <!-- Header Section -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome back, {{ userFullName() }}!
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400">
          Here's what's happening at your hospital today.
        </p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div *ngFor="let stat of stats()" class="card status-card slide-in">
          <div class="card-body">
            <div class="flex items-center justify-between mb-4">
              <div [class]="stat.color" class="flex-shrink-0 p-3 rounded-xl shadow-lg">
                <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path [attr.d]="stat.icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                </svg>
              </div>
              <div class="text-right">
                <div class="text-2xl font-bold text-gray-900 dark:text-white">
                  {{ stat.value.toLocaleString() }}
                </div>
                <div class="flex items-center">
                  <span [class]="getChangeColor(stat.changeType)" class="text-sm font-medium">
                    {{ stat.change > 0 ? '+' : '' }}{{ stat.change }}%
                  </span>
                  <span class="text-sm text-gray-500 dark:text-gray-400 ml-1">
                    vs last month
                  </span>
                </div>
              </div>
            </div>
            <h3 class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
              {{ stat.title }}
            </h3>
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div [class]="getProgressColor(stat.changeType)" class="h-2 rounded-full transition-all duration-300" [style.width.%]="getProgress(stat.change)"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Recent Patients -->
        <div class="card">
          <div class="card-header">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Patients
            </h3>
          </div>
          <div class="card-body">
            <div class="space-y-4">
              <div *ngFor="let patient of recentPatients()" class="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div class="flex-shrink-0">
                  <div class="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                    <span class="text-sm font-medium text-primary-600 dark:text-primary-400">
                      {{ patient.name.charAt(0) }}
                    </span>
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {{ patient.name }}
                  </p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ patient.lastVisit }}
                  </p>
                </div>
                <div class="flex-shrink-0">
                  <span [class]="patient.statusColor" class="status-badge">
                    {{ patient.status }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <app-button
              variant="outline"
              [fullWidth]="createSignal(true)"
              (onClick)="navigateToPatients()"
            >
              View All Patients
            </app-button>
          </div>
        </div>

        <!-- Today's Appointments -->
        <div class="card">
          <div class="card-header">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Today's Appointments
            </h3>
          </div>
          <div class="card-body">
            <div class="space-y-4">
              <div *ngFor="let appointment of todaysAppointments()" class="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div class="flex-shrink-0">
                  <div class="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {{ appointment.patient }}
                  </p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ appointment.time }} - {{ appointment.doctor }}
                  </p>
                </div>
                <div class="flex-shrink-0">
                  <span [class]="appointment.statusColor" class="status-badge">
                    {{ appointment.status }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <app-button
              variant="outline"
              [fullWidth]="createSignal(true)"
              (onClick)="navigateToAppointments()"
            >
              View All Appointments
            </app-button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class DashboardComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  // Signals
  readonly userFullName = this.authService.userFullName;

  // Mock data - in a real app, this would come from services
  readonly stats = signal<DashboardStat[]>([
    {
      title: 'Total Patients',
      value: 1247,
      change: 12.5,
      changeType: 'increase',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
      color: 'bg-primary-500'
    },
    {
      title: 'Today\'s Appointments',
      value: 23,
      change: -2.1,
      changeType: 'decrease',
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      color: 'bg-success-500'
    },
    {
      title: 'Pending Tasks',
      value: 8,
      change: 0,
      changeType: 'neutral',
      icon: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
      color: 'bg-warning-500'
    },
    {
      title: 'Revenue (Monthly)',
      value: 45680,
      change: 8.2,
      changeType: 'increase',
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1',
      color: 'bg-info-500'
    }
  ]);

  readonly recentPatients = signal([
    { name: 'John Doe', lastVisit: '2 days ago', status: 'Active', statusColor: 'active' },
    { name: 'Jane Smith', lastVisit: '1 week ago', status: 'Follow-up', statusColor: 'pending' },
    { name: 'Bob Johnson', lastVisit: '3 days ago', status: 'Active', statusColor: 'active' },
  ]);

  readonly todaysAppointments = signal([
    { patient: 'Alice Brown', time: '9:00 AM', doctor: 'Dr. Smith', status: 'Confirmed', statusColor: 'active' },
    { patient: 'Charlie Wilson', time: '10:30 AM', doctor: 'Dr. Johnson', status: 'Pending', statusColor: 'pending' },
    { patient: 'Diana Lee', time: '2:00 PM', doctor: 'Dr. Brown', status: 'Confirmed', statusColor: 'active' },
  ]);

  getChangeColor(changeType: 'increase' | 'decrease' | 'neutral'): string {
    switch (changeType) {
      case 'increase':
        return 'text-success-600 dark:text-success-400';
      case 'decrease':
        return 'text-error-600 dark:text-error-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  }

  getProgressColor(changeType: 'increase' | 'decrease' | 'neutral'): string {
    switch (changeType) {
      case 'increase':
        return 'bg-success-500';
      case 'decrease':
        return 'bg-error-500';
      default:
        return 'bg-gray-400';
    }
  }

  getProgress(change: number): number {
    // Convert percentage change to progress bar width (0-100)
    const absChange = Math.abs(change);
    return Math.min(absChange * 2, 100); // Scale to make it more visible
  }

  navigateToPatients(): void {
    this.router.navigate(['/patients']);
  }

  navigateToAppointments(): void {
    this.router.navigate(['/appointments']);
  }

  createSignal(value: any) {
    return signal(value);
  }
}
