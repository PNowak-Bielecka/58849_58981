import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './component/layout/layout.component';
import { ReservationListComponent } from './component/reservation-list/reservation-list.component';

const routes: Routes = [
  {
    path: '', component: ReservationListComponent, outlet: 'admin'
  },
  {
    path: '',
    component: LayoutComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }
