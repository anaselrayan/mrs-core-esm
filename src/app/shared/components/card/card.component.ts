import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, CardModule],
  template: `
    <p-card 
      [class]="getCardClasses()"
      [style]="getCardStyle()"
    >
      <ng-content select="[slot=header]"></ng-content>
      <ng-content></ng-content>
      <ng-content select="[slot=footer]"></ng-content>
    </p-card>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class CardComponent {
  @Input() variant: 'default' | 'elevated' | 'outlined' = 'default';
  @Input() padding: 'none' | 'sm' | 'md' | 'lg' = 'md';
  @Input() hover = false;
  @Input() clickable = false;

  getCardClasses(): string {
    const classes = ['hospital-card'];
    
    if (this.hover) {
      classes.push('hover:shadow-md', 'hover:scale-105');
    }
    
    if (this.clickable) {
      classes.push('cursor-pointer');
    }
    
    if (this.variant === 'elevated') {
      classes.push('shadow-lg');
    } else if (this.variant === 'outlined') {
      classes.push('shadow-none', 'border-2');
    }
    
    return classes.join(' ');
  }

  getCardStyle(): any {
    const paddingMap = {
      none: '0',
      sm: '0.75rem',
      md: '1rem',
      lg: '1.5rem'
    };
    
    return {
      '--card-padding': paddingMap[this.padding]
    };
  }
}
