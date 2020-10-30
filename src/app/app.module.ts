import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthModule } from "./auth/auth.module";
import { PagesModule } from './pages/pages.module';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

import localeEsMx from '@angular/common/locales/es-MX';
import localeEn from '@angular/common/locales/en';

registerLocaleData(localeEsMx, 'es');
registerLocaleData(localeEn, 'en');

@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    PagesModule
  ],
  providers: [
    //{ provide: LOCALE_ID, useValue: 'es' } // poner en español las fechas y traducciones pero se ve ogt
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
