import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store';

import { UtilsService } from './utils';


const providers: Provider[] = [
  UtilsService
];

@NgModule({
  imports: [
    StoreModule.forFeature('shared', reducers)
  ],
  declarations: []
})
export class SharedModule {
  /**
   * Specify a static method for root module to ensure providers are
   * only provided once but allows the module to still be imported
   * into other modules without reproviding services.
   *
   * @static
   * @returns {ModuleWithProviders}
   * @memberof SharedModule
   */
 public static forRoot(): ModuleWithProviders {
   return {
      ngModule: SharedModule,
      providers: [
        ...providers
      ]
    };
  }
}
