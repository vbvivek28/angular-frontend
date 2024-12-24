import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
const token = localStorage.getItem('token');
const refreshToken = localStorage.getItem('refreshToken');

let clonedRequest = req;
if (req.url.includes('/logout')) {
  const modifiedBody = { ...req.body as object, refreshtoken: refreshToken };
  clonedRequest = req.clone({ body: modifiedBody });
  return next(clonedRequest);
}
  else{
  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(clonedRequest);}
};

