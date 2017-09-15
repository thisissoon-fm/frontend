import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { UtilsService } from '../../shared';
import * as fromPlayerStore from '../../player/store';
import { SpotifyArtist, SpotifySearch, SpotifyAlbums, PlayerSpotifyArtistService } from '../../api';

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
   * True if component is loading data
   *
   * @type {boolean}
   * @memberof AlbumDetailComponent
   */
  @HostBinding('class.is-loading')
  public loading = true;
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
   * @param {PlayerSpotifyArtistService} spotifyArtistService
   * @param {ActivatedRoute} route
   * @param {UtilsService} utilsSvc
   * @memberof ArtistDetailComponent
   */
  constructor(
    private playerStore$: Store<fromPlayerStore.PlayerState>,
    private spotifyArtistService: PlayerSpotifyArtistService,
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
    this.route.params
    .take(1)
    .subscribe(params => {
      const id = params['id'];
      Observable.forkJoin([
        this.spotifyArtistService.get(id),
        this.spotifyArtistService.getAlbums(id),
        this.spotifyArtistService.getSingles(id),
        this.spotifyArtistService.getTopTracks(id),
        this.spotifyArtistService.getRelatedArtists(id)
      ])
        .subscribe((res: any[]) => {
          this.artist = res[0];
          this.albums = res[1];
          this.single = res[2];
          this.topTracks = res[3];
          this.related = res[4];
          this.loading = false;
        });
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
