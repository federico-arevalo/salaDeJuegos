import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire/compat';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterOutlet, AngularFireModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  isError: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(public ruteo: Router, private authService: AuthService) {}
  ngOnInit(): void {}

  onLogin($event: any) {
    $event.preventDefault();

    const { email, password } = this.loginForm.value;
    this.authService
      .SignIn(email || '', password || '')
      .then(() => {
        console.log(localStorage.getItem('user'));
      })
      .catch((e) => {
        this.isError = true;
        console.log(e);
      });
  }

  autocomplete() {
    this.loginForm.setValue({ email: 'fede@test.com', password: 'fede123' });
  }

  closeAlert() {
    this.isError = false;
  }
}
