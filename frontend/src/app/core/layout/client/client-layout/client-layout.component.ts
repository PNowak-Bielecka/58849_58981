import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@features/auth/service/auth.service';
import { DriverService } from '@features/driver/service/driver.service';
import { UsersService } from '@features/users/service/users.service';
import { map } from 'rxjs/operators';
import { User } from 'src/app/api/model/user.model';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.scss']
})
export class ClientLayoutComponent implements OnInit {

  isAuthenticated: boolean = false;
  isDriver: boolean = false;
  isAdmin: string | null = null;
  role: string | null = "user";
  user: User = {
    firstName: "",
    lastName: ""
  }


  constructor(
    public authService: AuthService,
    private userService: UsersService,
    private driverService: DriverService,
  ) {}

  ngOnInit(): void {
    this.isEmployee();
    this.isLogged();
    //this.getProfile();

    //console.log("user", userId);
    //console.log(this.authService.accountValue);
    //console.log(this.getProfile());

    //this.authService.isAdmin$.subscribe((res) => (this.isAdmin = res));
    //console.log("to", this.isAdmin);
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

  logout() {
    this.authService.logout();
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
