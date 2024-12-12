import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularToastifyModule, ToastService } from 'angular-toastify';
import { User , Department} from '../types';



@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrl: './userdetails.component.css',
  imports: [HttpClientModule,ReactiveFormsModule,AngularToastifyModule],
})




export class UserDetailComponent implements OnInit {
  users!: User[] ;
  updatedUser!: User | null;
  departmentOptions: Department[]=[];
  
  updatedUserForm = new FormGroup({
    id: new FormControl<number | null>(null), 
    name: new FormControl<string | null>(null),
    email: new FormControl<string | null>(null),
    dob: new FormControl<Date | null>(null),
    imageUrl: new FormControl<string | null>(null),
    gender: new FormControl<string | null>(null),
    phoneNumber: new FormControl<string | null>(null),
    address: new FormControl<string | null>(null),
    termsAccepted:new FormControl<boolean | null>(null),
    departmentId: new FormControl<number | null>(null),
  });
  
  constructor(private http: HttpClient, private router: Router,private _toastService: ToastService) {}

 

   getDepartmentName(id :number) {
    const department = this.departmentOptions.find(dept => dept.id === id);
    return department ? department.departmentName : "Department not found";
}

  edituserdetails(id:number){
    const user= this.users.find(u => u.id === id);
    if (user) {
      this.updatedUser = user;
      console.log(this.updatedUser)
      this.updatedUserForm.patchValue(user);
    } else {
      this._toastService.warn(`User with ID ${id} not found`);
    } 
  }

  updateUser(id:number){
    const user: User = {
      id: this.updatedUserForm.value.id ?? 0,
      name: this.updatedUserForm.value.name ?? '',
      email: this.updatedUserForm.value.email ?? '',
      dob: this.updatedUserForm.value.dob ?? new Date(),
      imageUrl: this.updatedUserForm.value.imageUrl ?? '',
      gender: this.updatedUserForm.value.gender ?? '',
      address: this.updatedUserForm.value.address ?? '',
      phoneNumber: this.updatedUserForm.value.phoneNumber ?? '',
      termsAccepted: this.updatedUserForm.value.termsAccepted?? false,
      departmentId: this.updatedUserForm.value.departmentId ?? 0,
    };
 console.log(user);
    this.http.put(`https://localhost:44342/api/user/${id}`,user).subscribe({
      next:(res)=>{
        console.log(res);
        this._toastService.success("user updated successfully");
        this.updatedUser=null;
        this.getUsers();
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  DeleteUser(id:number){
    console.log(id);
    this.http.delete(`https://localhost:44342/api/user/${id}`).subscribe({
      next:(res)=>{
        console.log(res);
        this._toastService.success("user deleted successfully");
        this.getUsers();
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  ngOnInit(): void {
    this.getUsers();
    this.http.get("https://localhost:44342/dept").subscribe({next:(res)=>{

      this.departmentOptions = res as Department[];
      console.log(this.departmentOptions);
          },
          error:(err)=>{
          console.log(err);
          }
        })
  
  }

  getUsers(): void {
    var token= localStorage.getItem('token');
    this.http.get<User[]>(`https://localhost:44342/api/user`,{headers:{
      Authorization: "Bearer " + token
    }
    }).subscribe({
      next: (data) => {
        
        this.users = data;
        console.log(this.users);
      },
      error: (error) => {
        this._toastService.error('Failed to fetch user details');
      }
    });
  }
}
