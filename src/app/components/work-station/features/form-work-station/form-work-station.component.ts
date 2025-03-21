import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { WorkStationService } from '../../services/work-station.service';
import { MatSelectModule } from '@angular/material/select';
import { WorkAreaService } from '../../../work-area/services/work-area.service';
import { WorkArea } from '../../../work-area/interfaces/work-area';
import { MessagesService } from '../../../../shared/services/messages.service';

@Component({
  selector: 'app-form-work-station',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule,
    MatIconModule, MatCheckboxModule, MatDialogModule, MatSelectModule],
  templateUrl: './form-work-station.component.html',
  styleUrl: './form-work-station.component.scss'
})
export class FormWorkStationComponent {

  readonly dialogRef = inject(MatDialogRef<FormWorkStationComponent>);
  readonly data = inject(MAT_DIALOG_DATA);
  workStationService = inject(WorkStationService);
  workAreaService = inject(WorkAreaService);
  fb = inject(FormBuilder);
  messageService = inject(MessagesService);

  title: string = 'Crear';

  listAreas = signal<WorkArea[]>([]);
  
  formWorkstation!: FormGroup;

  ngOnInit(): void {
    this.formWorkstation = this.fb.group({
      name: ['', Validators.required],
      workAreaId: ['', Validators.required]
    });
    this.getWorkAreas();
    this.setDataEdit();
  }


  getWorkAreas() {
    this.workAreaService.getWorkArea().subscribe({
      next: (res) => {
        this.listAreas.set(res);
      }
    });
  }


  close(isModified: boolean): void {
    this.dialogRef.close(isModified);
  }

  setDataEdit(): void {
    if (this.data.id) {
      this.formWorkstation.addControl('id', this.fb.control('', Validators.required));
      this.title = 'Editar';
      this.getWorkstationById();
    }
  }

  saveWorkstation(): void {
    this.formWorkstation.markAllAsTouched();
    if (this.formWorkstation.valid)
      this.workStationService.saveWorkstation(this.formWorkstation.value).subscribe({
        next: () => {
          this.messageService.showToastSuccess('Exitoso', 'Se ha guardado con éxito.');
          this.close(true);
        }
      });
  }

  updateWorkstation(): void {
    this.formWorkstation.markAllAsTouched();
    if (this.formWorkstation.valid)
      this.workStationService.updateWorkstation(this.formWorkstation.value).subscribe({
        next: () => {
          this.messageService.showToastSuccess('Exitoso', 'Se ha actualizado con éxito.');
          this.close(true);
        }
      });
  }

  getWorkstationById(): void {
    this.workStationService.getWorkstationById(this.data.id).subscribe({
      next: (res) => {
        this.formWorkstation.patchValue(res);
      }
    });
  }

}
