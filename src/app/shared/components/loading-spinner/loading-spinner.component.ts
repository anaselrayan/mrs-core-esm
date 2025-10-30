import { Component, Input, signal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule, ProgressSpinnerModule, ProgressBarModule],
  template: `
    <div [class]="containerClasses()">
      <p-progressSpinner
        *ngIf="getNumberValue(this.progress) === undefined"
        [style]="getSpinnerStyle()"
        [strokeWidth]="getStrokeWidth()"
        [fill]="getFillColor()"
        [animationDuration]="'1s'"
      ></p-progressSpinner>
      
      <p-progressBar
        *ngIf="getNumberValue(this.progress) !== undefined"
        [value]="getNumberValue(this.progress)"
        [style]="getProgressBarStyle()"
        [showValue]="getBooleanValue(this.showProgressText)"
      ></p-progressBar>
      
      <div *ngIf="getStringValue(this.message)" [class]="messageClasses()">
        {{ getStringValue(this.message) }}
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class LoadingSpinnerComponent {
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() color: 'primary' | 'secondary' | 'white' | 'gray' = 'primary';
  @Input() message: string | Signal<string> = signal('');
  @Input() progress: number | undefined | Signal<number | undefined> = signal(undefined);
  @Input() showProgressText: boolean | Signal<boolean> = signal(true);
  @Input() overlay: boolean | Signal<boolean> = signal(false);
  @Input() centered: boolean | Signal<boolean> = signal(true);

  get containerClasses() {
    return () => {
      const baseClasses = 'flex flex-col items-center justify-center';
      const overlayClasses = this.getBooleanValue(this.overlay) ? 'fixed inset-0 bg-white bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 z-50' : '';
      const centeredClasses = this.getBooleanValue(this.centered) ? 'min-h-32' : '';
      
      return [baseClasses, overlayClasses, centeredClasses].filter(Boolean).join(' ');
    };
  }

  getSpinnerStyle(): any {
    const sizeMap = {
      sm: { width: '1rem', height: '1rem' },
      md: { width: '2rem', height: '2rem' },
      lg: { width: '3rem', height: '3rem' },
      xl: { width: '4rem', height: '4rem' }
    };
    
    return sizeMap[this.size];
  }

  getStrokeWidth(): string {
    const strokeMap = {
      sm: '2',
      md: '3',
      lg: '4',
      xl: '5'
    };
    
    return strokeMap[this.size];
  }

  getFillColor(): string {
    const colorMap = {
      primary: 'var(--color-primary-600)',
      secondary: 'var(--color-secondary-600)',
      white: '#ffffff',
      gray: 'var(--color-text-muted)'
    };
    
    return colorMap[this.color];
  }

  getProgressBarStyle(): any {
    const widthMap = {
      sm: { width: '4rem' },
      md: { width: '6rem' },
      lg: { width: '8rem' },
      xl: { width: '10rem' }
    };
    
    return widthMap[this.size];
  }

  get messageClasses() {
    return () => {
      const sizeClasses = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl'
      };
      
      return [
        'mt-2 text-gray-600 dark:text-gray-400 font-medium',
        sizeClasses[this.size]
      ].join(' ');
    };
  }

  getBooleanValue(value: boolean | Signal<boolean>): boolean {
    return typeof value === 'function' ? value() : value;
  }

  getStringValue(value: string | Signal<string>): string {
    return typeof value === 'function' ? value() : value;
  }

  getNumberValue(value: number | undefined | Signal<number | undefined>): number | undefined {
    return typeof value === 'function' ? value() : value;
  }
}
