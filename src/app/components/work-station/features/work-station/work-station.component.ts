import { Component, inject, signal } from '@angular/core';
import { WorkStationService } from '../../services/work-station.service';
import { WorkStation } from '../../interface/work-station';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmComponent } from '../../../../shared/components/modal-confirm/modal-confirm.component';
import { FormWorkStationComponent } from '../form-work-station/form-work-station.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MessagesService } from '../../../../shared/services/messages.service';

@Component({
  selector: 'app-work-station',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, NgxPaginationModule],
  templateUrl: './work-station.component.html',
  styleUrl: './work-station.component.scss'
})
export class WorkStationComponent {

  workStationService = inject(WorkStationService);
  messageService = inject(MessagesService);
  readonly dialog = inject(MatDialog);

  listWorkStation = signal<WorkStation[]>([]);

  page = 1;

  ngOnInit(): void {
    this.getWorkstations();
  }

  getWorkstations() {
    this.workStationService.getWorkstation().subscribe({
      next: (res) => {
        this.listWorkStation.set(res);
      }
    });
  }

  openDialog(id: string | null): void {
    const dialogRef = this.dialog.open(FormWorkStationComponent, {
      height: '35vh',
      width: '60%',
      data: { id },
    });

    dialogRef.afterClosed().subscribe(isModified => {
      if (isModified)
        this.getWorkstations();
    });
  }

  deleteWorkstation(Workstation: WorkStation): void {
    const dialogConfirm = this.dialog.open(ModalConfirmComponent);
    dialogConfirm.afterClosed().subscribe(isModified => {
      if (isModified)
        this.workStationService.deleteWorkstation(Workstation).subscribe({
          next: () => {
            this.getWorkstations();
            this.messageService.showToastInfo('Alerta', 'El estado de tu registro ha sido inactivado');
          }
        });
    });
  }
}
