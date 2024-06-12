import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { DriverService } from '@features/driver/service/driver.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriverGuard implements CanActivate {

  constructor(private driverService: DriverService,
              private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    if (!this.driverService.isEmployee()) {
      this.router.navigate(['auth/login']);
      return false;
    }
    return true;
  }

}
