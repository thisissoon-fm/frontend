import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { UtilsService } from '../../shared';
import { ArtistComponent } from './artist.component';
import { artist } from '../../../testing/mock-spotify-artist';

describe('ArtistComponent', () => {
  let component: ArtistComponent;
  let fixture: ComponentFixture<ArtistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [UtilsService],
      declarations: [ArtistComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistComponent);
    component = fixture.componentInstance;
    component.item = <any>artist;
    fixture.detectChanges();
  });

  it('should get optimal image', () => {
    expect(component.optimalImage).toEqual(
      'https://i.scdn.co/image/cb080366dc8af1fe4dc90c4b9959794794884c66'
    );
  });
});
