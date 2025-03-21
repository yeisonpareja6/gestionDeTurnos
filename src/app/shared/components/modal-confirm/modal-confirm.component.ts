import { Component } from '@angular/core';
import {ChangeDetectionStrategy, inject} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirm',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './modal-confirm.component.html',
  styleUrl: './modal-confirm.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalConfirmComponent {
  readonly dialogRef = inject(MatDialogRef<ModalConfirmComponent>);

  closeModal(isConfirm: boolean) {
    this.dialogRef.close(isConfirm);
  }
}
