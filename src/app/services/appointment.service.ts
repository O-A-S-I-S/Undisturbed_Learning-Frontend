import { AppointmentRequest } from './../students/models/appointment-request.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Appointment } from '../models/appointment.model';
import { Report } from '../models/report.model';
import { Times } from '../models/times';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  baseUrl: string = environment.baseUrl + '/Appointment';

  constructor(private http: HttpClient) { }

  getCustom(filter: any): Observable<Appointment[]> {
    return this.http.post<Appointment[]>(`${this.baseUrl}/filter`, filter);
  }

  createAppointment(appointment: AppointmentRequest):Observable<AppointmentRequest>{
    return this.http.post<Appointment>(this.baseUrl,appointment);
  }

  updateAppointment(id:number, update:any):Observable<Appointment>{
    return this.http.put<Appointment>(`${this.baseUrl}/update/${id}`,update);
  }
  getTimesFromPsycho(id:number,date:string):Observable<Times[]>{
    return this.http.get<Times[]>(`${this.baseUrl}/psychopedagogist/${id}/${date}`);
  }
}
