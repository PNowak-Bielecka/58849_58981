import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationListComponent } from '@features/reservation/component/reservation-list/reservation-list.component';
import { RoutesListComponent } from '@features/routes/component/routes-list/routes-list.component';
import { StopsListComponent } from '@features/stops/component/stops-list/stops-list.component';
import { UserProfileComponent } from '@features/user-profile/component/user-profile/user-profile.component';
import { UsersListComponent } from '@features/users/component/users-list/users-list.component';
import { HeroComponent } from '@shared/component/hero/hero.component';
import { PageNotFoundComponent } from '@shared/component/page-not-found/page-not-found.component';
import { SearchComponent } from '@shared/component/search/search.component';
import { TicketComponent } from '@shared/component/ticket/ticket.component';
import { AuthGuard } from './guard/auth.guard';
import { DriverGuard } from './guard/driver.guard';
import { AdminLayoutComponent } from './layout/admin/admin-layout/admin-layout.component';
import { ClientLayoutComponent } from './layout/client/client-layout/client-layout.component';

const routes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    pathMatch: 'prefix',
    children: [
      {
        path: '',
        component: HeroComponent,
        data: {from: 'from'}
      },
      {
        path: 'search',
        component: SearchComponent,
      },
      {
        path: 'profile',
        component: UserProfileComponent,
      },
      {
        path: 'profile/tickets',
        component: TicketComponent
      }
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'reservations', component: ReservationListComponent },
      { path: 'users', component: UsersListComponent },
      { path: 'stops', component: StopsListComponent },
      { path: 'routes', component: RoutesListComponent }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'reservation',
    loadChildren: () => import('@features/reservation/reservations.module').then(m => m.ReservationModule),
    //canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('@features/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'stops',
    loadChildren: () => import('@features/stops/stops.module').then(m => m.StopsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'routes',
    loadChildren: () => import('@features/routes/routes.module').then(m => m.RoutesModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'driver',
    loadChildren: () => import('@features/driver/driver.module').then(m => m.DriverModule),
    canActivate: [DriverGuard],
  },
  {
    path: '404-page-not-found',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: '404-page-not-found'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
