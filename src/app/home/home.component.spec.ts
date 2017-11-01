import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromPlayerStore from '../player/store';
import { UtilsService } from '../shared';
import { HomeComponent } from './home.component';
import { queueItem } from '../../testing/mock-queue-item';

const mockStore = {
  select: jasmine.createSpy('select')
    .and.returnValues(
      Observable.of(queueItem),
      Observable.of([queueItem]),
    )
};

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
        { provide: Store, useValue: mockStore },
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

  it('should get current and queue data from store', () => {
    component.ngOnInit();
    expect(mockStore.select).toHaveBeenCalledWith(fromPlayerStore.getCurrent);
    expect(mockStore.select).toHaveBeenCalledWith(fromPlayerStore.getQueue);
  });
});
