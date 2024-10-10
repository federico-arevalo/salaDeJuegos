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

  constructor(private puntajeService: PuntajeService) {}

  verPuntajes() {
    console.log(this.puntos);
  }

  ngOnInit() {
    this.puntajeService.getPuntajes().then((data) => (this.puntos = data));
  }
}
