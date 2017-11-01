import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';

import * as fromSearchStore from '../store';
import * as fromSharedStore from '../../shared/store';
import * as fromPlayerStore from '../../player/store';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let mockStore: { dispatch: () => any, select: () => any };

  beforeEach(async(() => {
    mockStore = {
      dispatch: jasmine.createSpy('dispatch'),
      select: jasmine.createSpy('select').and.returnValues(
        Observable.of({
          loaded: false,
          loading: false,
          results: [],
          type: 'track',
          pagination: { totalCount: 0, totalPages: 1, currentPage: 1 },
          query: null
        }),
        Observable.of(true),
        Observable.of(true)
      )
    };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NoopAnimationsModule
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [
        { provide: Store, useValue: mockStore }
      ],
      declarations: [ SearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should push next value of searchChange observable', async(() => {
    const event: any = { target: { value: 'foo' } };
    const spy = spyOn(component.onSearchChange$, 'next');
    component.onSearchInputChange(event);
    expect(spy).toHaveBeenCalledWith('foo');
  }));

  it('should load search results', async(() => {
    component.loadSearchResults();
    expect(mockStore.dispatch).toHaveBeenCalledWith(new fromSearchStore.LoadSearchResults());
  }));

  it('should set search query', async(() => {
    component.setSearchQuery('foo');
    expect(mockStore.dispatch).toHaveBeenCalledWith(new fromSearchStore.SetSearchQuery('foo'));
  }));

  it('should set search type', async(() => {
    component.setSearchType('track');
    expect(mockStore.dispatch).toHaveBeenCalledWith(new fromSearchStore.SetSearchType('track'));
  }));

  it('should add to queue', async(() => {
    component.addToQueue('foo');
    expect(mockStore.dispatch).toHaveBeenCalledWith(new fromPlayerStore.QueueAdd('foo'));
  }));

  it('should clear search', async(() => {
    component.close();
    expect(mockStore.dispatch).toHaveBeenCalledWith(new fromSearchStore.ClearSearch());
  }));

  it('should load next page of results', async(() => {
    component.onScrollEnd();
    expect(mockStore.dispatch).toHaveBeenCalledWith(new fromSearchStore.LoadSearchResultsNextPage());
  }));

  it('should complete and unsubscribe from observable onDestroy', async(() => {
    const spyComplete = spyOn(component.ngUnsubscribe$, 'complete');
    const spyUnsubscribe = spyOn(component.ngUnsubscribe$, 'unsubscribe');
    component.ngOnDestroy();
    expect(spyComplete).toHaveBeenCalled();
    expect(spyUnsubscribe).toHaveBeenCalled();
  }));

  it('should set search query on search changes', fakeAsync(() => {
    const spy = spyOn(component, 'setSearchQuery');
    component.onSearchChange$.next('foo');
    tick(100);
    expect(spy).toHaveBeenCalled();
  }));
});
