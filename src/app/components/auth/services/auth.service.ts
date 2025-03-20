import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Auth, ResponseAuth } from '../interfaces/auth';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private host = signal(environment.apiUrl);

  login(user: Auth): Observable<ResponseAuth> {
    return this.http.post<ResponseAuth>(`${this.host()}/User/Login`, user);
  }
}
