import { Component } from '@angular/core';

@Component({
  selector: 'app-encuesta',
  standalone: true,
  imports: [],
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.scss',
})
export class EncuestaComponent {
  public get currentUser(): string {
    return JSON.parse(localStorage.getItem('user')!).email;
  }
}
