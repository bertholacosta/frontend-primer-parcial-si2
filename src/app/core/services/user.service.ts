import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Rol {
  Id: number;
  Nombre: string;
}

export interface Usuario {
  Id: number;
  Correo: string;
  IdRol: number;
  rol?: Rol;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Try to use environment if exists, otherwise fallback to local url.
  private apiUrl = 'http://127.0.0.1:8000/users';
  private http = inject(HttpClient);

  getUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  getRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(`${this.apiUrl}/roles`);
  }

  createUser(userData: any): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/auth/registrar', userData);
  }

  updateUser(id: number, userData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, userData);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
