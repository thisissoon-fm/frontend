import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArtistDetailComponent } from './artist-detail';
import { AlbumDetailComponent } from './album-detail';
import { EmptyComponent } from './empty';

const routes: Routes = [
  { path: 'search', component: EmptyComponent, outlet: 'search' },
  { path: 'artists/:id', component: ArtistDetailComponent, outlet: 'search' },
  { path: 'albums/:id', component: AlbumDetailComponent, outlet: 'search' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }

export const routedComponents = [
  ArtistDetailComponent,
  AlbumDetailComponent,
  EmptyComponent
];
