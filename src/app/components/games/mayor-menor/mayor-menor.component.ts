import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mayor-menor',
  standalone: true,
  imports: [],
  templateUrl: './mayor-menor.component.html',
  styleUrl: './mayor-menor.component.scss',
})
export class MayorMenorComponent implements OnInit {
  numeroAleatorio: number;
  segundoNumero: number;
  puntuacion: number;

  constructor(private router: Router) {
    this.numeroAleatorio = this.getRandom();
    this.segundoNumero = this.getRandom();
    this.puntuacion = 0;
  }

  ngOnInit(): void {}

  getRandom() {
    let numero = Math.floor(Math.random() * (13 - 1)) + 1;
    //console.log(numero);
    return Math.floor(numero);
  }

  esMenor() {
    if (this.segundoNumero <= this.numeroAleatorio) {
      this.puntuacion++;
      this.numeroAleatorio = this.segundoNumero;
      this.segundoNumero = this.getRandom();
      //puntuacion +1 y asigno dos numeros nuevos
    } else {
      this.apareceAlert();
    }
  }

  esMayor() {
    if (this.segundoNumero >= this.numeroAleatorio) {
      this.puntuacion++;
      this.numeroAleatorio = this.segundoNumero;
      this.segundoNumero = this.getRandom();
      //puntuacion +1 y asigno dos numeros nuevos
    } else {
      this.apareceAlert();
    }
  }

  apareceAlert() {
    let espacio = <HTMLElement>document.getElementById('pedrito');

    espacio.innerHTML =
      `<div class="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
      <h4 class="alert-heading">Juego Terminado!!</h4>
      <hr>
      <p>la carta era ` +
      this.segundoNumero +
      `</p>
      <p>Has hecho ` +
      this.puntuacion +
      ` puntos.</p>
      </div>`;

    this.desabilitarBotones();
  }

  ReiniciarJuego() {
    this.numeroAleatorio = this.getRandom();
    this.segundoNumero = this.getRandom();
    this.puntuacion = 0;
  }

  desabilitarBotones() {
    (<HTMLButtonElement>document.getElementById('btnMayor')).disabled = true;
    (<HTMLButtonElement>document.getElementById('btnMenor')).disabled = true;
  }
}
