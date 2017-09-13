import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArtistDetailComponent } from './artist-detail';
import {
  ArtistDetailResolveService, ArtistAlbumsResolveService,
  ArtistRelatedResolveService, ArtistSinglesResolveService,
  ArtistTopTracksResolveService, resolveProviders
} from './search-resolve.service';

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
  ArtistDetailComponent
];
