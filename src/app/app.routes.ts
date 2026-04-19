import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { roleGuard } from './core/guards/role.guard';

import { UsuariosList } from './features/usuarios/usuarios-list/usuarios-list';
import { RolesListComponent } from './features/roles/roles-list/roles-list.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [roleGuard],
    children: [
      { path: 'usuarios', component: UsuariosList, data: { requiredPermiso: 'Ver Usuarios' } },
      { path: 'roles', component: RolesListComponent, data: { requiredPermiso: 'Gestionar Roles' } }
    ]
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];
