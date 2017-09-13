import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { UtilsService } from '../../shared';
import * as fromPlayerStore from '../../player/store';
import { SpotifyAlbum, SpotifyTracks, AlbumDetail } from '../../api';

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
   * Returns artist image or empty string if one doesn't exist
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
   * Creates an instance of AlbumDetailComponent.
   * @param {Store<fromPlayerStore.PlayerState>} playerStore$
   * @param {UtilsService} utilsSvc
   * @memberof AlbumDetailComponent
   */
  constructor(
    private playerStore$: Store<fromPlayerStore.PlayerState>,
    private route: ActivatedRoute,
    private utilsSvc: UtilsService
  ) { }
  /**
   * Get artist details
   *
   * @memberof AlbumDetailComponent
   */
  public ngOnInit(): void {
    this.route.data
      .subscribe((data: AlbumDetail) => {
        this.album = data.album;
        this.tracks = data.tracks;
        this.tracks.items.forEach((item) => item.album = this.album);
      });
  }
  /**
   * Return artists as a string of names
   *
   * @returns {string}
   * @memberof AlbumDetailComponent
   */
  public get artistsJoined(): string {
    return this.utilsSvc.getArtistsJoined(this.album.artists);
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
}
