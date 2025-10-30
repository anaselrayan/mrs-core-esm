import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-patient-registration',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent],
  template: `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          Patient Registration
        </h1>
        <app-button
          variant="outline"
          (onClick)="goBack()"
        >
          Back to Patients
        </app-button>
      </div>

      <app-card>
        <div class="text-center py-12">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Patient Registration Form
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            This feature is under development. You'll be able to register new patients here.
          </p>
          <app-button
            variant="primary"
            (onClick)="goBack()"
          >
            Go Back
          </app-button>
        </div>
      </app-card>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class PatientRegistrationComponent {
  goBack(): void {
    // This would navigate back to patient list
    console.log('Navigate back to patient list');
  }
}

