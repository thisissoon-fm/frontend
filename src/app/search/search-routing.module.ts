import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArtistDetailComponent } from './artist-detail';
import {
  ArtistDetailResolveService, ArtistAlbumsResolveService,
  ArtistRelatedResolveService, ArtistSinglesResolveService,
  ArtistTopTracksResolveService, resolveProviders, AlbumTracksResolveService,
  AlbumDetailResolveService
} from './search-resolve.service';
import { AlbumDetailComponent } from './album-detail';

const routes: Routes = [
  {
    path: 'search/artists/:id',
    component: ArtistDetailComponent,
    resolve: {
      artist: ArtistDetailResolveService,
      topTracks: ArtistTopTracksResolveService,
      albums: ArtistAlbumsResolveService,
      singles: ArtistSinglesResolveService,
      related: ArtistRelatedResolveService,
    }
  },
  {
    path: 'search/albums/:id',
    component: AlbumDetailComponent,
    resolve: {
      album: AlbumDetailResolveService,
      tracks: AlbumTracksResolveService,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [
    ...resolveProviders
  ],
  exports: [RouterModule]
})
export class SearchRoutingModule { }

export const routedComponents = [
  ArtistDetailComponent,
  AlbumDetailComponent
];
