import { Component, OnInit, HostBinding, OnDestroy, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';

import { UtilsService, fadeMoveUpAnimation, swipeLeftFadeAnimation } from '../../shared';
import * as fromPlayerStore from '../../player/store';
import { SpotifyArtist, SpotifySearch, SpotifyAlbums, PlayerSpotifyArtistService } from '../../api';

@Component({
  selector: 'sfm-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss'],
  animations: [
    fadeMoveUpAnimation,
    swipeLeftFadeAnimation
  ]
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
   *
   * @type {NgbTabset}
   * @memberof ArtistDetailComponent
   */
  @ViewChild('tabset')
  public tabset: NgbTabset;
  /**
   * Reference to mediaList element
   *
   * @type {ElementRef}
   * @memberof ArtistDetailComponent
   */
  @ViewChild('mediaList')
  public mediaList: ElementRef;
  /**
   * If the user has scrolled down the component
   *
   * @type {boolean}
   * @memberof ArtistDetailComponent
   */
  @HostBinding('class.scrolled-down')
  public scrolledDown = false;
  /**
   * True if component is loading data
   *
   * @type {boolean}
   * @memberof ArtistDetailComponent
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
    private utilsSvc: UtilsService,
    private renderer: Renderer2
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

    this.renderer.listen(this.mediaList.nativeElement, 'scroll', (event) => this.onScroll(event));
  }
  /**
   * Tabset select handler
   *
   * @param {('top-tracks' | 'albums' | 'singles' | 'related')} id
   * @memberof ArtistDetailComponent
   */
  public selectTab(id: 'top-tracks' | 'albums' | 'singles' | 'related'): void {
    switch (id) {
      case 'top-tracks':
        this.selectedTab = 'Top tracks';
        this.tabset.select('top-tracks');
        const tracks = this.topTracks;
        this.topTracks = null;
        Observable.interval(0)
          .take(1)
          .subscribe(() => this.topTracks = tracks);
        break;
      case 'albums':
        this.selectedTab = 'Albums';
        this.tabset.select('albums');
        const albums = this.albums;
        this.albums = null;
        Observable.interval(0)
          .take(1)
          .subscribe(() => this.albums = albums);
        break;
      case 'singles':
        this.selectedTab = 'Singles';
        this.tabset.select('singles');
        const singles = this.singles;
        this.singles = null;
        Observable.interval(0)
          .take(1)
          .subscribe(() => this.singles = singles);
        break;
      case 'related':
        this.selectedTab = 'Related artists';
        this.tabset.select('related');
        const related = this.related;
        this.related = null;
        Observable.interval(0)
          .take(1)
          .subscribe(() => this.related = related);
        break;
    }
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
   * Event handler for scroll event
   *
   * @param {Event} event
   * @memberof ArtistDetailComponent
   */
  public onScroll(event: Event): void {
    this.scrolledDown = !(event.target['scrollTop'] === 0);
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
