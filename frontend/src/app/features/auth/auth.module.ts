import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '@shared/shared.module';
import { LayoutComponent } from './component/layout/layout.component';
import { LoginComponent } from './page/login/login.component';
import { LoginFormComponent } from './component/login-form/login-form.component';
import { MY_DATE_FORMATS, RegisterFormComponent } from './component/register-form/register-form.component';
import { RegisterComponent } from './page/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { FieldsmatchDirective } from './directives/fieldsmatch.directive';
import { JwtHelperService, JwtInterceptor, JWT_OPTIONS } from '@auth0/angular-jwt';


@NgModule({
  declarations: [LayoutComponent, LoginComponent, LoginFormComponent, RegisterFormComponent, RegisterComponent, FieldsmatchDirective],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }
  ],
  exports: [FieldsmatchDirective]
})
export class AuthModule { }
