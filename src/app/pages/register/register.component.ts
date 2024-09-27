import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../shared/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

const firbaseErrors: { [key: string]: string } = {
  'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
  'auth/email-already-in-use': 'Correo electronico ya registrado',
};

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
  isError: boolean = false;
  errorMessage: string = 'Error';

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPass: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService) {}

  onRegister($event: any): void {
    $event.preventDefault();

    if (
      this.registerForm.value.password !== this.registerForm.value.confirmPass
    ) {
      this.errorMessage = 'las contraseñas no coindicen';
      this.isError = true;
      return;
    }

    const { email, password } = this.registerForm.value;
    this.authService.SignUp(email as any, password as any).catch((err) => {
      console.log(err.code);
      this.errorMessage = firbaseErrors[err.code as string];
      this.isError = true;
    });
  }

  closeAlert() {
    this.isError = false;
  }
}
