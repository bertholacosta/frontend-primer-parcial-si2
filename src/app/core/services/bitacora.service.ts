import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BitacoraEntry {
  id: number;
  accion: string;
  descripcion: string;
  fecha: string;
  ip: string;
  usuario_id: number;
  usuario_correo: string;
  usuario_rol: string;
}

@Injectable({
  providedIn: 'root'
})
export class BitacoraService {
  private apiUrl = 'http://127.0.0.1:8000/bitacora';
  private http = inject(HttpClient);

  getEntries(): Observable<BitacoraEntry[]> {
    return this.http.get<BitacoraEntry[]>(this.apiUrl);
  }

  deleteEntry(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
