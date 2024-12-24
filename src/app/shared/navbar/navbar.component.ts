import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import Swal from 'sweetalert2';
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
    this.router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      if (event.urlAfterRedirects === '/user-detail') {
        
      }
    });
  }

  logout(): void {
    const refreshToken = this.authService.getRefreshToken() ?? '';
  this.authService.logout(refreshToken).subscribe({
    next:()=>{
      Swal.fire('Success', `user logged out`, 'success');
      this.router.navigate(['/']);
    },error:(err)=>{
      Swal.fire('Error', `some error happened while logging out`, 'error');
      this.router.navigate(['/']);
    }
  });
 
  }
}
