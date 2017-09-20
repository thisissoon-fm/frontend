import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { SpotifyAlbums, PlayerSpotifyAlbumService, SpotifyAlbum, SpotifyTracks } from '../../api';
import { UtilsService } from '../../shared';
import * as fromPlayerStore from '../../player/store';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'sfm-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss']
})
export class AlbumDetailComponent implements OnInit {
  /**
   * Album details
   *
   * @type {SpotifyAlbum}
   * @memberof AlbumDetailComponent
   */
  public album: SpotifyAlbum;
  /**
   * List of album tracks
   *
   * @type {SpotifyTracks}
   * @memberof AlbumDetailComponent
   */
  public tracks: SpotifyTracks;
  /**
   * True if component is loading data
   *
   * @type {boolean}
   * @memberof AlbumDetailComponent
   */
  @HostBinding('class.is-loading')
  public loading = true;
  /**
   * Returns album image or empty string if one doesn't exist
   *
   * @readonly
   * @type {string}
   * @memberof AlbumDetailComponent
   */
  public get albumImage(): string {
    return (this.album &&  this.album.images) ?
      this.utilsSvc.getOptimalImage(this.album.images, 0) : '';
  }
  /**
   * Returns true if all results have been loaded
   *
   * @readonly
   * @type {boolean}
   * @memberof SearchComponent
   */
  public get allTracksLoaded(): boolean {
    return (this.tracks && this.tracks.items && (this.tracks.items.length === this.tracks.total));
  }
  /**
   * Creates an instance of AlbumDetailComponent.
   * @param {Store<fromPlayerStore.PlayerState>} playerStore$
   * @param {PlayerSpotifyAlbumService} spotifyAlbumService
   * @param {ActivatedRoute} utilsSvc
   * @param {UtilsService} route
   * @memberof AlbumDetailComponent
   */
  constructor(
    private playerStore$: Store<fromPlayerStore.PlayerState>,
    private spotifyAlbumService: PlayerSpotifyAlbumService,
    private route: ActivatedRoute,
    private utilsSvc: UtilsService
  ) { }
  /**
   * Get album details
   *
   * @memberof AlbumDetailComponent
   */
  public ngOnInit(): void {
    this.route.params
      .take(1)
      .subscribe(params => {
        const id = params['id'];
        Observable.forkJoin(
          this.spotifyAlbumService.get(id),
          this.spotifyAlbumService.getTracks(id)
        )
          .subscribe((res) => {
            this.album = res[0];
            this.tracks = res[1];
            this.tracks.items.forEach((item) => item.album = this.album);
            this.loading = false;
          });
      });
  }
  /**
   * Return artists as a string of names
   *
   * @returns {string}
   * @memberof AlbumDetailComponent
   */
  public get artistsJoined(): string {
    return (this.album && this.album.artists) ?
      this.utilsSvc.getArtistsJoined(this.album.artists) : '';
  }
  /**
   * Add to queue
   *
   * @param {string} uri
   * @memberof AlbumDetailComponent
   */
  public addToQueue(uri: string): void {
    this.playerStore$.dispatch(new fromPlayerStore.QueueAdd(uri));
  }
  /**
   * Get more tracks
   *
   * @memberof AlbumDetailComponent
   */
  public getMoreTracks(): void {
    this.route.params
      .take(1)
      .subscribe(params => {
        const id = params['id'];
        const httpParams = new HttpParams()
          .set('offset', `${this.tracks.items.length}`);
        this.loading = true;
        this.spotifyAlbumService.getTracks(id, httpParams)
          .subscribe((res) => {
            this.loading = false;
            res.items.forEach((item) => item.album = this.album);
            this.tracks.items = [...this.tracks.items, ...res.items];
          });
      });
  }
}
