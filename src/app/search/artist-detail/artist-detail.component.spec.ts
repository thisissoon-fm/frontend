import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgbTabsetModule, NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import { of as observableOf } from 'rxjs';
import { Store } from '@ngrx/store';
import { HttpParams } from '@angular/common/http';

import { ArtistDetailComponent } from './artist-detail.component';
import * as fromPlayerStore from '../../player/store';
import { SpotifyArtistService } from '../../api';
import { UtilsService } from '../../shared';
import { artist, albums } from '../../../testing/mock-spotify-artist';
import { search } from '../../../testing/mock-spotify-search';

class MockActivatedRoute {
  params = observableOf({ id: 'foo' });
}

describe('ArtistDetailComponent', () => {
  let component: ArtistDetailComponent;
  let fixture: ComponentFixture<ArtistDetailComponent>;
  let mockStore: { dispatch: () => any; select: () => any };
  let mockSpotifyArtistService: {
    get: jasmine.Spy;
    getTopTracks: jasmine.Spy;
    getAlbums: jasmine.Spy;
    getSingles: jasmine.Spy;
    getRelatedArtists: jasmine.Spy;
  };
  let mockLocation: { back: jasmine.Spy };

  beforeEach(async(() => {
    mockSpotifyArtistService = {
      get: jasmine.createSpy('get').and.returnValue(observableOf(artist)),
      getTopTracks: jasmine
        .createSpy('getTopTracks')
        .and.returnValue(observableOf(search)),
      getAlbums: jasmine
        .createSpy('getAlbums')
        .and.returnValue(observableOf(JSON.parse(JSON.stringify(albums)))),
      getSingles: jasmine
        .createSpy('getSingles')
        .and.returnValue(observableOf(JSON.parse(JSON.stringify(albums)))),
      getRelatedArtists: jasmine
        .createSpy('getRelatedArtists')
        .and.returnValue(observableOf(null))
    };

    mockStore = {
      dispatch: jasmine.createSpy('dispatch'),
      select: jasmine.createSpy('select')
    };

    mockLocation = {
      back: jasmine.createSpy('location')
    };

    TestBed.configureTestingModule({
      imports: [NgbTabsetModule, NoopAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: SpotifyArtistService, useValue: mockSpotifyArtistService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: Location, useValue: mockLocation },
        UtilsService,
        NgbTabsetConfig
      ],
      declarations: [ArtistDetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get artist image', () => {
    expect(component.artistImage).toEqual(
      'https://i.scdn.co/image/cb080366dc8af1fe4dc90c4b9959794794884c66'
    );
  });

  it('should get all albums loaded boolean', () => {
    expect(component.allAlbumsLoaded).toBeFalsy();

    component.albums.items = component.albums.items.concat(Array(27));
    expect(component.allAlbumsLoaded).toBeTruthy();
  });

  it('should get all singles loaded boolean', () => {
    expect(component.allSinglesLoaded).toBeFalsy();

    component.singles.items = component.singles.items.concat(Array(27));
    expect(component.allSinglesLoaded).toBeTruthy();
  });

  it('should load all data on init', async(() => {
    expect(mockSpotifyArtistService.get).toHaveBeenCalledWith('foo');
    expect(mockSpotifyArtistService.getAlbums).toHaveBeenCalledWith('foo');
    expect(mockSpotifyArtistService.getSingles).toHaveBeenCalledWith('foo');
    expect(mockSpotifyArtistService.getTopTracks).toHaveBeenCalledWith('foo');
    expect(mockSpotifyArtistService.getRelatedArtists).toHaveBeenCalledWith(
      'foo'
    );
  }));

  it('should select tab', async(() => {
    const spy = spyOn(component.tabset, 'select');
    component.selectTab('top-tracks');
    expect(component.selectedTab).toEqual('Top tracks');
    expect(spy).toHaveBeenCalledWith('top-tracks');

    component.selectTab('albums');
    expect(component.selectedTab).toEqual('Albums');
    expect(spy).toHaveBeenCalledWith('albums');

    component.selectTab('singles');
    expect(component.selectedTab).toEqual('Singles');
    expect(spy).toHaveBeenCalledWith('singles');

    component.selectTab('related');
    expect(component.selectedTab).toEqual('Related artists');
    expect(spy).toHaveBeenCalledWith('related');
  }));

  it('should get all singles loaded boolean', () => {
    expect(component.allSinglesLoaded).toBeFalsy();

    component.singles.items = component.singles.items.concat(Array(27));
    expect(component.allSinglesLoaded).toBeTruthy();
  });

  it('should add to queue', () => {
    component.addToQueue('foo');
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      new fromPlayerStore.QueueAdd('foo')
    );
  });

  it('should load more albums', async(() => {
    mockSpotifyArtistService.getAlbums.calls.reset();
    const params = new HttpParams().set('offset', '1');
    component.getMoreAlbums();
    expect(mockSpotifyArtistService.getAlbums).toHaveBeenCalledWith(
      'foo',
      params
    );
  }));

  it('should load more singles', async(() => {
    mockSpotifyArtistService.getSingles.calls.reset();
    const params = new HttpParams().set('offset', '1');
    component.getMoreSingles();
    expect(mockSpotifyArtistService.getSingles).toHaveBeenCalledWith(
      'foo',
      params
    );
  }));

  it('should get more albums on scroll end', async(() => {
    mockSpotifyArtistService.getAlbums.calls.reset();
    component.onScrollEnd('albums');
    expect(mockSpotifyArtistService.getAlbums).toHaveBeenCalled();
  }));

  it('should get more singles on scroll end', async(() => {
    mockSpotifyArtistService.getSingles.calls.reset();
    component.onScrollEnd('singles');
    expect(mockSpotifyArtistService.getSingles).toHaveBeenCalled();
  }));

  it('should go to previous page', async(() => {
    component.goBack();
    expect(mockLocation.back).toHaveBeenCalled();
  }));

  it('should update scrolledDown property', async(() => {
    let event: any = { target: { scrollTop: 0 } };
    component.onScroll(event);
    expect(component.scrolledDown).toBeFalsy();

    event = { target: { scrollTop: 100 } };
    component.onScroll(event);
    expect(component.scrolledDown).toBeTruthy();
  }));
});
