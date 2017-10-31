import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';

import { UtilsService } from '../../shared';
import { AlbumComponent } from './album.component';

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
    // tslint:disable-next-line:max-line-length
    component.item = <any>{id: '85c69d9c-a498-4117-a163-0158b217660d', images: [{url: 'https://i.scdn.co/image/a8573188b124111f25751ad91f9e8c02700f25e2', width: 600, height: 600}, {url: 'https://i.scdn.co/image/849ee9f54d49a12b4a45b60a6d310fb1ca8e5b0a', width: 300, height: 300}, {url: 'https://i.scdn.co/image/c589044d23c5801aaf82c75d106de0267e3ae75c', width: 64, height: 64}], name: 'The Complete Johnny Kidd Vol 1 & 2', uri: 'spotify:album:34pUE4ZtTaXTdvZ5l39OL1'};

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
