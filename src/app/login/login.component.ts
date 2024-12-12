import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AngularToastifyModule, ToastService } from 'angular-toastify';
import { AuthReq, AuthResponse } from '../types';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css' ,
  imports:[HttpClientModule,FormsModule,AngularToastifyModule]
})
export class LoginComponent implements OnInit {
  user: AuthReq = {
    email: '',
    password: ''
  }; 

  constructor(private http: HttpClient, private authService:AuthService,private router:Router,private _toast:ToastService) {}

  ngOnInit(): void {}

  public login(): void {
    this.http.post<AuthResponse>('https://localhost:44342/login', this.user).subscribe({
      next: (response) => {
        this._toast.success('Login successful');
        this.user.email='';
        this.user.password='';
        this.authService.login(response.token);
        this.router.navigate(['/user-detail']);
      },
      error: (error) => {
        const errorMessage = error.error?.message || error.error;
        this._toast.error(errorMessage);
      }
    });
  }
}
