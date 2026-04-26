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

export interface AnalisisIAEnIncidente {
  Clasificacion?: string;
  NivelPrioridad?: string;
  Resumen?: string;
}

export interface Cotizacion {
  id: number;
  monto?: number;
  mensaje?: string;
  estado: string;
  fecha_creacion?: string;
  incidente_id: number;
  taller_id: number;
  taller?: TallerEnIncidente;
}

export interface VehiculoConductorEnIncidente {
  id: number;
  conductor?: {
    Nombre: string;
    Apellidos: string;
    CI: number;
  };
}

export interface IncidenteDetalle {
  id: number;
  coordenadagps?: string;
  estado?: string;
  fecha?: string;
  vehiculoconductor_id: number;
  vehiculoconductor?: VehiculoConductorEnIncidente;
  taller_id?: number;
  evidencias: Evidencia[];
  taller?: TallerEnIncidente;
  analisis_ia?: AnalisisIAEnIncidente;
  distancia_km?: number;
  cotizaciones?: Cotizacion[];
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

  solicitarCotizacion(incidenteId: number, tallerId: number): Observable<Cotizacion> {
    return this.http.post<Cotizacion>(`${this.apiUrl}/${incidenteId}/solicitar-cotizacion`, { taller_id: tallerId });
  }

  ofrecerCotizacion(incidenteId: number, monto: number, mensaje?: string): Observable<Cotizacion> {
    return this.http.post<Cotizacion>(`${this.apiUrl}/${incidenteId}/ofrecer-cotizacion`, { monto, mensaje });
  }

  aceptarCotizacion(cotizacionId: number): Observable<IncidenteDetalle> {
    return this.http.post<IncidenteDetalle>(`${this.apiUrl}/cotizaciones/${cotizacionId}/aceptar`, {});
  }

  getMantenimientosTaller(): Observable<IncidenteDetalle[]> {
    return this.http.get<IncidenteDetalle[]>(`${this.apiUrl}/mantenimientos`);
  }

  actualizarEstadoIncidente(incidenteId: number, estado: string): Observable<IncidenteDetalle> {
    return this.http.patch<IncidenteDetalle>(`${this.apiUrl}/${incidenteId}/estado-taller`, { estado });
  }
}
