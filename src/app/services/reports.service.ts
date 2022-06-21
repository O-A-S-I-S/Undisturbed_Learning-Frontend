import { Observable } from 'rxjs';
import { Report } from './../models/report.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private baseUrl:string = environment.baseUrl + '/Report';

  constructor(private http:HttpClient) { }

  getReportById(appointmentId:any): Observable<Report>{
    return this.http.get<Report>(`${this.baseUrl}/${appointmentId}`);
  }

}
