import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { UtilsService } from '../shared';
import { HomeComponent } from './home.component';

class MockStore {
  // tslint:disable-next-line:max-line-length
  select = (selector) => Observable.of({'track': {'album': {'id': '85c69d9c-a498-4117-a163-0158b217660d', 'images': [{'url': 'https://i.scdn.co/image/a8573188b124111f25751ad91f9e8c02700f25e2', 'width': 600, 'height': 600}, {'url': 'https://i.scdn.co/image/849ee9f54d49a12b4a45b60a6d310fb1ca8e5b0a', 'width': 300, 'height': 300}, {'url': 'https://i.scdn.co/image/c589044d23c5801aaf82c75d106de0267e3ae75c', 'width': 64, 'height': 64}], 'name': 'The Complete Johnny Kidd Vol 1 & 2', 'uri': 'spotify:album:34pUE4ZtTaXTdvZ5l39OL1'}, 'name': 'Shakin\' All Over', 'uri': 'spotify:track:6Xv160PuntxAtb67Ed4t4I', 'play_count': 0, 'artists': [{'id': 'd92383b4-b883-4c57-b3e3-e5c445ae104d', 'uri': 'spotify:artist:52y1cRHUkI0kQqIXCg6JuZ', 'name': 'Johnny Kidd & The Pirates'}], 'duration': 141960, 'id': '9d724ee4-1722-42c5-8677-2938a6fef84e'}, 'player': {'elapsed_time': 358395, 'elapsed_seconds': 358.395, 'elapsed_percentage': 252.46196111580724}, 'user': {'family_name': 'Mascarin', 'display_name': 'Caroline Mascarin', 'avatar_url': 'https://lh6.googleusercontent.com/-eNT8k07TEpA/AAAAAAAAAAI/AAAAAAAAAAk/7nqrQsHSMrY/photo.jpg', 'spotify_playlists': null, 'given_name': 'Caroline', 'id': '74eb2b07-9fac-4aa5-a616-656ca54661f9'}});
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [
        { provide: Store, useClass: MockStore },
        { provide: UtilsService, useClass: UtilsService }
      ],
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
