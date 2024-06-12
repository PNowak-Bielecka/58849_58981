import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { DriverRoutingModule } from './driver-routing.module';
import { LayoutComponent } from './component/layout/layout.component';


@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    DriverRoutingModule,
    SharedModule
  ]
})
export class DriverModule { }
