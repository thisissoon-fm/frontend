import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromPlayerStore from '../store';
import { QueueComponent } from './queue.component';
import { queueItem } from '../../../testing/mock-queue-item';

describe('QueueComponent', () => {
  let component: QueueComponent;
  let fixture: ComponentFixture<QueueComponent>;
  let mockStore: { dispatch: () => any; select: () => any };

  beforeEach(async(() => {
    mockStore = {
      dispatch: jasmine.createSpy('dispatch'),
      select: jasmine
        .createSpy('select')
        .and.returnValues(
          Observable.of([queueItem]),
          Observable.of(false),
          Observable.of({ totalCount: 1, totalPages: 1, currentPage: 1 })
        )
    };

    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: Store, useValue: mockStore }],
      declarations: [QueueComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get queue data from store', async(() => {
    expect(mockStore.select).toHaveBeenCalledWith(fromPlayerStore.getQueue);
    expect(mockStore.select).toHaveBeenCalledWith(
      fromPlayerStore.getQueueLoading
    );
    expect(mockStore.select).toHaveBeenCalledWith(
      fromPlayerStore.getQueuePagination
    );
  }));

  it('should load next page of data on scroll end', async(() => {
    component.onScrollEnd();
    fixture.detectChanges();
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      new fromPlayerStore.LoadNextQueuePage()
    );
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      new fromPlayerStore.LoadQueueMeta()
    );
  }));
});
