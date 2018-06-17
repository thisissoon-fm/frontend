import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OAuthService } from './oauth/oauth.service';

const defaultProviders: Provider[] = [OAuthService];

@NgModule({
  imports: [CommonModule],
  declarations: []
})
export class AuthModule {
  /**
   * Specify a static method for root module to ensure providers are
   * only provided once but allows the module to still be imported
   * into other modules without reproviding services.
   *
   * @static
   * @param {Provider[]} [providers]
   * @returns {ModuleWithProviders}
   * @memberof AuthModule
   */
  public static forRoot(providers?: Provider[]): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [...defaultProviders, ...providers]
    };
  }
}
