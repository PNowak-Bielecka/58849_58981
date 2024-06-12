import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@features/auth/service/auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if(!this.authService.isAuthenticated()) {
      this.router.navigate(['auth/login']);
      return false && this.authService.isLogged.pipe(
        take(1),
        map((isLogged: boolean) => isLogged)
      );
    }
    return true;
  }

}