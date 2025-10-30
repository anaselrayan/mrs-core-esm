import { Component, Input, Output, EventEmitter, signal, computed, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule],
  template: `
    <p-dialog
      [visible]="isOpen()"
      [modal]="true"
      [closable]="closable"
      [draggable]="false"
      [resizable]="false"
      [style]="getDialogStyle()"
      [header]="title()"
      (onHide)="close()"
    >
      <ng-content></ng-content>
      <ng-template pTemplate="footer" *ngIf="showDefaultFooter">
        <div class="flex justify-end gap-3">
          <p-button
            label="{{ cancelText }}"
            icon="pi pi-times"
            (onClick)="close()"
            [text]="true"
          ></p-button>
          <p-button
            label="{{ confirmText }}"
            icon="pi pi-check"
            (onClick)="confirm()"
            [loading]="confirmLoading"
          ></p-button>
        </div>
      </ng-template>
    </p-dialog>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ModalComponent {
  @Input() isOpen = signal(false);
  @Input() title = signal<string>('');
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'md';
  @Input() closable = true;
  @Input() closeOnBackdrop = true;
  @Input() showDefaultFooter = false;
  @Input() confirmText = 'Confirm';
  @Input() cancelText = 'Cancel';
  @Input() confirmLoading = false;
  @Input() variant: 'default' | 'centered' | 'top' = 'centered';

  @Output() onClose = new EventEmitter<void>();
  @Output() onConfirm = new EventEmitter<void>();

  getDialogStyle(): any {
    const sizeMap = {
      sm: { width: '25rem' },
      md: { width: '30rem' },
      lg: { width: '40rem' },
      xl: { width: '50rem' },
      full: { width: '90vw', height: '90vh' }
    };
    
    return sizeMap[this.size];
  }


  close(): void {
    this.isOpen.set(false);
    this.onClose.emit();
  }

  confirm(): void {
    this.onConfirm.emit();
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: Event): void {
    if (this.isOpen() && this.closable) {
      this.close();
    }
  }
}
