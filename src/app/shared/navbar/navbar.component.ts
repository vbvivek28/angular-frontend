import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  loggedIn: boolean = false;

  constructor(private authService: AuthService, private router:Router){}

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe(status=> this.loggedIn = status);
  }

  logout(): void {
  this.authService.logout();
  this.router.navigate(['/']);
  }
}
