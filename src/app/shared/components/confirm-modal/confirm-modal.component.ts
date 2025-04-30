import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-overlay" *ngIf="show">
      <div class="modal-content">
        <h2>{{ title }}</h2>
        <p>{{ message }}</p>
        <div class="modal-actions">
          <button class="cancel-button" (click)="onCancel()">Cancelar</button>
          <button class="confirm-button" (click)="onConfirm()">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
      }

      .modal-content {
        background-color: white;
        padding: var(--spacing-lg);
        border-radius: var(--border-radius-lg);
        box-shadow: var(--box-shadow);
        max-width: 400px;
        width: 90%;

        h2 {
          color: var(--primary-color);
          margin-bottom: var(--spacing-md);
        }

        p {
          color: var(--text-secondary-color);
          margin-bottom: var(--spacing-lg);
        }
      }

      .modal-actions {
        display: flex;
        justify-content: flex-end;
        gap: var(--spacing-sm);
      }

      .cancel-button {
        padding: var(--spacing-sm) var(--spacing-md);
        border: none;
        border-radius: var(--border-radius-sm);
        background-color: #f5f5f5;
        color: var(--text-secondary-color);
        cursor: pointer;
        transition: all var(--transition-speed) ease;

        &:hover {
          background-color: #e0e0e0;
        }
      }

      .confirm-button {
        padding: var(--spacing-sm) var(--spacing-md);
        border: none;
        border-radius: var(--border-radius-sm);
        background-color: var(--accent-color);
        color: white;
        cursor: pointer;
        transition: all var(--transition-speed) ease;

        &:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }
      }
    `,
  ],
})
export class ConfirmModalComponent {
  @Input() show = false;
  @Input() title = 'Confirmar';
  @Input() message = '¿Estás seguro?';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
