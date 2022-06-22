import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LogIn } from '../authentication/models/log-in.model';
import { Psychopedagogist } from '../models/psychopedagogist.model';

@Injectable({
  providedIn: 'root'
})
export class PsychopedagogistService {
  private baseUrl:string = environment.baseUrl + '/Psychopedagogist';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Psychopedagogist[]> {
    return this.http.get<Psychopedagogist[]>(this.baseUrl);
  }

  getById(Id: number): Observable<Psychopedagogist> {
    return this.http.get<Psychopedagogist>(`${this.baseUrl}/${Id}`);
  }

  getByUsername(Username: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/access/${Username}`);
  }

  logIn(logIn: LogIn): Observable<any> {
    return this.http.post(`${this.baseUrl}/access`, logIn);
  }
}
