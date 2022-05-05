import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { JuegosComponent } from './page/juegos/juegos.component';
import { LoginComponent } from './page/login/login.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { PreguntadosComponent } from './page/preguntados/preguntados.component';
import { QuiensoyComponent } from './page/quiensoy/quiensoy.component';
import { RegisterComponent } from './page/register/register.component';
import { TatetiComponent } from './page/tateti/tateti.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'quiensoy', component: QuiensoyComponent },
  {
    path: 'juego',
    component: JuegosComponent,
    children: [
      { path: 'preguntados', component: PreguntadosComponent },
      { path: 'tateti', component: TatetiComponent },
      { path: '**', component: NotFoundComponent },
      // { path: '**', redirectTo: '/', pathMatch: 'full' },//con esto podemos redireccionar
    ],
    canActivate: [AuthGuard],
  }, //la barra en juego es opcional, si la pones no anda
  // { path: 'juego/tateti', component: TatetiComponent},
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
