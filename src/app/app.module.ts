import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './page/login/login.component';
import { MenuComponent } from './page/menu/menu.component';
import { JuegosComponent } from './page/juegos/juegos.component';
import { PreguntadosComponent } from './page/preguntados/preguntados.component';
import { TatetiComponent } from './page/tateti/tateti.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { HomeComponent } from './page/home/home.component';
import { QuiensoyComponent } from './page/quiensoy/quiensoy.component';
import { RegisterComponent } from './page/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    JuegosComponent,
    PreguntadosComponent,
    TatetiComponent,
    NotFoundComponent,
    HomeComponent,
    QuiensoyComponent,
    RegisterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
