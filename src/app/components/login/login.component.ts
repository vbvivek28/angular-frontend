import { HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AngularToastifyModule, ToastService } from 'angular-toastify';
import { AuthReq, AuthResponse } from '../../types';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css' ,
  imports:[FormsModule,AngularToastifyModule,ReactiveFormsModule]
})
export class LoginComponent implements OnInit {
 

  constructor(private authService:AuthService,private router:Router,private _toast:ToastService) {}

  ngOnInit(): void {
   
  }  
  user = new FormGroup ({
    email: new FormControl(''),
    password:new FormControl('')
  }); 

  public login(): void {
    if (this.user.valid) {
      const loginData: AuthReq = this.user.value as AuthReq;
    this.authService.loginUser(loginData).subscribe({
      next: (response) => {
        this._toast.success('Login successful');
       this.user.value.email=''
       this.user.value.password=''
        this.authService.savetoken(response.token);
        this.router.navigate(['/user-detail']);
      },
      error: (error) => {
        const errorMessage = error.error?.message || error.error;
        this._toast.error(errorMessage);
      }
    });
  }
}
}
