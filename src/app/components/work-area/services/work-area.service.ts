import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkAreaService {

  private host = signal(environment.apiUrl);
  private http = inject(HttpClient);

  getWorkArea(): Observable<any> {
    return this.http.get<any>(`${this.host()}/WorkArea`);
  }
}
