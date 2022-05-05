import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [AuthService],
})
export class MenuComponent implements OnInit {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.SignOut();
  }

  public get currentUser(): string {
    return JSON.parse(localStorage.getItem('user')!).email;
  }

  public get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  ngOnInit(): void {}
}
