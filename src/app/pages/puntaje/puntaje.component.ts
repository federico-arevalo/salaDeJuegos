import { Component } from '@angular/core';
import { PuntajeService } from '../../shared/services/puntaje/puntaje.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-puntaje',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './puntaje.component.html',
  styleUrl: './puntaje.component.scss',
})
export class PuntajeComponent {
  puntos: any;
  filteredPuntos: any;
  isAllSelected: boolean = true;

  constructor(private puntajeService: PuntajeService) {}

  getJuego(e: any) {
    console.log();
    if (e.target.value === 'todos') {
      this.isAllSelected = true;
      this.filteredPuntos = this.puntos.slice(0, 10);
      return;
    }

    this.isAllSelected = false;
    this.filteredPuntos = this.puntos.filter(
      (juego: { juego: any }) => juego.juego === e.target.value
    );
  }

  ngOnInit() {
    this.puntajeService
      .getPuntajes()
      .then(
        (data) =>
          (this.puntos = data.sort((a: any, b: any) => b.puntaje - a.puntaje))
      );
  }
}
