import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { apiProviders } from './services';
import { interceptors, sharedProviders } from './shared';

const defaultProviders = [...apiProviders, ...sharedProviders, ...interceptors];

/**
 * @todo Split into their feature modules
 *
 *  Api module makes request to the FM API and returns
 * player data. Automatically authenticates requests
 * if auth token exists in storage and modifies some
 * responses to make some data easier to use.
 *
 *
 * @export
 * @class ApiModule
 */
@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: []
})
export class ApiModule {
  /**
   * Specify a static method for root module to ensure providers are
   * only provided once but allows the module to still be imported
   * into other modules without reproviding services.
   *
   * @static
   * @param {Provider[]} providers
   * @returns {ModuleWithProviders}
   * @memberof ApiModule
   */
  public static forRoot(providers?: Provider[]): ModuleWithProviders {
    return {
      ngModule: ApiModule,
      providers: [...defaultProviders, ...providers]
    };
  }
}
