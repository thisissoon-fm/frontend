import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';

import { SpotifyAlbumService } from '../../api';
import { UtilsService } from '../../shared';
import { AlbumDetailComponent } from './album-detail.component';

class MockStore {
  dispatch(action: Action) {}
  select = (selector) => Observable.of(null);
}

class MockSpotifyAlbumService {
  get = () => Observable.of(null);
  getTracks = () => Observable.of({ items: [] });
}

class MockActivatedRoute {
  params = Observable.of({});
}

class MockLocation {
  back() {}
}

describe('AlbumDetailComponent', () => {
  let component: AlbumDetailComponent;
  let fixture: ComponentFixture<AlbumDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      providers: [
        { provide: Store, useClass: MockStore },
        { provide: SpotifyAlbumService, useClass: MockSpotifyAlbumService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: Location, useClass: MockLocation },
        UtilsService
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
      ],
      declarations: [ AlbumDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
