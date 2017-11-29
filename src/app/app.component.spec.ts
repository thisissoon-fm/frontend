import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';

import { EventService, PlayerEvent } from './event';
import { AppComponent } from './app.component';
import * as fromPlayerStore from './player/store';
import { queueItem } from '../testing/mock-queue-item';
import { CurrentService } from './api';


const mockStore = {
  dispatch: jasmine.createSpy('dispatch'),
  select: jasmine.createSpy('dispatch').and.returnValue(Observable.of(queueItem))
};

class MockEventService {
  messages$ = Observable.of({});
}

const mockCurrentService = {
  get: jasmine.createSpy('get').and.returnValue(Observable.of(queueItem))
};

const mockRouter = {
  navigate: jasmine.createSpy('navigate'),
  events: jasmine.createSpy('events')
};

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;

  beforeEach(async(() => {
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
        // { provide: Router, useValue: mockRouter },
        { provide: Store, useValue: mockStore },
        { provide: EventService, useClass: MockEventService },
        { provide: CurrentService, useValue: mockCurrentService }
      ],
      declarations: [ AppComponent ],
    }).compileComponents();

    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    mockStore.dispatch.calls.reset();
    mockCurrentService.get.calls.reset();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call event handler on socket io events', async(() => {
    let spy = spyOn(component, 'onAdd');
    component.onEvent({ event: 'add' });
    expect(spy).toHaveBeenCalled();

    spy = spyOn(component, 'onEnd');
    component.onEvent({ event: 'end' });
    expect(spy).toHaveBeenCalled();

    spy.calls.reset();
    component.onEvent({ event: 'stop' });
    expect(spy).toHaveBeenCalled();

    spy = spyOn(component, 'onPause');
    component.onEvent({ event: 'pause' });
    expect(spy).toHaveBeenCalled();

    spy = spyOn(component, 'onResume');
    component.onEvent({ event: 'resume' });
    expect(spy).toHaveBeenCalled();

    spy = spyOn(component, 'onPlay');
    component.onEvent({ event: 'play' });
    expect(spy).toHaveBeenCalled();

    spy = spyOn(component, 'onDelete');
    component.onEvent({ event: 'deleted' });
    expect(spy).toHaveBeenCalled();

    spy = spyOn(component, 'onVolumeChanged');
    component.onEvent({ event: 'set_volume' });
    expect(spy).toHaveBeenCalled();

    spy = spyOn(component, 'onMuteChanged');
    component.onEvent({ event: 'set_mute' });
    expect(spy).toHaveBeenCalled();
  }));

  it('should dispatch LoadQueueItem action', async(() => {
    const data: PlayerEvent = { uuid: 'foo', event: 'add' };
    component.onAdd(data);
    expect(mockStore.dispatch).toHaveBeenCalledWith(new fromPlayerStore.LoadQueueItem(data));
  }));

  it('should dispatch QueueRemoveSuccess action', async(() => {
    const data: PlayerEvent = { uuid: 'foo', event: 'deleted' };
    component.onDelete(data);
    expect(mockStore.dispatch).toHaveBeenCalledWith(new fromPlayerStore.QueueRemoveSuccess(data.uuid));
  }));

  it('should dispatch QueueShift and LoadCurrent action', async(() => {
    component.onPlay();
    expect(mockStore.dispatch).toHaveBeenCalledWith(new fromPlayerStore.QueueShift());
    expect(mockStore.dispatch).toHaveBeenCalledWith(new fromPlayerStore.LoadCurrent());
  }));

  it('should dispatch RemoveCurrentSuccess action', async(() => {
    component.onEnd();
    expect(mockStore.dispatch).toHaveBeenCalledWith(new fromPlayerStore.RemoveCurrentSuccess(null));
  }));

  it('should dispatch AddPauseSuccess action', async(() => {
    component.onPause();
    expect(mockStore.dispatch).toHaveBeenCalledWith(new fromPlayerStore.AddPauseSuccess(null));
  }));

  it('should dispatch RemovePauseSuccess action', async(() => {
    component.onResume();
    expect(mockStore.dispatch).toHaveBeenCalledWith(new fromPlayerStore.RemovePauseSuccess(null));
  }));

  it('should dispatch AddMuteSuccess action', async(() => {
    const data: PlayerEvent = { event: 'set_mute', mute: true };
    component.onMuteChanged(data);
    expect(mockStore.dispatch).toHaveBeenCalledWith(new fromPlayerStore.AddMuteSuccess({mute: data.mute}));
  }));

  it('should dispatch RemoveMuteSuccess action', async(() => {
    const data: PlayerEvent = { event: 'set_mute', mute: false };
    component.onMuteChanged(data);
    expect(mockStore.dispatch).toHaveBeenCalledWith(new fromPlayerStore.RemoveMuteSuccess({mute: data.mute}));
  }));

  it('should dispatch SetVolumeSuccess action', async(() => {
    const data: PlayerEvent = { event: 'set_volume', volume: 56 };
    component.onVolumeChanged(data);
    expect(mockStore.dispatch).toHaveBeenCalledWith(new fromPlayerStore.SetVolumeSuccess({ volume: data.volume }));
  }));

  it('should complete and unsubscribe from observable onDestroy', async(() => {
    const spyComplete = spyOn(component.ngUnsubscribe$, 'complete');
    const spyUnsubscribe = spyOn(component.ngUnsubscribe$, 'unsubscribe');
    component.ngOnDestroy();
    expect(spyComplete).toHaveBeenCalled();
    expect(spyUnsubscribe).toHaveBeenCalled();
  }));

  it('should check if player is in sync', async(() => {
    const spy = spyOn(component, 'loadPlayerData');
    spy.calls.reset();
    component.checkPlayerDataInSync();
    expect(spy).not.toHaveBeenCalled();

    mockCurrentService.get.and.returnValue(Observable.of({}));
    component.checkPlayerDataInSync();
    expect(spy).toHaveBeenCalled();
  }));

  it('should close search view', async(() => {
    const spy = spyOn(router, 'navigate');
    component.closeSearch();
    expect(spy).not.toHaveBeenCalled();

    component.isSearchRouterActive = true;
    component.closeSearch();
    expect(spy).toHaveBeenCalled();
  }));

  it('should close artist/album detail view', async(() => {
    const spy = spyOn(router, 'navigate');
    component.closeSearchDetail();
    expect(spy).not.toHaveBeenCalled();

    component.isSearchDetailPage = true;
    component.closeSearchDetail();
    expect(spy).toHaveBeenCalled();
  }));
});
