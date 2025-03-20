import { Injectable } from '@angular/core';
import { TokenDecode } from '../interfaces/interface-shared';

@Injectable({
  providedIn: 'root'
})
export class AuthSharedService {

  removeToken(): void {
    localStorage.removeItem('token');
  }

  getDecodeToken(): TokenDecode | null {
    const token = localStorage.getItem('token');
    return token ? JSON.parse(atob(token.split('.')[1])) : null;
  }
}
