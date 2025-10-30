import { Injectable, signal, effect } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface LoadingState {
  isLoading: boolean;
  message?: string;
  progress?: number;
}

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private readonly _isLoading = signal<boolean>(false);
  private readonly _loadingMessage = signal<string>('');
  private readonly _loadingProgress = signal<number>(0);
  private readonly _loadingStack = signal<Set<string>>(new Set());

  // Public readonly signals
  readonly isLoading = this._isLoading.asReadonly();
  readonly loadingMessage = this._loadingMessage.asReadonly();
  readonly loadingProgress = this._loadingProgress.asReadonly();

  // BehaviorSubjects for compatibility
  private readonly loadingSubject = new BehaviorSubject<LoadingState>({
    isLoading: false
  });
  readonly loading$ = this.loadingSubject.asObservable();

  constructor() {
    // Sync signals with BehaviorSubject
    effect(() => {
      this.loadingSubject.next({
        isLoading: this._isLoading(),
        message: this._loadingMessage(),
        progress: this._loadingProgress()
      });
    });
  }

  show(message?: string, progress?: number): string {
    const id = this.generateId();
    const loadingStack = new Set(this._loadingStack());
    loadingStack.add(id);
    
    this._loadingStack.set(loadingStack);
    this._isLoading.set(true);
    
    if (message) {
      this._loadingMessage.set(message);
    }
    
    if (progress !== undefined) {
      this._loadingProgress.set(progress);
    }

    return id;
  }

  hide(id?: string): void {
    if (id) {
      const loadingStack = new Set(this._loadingStack());
      loadingStack.delete(id);
      this._loadingStack.set(loadingStack);
      
      if (loadingStack.size === 0) {
        this._isLoading.set(false);
        this._loadingMessage.set('');
        this._loadingProgress.set(0);
      }
    } else {
      // Hide all loading states
      this._loadingStack.set(new Set());
      this._isLoading.set(false);
      this._loadingMessage.set('');
      this._loadingProgress.set(0);
    }
  }

  updateMessage(message: string): void {
    this._loadingMessage.set(message);
  }

  updateProgress(progress: number): void {
    this._loadingProgress.set(Math.max(0, Math.min(100, progress)));
  }

  setProgress(progress: number, message?: string): void {
    this.updateProgress(progress);
    if (message) {
      this.updateMessage(message);
    }
  }

  withLoading<T>(
    operation: () => Promise<T> | Observable<T>,
    message?: string,
    progress?: number
  ): Promise<T> | Observable<T> {
    const loadingId = this.show(message, progress);
    
    const result = operation();
    
    if (result instanceof Promise) {
      return result.finally(() => this.hide(loadingId));
    } else {
      // For Observable, we need to handle it differently
      return result;
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  }
}
