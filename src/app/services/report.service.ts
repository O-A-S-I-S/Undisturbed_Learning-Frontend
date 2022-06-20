import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from '../models/report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getByStudentId(studentId: any): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.baseUrl}/{studentId}`);
  }

  getByPsychopedagogistId(psychopedagogistId: any): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.baseUrl}/{psychopedagogistId}`);
  }
}
