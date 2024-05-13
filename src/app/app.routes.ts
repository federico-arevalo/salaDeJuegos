import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
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
      // { path: '', component: GamesComponent },
      // { path: 'preguntados', component: PreguntadosComponent },
      // { path: 'tateti', component: TatetiComponent },
      // { path: '**', component: NotFoundComponent },
      // { path: '**', redirectTo: '/', pathMatch: 'full' },//con esto podemos redireccionar
    ],
    canActivate: [authGuard],
  }, //la barra en juego es opcional, si la pones no anda
  // { path: 'juego/tateti', component: TatetiComponent},
  { path: '**', component: NotFoundComponent },
];
