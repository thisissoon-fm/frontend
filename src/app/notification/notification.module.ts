import { NgModule, Provider, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from './notification.service';

export const defaultProviders: Provider[] = [
  NotificationService
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class NotificationModule {
  /**
   * Specify a static method for root module to ensure providers are
   * only provided once but allows the module to still be imported
   * into other modules without reproviding services.
   *
   * @static
   * @param {Provider[]} [providers]
   * @returns {ModuleWithProviders}
   * @memberof NotificationModule
   */
  public static forRoot(providers?: Provider[]): ModuleWithProviders {
    return {
      ngModule: NotificationModule,
      providers: [
        ...defaultProviders,
        ...providers
      ]
    };
  }
}
