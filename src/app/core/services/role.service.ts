import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Permiso {
  Id: number;
  Nombre: string;
}

export interface RolCompleto {
  Id: number;
  Nombre: string;
  permisos: Permiso[];
}

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private http = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8000/roles';

  getRoles(): Observable<RolCompleto[]> {
    return this.http.get<RolCompleto[]>(this.apiUrl);
  }

  createRole(data: { Nombre: string }): Observable<RolCompleto> {
    return this.http.post<RolCompleto>(this.apiUrl, data);
  }

  updateRole(id: number, data: { Nombre: string }): Observable<RolCompleto> {
    return this.http.put<RolCompleto>(`${this.apiUrl}/${id}`, data);
  }

  deleteRole(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAllPermisos(): Observable<Permiso[]> {
    return this.http.get<Permiso[]>(`${this.apiUrl}/permisos/todos`);
  }

  assignPermisoToRole(roleId: number, permisoId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${roleId}/permisos/${permisoId}`, {});
  }

  removePermisoFromRole(roleId: number, permisoId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${roleId}/permisos/${permisoId}`);
  }
}
