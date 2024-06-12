import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CoreModule } from '@core/core.module';
import localePl from '@angular/common/locales/pl'
import { registerLocaleData } from '@angular/common';
registerLocaleData(localePl);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    CoreModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pl'
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }