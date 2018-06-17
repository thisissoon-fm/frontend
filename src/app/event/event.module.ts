import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from './services';
import { SocketIOService } from './shared';

export const defaultProviders: Provider[] = [EventService, SocketIOService];

/**
 * Service that connects to socket.io event service
 * and emits events as an Observable
 *
 * @export
 * @class EventModule
 */
@NgModule({
  imports: [CommonModule]
})
export class EventModule {
  /**
   * Specify a static method for root module to ensure providers are
   * only provided once but allows the module to still be imported
   * into other modules without reproviding services.
   *
   * @static
   * @param {Provider[]} [providers]
   * @returns {ModuleWithProviders}
   * @memberof EventModule
   */
  public static forRoot(providers?: Provider[]): ModuleWithProviders {
    return {
      ngModule: EventModule,
      providers: [...defaultProviders, ...providers]
    };
  }
}
