import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';

import { AuthInterceptor } from './auth-interceptor.service';
import { PausedInterceptor } from './paused-interceptor.service';
import { LocalStorageService } from './local-storage.service';

export * from './auth-interceptor.service';
export * from './paused-interceptor.service';
export * from './local-storage.service';

export const interceptors: Provider[] = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: PausedInterceptor, multi: true },
];

export const sharedProviders: Provider[] = [
  LocalStorageService
];
