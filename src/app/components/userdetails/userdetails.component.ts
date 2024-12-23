import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularToastifyModule, ToastService } from 'angular-toastify';
import { User, Department ,GenderEnum} from '../../types';
import { UserService } from '../../../services/user.service';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrl: './userdetails.component.css',
  imports: [ReactiveFormsModule, AngularToastifyModule],
})
export class UserDetailComponent implements OnInit {
  users!: User[];
  updatedUser!: User | null;
  departmentOptions: Department[] = [];
  genderList = Object.values(GenderEnum).filter(value => typeof value === 'string');
  updatedUserForm = new FormGroup({
    id: new FormControl<number | null>(null),
    name: new FormControl<string | null>(null,[Validators.required,Validators.pattern(/^[A-Za-z]+$/),Validators.minLength(3) ]),
    email: new FormControl<string | null>(null),
    dob: new FormControl<Date | null>(null, [Validators.required]),
    imageUrl: new FormControl<string | null>(null),
    gender: new FormControl<number | null>(null),
    phoneNumber: new FormControl<string | null>(null, [
      Validators.required,
      Validators.pattern('^\\d{10}$')
    ]),
    address: new FormControl<string | null>(null),
    termsAccepted: new FormControl<boolean | null>(null),
    departmentId: new FormControl<number | null>(null),
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private _toastService: ToastService
  ) {}

  onNameChange() {
    const currentValue = this.updatedUserForm.get('name')?.value;
    if (currentValue) {
      const normalizedValue = currentValue
        .trimStart() 
        .replace(/\s+/g, ' '); 
        this.updatedUserForm.get('name')?.setValue(normalizedValue);
    }
  }

  futureDate(): boolean {
    const dob = this.updatedUserForm.get('dob')?.value;
    if (!dob) return false;

    const dobDate = new Date(dob);
    return dobDate > new Date();
  }

  getDepartmentName(id: number): string {
    const department = this.departmentOptions.find((dept) => dept.id === id);
    return department ? department.departmentName : 'Department not found';
  }

  edituserdetails(id: number) {
    const user = this.users.find((u) => u.id === id);
    if (user) {
      this.updatedUser = user;
      this.updatedUserForm.patchValue(user);
    } else {
      this._toastService.warn(`User with ID ${id} not found`);
    }
  }

  updateUser(id: number) {
    const user: User = {
      id: this.updatedUserForm.value.id ?? 0,
      name: this.updatedUserForm.value.name ?? '',
      email: this.updatedUserForm.value.email ?? '',
      dob: this.updatedUserForm.value.dob ?? new Date(),
      imageUrl: this.updatedUserForm.value.imageUrl ?? '',
      gender: this.updatedUserForm.value.gender ?? 0,
      address: this.updatedUserForm.value.address ?? '',
      phoneNumber: this.updatedUserForm.value.phoneNumber ?? '',
      termsAccepted: this.updatedUserForm.value.termsAccepted ?? false,
      departmentId: this.updatedUserForm.value.departmentId ?? 0,
    };

    this.userService.updateUser(id, user).subscribe({
      next: () => {
        this._toastService.success('User updated successfully');
        this.updatedUser = null;
        this.getUsers();
      },
      error: (err) => {
        console.log(err);
        this._toastService.error('Failed to update user');
      },
    });
  }

  deleteUser(id: number) {

    const cnfdelete=prompt("Are you sure you want to delete?? Type 'yes' to delete user")
    if(cnfdelete?.toLowerCase() === "yes") {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this._toastService.success('User deleted successfully');
        this.getUsers();
      },
      error: (err) => {
        console.log(err);
        this._toastService.error('Failed to delete user');
      },
    });}
  }

  ngOnInit(): void {
    this.getUsers();
    this.userService.getDepartments().subscribe({
      next: (res) => {
        this.departmentOptions = res;
      },
      error: (err) => {
        console.log(err);
        this._toastService.error('Failed to fetch departments');
      },
    });
  }

  getUsers(): void {
    const token = localStorage.getItem('token') ?? '';
    this.userService.getUsers(token).subscribe({
      next: (data) => {
        this.users = data;
      },
      error: () => {
        this._toastService.error('Failed to fetch user details');
      },
    });
  }

  downloadUserData() {
    const token = localStorage.getItem('token') ?? '';
    this.userService.getExcelFile(token).subscribe({
      next: (response) => {
        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'user_data.xlsx');
      },
      error: () => {
        this._toastService.error('Failed to fetch user details');
      }
    });
  }
  


  // downloadUserData() {
  //   const token = localStorage.getItem('token') ?? '';
  //   this.userService.getUsers(token).subscribe({
  //     next: (data) => {
  //       const columnsToSkip = ['refreshTokens'];
  //     const filteredData = this.filterColumns(data, columnsToSkip);
  //       const worksheet = XLSX.utils.json_to_sheet(filteredData); 
  //       const workbook = XLSX.utils.book_new(); 
  //       XLSX.utils.book_append_sheet(workbook, worksheet, 'Users'); 
  
  //       const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  //       const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  //       saveAs(blob, 'user_data.xlsx');
  //     },
  //     error: () => {
  //       this._toastService.error('Failed to fetch user details');
  //     },
  //   });
  // }

  // filterColumns(data: any[], columnsToSkip: string[]): any[] {
  //   return data.map(item => {
  //     const filteredItem: any = { ...item };
  //     columnsToSkip.forEach(col => delete filteredItem[col]);
  //     return filteredItem;
  //   });
  // }

}