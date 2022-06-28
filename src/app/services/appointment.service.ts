import { AppointmentRequest } from './../students/models/appointment-request.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Appointment } from '../models/appointment.model';
import { Report } from '../models/report.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  baseUrl: string = environment.baseUrl + '/Appointment';

  constructor(private http: HttpClient) { }

  getByStudentId(studentId: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.baseUrl}/student/${studentId}`);
  }

  getByPsychopedagogistId(psychopedagogistId: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.baseUrl}/psychopedagogist/${psychopedagogistId}`);
  }

  createAppointment(appointment: AppointmentRequest):Observable<AppointmentRequest>{
    return this.http.post<Appointment>(this.baseUrl,appointment);
  }

  updateAppointment(id:number, update:any):Observable<Appointment>{
    return this.http.put<Appointment>(`${this.baseUrl}/update/${id}`,update);
  }
}
