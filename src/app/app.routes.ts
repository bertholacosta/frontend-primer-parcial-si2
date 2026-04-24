import { Routes } from '@angular/router';
import { LandingComponent } from './features/landing/landing.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterTallerComponent } from './features/auth/register-taller/register-taller.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { roleGuard } from './core/guards/role.guard';

import { UsuariosList } from './features/usuarios/usuarios-list/usuarios-list';
import { RolesListComponent } from './features/roles/roles-list/roles-list.component';
import { MecanicosListComponent } from './features/mecanicos/mecanicos-list/mecanicos-list.component';
import { BitacoraListComponent } from './features/bitacora/bitacora-list/bitacora-list.component';
import { PerfilComponent } from './features/perfil/perfil.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro-taller', component: RegisterTallerComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [roleGuard],
    children: [
      { path: 'usuarios', component: UsuariosList, data: { requiredPermiso: 'Ver Usuarios' } },
      { path: 'roles', component: RolesListComponent, data: { requiredPermiso: 'Gestionar Roles' } },
      { path: 'mecanicos', component: MecanicosListComponent, data: { requiredPermiso: 'Gestionar Mecanicos' } },
      { path: 'bitacora', component: BitacoraListComponent, data: { requiredPermiso: 'Ver Bitacora' } },
      { path: 'perfil', component: PerfilComponent }
    ]
  },
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];
