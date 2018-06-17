import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromPlayerStore from '../../player/store';
import { SpotifyAlbumService } from '../../api';
import { UtilsService } from '../../shared';
import { AlbumDetailComponent } from './album-detail.component';
import { album, tracks } from '../../../testing/mock-spotify-album';

class MockActivatedRoute {
  params = Observable.of({ id: 'foo' });
}

describe('AlbumDetailComponent', () => {
  let component: AlbumDetailComponent;
  let fixture: ComponentFixture<AlbumDetailComponent>;
  let mockStore: { dispatch: () => any; select: () => any };
  let mockSpotifyAlbumService: { get: jasmine.Spy; getTracks: jasmine.Spy };
  let mockLocation: { back: jasmine.Spy };

  beforeEach(async(() => {
    mockSpotifyAlbumService = {
      get: jasmine.createSpy('get').and.returnValue(Observable.of(album)),
      getTracks: jasmine
        .createSpy('getTracks')
        .and.returnValue(Observable.of(tracks))
    };

    mockStore = {
      dispatch: jasmine.createSpy('dispatch'),
      select: jasmine.createSpy('select')
    };

    mockLocation = {
      back: jasmine.createSpy('location')
    };

    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: SpotifyAlbumService, useValue: mockSpotifyAlbumService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: Location, useValue: mockLocation },
        UtilsService
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      declarations: [AlbumDetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get album image', async(() => {
    expect(component.albumImage).toEqual(
      'https://i.scdn.co/image/459dbc62a8634b01fe3bbc4bc06d21cbb7b6cfde'
    );
  }));

  it('should get artists as string', async(() => {
    expect(component.artistsJoined).toEqual('Drake, Rihanna');
  }));

  it('should add to queue', async(() => {
    component.addToQueue('foo');
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      new fromPlayerStore.QueueAdd('foo')
    );
  }));

  it('should load more tracks', async(() => {
    mockSpotifyAlbumService.getTracks.calls.reset();
    const params = new HttpParams().set('offset', '1');
    component.getMoreTracks();
    expect(mockSpotifyAlbumService.getTracks).toHaveBeenCalledWith(
      'foo',
      params
    );
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
