import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mayor-menor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mayor-menor.component.html',
  styleUrl: './mayor-menor.component.scss',
})
export class MayorMenorComponent implements OnInit {
  numeroAleatorio: number;
  segundoNumero: number;
  puntuacion: number;

  alertTitle: string = '';
  alertContent: string = '';
  showAlert: boolean = false;

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
    this.alertTitle = 'PERDISTE';
    this.alertContent = `Has perdido esta partida. El valor de la carta era ${this.puntuacion}`;

    this.showAlert = true;

    this.desabilitarBotones();
  }

  reiniciarJuego() {
    this.router
      .navigateByUrl('refresh', { skipLocationChange: true })
      .then(() => this.router.navigate(['juegos/mayormenor']));
  }

  desabilitarBotones() {
    (<HTMLButtonElement>document.getElementById('btnMayor')).disabled = true;
    (<HTMLButtonElement>document.getElementById('btnMenor')).disabled = true;
  }
}
