import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromPlayerStore from '../../player/store';
import { UtilsService } from '../../shared';
import { QueueItemComponent } from './queue-item.component';
import { queueItem } from '../../../testing/mock-queue-item';

describe('QueueItemComponent', () => {
  let component: QueueItemComponent;
  let fixture: ComponentFixture<QueueItemComponent>;
  let mockStore: { dispatch: () => any; select: () => any };

  beforeEach(async(() => {
    mockStore = {
      dispatch: jasmine.createSpy('dispatch'),
      select: jasmine
        .createSpy('select')
        .and.returnValue(Observable.of(queueItem.user))
    };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: Store, useValue: mockStore }, UtilsService],
      declarations: [QueueItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueueItemComponent);
    component = fixture.componentInstance;
    component.item = queueItem;
    fixture.detectChanges();
  });

  it('should get artist uri', () => {
    const result = component.getArtistUri(queueItem.track.artists[0]);
    expect(result).toEqual('52y1cRHUkI0kQqIXCg6JuZ');
  });

  it('should delete track from queue', () => {
    component.delete();
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      new fromPlayerStore.QueueRemove('4753dfdf-3653-ab54-6fbb-475aabc43221')
    );
  });

  it('should get album uri', () => {
    expect(component.albumUri).toEqual('34pUE4ZtTaXTdvZ5l39OL1');
  });

  it('should get artist joined', () => {
    expect(component.artistsJoined).toEqual(
      'Johnny Kidd & The Pirates, Another Guy'
    );
  });
});
