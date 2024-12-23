import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { ToastService, AngularToastifyModule } from 'angular-toastify';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-navbar',
  imports: [AngularToastifyModule,HttpClientModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  loggedIn: boolean = false;

  constructor(private authService: AuthService, private router:Router,private _toastService:ToastService, private http: HttpClient){}

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe(status=> this.loggedIn = status);
    this.router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      if (event.urlAfterRedirects === '/user-detail') {
        this.validateToken();
      }
    });
  }

  logout(): void {
  this.authService.logout();
  this._toastService.info('user logged out');
  this.router.navigate(['/']);
  }

  validateToken() {
    var token=localStorage.getItem('token')
    this.http.get('https://localhost:44342/api/user/validate-token',{headers:{Authorization:"Bearer "+token}}).subscribe(
      (response) => {
       
      },
      (error) => {
        if (error.status === 401) {
          this._toastService.error('login again!!!! token expired ')
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
      }
    );
  }
}
