import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgbDropdownModule, NgbTabsetModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2UiAuthModule, AuthService } from 'ng2-ui-auth';
import * as io from 'socket.io-client';

import { ApiModule, LocalStorageService } from './api';
import { EventModule, SocketIOService } from './event';
import { NavModule } from './nav';
import { SearchModule } from './search';
import { PlayerModule } from './player';
import { SharedModule } from './shared';
import { UserModule } from './user';
import { AuthModule, AuthConfig, OAuthService } from './auth';
import { NotificationModule, NotificationService } from './notification';

import { AppRoutingModule, routedComponents } from './app-routing.module';
import { AppComponent } from './app.component';

// Factories to be specifically provided for browser platform
const socketIO = { connect: io };
const notification = new NotificationService();
notification.nativeNotification = Notification;
export const getLocalStorage = () => localStorage;
export const getSocketIO = () => socketIO;
export const getNotification = () => notification;

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
    BrowserAnimationsModule,
    NgbDropdownModule.forRoot(),
    NgbTabsetModule.forRoot(),
    NgbPopoverModule.forRoot(),
    StoreModule.forRoot([]),
    EffectsModule.forRoot([]),
    Ng2UiAuthModule.forRoot(AuthConfig),
    SharedModule.forRoot(),
    ApiModule.forRoot([
      { provide: LocalStorageService, useFactory: (getLocalStorage) }
    ]),
    EventModule.forRoot([
      { provide: SocketIOService, useFactory: (getSocketIO) }
    ]),
    NotificationModule.forRoot([
      { provide: NotificationService, useFactory: (getNotification) }
    ]),
    AuthModule.forRoot([
      { provide: OAuthService, useClass: AuthService }
    ]),
    NavModule,
    UserModule,
    SearchModule,
    PlayerModule,
    AppRoutingModule
  ],
  declarations: [
    ...routedComponents,
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
