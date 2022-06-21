import { environment } from './../../environments/environment';
import { Workshop } from './../models/workshop';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkshopService {
  private baseUrl:string=environment.baseUrl+'/WorkShop';
  constructor(private http:HttpClient) { }
  getAllWorkshopsByPsychopedagogistId(id?:number):Observable<Workshop[]>{
    return this.http.get<Workshop[]>(`${this.baseUrl+'/psychopedagogist/'+id}`);
  }
  deleteWokshopById(id?:number):Observable<Workshop>{
    return this.http.delete(`${this.baseUrl+'/'+id}`);
  }
}
