import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartasService } from '../../../shared/services/cartas/cartas.service';
import { PuntajeService } from '../../../shared/services/puntaje/puntaje.service';

const CARTAS_VALUES = {
  AS: 1,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  ACE: 10,
  JACK: 11,
  QUEEN: 12,
  KING: 13,
};
@Component({
  selector: 'app-mayor-menor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mayor-menor.component.html',
  styleUrl: './mayor-menor.component.scss',
})
export class MayorMenorComponent implements OnInit {
  isIgualValor: boolean = false;
  isAlertShown: boolean = false;
  puntuacion: number = 0;
  mazo: any;
  carta: any;
  previousCarta: any;
  quedan: number = 0;

  constructor(
    private cartasService: CartasService,
    private puntajeService: PuntajeService
  ) {}

  ngOnInit(): void {
    this.getMazo();
  }

  validarCarta(eleccion: string) {
    //if the values of the cards are the same we just show an alert
    if (
      CARTAS_VALUES[this.carta.value as keyof typeof CARTAS_VALUES] ===
      CARTAS_VALUES[this.previousCarta.value as keyof typeof CARTAS_VALUES]
    ) {
      this.isIgualValor = true;
      setTimeout(() => {
        this.isIgualValor = false;
      }, 4000);

      this.getAnotherCarta();
      return;
    }

    const isNextCartaMayor =
      CARTAS_VALUES[this.carta.value as keyof typeof CARTAS_VALUES] >
      CARTAS_VALUES[this.previousCarta.value as keyof typeof CARTAS_VALUES];

    if (eleccion === 'mayor') {
      if (isNextCartaMayor) {
        this.puntuacion++;
        this.getAnotherCarta();
        return;
      }
    }

    if (eleccion === 'menor') {
      if (!isNextCartaMayor) {
        this.puntuacion++;
        this.getAnotherCarta();
        return;
      }
    }

    this.isAlertShown = true;
    return;
  }

  getMazo() {
    this.cartasService.crearMazo().then((mazo) => {
      this.mazo = mazo;
      this.quedan = mazo.quedan;
      this.cartasService.traerCartas(mazo.mazoId, 2).then((cartas) => {
        this.previousCarta = cartas.cards[0];
        this.carta = cartas.cards[1];
        this.quedan = cartas.remaining;
      });
    });
  }

  getAnotherCarta() {
    if (this.quedan === 0) {
      this.getMazo();
    } else {
      this.previousCarta = this.carta;
      this.cartasService.traerCartas(this.mazo.mazoId, 1).then((cartas) => {
        this.carta = cartas.cards[0];
        this.quedan = cartas.remaining;
        console.log(this.previousCarta.value);
      });
    }
  }

  saveGameAndRestart() {
    this.isAlertShown = false;

    // if(this.puntuacion > 0)
    //   this.puntajeService.sendPuntaje('Mayor o Menor', this.puntuacion);

    this.getMazo();
    this.puntuacion = 0;
  }
}
