import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
interface AuthReq {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  expiration: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css' ,
  imports:[HttpClientModule,FormsModule]
})
export class LoginComponent implements OnInit {
  user: AuthReq = {
    email: '',
    password: ''
  }; 

  constructor(private http: HttpClient, private authService:AuthService,private router:Router) {}

  ngOnInit(): void {}

  public login(): void {
    this.http.post<AuthResponse>('https://localhost:44342/login', this.user).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.user.email='';
        this.user.password='';
        this.authService.login(response.token);
        this.router.navigate(['/user-detail']);
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }
}
