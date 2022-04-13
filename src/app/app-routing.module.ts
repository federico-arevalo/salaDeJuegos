import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { JuegosComponent } from './page/juegos/juegos.component';
import { LoginComponent } from './page/login/login.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { PreguntadosComponent } from './page/preguntados/preguntados.component';
import { QuiensoyComponent } from './page/quiensoy/quiensoy.component';
import { TatetiComponent } from './page/tateti/tateti.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
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
  }, //la barra en juego es opcional, si la pones no anda
  // { path: 'juego/tateti', component: TatetiComponent},
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
