import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { UtilsService } from '../../shared';
import * as fromPlayerStore from '../../player/store';
import { ArtistDetail, SpotifyArtist, SpotifyAlbums, SpotifySearch } from '../../api';

@Component({
  selector: 'sfm-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss']
})
export class ArtistDetailComponent implements OnInit {
  /**
   * Artist details
   *
   * @type {SpotifyArtist}
   * @memberof ArtistDetailComponent
   */
  public artist: SpotifyArtist;
  /**
   * List of artists top tracks
   *
   * @type {SpotifySearch}
   * @memberof ArtistDetailComponent
   */
  public topTracks: SpotifySearch;
  /**
   * List of artist's albums
   *
   * @type {SpotifyAlbums}
   * @memberof ArtistDetailComponent
   */
  public albums: SpotifyAlbums;
  /**
   * List of artist's singles
   *
   * @type {SpotifyAlbums}
   * @memberof ArtistDetailComponent
   */
  public single: SpotifyAlbums;
  /**
   * List of related artists
   *
   * @type {SpotifySearch}
   * @memberof ArtistDetailComponent
   */
  public related: SpotifySearch;
  /**
   * Returns artist image or empty string if one doesn't exist
   *
   * @readonly
   * @type {string}
   * @memberof ArtistDetailComponent
   */
  public get artistImage(): string {
    return (this.artist &&  this.artist.images) ?
      this.utilsSvc.getOptimalImage(this.artist.images, 0) : '';
  }
  /**
   * Creates an instance of ArtistDetailComponent.
   * @param {Store<fromPlayerStore.PlayerState>} playerStore$
   * @param {UtilsService} utilsSvc
   * @memberof ArtistDetailComponent
   */
  constructor(
    private playerStore$: Store<fromPlayerStore.PlayerState>,
    private route: ActivatedRoute,
    private utilsSvc: UtilsService
  ) { }
  /**
   * Get artist details from router service
   * and save to properties in component
   *
   * @memberof ArtistDetailComponent
   */
  public ngOnInit(): void {
    this.route.data
      .subscribe((data: ArtistDetail) => {
        this.artist = data.artist;
        this.albums = data.albums;
        this.single = data.singles;
        this.topTracks = data.topTracks;
        this.related = data.related;
      });
  }
  /**
   * Add to queue
   *
   * @param {string} uri
   * @memberof ArtistDetailComponent
   */
  public addToQueue(uri: string): void {
    this.playerStore$.dispatch(new fromPlayerStore.QueueAdd(uri));
  }
}
