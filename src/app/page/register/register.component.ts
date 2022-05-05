import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthService],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    passwordConfirmed: new FormControl(''),
  });
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onRegister($event: any) {
    $event.preventDefault();

    if (
      this.registerForm.value.password ===
      this.registerForm.value.passwordConfirmed
    ) {
      const { email, password } = this.registerForm.value;
      this.authService.SignUp(email, password);
    } else {
      console.log('las contraseñas no coindicen');
    }
  }
}
