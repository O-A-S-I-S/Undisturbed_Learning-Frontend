import { Student } from './../models/Student';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl:string=environment.baseUrl;
  constructor(private http:HttpClient) { }
  getAllStudents():Observable<Student[]>{
    return this.http.get<Student[]>(this.baseUrl);
  }
  addStudent(student:Student):Observable<Student>{
    return this.http.post<Student>(this.baseUrl,student);
  }
  updateStudent(id:number,student:Student):Observable<Student>{
    return this.http.put<Student>(`${this.baseUrl}/${id}`,student);
  }
  deleteStudent(id:number):Observable<Student>{
    return this.http.delete<Student>(`${this.baseUrl}/${id}`);
  }
}
