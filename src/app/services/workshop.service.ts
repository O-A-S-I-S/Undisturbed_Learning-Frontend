import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Workshop } from '../models/workshop.model';
import { Createworkshop } from '../psychopedagogists/models/createworkshop';

@Injectable({
  providedIn: 'root'
})
export class WorkshopService {
  baseUrl = environment.baseUrl + '/Workshop';

  constructor(private http: HttpClient) {}

  getAllWorkshopsByPsychopedagogistId(id?:number):Observable<Workshop[]>{
    return this.http.get<Workshop[]>(`${this.baseUrl+'/psychopedagogist/'+id}`);
  }

  deleteWokshopById(id?:number):Observable<Workshop>{
    return this.http.delete(`${this.baseUrl+'/'+id}`);
  } 
  addWorkshop(workshop:Createworkshop):Observable<Createworkshop>{
    return this.http.post<Workshop>(this.baseUrl,workshop);
  }
}
