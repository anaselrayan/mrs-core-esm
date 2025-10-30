import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { ButtonComponent } from './components/button/button.component';
import { CardComponent } from './components/card/card.component';
import { ModalComponent } from './components/modal/modal.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { NotificationComponent } from './components/notification/notification.component';

// Services
import { NotificationService } from './services/notification.service';
import { LoadingService } from './services/loading.service';

const COMPONENTS = [
  ButtonComponent,
  CardComponent,
  ModalComponent,
  LoadingSpinnerComponent,
  NotificationComponent,
];

const SERVICES = [
  NotificationService,
  LoadingService,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...COMPONENTS,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...COMPONENTS,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class SharedModule { }

