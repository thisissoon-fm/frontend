import './operators';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ApiModule, LocalStorageService } from './api';

const getLocalStorage = () => localStorage;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ApiModule.forRoot([
      { provide: LocalStorageService, useFactory: (getLocalStorage) }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
