import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard } from './shared/guards/auth.guard';
import { EncuestaComponent } from './pages/encuesta/encuesta.component';
import { PuntajeComponent } from './pages/puntaje/puntaje.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'encuesta', component: EncuestaComponent, canActivate: [authGuard] },
  { path: 'puntaje', component: PuntajeComponent, canActivate: [authGuard] },
  {
    path: 'quiensoy',
    loadComponent: () =>
      import('./pages/who-am-i/who-am-i.component').then(
        (m) => m.WhoAmIComponent
      ),
  },
  {
    path: 'juegos',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/games/games.component').then((m) => m.GamesComponent),
      },
      {
        path: 'mayormenor',
        loadComponent: () =>
          import('./components/games/mayor-menor/mayor-menor.component').then(
            (m) => m.MayorMenorComponent
          ),
      },
      {
        path: 'preguntados',
        loadComponent: () =>
          import('./components/games/preguntados/preguntados.component').then(
            (m) => m.PreguntadosComponent
          ),
      },
      {
        path: 'ahorcado',
        loadComponent: () =>
          import('./components/games/ahorcado/ahorcado.component').then(
            (m) => m.AhorcadoComponent
          ),
      },
      {
        path: 'mijuego',
        loadComponent: () =>
          import('./components/games/juego-propio/juego-propio.component').then(
            (m) => m.JuegoPropioComponent
          ),
      },
    ],
    canActivate: [authGuard],
  },
  { path: '**', component: NotFoundComponent },
];
