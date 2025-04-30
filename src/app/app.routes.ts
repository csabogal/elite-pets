import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PetsComponent } from './pages/pets/pets.component';
import { ContactComponent } from './pages/contact/contact.component';
import { RoleGuard } from './core/guards/role.guard';
import { UsersComponent } from './pages/users/users.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contact', component: ContactComponent },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [RoleGuard],
    data: { role: 'admin' },
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'pets',
    component: PetsComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [RoleGuard],
    data: { role: 'admin' },
  },
  { path: '**', redirectTo: '' },
];
