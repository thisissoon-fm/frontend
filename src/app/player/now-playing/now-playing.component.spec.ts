import {
  async,
  fakeAsync,
  tick,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromStore from '../store';
import { DurationPipe } from '../../shared';
import { EventService } from '../../event';
import { NowPlayingComponent } from './now-playing.component';
import { queueItem } from '../../../testing/mock-queue-item';
import { queueMeta } from '../../../testing/mock-queue-meta';

class MockEventService {
  messages$ = Observable.of({});
}

describe('NowPlayingComponent', () => {
  let component: NowPlayingComponent;
  let fixture: ComponentFixture<NowPlayingComponent>;
  let mockStore: { dispatch: () => any; select: () => any };

  beforeEach(async(() => {
    mockStore = {
      dispatch: jasmine.createSpy('dispatch'),
      select: jasmine
        .createSpy('select')
        .and.returnValues(
          Observable.of(Object.assign({}, queueItem, { paused: false })),
          Observable.of({ volume: 50 }),
          Observable.of({ mute: false }),
          Observable.of(queueMeta)
        )
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: EventService, useClass: MockEventService }
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      declarations: [NowPlayingComponent, DurationPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NowPlayingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should subscribe to store data', () => {
    expect(mockStore.select).toHaveBeenCalledWith(fromStore.getCurrent);
    expect(mockStore.select).toHaveBeenCalledWith(fromStore.getVolume);
    expect(mockStore.select).toHaveBeenCalledWith(fromStore.getMute);
    expect(mockStore.select).toHaveBeenCalledWith(fromStore.getQueueMeta);
  });

  it('should set volume on input change', () => {
    const event: any = { target: { value: 60 } };
    component.onVolumeInputChange(event);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      new fromStore.SetVolumeSuccess({ volume: 60 })
    );
  });

  it('should toggle pause', () => {
    component.togglePause();
    expect(mockStore.dispatch).toHaveBeenCalledWith(new fromStore.AddPause());

    component.current$ = Observable.of(
      Object.assign({}, queueItem, { paused: true })
    );
    component.togglePause();
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      new fromStore.RemovePause()
    );
  });

  it('should toggle mute', () => {
    component.toggleMute();
    expect(mockStore.dispatch).toHaveBeenCalledWith(new fromStore.AddMute());

    component.mute$ = Observable.of({ mute: true });
    component.toggleMute();
    expect(mockStore.dispatch).toHaveBeenCalledWith(new fromStore.RemoveMute());
  });

  it('should skip track', () => {
    component.skip();
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      new fromStore.RemoveCurrent()
    );
  });

  it('should call event handlers on events', () => {
    let spy = spyOn(component, 'startTimer');
    component.onEvent({ event: 'play' });
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
  });

  it('should stop timer on end', () => {
    const spy = spyOn(component, 'stopTimer');
    component.onEnd();
    expect(spy).toHaveBeenCalled();
  });

  it('should stop timer on pause', () => {
    const spy = spyOn(component, 'stopTimer');
    component.onPause();
    expect(spy).toHaveBeenCalled();
  });

  it('should start timer on resume', () => {
    const spy = spyOn(component, 'startTimer');
    component.onResume();
    expect(spy).toHaveBeenCalled();
  });

  it(
    'should start timer',
    fakeAsync(() => {
      const spy = spyOn(component, 'stopTimer');
      component.startTimer();
      tick(1000);
      expect(mockStore.dispatch).toHaveBeenCalledWith(
        new fromStore.TimerIncrement()
      );
      component.current$.subscribe(current => {
        current.player.elapsed_time = 141960;
        tick(1000);
        expect(spy).toHaveBeenCalled();
        component.currentTimerSub$.unsubscribe();
        tick(141960);
      });
    })
  );

  it('should complete and unsubscribe from observable onDestroy', () => {
    const spyComplete = spyOn(component.ngUnsubscribe$, 'complete');
    const spyUnsubscribe = spyOn(component.ngUnsubscribe$, 'unsubscribe');
    component.ngOnDestroy();
    expect(spyComplete).toHaveBeenCalled();
    expect(spyUnsubscribe).toHaveBeenCalled();
  });
});
