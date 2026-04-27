import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Mecanico {
  id: number;
  ci: number;
  extci?: string;
  nombre: string;
  apellidos: string;
  fechanac?: number;
  taller_id?: number;
  estado?: string;
}

export interface MecanicoRegistro {
  correo: string;
  password: string;
  ci: number;
  extci?: string;
  nombre: string;
  apellidos: string;
  fechanac?: number;
}

export interface MecanicoUpdate {
  ci?: number;
  extci?: string;
  nombre?: string;
  apellidos?: string;
  fechanac?: number;
  estado?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MecanicoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8000/mecanicos';

  getMecanicos(): Observable<Mecanico[]> {
    return this.http.get<Mecanico[]>(this.apiUrl);
  }

  createMecanico(data: MecanicoRegistro): Observable<Mecanico> {
    return this.http.post<Mecanico>(this.apiUrl, data);
  }

  updateMecanico(id: number, data: MecanicoUpdate): Observable<Mecanico> {
    return this.http.put<Mecanico>(`${this.apiUrl}/${id}`, data);
  }

  updateEstado(id: number, estado: string): Observable<Mecanico> {
    return this.http.put<Mecanico>(`${this.apiUrl}/${id}`, { estado });
  }

  deleteMecanico(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
