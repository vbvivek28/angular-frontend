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
  private refreshTokenKey = 'refreshToken';
  loginUser(data: AuthReq): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data);
  }
  private checkLoginStatus(): boolean {
    const token = this.getAccessToken();
    return token !== null && token !== '';
  }

  
  saveAccessToken(token: string): void {
    localStorage.setItem('token', token);
    this.loggedInSubject.next(true); 
  }

  logout(refreshToken:string): Observable<any> {
    localStorage.removeItem('token');
    //localStorage.removeItem(this.refreshTokenKey);
    this.loggedInSubject.next(false); 
    return this.http.post<string>(`${this.apiUrl}/logout`,{"refreshToken":refreshToken});
  }

  saveRefreshToken(refreshToken: string): void {
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }
 
  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }
  getAccessToken(): string | null {
    return localStorage.getItem('token');
  }

  refreshToken(refreshToken: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/refresh-token`, { "refreshtoken": refreshToken });
  }
}
