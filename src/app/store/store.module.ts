import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule as ngrxStoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ApiModule } from '../api';
import { effects } from './effects';
import { reducers } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    ApiModule,
    ngrxStoreModule.forFeature('player', reducers),
    EffectsModule.forFeature(effects),
  ],
  declarations: []
})
export class StoreModule { }
