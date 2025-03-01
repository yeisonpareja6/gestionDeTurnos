import { Component, inject, OnInit, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, RouterModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {

  formAuth!: FormGroup;
  fb = inject(FormBuilder);
  router = inject(Router);

  showPassword = signal(false);

  ngOnInit(): void {
    this.formAuth = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#+$%^&*()_])[A-Za-z\d@#+$%^&*()_]{8,}$/)]]
    });
  }

  togglePasswordVisibility() {
    this.showPassword.update((currentValue) => !currentValue);
  }

  redirectRecoverPassword() {
    this.router.navigate(['auth/recover-password']);
  }

  get email(): AbstractControl { return this.formAuth.get('email')! }
  get password(): AbstractControl { return this.formAuth.get('password')! }
}
