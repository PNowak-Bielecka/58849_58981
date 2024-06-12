import { Component, OnInit } from '@angular/core';
import { AuthService } from '@features/auth/service/auth.service';
import { DriverService } from '@features/driver/service/driver.service';
import { UsersService } from '@features/users/service/users.service';
import { map } from 'rxjs/operators';
import { User } from 'src/app/api/model/user.model';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})

export class AdminLayoutComponent implements OnInit {

  isAuthenticated: boolean = true;
  isDriver: boolean = false;
  isAdmin: any = null;
  role: string | null = "user";

  user: User = {
    firstName: "",
    lastName: ""
  }

  constructor(private authService: AuthService,
    private userService: UsersService,
    private driverService: DriverService) {
  }

  ngOnInit(): void {
    this.isLogged();
    this.isEmployee();
    this.authService.isAdmin$.subscribe((res) => (this.isAdmin = res));
  }

  logout() {
    this.authService.logout();
  }

  isEmployee(): boolean{
    if (this.driverService.isEmployee() == true) {
      return this.isDriver = true;
    } else {
      return this.isDriver = false;
    }
  }

  isLogged(): boolean {
    if(this.authService.isAuthenticated() == true) {
      this.getProfile();
      this.getRole();
      return this.isAuthenticated = true;
    } else
      return this.isAuthenticated = false;
  }

  getProfile() {
    const data = JSON.parse(localStorage.getItem("user")!);
    const userId = data.id;
    this.userService.getUser(userId).pipe(
      map((user: User) => this.user = user)).subscribe()
  }

  getRole() {
    const data = localStorage.getItem('role');
    //console.log(data);
    this.role = data;
  }

}
