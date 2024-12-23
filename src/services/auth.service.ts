import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AuthReq, AuthResponse } from '../app/types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInSubject = new BehaviorSubject<boolean>(this.checkLoginStatus());
  loggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http:HttpClient) {}

  private readonly apiUrl = 'https://localhost:44342';
  loginUser(data: AuthReq): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data);
  }
  private checkLoginStatus(): boolean {
    const token = localStorage.getItem('token');
    return token !== null && token !== '';
  }

  savetoken(token: string): void {
    localStorage.setItem('token', token);
    this.loggedInSubject.next(true); 
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedInSubject.next(false); 
  }
 
}
