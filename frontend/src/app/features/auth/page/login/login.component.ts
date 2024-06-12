import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@features/auth/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  vrs = {
      brandName: "Vehicle Reservation System",
      shortcutName: "VRS",
      login: "Zaloguj"
    }

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.isLogged();
  }

  isLogged(): void {
    if(this.authService.isAuthenticated() == true) {
      this.router.navigate(['/']);
    } else
      this.router.navigate(['auth/login']);
  }
}
