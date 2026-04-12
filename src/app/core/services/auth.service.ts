import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = 'http://127.0.0.1:8000/auth';

  private currentUserRoleSubject = new BehaviorSubject<string | null>(this.getStoredRole());
  currentUserRole$ = this.currentUserRoleSubject.asObservable();

  login(correo: string, password: string): Observable<any> {
    const formData = new FormData();
    formData.append('username', correo); // OAuth2 espera 'username', no 'Correo'
    formData.append('password', password);

    return this.http.post<any>(`${this.apiUrl}/login`, formData).pipe(
      tap({
        next: (response) => {
          if (response.access_token) {
            localStorage.setItem('access_token', response.access_token);
            if (response.role) {
              localStorage.setItem('role', response.role);
              this.currentUserRoleSubject.next(response.role);
            }
          }
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    this.currentUserRoleSubject.next(null);
    this.router.navigate(['/login']);
  }

  getRole(): string | null {
    return this.currentUserRoleSubject.value;
  }

  private getStoredRole(): string | null {
    return localStorage.getItem('role');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }
}
