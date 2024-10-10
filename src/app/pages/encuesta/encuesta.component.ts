import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

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

  public get currentUser(): string {
    return JSON.parse(localStorage.getItem('user')!).email;
  }

  sendEncuesta() {
    console.log(this.encuestaForm.value);
    console.log(this.encuestaForm.valid);
  }
}
