import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@features/auth/service/auth.service';
import { UsersService } from '@features/users/service/users.service';
import { Subscription } from 'rxjs';
import { map, min, tap } from 'rxjs/operators';
import { User } from 'src/app/api/model/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  private sub!: Subscription;
  isAuthenticated: boolean = false;
  edited: boolean = false;
  isEdited: boolean = false;
  profileForm!: any;
  userId: number | null = null;
  user: User = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UsersService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private breakepointObserver: BreakpointObserver,
  ) {
  }

  ngOnInit(): void {
    this.isLogged();
    this.buildForm();
    this.profileForm.disable();
    /*this.sub = this.activatedRoute.params.subscribe(params => {
      this.userId = params['id'];
      console.log(this.userId);
      this.userService.getUser(this.userId!).pipe(
        map((user: User) => this.user = user)
      ).subscribe()

    })*/

  }

  enableForm() {
    this.profileForm.enable();
    this.edited = true;
  }

  isMobile = this.breakepointObserver.observe([
    Breakpoints.Handset,
    Breakpoints.Tablet,
  ]).pipe(
    map( result => result.matches )
  )

  private buildForm() {
    this.profileForm = this.formBuilder.group({
      email: [this.user.email, [Validators.email, Validators.required]],
      password: [this.user.password, [Validators.minLength(8), Validators.nullValidator]],
      firstName: ['', [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]],
      birthDate: [this.user.birthDate, [Validators.required]],
    })

  }

  private pathFormData(): void {
    this.profileForm.patchValue({
      firstName: this.user.firstName,
      email: this.user.email,
      password: this.user.password,
      lastName: this.user.lastName,
      birthDate: this.user.birthDate
    })
  }

  onSave() {

    console.log(this.profileForm.value);
    this.userService.updateUser(this.user.id!, this.profileForm.value).pipe(
    ).subscribe((res) => this.ngOnInit());
    this.edited = false;
    //window.location.reload();
  }

  cancel() {
    this.profileForm.disable();
    this.edited = false;
    window.location.reload();
  }

  isLogged(): boolean {
    if(this.authService.isAuthenticated() == true) {
      this.getProfile();
      return this.isAuthenticated = true;
    } else
      return this.isAuthenticated = false;
  }

  getProfile() {
    const data = JSON.parse(localStorage.getItem("user")!);
    const userId = data.id;
    this.userService.getUser(userId).pipe(
      map((user: User) => this.user = user)).subscribe(
        (res) => {
          res = this.user;
          this.pathFormData();
        }
      )
  }
}
