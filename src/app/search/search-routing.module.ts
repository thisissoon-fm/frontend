import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArtistDetailComponent } from './artist-detail';
import { AlbumDetailComponent } from './album-detail';
import { EmptyComponent } from './empty';
import {
  ArtistDetailResolveService, ArtistAlbumsResolveService,
  ArtistRelatedResolveService, ArtistSinglesResolveService,
  ArtistTopTracksResolveService, resolveProviders,
  AlbumTracksResolveService, AlbumDetailResolveService
} from './search-resolve.service';

const routes: Routes = [
  {
    path: 'search',
    outlet: 'search',
    component: EmptyComponent
  },
  {
    path: 'artists/:id',
    component: ArtistDetailComponent,
    outlet: 'search',
    resolve: {
      artist: ArtistDetailResolveService,
      topTracks: ArtistTopTracksResolveService,
      albums: ArtistAlbumsResolveService,
      singles: ArtistSinglesResolveService,
      related: ArtistRelatedResolveService,
    }
  },
  {
    path: 'albums/:id',
    component: AlbumDetailComponent,
    outlet: 'search',
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
  AlbumDetailComponent,
  EmptyComponent
];
