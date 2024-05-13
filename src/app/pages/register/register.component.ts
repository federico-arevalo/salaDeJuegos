import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RouterOutlet,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPass: new FormControl(''),
  });
  constructor(private authService: AuthService) {}

  onRegister($event: any): void {
    $event.preventDefault();

    if (
      this.registerForm.value.password === this.registerForm.value.confirmPass
    ) {
      const { email, password } = this.registerForm.value;
      this.authService.SignUp(email || '', password || '');
    } else {
      console.log('las contraseñas no coindicen');
    }
  }
}
