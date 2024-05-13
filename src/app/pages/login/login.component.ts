import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
} from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterOutlet, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  private sub!: Subscription;

  constructor(
    public ruteo: Router,
    private authService: AuthService,
    private firestore: Firestore
  ) {} //el public evita que tengamos que declarar el atributo

  ngOnInit(): void {}

  onLogin($event: any) {
    $event.preventDefault();

    const { email, password } = this.loginForm.value;
    this.authService.SignIn(email || '', password || '');

    // this.ruteo.navigate(['home']);
    // this.ruteo.navigateByUrl('juego/tateti');
    // this.user = new User('', '');
    // console.log(this.user);

    let col = collection(this.firestore, 'logins');
    addDoc(col, {
      fecha: new Date(),
      user: JSON.parse(localStorage.getItem('user')!).email,
    });
  }

  autocomplete() {
    this.loginForm.setValue({ email: 'fede@test.com', password: 'fede123' });
  }
}
