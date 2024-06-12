import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@features/auth/service/auth.service';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  message: string = "";
  hide = true;
  //private subscription!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {



  }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });

  }

  ngOnDestroy(): void {
    //this.subscription.unsubscribe();
  }

  /*onSubmit() {
    if(this.loginForm.invalid) {
      return console.error();
    }
    this.authService.login(this.loginForm.value).pipe(
      tap(res => {
        console.log(res);
      }),
      map(res => res)//token => this.router.navigate(['/']))
    ).subscribe({
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          this.message = error.error.message;
        }
      }
    });
  }*/

  onSubmit() {
    if(this.loginForm.invalid) {
      return console.error();
    }
    this.authService.login(this.loginForm.value).subscribe({
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          this.message = error.error.message;
        }
      },
      next: (res) => {
        this.router.navigate(['/']);
      }
    });
  }
}
