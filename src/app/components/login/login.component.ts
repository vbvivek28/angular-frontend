import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AuthReq } from '../../types';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css' ,
  imports:[FormsModule,ReactiveFormsModule]
})
export class LoginComponent implements OnInit {
 

  constructor(private authService:AuthService,private router:Router) {}

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
        Swal.fire('Success','Logged in successfully','success');
       this.user.value.email=''
       this.user.value.password=''
        this.authService.saveAccessToken(response.token);
        this.authService.saveRefreshToken(response.refreshToken);
        this.router.navigate(['/user-detail']);
      },
      error: (error) => {
        const errorMessage = error.error?.message || error.error;
        Swal.fire('Error',`${errorMessage}`,'error');
       
      }
    });
  }
}

}
