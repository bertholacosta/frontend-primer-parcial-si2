import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidenteService, IncidenteDetalle } from '../../core/services/incidente.service';

@Component({
  selector: 'app-mantenimientos',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-gray-50 flex flex-col gap-6 p-4 md:p-8 min-h-full">
      <div class="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:rounded-2xl border border-gray-100 flex-1 flex flex-col">
        <div class="px-6 py-8 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 class="text-2xl font-extrabold tracking-tight text-gray-900 mb-1">
              Mantenimientos en Curso
            </h1>
            <p class="text-sm font-medium text-gray-500">
              Gestiona los incidentes asignados a tu taller.
            </p>
          </div>
          
          <button (click)="cargarMantenimientos()" class="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 hover:text-indigo-600 transition-all shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4" [class.animate-spin]="isLoading">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            Refrescar
          </button>
        </div>

        <div class="flex-1 p-6 bg-gray-50/50">
          @if (isLoading) {
            <div class="flex justify-center items-center h-64">
              <div class="animate-spin rounded-full h-12 w-12 border-4 border-indigo-100 border-t-indigo-600"></div>
            </div>
          } @else if (error) {
            <div class="bg-red-50 text-red-600 p-6 rounded-2xl text-center border border-red-100 flex flex-col items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span class="font-medium">{{ error }}</span>
            </div>
          } @else if (mantenimientos.length === 0) {
            <div class="bg-white border border-gray-100 rounded-3xl p-12 text-center shadow-sm flex flex-col items-center gap-4">
              <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" class="w-10 h-10 opacity-40">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900">No hay mantenimientos activos</h3>
              <p class="text-gray-500 max-w-sm mx-auto">Actualmente no tienes incidentes asignados o todos ya fueron resueltos.</p>
            </div>
          } @else {
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              @for (m of mantenimientos; track m.id) {
                <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col group relative">
                  
                  <div class="p-5 flex-1 flex flex-col relative z-10">
                    <div class="flex justify-between items-start mb-4">
                      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                            [ngClass]="{
                              'bg-blue-50 text-blue-700': m.estado === 'Asignado',
                              'bg-purple-50 text-purple-700': m.estado === 'En Camino',
                              'bg-green-50 text-green-700': m.estado === 'Resuelto'
                            }">
                        <span class="w-1.5 h-1.5 rounded-full"
                              [ngClass]="{
                                'bg-blue-500': m.estado === 'Asignado',
                                'bg-purple-500': m.estado === 'En Camino',
                                'bg-green-500': m.estado === 'Resuelto'
                              }"></span>
                        {{ m.estado }}
                      </span>
                      <span class="text-xs font-semibold text-gray-400">ID: #{{ m.id }}</span>
                    </div>

                    <div class="mb-5 flex-1">
                      <div class="flex items-center gap-2 mb-2">
                        <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                            <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h3 class="text-sm font-bold text-gray-900">{{ m.vehiculoconductor?.conductor?.Nombre }} {{ m.vehiculoconductor?.conductor?.Apellidos }}</h3>
                          <p class="text-xs text-gray-500">CI: {{ m.vehiculoconductor?.conductor?.CI }}</p>
                        </div>
                      </div>
                      
                      @if (m.evidencias && m.evidencias.length > 0 && m.evidencias[0].descripcion) {
                        <p class="text-sm text-gray-600 line-clamp-2 mt-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                          <span class="font-semibold text-gray-900 text-xs block mb-1">Descripción:</span>
                          {{ m.evidencias[0].descripcion }}
                        </p>
                      }
                    </div>

                    <!-- Actions -->
                    @if (m.estado !== 'Resuelto') {
                      <div class="mt-auto pt-4 border-t border-gray-100 flex gap-2">
                        @if (m.estado === 'Asignado') {
                          <button (click)="cambiarEstado(m.id, 'En Camino')" [disabled]="isUpdating"
                                  class="flex-1 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 py-2.5 rounded-xl font-bold text-sm transition-colors disabled:opacity-50">
                            Ir En Camino
                          </button>
                        }
                        <button (click)="cambiarEstado(m.id, 'Resuelto')" [disabled]="isUpdating"
                                class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow py-2.5 rounded-xl font-bold text-sm transition-all disabled:opacity-50">
                          Resolver
                        </button>
                      </div>
                    } @else {
                      <div class="mt-auto pt-4 border-t border-gray-100">
                        <div class="bg-green-50 text-green-700 py-2.5 rounded-xl font-bold text-sm text-center border border-green-200">
                          Atención Finalizada
                        </div>
                      </div>
                    }
                  </div>
                </div>
              }
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class MantenimientosComponent implements OnInit {
  private incidenteService = inject(IncidenteService);

  mantenimientos: IncidenteDetalle[] = [];
  isLoading = true;
  isUpdating = false;
  error: string | null = null;

  ngOnInit(): void {
    this.cargarMantenimientos();
  }

  cargarMantenimientos(): void {
    this.isLoading = true;
    this.error = null;
    this.incidenteService.getMantenimientosTaller().subscribe({
      next: (data) => {
        this.mantenimientos = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar mantenimientos:', err);
        this.error = 'Ocurrió un error al cargar los mantenimientos. Por favor intenta de nuevo.';
        this.isLoading = false;
      }
    });
  }

  cambiarEstado(id: number, nuevoEstado: string): void {
    this.isUpdating = true;
    this.incidenteService.actualizarEstadoIncidente(id, nuevoEstado).subscribe({
      next: (incidenteActualizado) => {
        // Actualizar el elemento en la lista
        const index = this.mantenimientos.findIndex(m => m.id === id);
        if (index !== -1) {
          this.mantenimientos[index] = incidenteActualizado;
        }
        this.isUpdating = false;
      },
      error: (err) => {
        console.error('Error al actualizar estado:', err);
        alert('Hubo un error al actualizar el estado.');
        this.isUpdating = false;
      }
    });
  }
}
