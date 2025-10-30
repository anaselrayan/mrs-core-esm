import { Component, Input, Output, EventEmitter, signal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <p-button
      [type]="type"
      [disabled]="getBooleanValue(disabled) || getBooleanValue(loading)"
      [loading]="getBooleanValue(loading)"
      [severity]="getSeverity()"
      [size]="getSize()"
      [outlined]="variant === 'outline'"
      [text]="variant === 'ghost'"
      [class]="getButtonClasses()"
      (onClick)="onClick.emit($event)"
    >
      <ng-content></ng-content>
    </p-button>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `]
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: ButtonType = 'button';
  @Input() disabled: boolean | Signal<boolean> = signal(false);
  @Input() loading: boolean | Signal<boolean> = signal(false);
  @Input() fullWidth: boolean | Signal<boolean> = signal(false);
  @Input() iconOnly: boolean | Signal<boolean> = signal(false);
  
  @Output() onClick = new EventEmitter<Event>();

  getSeverity(): 'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'danger' | 'contrast' | 'help' {
    const severityMap = {
      primary: 'primary' as const,
      secondary: 'secondary' as const,
      outline: 'primary' as const,
      ghost: 'secondary' as const,
      danger: 'danger' as const
    };
    return severityMap[this.variant];
  }

  getSize(): 'small' | 'large' | undefined {
    const sizeMap = {
      sm: 'small' as const,
      md: undefined,
      lg: 'large' as const
    };
    return sizeMap[this.size];
  }

  getButtonClasses(): string {
    const classes = [];
    
    if (this.getBooleanValue(this.fullWidth)) {
      classes.push('w-full');
    }
    
    if (this.getBooleanValue(this.iconOnly)) {
      classes.push('p-button-icon-only');
    }
    
    return classes.join(' ');
  }

  getBooleanValue(value: boolean | Signal<boolean>): boolean {
    return typeof value === 'function' ? value() : value;
  }
}
