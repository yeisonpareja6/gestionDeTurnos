import { Component, inject, OnInit, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthSharedService } from '../../../../shared/services/auth-shared.service';
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
  auth = inject(AuthService);
  authShared = inject(AuthSharedService);

  showPassword = signal(false);

  ngOnInit(): void {
    this.authShared.removeToken();
    this.setFormAuth();
  }

  setFormAuth() {
    this.formAuth = this.fb.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required]]
      // userName: ['', [Validators.required, Validators.email]],
      // password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#+$%^&*()_])[A-Za-z\d@#+$%^&*()_]{8,}$/)]]
    });
  }

  togglePasswordVisibility() {
    this.showPassword.update((currentValue) => !currentValue);
  }

  redirectRecoverPassword() {
    this.router.navigate(['auth/recover-password']);
  }

  login() {
    this.formAuth.markAllAsTouched();
    if (this.formAuth.valid)
      this.auth.login(this.formAuth.value).subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['workArea']);
        }
      });
  }

  get userName(): AbstractControl { return this.formAuth.get('userName')! }
  get password(): AbstractControl { return this.formAuth.get('password')! }
}
