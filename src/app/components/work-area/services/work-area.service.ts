import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SaveWorkArea, WorkArea } from '../interfaces/work-area';

@Injectable({
  providedIn: 'root'
})
export class WorkAreaService {

  private host = signal(environment.apiUrl);
  private http = inject(HttpClient);

  getWorkArea(): Observable<WorkArea[]> {
    return this.http.get<WorkArea[]>(`${this.host()}/WorkArea`);
  }

  getWorkAreaById(id: string): Observable<WorkArea> {
    return this.http.get<WorkArea>(`${this.host()}/WorkArea/${id}`);
  }

  saveWorkArea(area: SaveWorkArea): Observable<any> {
    return this.http.post(`${this.host()}/WorkArea`, area);
  }

  updateWorkArea(area: SaveWorkArea): Observable<any> {
    return this.http.put(`${this.host()}/WorkArea/${area.id}`, area);
  }

  deleteWorkArea(workArea: WorkArea): Observable<any> {
    const options = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      }),
      body: workArea
  };
    return this.http.delete(`${this.host()}/WorkArea`, options);
  }
}
