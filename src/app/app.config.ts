import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { headerInterceptor } from '../interceptor/header.interceptor';
import { authInterceptor } from '../interceptor/auth.interceptor';
import { DatePipe } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),DatePipe, provideRouter(routes),provideHttpClient(withInterceptors([headerInterceptor,authInterceptor]))]
};
