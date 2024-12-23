import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../app/types';

@Injectable({
  providedIn: 'root'
})

export class RegisterService {
  private baseUrl = 'https://localhost:44342';

  constructor(private http: HttpClient) {}

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.baseUrl}/dept`);
  }

  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/user/register`, user);
  }
}
