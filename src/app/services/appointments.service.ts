import { Observable } from 'rxjs';
import { Appointment } from './../models/appointment.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  private baseUrl: string = environment.baseUrl + '/Appointment';

  constructor(private http: HttpClient) { }

  getStudentAppointments(StudentId:number):Observable<Appointment[]>{
    return this.http.get<Appointment[]>(`${this.baseUrl}/student/${StudentId}`);
  }

}
