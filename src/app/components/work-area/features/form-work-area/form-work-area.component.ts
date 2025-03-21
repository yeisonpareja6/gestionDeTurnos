import { Component, inject, model, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WorkAreaService } from '../../services/work-area.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';



@Component({
  selector: 'app-form-work-area',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatCheckboxModule, MatDialogModule],
  templateUrl: './form-work-area.component.html',
  styleUrl: './form-work-area.component.scss'
})
export class FormWorkAreaComponent implements OnInit {

  readonly dialogRef = inject(MatDialogRef<FormWorkAreaComponent>);
  readonly data = inject(MAT_DIALOG_DATA);
  workAreaService = inject(WorkAreaService);
  fb = inject(FormBuilder);
  title: string = 'Crear';

  formWorkArea!: FormGroup;

  ngOnInit(): void {
    this.formWorkArea = this.fb.group({
      name: ['', Validators.required],
      isActive: true
    });

    this.setDataEdit();
  }

  close(isModified: boolean): void {
    this.dialogRef.close(isModified);
  }

  setDataEdit(): void {
    if (this.data.id) {
      this.formWorkArea.addControl('id', this.fb.control('', Validators.required));
      this.title = 'Editar';
      this.getWorkAreaById();
    }
  }

  saveWorkArea(): void {
    this.formWorkArea.markAllAsTouched();
    if (this.formWorkArea.valid)
      this.workAreaService.saveWorkArea(this.formWorkArea.value).subscribe({
        next: () => {
          this.close(true);
        }
      });
  }

  updateWorkArea(): void {
    this.formWorkArea.markAllAsTouched();
    if (this.formWorkArea.valid)
      this.workAreaService.updateWorkArea(this.formWorkArea.value).subscribe({
        next: () => {
          this.close(true);
        }
      });
  }

  getWorkAreaById(): void {
    this.workAreaService.getWorkAreaById(this.data.id).subscribe({
      next: (res) => {
        this.formWorkArea.patchValue(res);
      }
    });
  }

  get isActive() { return this.formWorkArea.get('isActive') }
}
