import './rxjs';

import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as io from 'socket.io-client';

import { ApiModule, LocalStorageService } from './api';
import { StoreModule as fmStoreModule } from './store';
import { EventModule, SocketIOService } from './event';

import { AppComponent } from './app.component';
import { SearchModule } from './search/search.module';

// Factories to be specifically provided for browser platform
export const getLocalStorage = () => localStorage;
export const getSocketIO = () => {
  return { connect: io };
};

/**
 * Root module that imports all other modules and is
 * boostrapped by `/src/main.ts`
 *
 * @export
 * @class AppModule
 */
@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    StoreModule.forRoot([]),
    EffectsModule.forRoot([]),
    fmStoreModule,
    ApiModule.forRoot([
      { provide: LocalStorageService, useFactory: (getLocalStorage) }
    ]),
    EventModule.forRoot([
      { provide: SocketIOService, useFactory: (getSocketIO) }
    ]),
    SearchModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
