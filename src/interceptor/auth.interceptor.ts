import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap } from 'rxjs';
import { throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService); 
  const accessToken = authService.getAccessToken();
  const modifiedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  });


  return next(modifiedRequest).pipe( 
    catchError((error) => {
      console.log(error);
      if (error.status === 401) {
        return refreshToken(req, next, authService); 
      }
      return throwError(error); 
    })
  );
};

const refreshToken = (req: HttpRequest<any>, next: HttpHandlerFn, authService:AuthService) => {
  const refreshToken = authService.getRefreshToken();

  if (refreshToken) {
    return authService.refreshToken(refreshToken).pipe(
      switchMap((response) => {
       
        authService.saveAccessToken(response.accessToken);
        authService.saveRefreshToken(response.refreshToken);

        const newRequest = req.clone({
          setHeaders: {
            Authorization: `Bearer ${response.accessToken}`,
          },
        });

        return next(newRequest);
      }),
      catchError((error) => {
        console.error('Unable to refresh token', error);
        return throwError(error);
      })
    );
  } else {
    console.error('No refresh token available');
    return throwError('No refresh token available');
  }
};
