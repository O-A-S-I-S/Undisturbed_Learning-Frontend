import { Createappointment } from './../models/createappointment';
import { Appointment } from './../models/appointment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private baseUrl:string=environment.baseUrl+'/Appointment';
  constructor(private http:HttpClient) { }
  getAllAppointments():Observable<Appointment[]>{
    return this.http.get<Appointment[]>(this.baseUrl);
  }
  getAllAppointmentsByStudentId(id?:number):Observable<Appointment[]>{
    return this.http.get<Appointment[]>(`${this.baseUrl+'/'+id}`);
  }
  deleteAppointmentById(id?:number):Observable<Appointment>{
    return this.http.delete(`${this.baseUrl+'/'+id}`);
  }
  addAppointment(appointment:Createappointment):Observable<Createappointment>{
    return this.http.post<Appointment>(this.baseUrl,appointment);
  }
}
