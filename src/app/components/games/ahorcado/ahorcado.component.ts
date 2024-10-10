import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PuntajeService } from '../../../shared/services/puntaje/puntaje.service';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.scss',
})
export class AhorcadoComponent implements OnDestroy {
  teclado: any = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  arrayPalabras = [
    'CABALLO',
    'COMPUTADORA',
    'TELEVISOR',
    'AURICULAR',
    'TOSTADORA',
    'PARAGUAS',
    'TINCHO',
  ];
  arrayImagenes = [
    '../../../../assets/images/ahorcado/horcaCero.png',
    '../../../../assets/images/ahorcado/horcaUno.png',
    '../../../../assets/images/ahorcado/horcaDos.png',
    '../../../../assets/images/ahorcado/horcaTres.png',
    '../../../../assets/images/ahorcado/horcaCuatro.png',
    '../../../../assets/images/ahorcado/horcaCinco.png',
    '../../../../assets/images/ahorcado/horcaSeis.png',
    '../../../../assets/images/ahorcado/horcaSiete.png',
  ];
  indexImagen: number = 0;

  alertTitle: string = '';
  alertContent: string = '';
  showAlert: boolean = false;

  palabraElegida: string;
  palabraConGuionesArray: any = [];
  puntaje: number = 0;

  constructor(private puntajeService: PuntajeService) {
    let numero: number = this.numeroRandom();
    this.palabraElegida = this.arrayPalabras[numero];
    this.palabraConGuionesArray = Array(this.palabraElegida.length).fill('_');
  }

  numeroRandom() {
    return Math.floor(Math.random() * 6);
  }

  getIndicesOf(searchStr: string, str: string, caseSensitive: boolean) {
    var searchStrLen = searchStr.length;
    if (searchStrLen == 0) {
      return [];
    }
    var startIndex = 0,
      index,
      indices: any = [];
    if (!caseSensitive) {
      str = str.toLowerCase();
      searchStr = searchStr.toLowerCase();
    }
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
      indices.push(index);
      startIndex = index + searchStrLen;
    }
    return indices;
  }

  revelarLetra(letra: string) {
    let indices: any = this.getIndicesOf(letra, this.palabraElegida, false);

    console.log(indices);
    if (indices.length != 0) {
      for (let indice of indices) {
        console.log(indice);

        this.palabraConGuionesArray[indice] = letra;
        console.log(this.palabraConGuionesArray);
      }
      return true;
    }
    return false;
  }

  pushLetra(letra: string) {
    (<HTMLButtonElement>document.getElementById(letra)).disabled = true;

    if (this.revelarLetra(letra)) {
      if (this.didPlayerWin()) {
        this.teclado.forEach((_letter: string) => {
          (<HTMLButtonElement>document.getElementById(_letter)).disabled = true;
        });
        this.apareceAlert(true);
      }
    } else {
      this.indexImagen++;
    }

    if (this.indexImagen == 7) {
      this.apareceAlert(false);
      this.teclado.forEach((_letter: string) => {
        (<HTMLButtonElement>document.getElementById(_letter)).disabled = true;
      });
    }
  }

  reiniciarJuego() {
    this.showAlert = false;
    // this.router
    //   .navigateByUrl('refresh', { skipLocationChange: true })
    //   .then(() => this.router.navigate(['juegos/ahorcado']));

    this.palabraElegida = this.arrayPalabras[this.numeroRandom()];
    this.indexImagen = 0;
    this.palabraConGuionesArray = Array(this.palabraElegida.length).fill('_');
    this.teclado.forEach((_letter: string) => {
      (<HTMLButtonElement>document.getElementById(_letter)).disabled = false;
    });
    this.puntajeService.sendPuntaje('Ahorcado', this.puntaje);
    this.puntaje = 0;
  }

  continuarJuego() {
    this.reiniciarJuego();
    this.puntaje++;
  }

  ngOnDestroy(): void {
    console.log(this.puntaje);
    this.puntajeService.sendPuntaje('Ahorcado', this.puntaje);
  }

  didPlayerWin() {
    for (let item of this.palabraConGuionesArray) {
      if (item == '_') {
        return false;
      }
    }
    return true;
  }

  apareceAlert(gano: boolean) {
    if (gano) {
      this.alertTitle = 'GANASTE';
      this.alertContent = 'Has ganado esta partida. Jugas otra mas?';
    } else {
      this.alertTitle = 'PERDISTE';
      this.alertContent = `Has perdido esta partida. La palabra era ${this.palabraElegida}`;
    }

    this.showAlert = true;
  }
}
