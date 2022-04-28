import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(public ruteo: Router) {} //el public evita que tengamos que declarar el atributo

  ngOnInit(): void {}

  login($event: any) {
    $event.preventDefault();
    // this.ruteo.navigateByUrl('juego/tateti');
    // this.user = new User('', '');
    // console.log(this.user);
  }
}
