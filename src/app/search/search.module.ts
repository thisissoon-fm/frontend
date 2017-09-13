import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../shared';
import { PlayerModule } from '../player';

import { reducers, effects } from './store';
import { AlbumComponent } from './album';
import { ArtistComponent } from './artist';
import { SearchComponent } from './search';
import { TrackComponent } from './track';

import { SearchRoutingModule, routedComponents } from './search-routing.module';

const components = [
  AlbumComponent,
  ArtistComponent,
  SearchComponent,
  TrackComponent
];

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('search', reducers),
    EffectsModule.forFeature(effects),
    NgbDropdownModule,
    SharedModule,
    PlayerModule,
    SearchRoutingModule
  ],
  exports: [
    ...components
  ],
  declarations: [
    ...routedComponents,
    ...components
  ]
})
export class SearchModule { }
