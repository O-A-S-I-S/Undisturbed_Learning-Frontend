import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from '../models/report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  baseUrl: string = environment.baseUrl + '/Report';

  constructor(private http: HttpClient) { }

  getByAppointmentId(id: number): Observable<Report> {
    return this.http.get(`${this.baseUrl}/appointment/${id}`);
  }

  getCustom(filter: any): Observable<Report[]> {
    return this.http.post<Report[]>(`${this.baseUrl}/filter`, filter);
  }
}
