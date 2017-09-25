import { Component, OnInit, HostBinding, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { UtilsService } from '../../shared';
import * as fromPlayerStore from '../../player/store';
import { SpotifyArtist, SpotifySearch, SpotifyAlbums, PlayerSpotifyArtistService } from '../../api';

@Component({
  selector: 'sfm-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss']
})
export class ArtistDetailComponent implements OnInit, OnDestroy {
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
  public singles: SpotifyAlbums;
  /**
   * List of related artists
   *
   * @type {SpotifySearch}
   * @memberof ArtistDetailComponent
   */
  public related: SpotifySearch;
  /**
   * selected tab name
   *
   * @type {string}
   * @memberof ArtistDetailComponent
   */
  public selectedTab = 'Top tracks';
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
   * Returns true if all albums have been loaded
   *
   * @readonly
   * @type {boolean}
   * @memberof ArtistDetailComponent
   */
  public get allAlbumsLoaded(): boolean {
    return (this.albums && this.albums.items && (this.albums.items.length === this.albums.total));
  }
  /**
   * Returns true if all albums have been loaded
   *
   * @readonly
   * @type {boolean}
   * @memberof ArtistDetailComponent
   */
  public get allSinglesLoaded(): boolean {
    return (this.singles && this.singles.items && (this.singles.items.length === this.singles.total));
  }
  /**
   * Observable used to unsubscribe and complete infinite observables
   * on component destroy lifecycle hook
   *
   * @type {Subject<void>}
   * @memberof ArtistDetailComponent
   */
  public ngUnsubscribe$: Subject<void> = new Subject<void>();
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
    private location: Location,
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
      .takeUntil(this.ngUnsubscribe$)
      .subscribe((params) => {
        this.artist = null;
        this.albums = null;
        this.singles = null;
        this.topTracks = null;
        this.related = null;
        this.loading = false;

        const id = params['id'];
        Observable.forkJoin(
          this.spotifyArtistService.get(id),
          this.spotifyArtistService.getAlbums(id),
          this.spotifyArtistService.getSingles(id),
          this.spotifyArtistService.getTopTracks(id),
          this.spotifyArtistService.getRelatedArtists(id)
        )
          .subscribe((res) => {
            this.artist = res[0];
            this.albums = res[1];
            this.singles = res[2];
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
  /**
   * Get more albums
   *
   * @memberof ArtistDetailComponent
   */
  public getMoreAlbums(): void {
    this.route.params
      .take(1)
      .subscribe((params) => {
        const id = params['id'];
        const httpParams = new HttpParams()
          .set('offset', `${this.albums.items.length}`);
        this.loading = true;
        this.spotifyArtistService.getAlbums(id, httpParams)
          .subscribe({
            next: (res) => res.items.forEach(item => this.albums.items.push(item)),
            complete: () => this.loading = false
          });
      });
  }
  /**
   * Get more singles
   *
   * @memberof ArtistDetailComponent
   */
  public getMoreSingles(): void {
    this.route.params
      .take(1)
      .subscribe((params) => {
        const id = params['id'];
        const httpParams = new HttpParams()
          .set('offset', `${this.singles.items.length}`);
        this.loading = true;
        this.spotifyArtistService.getSingles(id, httpParams)
          .subscribe({
            next: (res) => res.items.forEach(item => this.singles.items.push(item)),
            complete: () => this.loading = false
          });
      });
  }
  /**
   * On scroll end load more albums/singles
   *
   * @param {('top-tracks' | 'albums' | 'singles' | 'related')} id
   * @memberof ArtistDetailComponent
   */
  public onScrollEnd(id: 'top-tracks' | 'albums' | 'singles' | 'related'): void {
    switch (id) {
      case 'albums':
        this.getMoreAlbums();
        break;
      case 'singles':
        this.getMoreSingles();
        break;
    }
  }
  /**
   * Go to previous page
   *
   * @memberof ArtistDetailComponent
   */
  public goBack(): void {
    this.location.back();
  }
  /**
   * Unsubscribe from infinite observables
   *
   * @memberof ArtistDetailComponent
   */
  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
