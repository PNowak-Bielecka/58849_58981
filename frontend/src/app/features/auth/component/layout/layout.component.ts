import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@features/auth/service/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLogged();
  }

  isLogged(): void {
    if(this.authService.isAuthenticated() == true) {
      this.router.navigate(['/']);
    }
  }

}
