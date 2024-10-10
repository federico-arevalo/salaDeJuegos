import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { EncuestaService } from '../../shared/services/encuesta/encuesta.service';

@Component({
  selector: 'app-encuesta',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.scss',
})
export class EncuestaComponent {
  encuestaForm = new FormGroup({
    nombre: new FormControl(
      { value: this.currentUser, disabled: true },
      Validators.required
    ),
    edad: new FormControl('', Validators.required),
    genero: new FormControl('', Validators.required),
    satisfaction: new FormControl('', Validators.required),
    juegosfav: new FormControl('', Validators.required),
    msj: new FormControl(''),
  });

  constructor(private encuestaService: EncuestaService) {}

  public get currentUser(): string {
    return JSON.parse(localStorage.getItem('user')!).email;
  }

  sendEncuesta() {
    const encuesta = {
      nombre: this.currentUser,
      edad: this.encuestaForm.value.edad,
      genero: this.encuestaForm.value.genero,
      satisfaction: this.encuestaForm.value.satisfaction,
      juegosfav: this.encuestaForm.value.juegosfav,
      msj: this.encuestaForm.value.msj,
    };

    this.encuestaService.sendEncuesta(encuesta);
    this.encuestaForm.reset();
  }
}
