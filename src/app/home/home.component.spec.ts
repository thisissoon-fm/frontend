import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { of as observableOf } from 'rxjs';

import * as fromPlayerStore from '../player/store';
import { UtilsService } from '../shared';
import { HomeComponent } from './home.component';
import { queueItem } from '../../testing/mock-queue-item';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockStore: { select: jasmine.Spy };

  beforeEach(async(() => {
    mockStore = {
      select: jasmine
        .createSpy('select')
        .and.returnValues(observableOf(queueItem), observableOf([queueItem]))
    };

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: UtilsService, useClass: UtilsService }
      ],
      declarations: [HomeComponent]
    }).compileComponents();
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
