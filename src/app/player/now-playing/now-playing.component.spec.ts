import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';

import { DurationPipe } from '../../shared';
import { EventService } from '../../event';
import { NowPlayingComponent } from './now-playing.component';

class MockStore {
  dispatch(action: Action) {}
  select = (selector) => Observable.of(null);
}

class MockEventService {
  messages$ = Observable.of({});
}

describe('NowPlayingComponent', () => {
  let component: NowPlayingComponent;
  let fixture: ComponentFixture<NowPlayingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Store, useClass: MockStore },
        { provide: EventService, useClass: MockEventService }
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
      ],
      declarations: [
        NowPlayingComponent,
        DurationPipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NowPlayingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
