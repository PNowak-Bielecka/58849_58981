import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@features/auth/service/auth.service';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _moment from 'moment';

const moment = _moment;

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD MM YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  registerForm!: FormGroup;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private breakepointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  isMobile = this.breakepointObserver.observe([
    Breakpoints.Handset,
    Breakpoints.Tablet,
  ]).pipe(
    map( result => result.matches )
  )

  private buildForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      privacyPolicy: ['', [Validators.requiredTrue]]
    })
  }

  onSubmit() {
    let birthDate: _moment.Moment = this.registerForm.controls.birthDate.value;
    this.registerForm.patchValue(
      {
        birthDate: moment(birthDate).format('YYYY-MM-DD'),
      }
    )
    //console.log(birthDate.toObject());

    if(this.registerForm.invalid) {
      return;
    }
    this.authService.register(this.registerForm.value).pipe(
      map(user => this.router.navigate(['auth/login']))
    ).subscribe((res) => {

    }, (res) => { });
  }

}
