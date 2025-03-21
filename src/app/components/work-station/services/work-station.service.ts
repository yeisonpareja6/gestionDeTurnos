import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SaveWorkStation, WorkStation } from '../interface/work-station';

@Injectable({
  providedIn: 'root'
})
export class WorkStationService {

  private host = signal(environment.apiUrl);
  private http = inject(HttpClient);

  getWorkstation(): Observable<WorkStation[]> {
    return this.http.get<WorkStation[]>(`${this.host()}/Workstation`);
  }

  getWorkstationById(id: string): Observable<WorkStation> {
    return this.http.get<WorkStation>(`${this.host()}/Workstation/${id}`);
  }

  saveWorkstation(area: SaveWorkStation): Observable<any> {
    return this.http.post(`${this.host()}/Workstation`, area);
  }

  updateWorkstation(area: SaveWorkStation): Observable<any> {
    return this.http.put(`${this.host()}/Workstation/${area.id}`, area);
  }

  deleteWorkstation(Workstation: WorkStation): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: Workstation
    };
    return this.http.delete(`${this.host()}/Workstation`, options);
  }
}
