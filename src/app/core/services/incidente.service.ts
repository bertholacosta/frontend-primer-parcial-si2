import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Evidencia {
  id: number;
  audio?: string;
  descripcion?: string;
  fotos?: string;
  incidente_id: number;
}

export interface TallerEnIncidente {
  Id: number;
  Nombre: string;
  Direccion: string;
  Coordenadas?: string;
}

export interface IncidenteDetalle {
  id: number;
  coordenadagps?: string;
  estado?: string;
  fecha?: string;
  vehiculoconductor_id: number;
  taller_id?: number;
  evidencias: Evidencia[];
  taller?: TallerEnIncidente;
  distancia_km?: number;
}

@Injectable({
  providedIn: 'root'
})
export class IncidenteService {
  private http = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8000/incidentes';

  getSolicitudesPendientes(): Observable<IncidenteDetalle[]> {
    return this.http.get<IncidenteDetalle[]>(`${this.apiUrl}/solicitudes-pendientes`);
  }

  asignarTaller(incidenteId: number, tallerId: number): Observable<IncidenteDetalle> {
    return this.http.patch<IncidenteDetalle>(`${this.apiUrl}/${incidenteId}/asignar-taller`, { taller_id: tallerId });
  }
}
