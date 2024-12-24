import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, Department } from '../app/types';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://localhost:44342/api/user';
  private deptUrl = 'https://localhost:44342/dept';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.deptUrl);
  }

  updateUser(id: number, user: User): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getExcelFile() {
    return this.http.get(`${this.baseUrl}/download-excel`, { responseType: 'blob'
    });
  }

  getErrorExcelFile(data:[]) {
    return this.http.post(`${this.baseUrl}/download-Error-excel`,data, {
      responseType: 'blob'
    });
  }

  bulkUploadUsers(formData: FormData): Observable<any> {  
    return this.http.post(`${this.baseUrl}/upload`, formData);
  }

}
