import './rxjs';

import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import * as io from 'socket.io-client';

import { ApiModule, LocalStorageService } from './api';
import { EventModule, SocketIOService } from './event';
import { SearchModule } from './search';
import { PlayerModule } from './player';
import { NavModule } from './nav';
import { SharedModule } from './shared';
import { UserModule } from './user';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Factories to be specifically provided for browser platform
const socketIO = { connect: io };
export const getLocalStorage = () => localStorage;
export const getSocketIO = () => socketIO;

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
    NgbDropdownModule.forRoot(),
    StoreModule.forRoot([]),
    EffectsModule.forRoot([]),
    SharedModule.forRoot(),
    ApiModule.forRoot([
      { provide: LocalStorageService, useFactory: (getLocalStorage) }
    ]),
    EventModule.forRoot([
      { provide: SocketIOService, useFactory: (getSocketIO) }
    ]),
    SearchModule,
    PlayerModule,
    NavModule,
    UserModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
