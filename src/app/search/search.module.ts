import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../shared';

import { SearchComponent } from './search';
import { TrackComponent } from './track';
import { AlbumComponent } from './album';
import { ArtistComponent } from './artist';

@NgModule({
  imports: [
    CommonModule,
    StoreModule,
    NgbDropdownModule,
    SharedModule
  ],
  exports: [
    SearchComponent,
    TrackComponent,
    ArtistComponent,
    AlbumComponent
  ],
  declarations: [
    SearchComponent,
    TrackComponent,
    AlbumComponent,
    ArtistComponent
  ]
})
export class SearchModule { }
