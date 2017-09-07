import './operators';

import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { ApiModule, LocalStorageService } from './api';
import { StoreModule as fmStoreModule } from './store';

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
    ]),
    StoreModule.forRoot([]),
    EffectsModule.forRoot([]),
    fmStoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
