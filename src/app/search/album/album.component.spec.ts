import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';

import { UtilsService } from '../../shared';
import { AlbumComponent } from './album.component';
import { album } from '../../../testing/mock-spotify-album';

describe('AlbumComponent', () => {
  let component: AlbumComponent;
  let fixture: ComponentFixture<AlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [ UtilsService ],
      declarations: [ AlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumComponent);
    component = fixture.componentInstance;
    component.item = <any>album;
    fixture.detectChanges();
  });

  it('should get artist as a string', () => {
    expect(component.artistsJoined).toEqual('Drake, Rihanna');
  });

  it('should get optimal image', () => {
    expect(component.optimalImage).toEqual('https://i.scdn.co/image/459dbc62a8634b01fe3bbc4bc06d21cbb7b6cfde');
  });
});
