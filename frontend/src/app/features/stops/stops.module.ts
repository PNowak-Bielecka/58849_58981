import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './component/layout/layout.component';
import { SharedModule } from '@shared/shared.module';
import { StopsRoutingModule } from './stops-routing.module';
import { StopsListComponent } from './component/stops-list/stops-list.component';
import { AddStopComponent } from './component/add-stop/add-stop.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LayoutComponent, StopsListComponent, AddStopComponent],
  imports: [
    CommonModule,
    StopsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class StopsModule { }
