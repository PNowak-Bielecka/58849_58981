import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreRoutingModule } from '@core/core-routing.module';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes), CoreRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
