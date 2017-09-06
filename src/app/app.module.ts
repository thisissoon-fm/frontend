import './operators';

import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ApiModule, LocalStorageService } from './api';

export const getLocalStorage = () => localStorage;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ApiModule.forRoot([
      { provide: LocalStorageService, useFactory: (getLocalStorage) }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
