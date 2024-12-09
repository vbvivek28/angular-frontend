import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';


export interface User {
  id: number ;
  name: string ;
  email: string;
  dob: Date; 
  imageUrl?: string;
}
@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrl: './userdetails.component.css',
  imports: [HttpClientModule,ReactiveFormsModule],
})




export class UserDetailComponent implements OnInit {
  users!: User[] ;
  updatedUser!: User;

  
  updatedUserForm = new FormGroup({
    id: new FormControl<number | null>(null), 
    name: new FormControl<string | null>(null),
    email: new FormControl<string | null>(null),
    dob: new FormControl<Date | null>(null),
    imageUrl: new FormControl<string | null>(null),
  });
  constructor(private http: HttpClient, private router: Router) {}



  edituserdetails(id:number){
    const user= this.users.find(u => u.id === id);
    if (user) {
      this.updatedUser = user;
      this.updatedUserForm.patchValue(user);
    } else {
      console.warn(`User with ID ${id} not found`);
    } 
  }

  updateUser(id:number){
    const user: User = {
      id: this.updatedUserForm.value.id ?? 0, 
      name: this.updatedUserForm.value.name ?? '',
      email: this.updatedUserForm.value.email ?? '',
      dob: this.updatedUserForm.value.dob ?? new Date(),
      imageUrl: this.updatedUserForm.value.imageUrl ?? '', 
    };
 
    this.http.put(`https://localhost:44342/api/user/${id}`,user).subscribe({
      next:(res)=>{
        console.log(res);
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
        console.log("deleted successfully");
        this.getUsers();
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    var token= localStorage.getItem('token');
    this.http.get<User[]>(`https://localhost:44342/api/user`,{headers:{
      Authorization: "Bearer " + token
    }

    }).subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Failed to fetch user details', error);
      }
    });
  }
}
