import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromPlayerStore from '../../player/store';
import { StatsComponent } from './stats.component';
import { queueItem } from '../../../testing/mock-queue-item';

describe('StatsComponent', () => {
  let component: StatsComponent;
  let fixture: ComponentFixture<StatsComponent>;
  let mockStore: { dispatch: () => any; select: () => any };

  beforeEach(async(() => {
    mockStore = {
      dispatch: jasmine.createSpy('dispatch'),
      select: jasmine
        .createSpy('select')
        .and.returnValue(Observable.of(queueItem))
    };

    TestBed.configureTestingModule({
      providers: [{ provide: Store, useValue: mockStore }],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      declarations: [StatsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get stats data from store', async(() => {
    expect(mockStore.select).toHaveBeenCalledWith(fromPlayerStore.getStats);
  }));
});
