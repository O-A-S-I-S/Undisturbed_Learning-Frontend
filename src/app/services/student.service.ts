import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/student.model';
import { Observable } from 'rxjs';
import { SignIn } from '../authentication/models/sign-in.model';
import { LogIn } from '../authentication/models/log-in.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl:string = environment.baseUrl + '/Student';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(this.baseUrl);
  }

  getById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/id/${id}`);
  }

  getByCode(code: string): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/code/${code}`);
  }

  getByUsername(username: string): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/access/${username}`);
  }

  getByNameMatch(surname: string, lastName: string): Observable<Student[]> {
    let namePart = {
      surname: surname,
      lastName: lastName,
    }
    return this.http.post<Student[]>(`${this.baseUrl}/name`, namePart);
  }

  logIn(logIn: LogIn): Observable<any> {
    return this.http.post(`${this.baseUrl}/access`, logIn);
  }

  signIn(signIn: SignIn): Observable<any> {
    return this.http.put(`${this.baseUrl}/register`, signIn);
  }

}
