import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule,],
  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.scss'
})
export class RecoverPasswordComponent {

  router = inject(Router);
  email: string = '';

  goBack() {
    this.router.navigate(['auth']);
  }
}
