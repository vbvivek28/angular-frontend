import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private http: HttpClient,private router: Router){}

  RegisterForm= new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    dob: new FormControl<Date | null>(null),
    imageUrl: new FormControl('')});

    register(){
      const usr=this.RegisterForm.value;
      console.log(usr);
      this.http.post('https://localhost:44342/api/user',usr).subscribe({
        next:(res)=> {
          console.log(res);
          alert("user registered successfully")
          this.router.navigate(['/login']);

        },
        error:(err)=>{
          console.log(err);
        }
      }  
      )
    }
}
