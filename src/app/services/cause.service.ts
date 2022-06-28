import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cause } from '../models/cause.model';

@Injectable({
  providedIn: 'root'
})
export class CauseService {
  baseUrl = environment.baseUrl + 'Cause';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Cause[]> {
    return this.http.get<Cause[]>(`${this.baseUrl}`);
  }
}
