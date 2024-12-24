import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Department , GenderEnum} from '../../types';
import { RegisterService } from '../../../services/register.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  departmentOptions: Department[] = [];
  genderList = Object.values(GenderEnum).filter(value => typeof value === 'string');
 
  constructor(
    private registerService: RegisterService,
    private router: Router
  ) {}

  RegisterForm = new FormGroup({
    name: new FormControl('', [Validators.required,Validators.pattern(/^[A-Za-z]+$/),Validators.minLength(3) 
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/-]).{6,}$/)
    ]),
    dob: new FormControl<Date | null>(null, [Validators.required]),
    imageUrl: new FormControl(''),
    gender: new FormControl(''),
    address: new FormControl(''),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^\\d{10}$')
    ]),
    termsAccepted: new FormControl(false, [Validators.requiredTrue]),
    departmentId: new FormControl(0)
  });

  ngOnInit(): void {
    this.registerService.getDepartments().subscribe({
      next: (res) => {
        this.departmentOptions = res;
        this.departmentOptions.unshift({ id: 0, departmentName: 'Select Department' });
        console.log(this.departmentOptions);
        console.log(this.genderList);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  onNameChange() {
    const currentValue = this.RegisterForm.get('name')?.value;
    
    if (currentValue) {
      const normalizedValue = currentValue
        .replace(/\s+/g, ' ') 
        .trimStart();
        this.RegisterForm.get('name')?.setValue(normalizedValue);
    }
  }

  register(): void {
    if (this.RegisterForm.valid) {
      const usr = this.RegisterForm.value;
      usr.phoneNumber=usr.phoneNumber?.toString();
      if (usr.departmentId === 0) {
        usr.departmentId = null;
      }

      this.registerService.registerUser(usr).subscribe({
        next: (res) => {
          console.log(res);
           Swal.fire('Registered','User registered successfully','success');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          Swal.fire('Registration error',`${err.error.message}`,'error');
          console.error(err);
        }
      });
    } else {
      alert('Form is invalid, please check the errors.');
    }
  }
  hasUpperCase(): boolean {
    const password = this.RegisterForm.get('password')?.value ?? '';
    return /[A-Z]/.test(password);
  }

  hasLowerCase(): boolean {
    const password = this.RegisterForm.get('password')?.value ?? '';
    return /[a-z]/.test(password);
  }

  hasNumber(): boolean {
    const password = this.RegisterForm.get('password')?.value ?? '';
    return /\d/.test(password);
  }

  hasSpecialCharacter(): boolean {
    const password = this.RegisterForm.get('password')?.value ?? '';
    return /[!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/-]/.test(password);
  }

  futureDate(): boolean {
    const dob = this.RegisterForm.get('dob')?.value;
    if (!dob) return false;

    const dobDate = new Date(dob);
    return dobDate > new Date();
  }
}
