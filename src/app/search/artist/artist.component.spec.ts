import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';

import { UtilsService } from '../../shared';
import { ArtistComponent } from './artist.component';

describe('ArtistComponent', () => {
  let component: ArtistComponent;
  let fixture: ComponentFixture<ArtistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [ UtilsService ],
      declarations: [ ArtistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistComponent);
    component = fixture.componentInstance;
    // tslint:disable-next-line:max-line-length
    component.item = <any>{id: 'd92383b4-b883-4c57-b3e3-e5c445ae104d', uri: 'spotify:artist:52y1cRHUkI0kQqIXCg6JuZ', 'name': 'Johnny Kidd & The Pirates', images: [{url: 'https://i.scdn.co/image/a8573188b124111f25751ad91f9e8c02700f25e2', width: 600, height: 600}, {url: 'https://i.scdn.co/image/849ee9f54d49a12b4a45b60a6d310fb1ca8e5b0a', width: 300, height: 300}, {url: 'https://i.scdn.co/image/c589044d23c5801aaf82c75d106de0267e3ae75c', width: 64, height: 64}]};
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
