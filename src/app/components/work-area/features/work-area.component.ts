import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { WorkAreaService } from '../services/work-area.service';
import { FormWorkAreaComponent } from './form-work-area/form-work-area.component';
import { MatDialog } from '@angular/material/dialog';
import { WorkArea } from '../interfaces/work-area';
import { ModalConfirmComponent } from '../../../shared/components/modal-confirm/modal-confirm.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-work-area',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, NgxPaginationModule],
  templateUrl: './work-area.component.html',
  styleUrl: './work-area.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkAreaComponent implements OnInit {

  workAreaService = inject(WorkAreaService);
  readonly dialog = inject(MatDialog);
  listAreas = signal<WorkArea[]>([]);
  page = 1;

  ngOnInit(): void {
    this.getWorkAreas();
  }

  getWorkAreas() {
    this.workAreaService.getWorkArea().subscribe({
      next: (res) => {
        this.listAreas.set(res);
        console.log(this.listAreas);

      }
    });
  }

  openDialog(id: string | null): void {
    const dialogRef = this.dialog.open(FormWorkAreaComponent, {
      height: '30vh',
      width: '60%',
      data: { id },
    });

    dialogRef.afterClosed().subscribe(isModified => {
      if (isModified)
        this.getWorkAreas();
    });
  }

  deleteWorkArea(workArea: WorkArea): void {
    const dialogConfirm = this.dialog.open(ModalConfirmComponent);
    dialogConfirm.afterClosed().subscribe(isModified => {
      if (isModified)
        this.workAreaService.deleteWorkArea(workArea).subscribe({
          next: () => {
            this.getWorkAreas();
          }
        });
    });
  }
}
