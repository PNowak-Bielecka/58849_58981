import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ClientLayoutComponent } from './layout/client/client-layout/client-layout.component';
import { AdminLayoutComponent } from './layout/admin/admin-layout/admin-layout.component';
import { ReservationModule } from '@features/reservation/reservations.module';
import { AuthModule } from '@features/auth/auth.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../api/interceptor/jwt.interceptor';
import { UsersModule } from '@features/users/users.module';
import { UserProfileModule } from '@features/user-profile/user-profile.module';
import { ApiModule } from '../api/api.module';


@NgModule({
  declarations: [ClientLayoutComponent, AdminLayoutComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    ReservationModule,
    AuthModule,
    UsersModule,
    UserProfileModule,
    SharedModule,
    ApiModule
  ],
  providers: [
    ApiModule
  ]
})


export class CoreModule {}
