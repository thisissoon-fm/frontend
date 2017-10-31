import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgbTabsetModule, NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';

import { ArtistDetailComponent } from './artist-detail.component';
import { SpotifyArtistService } from '../../api';
import { UtilsService } from '../../shared';

class MockStore {
  dispatch(action: Action) {}
  select = (selector) => Observable.of(null);
}

class MockSpotifyArtistService {
  get = () => Observable.of(null);
  getAlbums = () => Observable.of(null);
  getSingles = () => Observable.of(null);
  getTopTracks = () => Observable.of(null);
  getRelatedArtists = () => Observable.of(null);
}

class MockActivatedRoute {
  params = Observable.of({});
}

class MockLocation {
  back() {}
}

describe('ArtistDetailComponent', () => {
  let component: ArtistDetailComponent;
  let fixture: ComponentFixture<ArtistDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbTabsetModule,
        NoopAnimationsModule
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [
        { provide: Store, useClass: MockStore },
        { provide: SpotifyArtistService, useClass: MockSpotifyArtistService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: Location, useClass: MockLocation },
        UtilsService,
        NgbTabsetConfig
      ],
      declarations: [ ArtistDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
