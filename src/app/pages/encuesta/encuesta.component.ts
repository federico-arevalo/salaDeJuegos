import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { EncuestaService } from '../../shared/services/encuesta/encuesta.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-encuesta',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.scss',
})
export class EncuestaComponent {
  isAlertShown: boolean = false;
  encuestaForm = new FormGroup({
    user: new FormControl(
      { value: this.currentUser, disabled: true },
      Validators.required
    ),
    nombre: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]+$'),
    ]),
    apellido: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]+$'),
    ]),
    tel: new FormControl('', [Validators.required, Validators.max(9999999999)]),
    edad: new FormControl('', [
      Validators.required,
      Validators.min(12),
      Validators.max(99),
    ]),
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
    this.encuestaForm.markAllAsTouched();

    if (!this.encuestaForm.valid) return;

    const encuesta = {
      user: this.currentUser,
      nombre: this.encuestaForm.value.nombre,
      apellido: this.encuestaForm.value.apellido,
      tel: this.encuestaForm.value.tel,
      edad: this.encuestaForm.value.edad,
      genero: this.encuestaForm.value.genero,
      satisfaction: this.encuestaForm.value.satisfaction,
      juegosfav: this.encuestaForm.value.juegosfav,
      msj: this.encuestaForm.value.msj,
    };

    this.encuestaService.sendEncuesta(encuesta);
    this.encuestaForm.reset();
    this.showAlert();
  }

  showAlert() {
    this.isAlertShown = true;
    setTimeout(() => {
      this.isAlertShown = false;
    }, 3000);
  }
}
