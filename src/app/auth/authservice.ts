import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Authservice {
  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient,private router: Router) {}

  register(data: any):Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  logout(): void {
    this.router.navigate(['/login']);
  }
  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.get(`${this.apiUrl}/profile`, {
      headers: {  'Authorization': `Bearer ${token}` }
    });

  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
