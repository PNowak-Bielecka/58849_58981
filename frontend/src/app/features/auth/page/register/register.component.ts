import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterFormComponent } from '@features/auth/component/register-form/register-form.component';
import { AuthService } from '@features/auth/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  vrs = {
    brandName: "Vehicle Reservation System",
    shortcutName: "VRS",
    login: "Zaloguj",
    register: "Zarejestruj"
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
      this.router.navigate(['auth/register']);
  }
}
