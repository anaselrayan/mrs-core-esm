import { Component, Input, Output, EventEmitter, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Notification, NotificationType } from '../../../core/services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, ToastModule],
  providers: [MessageService],
  template: `
    <p-toast 
      [life]="duration()"
      [showTransformOptions]="'translateY(100%)'"
      [hideTransformOptions]="'translateY(100%)'"
    ></p-toast>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class NotificationComponent {
  @Input() notification = signal<Notification | null>(null);
  @Input() autoClose = signal(true);
  @Input() duration = signal(5000);

  @Output() onClose = new EventEmitter<string>();

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    // Listen for notification changes and show toast
    if (this.notification()) {
      this.showToast();
    }
  }

  private showToast() {
    const notification = this.notification();
    if (!notification) return;

    const severity = this.getSeverity(notification.type);
    
    this.messageService.add({
      severity: severity,
      summary: notification.title || '',
      detail: notification.message,
      life: this.duration(),
      closable: true,
      data: notification
    });
  }

  private getSeverity(type: NotificationType): string {
    const severityMap = {
      success: 'success',
      error: 'error',
      warning: 'warn',
      info: 'info'
    };
    return severityMap[type] || 'info';
  }
}

