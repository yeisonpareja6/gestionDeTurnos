import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthSharedService {

  removeToken(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    const token = localStorage.getItem('token');
    return token ? JSON.parse(atob(token.split('.')[1])) : null;
  }
}
