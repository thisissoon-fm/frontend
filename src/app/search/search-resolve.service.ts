import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import {
  SpotifyArtist, SpotifySearch, SpotifyAlbums,
  PlayerSpotifyArtistService, PlayerSpotifyAlbumService,
  SpotifyAlbum, SpotifyTracks
} from '../api';

@Injectable()
export class ArtistDetailResolveService implements Resolve<SpotifyArtist> {
  /**
   * Creates an instance of ArtistDetailResolveService.
   * @param {PlayerSpotifyArtistService} spotifyArtistService
   * @memberof ArtistTopTracksResolveService
   */
  constructor(private spotifyArtistService: PlayerSpotifyArtistService) { }
  /**
   * Gets artists detail
   *
   * @param {ActivatedRouteSnapshot} route
   * @returns {Observable<SpotifyArtist>}
   * @memberof ArtistDetailResolveService
   */
  resolve(route: ActivatedRouteSnapshot): Observable<SpotifyArtist> {
    const id = route.params['id'];
    return this.spotifyArtistService.get(id);
  }
}

@Injectable()
export class ArtistTopTracksResolveService implements Resolve<SpotifySearch> {
  /**
   * Creates an instance of ArtistTopTracksResolveService.
   * @param {PlayerSpotifyArtistService} spotifyArtistService
   * @memberof ArtistTopTracksResolveService
   */
  constructor(private spotifyArtistService: PlayerSpotifyArtistService) { }
  /**
   * Gets artists top tracks
   *
   * @param {ActivatedRouteSnapshot} route
   * @returns {Observable<SpotifySearch>}
   * @memberof ArtistTopTracksResolveService
   */
  resolve(route: ActivatedRouteSnapshot): Observable<SpotifySearch> {
    const id = route.params['id'];
    return this.spotifyArtistService.getTopTracks(id);
  }
}

@Injectable()
export class ArtistAlbumsResolveService implements Resolve<SpotifyAlbums> {
  /**
   * Creates an instance of ArtistAlbumsResolveService.
   * @param {PlayerSpotifyArtistService} spotifyArtistService
   * @memberof ArtistAlbumsResolveService
   */
  constructor(private spotifyArtistService: PlayerSpotifyArtistService) { }
  /**
   * Gets artists albums
   *
   * @param {ActivatedRouteSnapshot} route
   * @returns {Observable<SpotifyAlbums>}
   * @memberof ArtistAlbumsResolveService
   */
  resolve(route: ActivatedRouteSnapshot): Observable<SpotifyAlbums> {
    const id = route.params['id'];
    return this.spotifyArtistService.getAlbums(id);
  }
}

@Injectable()
export class ArtistSinglesResolveService implements Resolve<SpotifyAlbums> {
  /**
   * Creates an instance of ArtistSinglesResolveService.
   * @param {PlayerSpotifyArtistService} spotifyArtistService
   * @memberof ArtistSinglesResolveService
   */
  constructor(private spotifyArtistService: PlayerSpotifyArtistService) { }
  /**
   * Gets artists singles
   *
   * @param {ActivatedRouteSnapshot} route
   * @returns {Observable<SpotifyAlbums>}
   * @memberof ArtistSinglesResolveService
   */
  resolve(route: ActivatedRouteSnapshot): Observable<SpotifyAlbums> {
    const id = route.params['id'];
    return this.spotifyArtistService.getSingles(id);
  }
}

@Injectable()
export class ArtistRelatedResolveService implements Resolve<SpotifySearch> {
  /**
   * Creates an instance of ArtistRelatedResolveService.
   * @param {PlayerSpotifyArtistService} spotifyArtistService
   * @memberof ArtistRelatedResolveService
   */
  constructor(private spotifyArtistService: PlayerSpotifyArtistService) { }
  /**
   * Gets related tracks
   *
   * @param {ActivatedRouteSnapshot} route
   * @returns {Observable<SpotifySearch>}
   * @memberof ArtistRelatedResolveService
   */
  resolve(route: ActivatedRouteSnapshot): Observable<SpotifySearch> {
    const id = route.params['id'];
    return this.spotifyArtistService.getRelatedArtists(id);
  }
}

@Injectable()
export class AlbumDetailResolveService implements Resolve<SpotifyAlbum> {
  /**
   * Creates an instance of AlbumDetailResolveService.
   * @param {PlayerSpotifyAlbumService} spotifyAlbumService
   * @memberof ArtistRelatedResolveService
   */
  constructor(private spotifyAlbumService: PlayerSpotifyAlbumService) { }
  /**
   * Gets album details
   *
   * @param {ActivatedRouteSnapshot} route
   * @returns {Observable<SpotifySearch>}
   * @memberof ArtistRelatedResolveService
   */
  resolve(route: ActivatedRouteSnapshot): Observable<SpotifyAlbum> {
    const id = route.params['id'];
    return this.spotifyAlbumService.get(id);
  }
}

@Injectable()
export class AlbumTracksResolveService implements Resolve<SpotifyTracks> {
  /**
   * Creates an instance of AlbumDetailResolveService.
   * @param {PlayerSpotifyAlbumService} spotifyAlbumService
   * @memberof AlbumTracksResolveService
   */
  constructor(private spotifyAlbumService: PlayerSpotifyAlbumService) { }
  /**
   * Gets album details
   *
   * @param {ActivatedRouteSnapshot} route
   * @returns {Observable<SpotifySearch>}
   * @memberof AlbumTracksResolveService
   */
  resolve(route: ActivatedRouteSnapshot): Observable<SpotifyTracks> {
    const id = route.params['id'];
    return this.spotifyAlbumService.getTracks(id);
  }
}

export const resolveProviders: any[] = [
  ArtistDetailResolveService,
  ArtistTopTracksResolveService,
  ArtistAlbumsResolveService,
  ArtistSinglesResolveService,
  ArtistRelatedResolveService,
  AlbumDetailResolveService,
  AlbumTracksResolveService
];
