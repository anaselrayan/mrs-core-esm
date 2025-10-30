import { Injectable, signal, effect } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
  actions?: NotificationAction[];
  timestamp: Date;
  read: boolean;
}

export interface NotificationAction {
  label: string;
  action: () => void;
  style?: 'primary' | 'secondary' | 'danger';
}

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly _notifications = signal<Notification[]>([]);
  private readonly _unreadCount = signal<number>(0);

  // Public readonly signals
  readonly notifications = this._notifications.asReadonly();
  readonly unreadCount = this._unreadCount.asReadonly();

  // BehaviorSubjects for compatibility with existing code
  private readonly notificationsSubject = new BehaviorSubject<Notification[]>([]);
  readonly notifications$ = this.notificationsSubject.asObservable();

  constructor() {
    // Sync signals with BehaviorSubject
    effect(() => {
      this.notificationsSubject.next(this._notifications());
    });
  }

  showSuccess(title: string, message: string, duration: number = 5000): string {
    return this.addNotification({
      type: 'success',
      title,
      message,
      duration
    });
  }

  showError(title: string, message: string, duration: number = 0): string {
    return this.addNotification({
      type: 'error',
      title,
      message,
      duration
    });
  }

  showWarning(title: string, message: string, duration: number = 5000): string {
    return this.addNotification({
      type: 'warning',
      title,
      message,
      duration
    });
  }

  showInfo(title: string, message: string, duration: number = 5000): string {
    return this.addNotification({
      type: 'info',
      title,
      message,
      duration
    });
  }

  showNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>): string {
    return this.addNotification(notification);
  }

  private addNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>): string {
    const id = this.generateId();
    const newNotification: Notification = {
      ...notification,
      id,
      timestamp: new Date(),
      read: false
    };

    const currentNotifications = this._notifications();
    const updatedNotifications = [...currentNotifications, newNotification];
    
    this._notifications.set(updatedNotifications);
    this.updateUnreadCount();

    // Auto-remove notification after duration
    if (notification.duration && notification.duration > 0) {
      setTimeout(() => {
        this.removeNotification(id);
      }, notification.duration);
    }

    return id;
  }

  removeNotification(id: string): void {
    const currentNotifications = this._notifications();
    const updatedNotifications = currentNotifications.filter(n => n.id !== id);
    
    this._notifications.set(updatedNotifications);
    this.updateUnreadCount();
  }

  markAsRead(id: string): void {
    const currentNotifications = this._notifications();
    const updatedNotifications = currentNotifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    
    this._notifications.set(updatedNotifications);
    this.updateUnreadCount();
  }

  markAllAsRead(): void {
    const currentNotifications = this._notifications();
    const updatedNotifications = currentNotifications.map(n => ({ ...n, read: true }));
    
    this._notifications.set(updatedNotifications);
    this.updateUnreadCount();
  }

  clearAll(): void {
    this._notifications.set([]);
    this.updateUnreadCount();
  }

  clearByType(type: NotificationType): void {
    const currentNotifications = this._notifications();
    const updatedNotifications = currentNotifications.filter(n => n.type !== type);
    
    this._notifications.set(updatedNotifications);
    this.updateUnreadCount();
  }

  getNotificationsByType(type: NotificationType): Notification[] {
    return this._notifications().filter(n => n.type === type);
  }

  getUnreadNotifications(): Notification[] {
    return this._notifications().filter(n => !n.read);
  }

  private updateUnreadCount(): void {
    const unreadCount = this._notifications().filter(n => !n.read).length;
    this._unreadCount.set(unreadCount);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  }
}
