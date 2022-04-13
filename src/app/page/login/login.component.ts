import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(public ruteo: Router) {} //el public evita que tengamos que declarar el atributo

  ngOnInit(): void {}

  redirigir() {
    this.ruteo.navigateByUrl('juego/tateti');
  }
}
