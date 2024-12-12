import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInSubject = new BehaviorSubject<boolean>(this.checkLoginStatus());
  loggedIn$ = this.loggedInSubject.asObservable();

  constructor() {}

  private checkLoginStatus(): boolean {
    const token = localStorage.getItem('token');
    return token !== null && token !== '';
  }

  login(token: string): void {
    localStorage.setItem('token', token);
    this.loggedInSubject.next(true); 
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedInSubject.next(false); 
  }
 
}
