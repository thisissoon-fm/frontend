import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';

import { DurationPipe, UtilsService } from '../../shared';
import { TrackComponent } from './track.component';

describe('TrackComponent', () => {
  let component: TrackComponent;
  let fixture: ComponentFixture<TrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        UtilsService
      ],
      declarations: [
        TrackComponent,
        DurationPipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackComponent);
    component = fixture.componentInstance;
    // tslint:disable-next-line:max-line-length
    component.item = <any>{'album': {'album_type': 'single', 'name': 'Signs', 'external_urls': {'spotify': 'https://open.spotify.com/album/3uEKk8SgHg0xogR2iRKjrK'}, 'uri': 'spotify:album:3uEKk8SgHg0xogR2iRKjrK', 'href': 'https://api.spotify.com/v1/albums/3uEKk8SgHg0xogR2iRKjrK', 'artists': [{'name': 'Drake', 'external_urls': {'spotify': 'https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4'}, 'uri': 'spotify:artist:3TVXtAsR1Inumwj472S9r4', 'href': 'https://api.spotify.com/v1/artists/3TVXtAsR1Inumwj472S9r4', 'type': 'artist', 'id': '3TVXtAsR1Inumwj472S9r4'}], 'images': [{'url': 'https://i.scdn.co/image/87862f13aaa41c7621b3f2c3c8f8bb6e9e7ccd6f', 'width': 640, 'height': 640}, {'url': 'https://i.scdn.co/image/418198f7ac5a53eb7558dea93d5da83c14aa278c', 'width': 300, 'height': 300}, {'url': 'https://i.scdn.co/image/f1b7c4b2a91e83c7a1643c1739a93f4c9e5e04d6', 'width': 64, 'height': 64}], 'type': 'album', 'id': '3uEKk8SgHg0xogR2iRKjrK', 'available_markets': ['AD', 'AR', 'AT', 'AU', 'BE', 'BG', 'BO', 'BR', 'CH', 'CL', 'CO', 'CR', 'CY', 'CZ', 'DE', 'DK', 'DO', 'EC', 'EE', 'ES', 'FI', 'FR', 'GB', 'GR', 'GT', 'HK', 'HN', 'HU', 'ID', 'IE', 'IS', 'IT', 'JP', 'LI', 'LT', 'LU', 'LV', 'MC', 'MT', 'MY', 'NI', 'NL', 'NO', 'NZ', 'PA', 'PE', 'PH', 'PL', 'PT', 'PY', 'SE', 'SG', 'SK', 'SV', 'TH', 'TR', 'TW', 'UY', 'VN']}, 'name': 'Signs', 'uri': 'spotify:track:5EnYT6F7wEcdege6mDHEfO', 'external_urls': {'spotify': 'https://open.spotify.com/track/5EnYT6F7wEcdege6mDHEfO'}, 'popularity': 81, 'explicit': false, 'preview_url': null, 'track_number': 1, 'disc_number': 1, 'href': 'https://api.spotify.com/v1/tracks/5EnYT6F7wEcdege6mDHEfO', 'artists': [{'name': 'Drake', 'external_urls': {'spotify': 'https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4'}, 'uri': 'spotify:artist:3TVXtAsR1Inumwj472S9r4', 'href': 'https://api.spotify.com/v1/artists/3TVXtAsR1Inumwj472S9r4', 'type': 'artist', 'id': '3TVXtAsR1Inumwj472S9r4'}], 'duration_ms': 234373, 'external_ids': {'isrc': 'USCM51700269'}, 'type': 'track', 'id': '5EnYT6F7wEcdege6mDHEfO', 'available_markets': ['AD', 'AR', 'AT', 'AU', 'BE', 'BG', 'BO', 'BR', 'CH', 'CL', 'CO', 'CR', 'CY', 'CZ', 'DE', 'DK', 'DO', 'EC', 'EE', 'ES', 'FI', 'FR', 'GB', 'GR', 'GT', 'HK', 'HN', 'HU', 'ID', 'IE', 'IS', 'IT', 'JP', 'LI', 'LT', 'LU', 'LV', 'MC', 'MT', 'MY', 'NI', 'NL', 'NO', 'NZ', 'PA', 'PE', 'PH', 'PL', 'PT', 'PY', 'SE', 'SG', 'SK', 'SV', 'TH', 'TR', 'TW', 'UY', 'VN']};
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
