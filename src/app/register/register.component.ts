import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AngularToastifyModule, ToastService } from 'angular-toastify';
import { User , Department} from '../types';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,HttpClientModule,AngularToastifyModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})


export class RegisterComponent implements OnInit{

departmentOptions :Department[]=[];
  constructor(private http: HttpClient,private router: Router,private _toastService: ToastService){}


  ngOnInit(): void {
    this.http.get("https://localhost:44342/dept").subscribe({next:(res)=>{

this.departmentOptions = res as Department[];
console.log(this.departmentOptions);
    },
    error:(err)=>{
    console.log(err);
    }
  })
  }
  RegisterForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    dob: new FormControl<Date | null>(null, [Validators.required]),
    imageUrl: new FormControl(''),
    gender: new FormControl(''),
    address: new FormControl(''),
    phoneNumber: new FormControl(''),
    termsAccepted: new FormControl(false, [Validators.requiredTrue]) ,
    departmentId:new FormControl(0)
  });

    register(){
      if(this.RegisterForm.valid){
      const usr=this.RegisterForm.value;
      console.log(usr);
      this.http.post('https://localhost:44342/api/user',usr).subscribe({
        next:(res)=> {
          console.log(res);
          this._toastService.success('user registered successfully');
          this.router.navigate(['/login']);

        },
        error:(err)=>{
          this._toastService.error("user registration failed!!! retry");
          console.log(err);
        }
      }  
      )
    }
      else{
        alert("Form is invalid, please check the errors.");
        
      }
    }
}
