import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { ModeloComponent } from './modelo/modelo.component';
import { ChartsComponent } from './charts/charts.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './layouts/main/main.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { ChangePasswdComponent } from './change-passwd/change-passwd.component';


const routes: Routes = [
  // Redirigir a login al iniciar
  { path: '', redirectTo: 'app/Inicio', pathMatch: 'full' }, // Cambiado a 'app/Inicio' para redirigir al inicio, (Originalmente auth/login para inicio de sesion)

  // Ruta de inicio de sesión
<<<<<<< HEAD
  { path: 'auth/login', component: LoginComponent },
=======
  { path: 'auth/login', component: LoginComponent },    
>>>>>>> 487760c2d22d9ef82ab39375bdc8008dc8fdab28

  // Layout de autenticación
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: MainComponent },
      { path: 'change-password', component: ChangePasswdComponent }
    ]
  },

  // Layout principal
  {
    path: 'app',
    component: MainComponent,
    children: [
      { path: 'Inicio', component: HomeComponent },
      { path: 'Pacientes', component: PacientesComponent },
      { path: 'Modelo', component: ModeloComponent },
      { path: 'Charts', component: ChartsComponent }
    ]
  },

  // Ruta comodín
  { path: '**', redirectTo: 'auth/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export { routes };
