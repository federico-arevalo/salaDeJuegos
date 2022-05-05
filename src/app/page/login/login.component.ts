import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(public ruteo: Router, private authService: AuthService) {} //el public evita que tengamos que declarar el atributo

  ngOnInit(): void {}

  onLogin($event: any) {
    $event.preventDefault();

    const { email, password } = this.loginForm.value;
    this.authService.SignIn(email, password);

    // this.ruteo.navigate(['home']);
    // this.ruteo.navigateByUrl('juego/tateti');
    // this.user = new User('', '');
    // console.log(this.user);
  }

  autocomplete() {
    this.loginForm.setValue({ email: 'fede@test.com', password: 'fede123' });
  }
}
