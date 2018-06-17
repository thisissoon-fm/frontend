import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { VolumeEffects } from './volume.effect';
import * as actions from '../actions/volume.action';
import { VolumeService } from '../../../api';

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

describe('volumeEffects', () => {
  let effects: VolumeEffects;
  let actions$: TestActions;
  let testBed: typeof TestBed;
  let mockVolumeService;
  let volume;

  beforeEach(() => {
    volume = { volume: 50 };

    mockVolumeService = {
      get: jasmine.createSpy('get').and.returnValue(of({ volume: 50 })),
      post: jasmine.createSpy('post').and.returnValue(of({ volume: 70 }))
    };

    testBed = TestBed.configureTestingModule({
      providers: [
        VolumeEffects,
        { provide: Actions, useFactory: getActions },
        { provide: VolumeService, useFactory: () => mockVolumeService }
      ]
    });

    effects = testBed.get(VolumeEffects);
    actions$ = testBed.get(Actions);
  });

  describe('loadVolume$', () => {
    it('should return a volumeAction.LoadVolumeSuccess, with volume, on success', () => {
      const action = new actions.LoadVolume();
      const completion = new actions.LoadVolumeSuccess(volume);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-a|', { a: volume });
      const expected = cold('--b', { b: completion });
      mockVolumeService.get.and.callFake(() => response);

      expect(effects.loadVolume$).toBeObservable(expected);
    });

    it('should return a volumeAction.LoadvolumeFail, with error, on fail', () => {
      const action = new actions.LoadVolume();
      const error = { status: 500 };
      const completion = new actions.LoadVolumeFail(error);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      mockVolumeService.get.and.callFake(() => response);

      expect(effects.loadVolume$).toBeObservable(expected);
    });
  });

  describe('setVolume$', () => {
    it('should return a volumeAction.SetVolumeSuccess, with volume, on success', () => {
      const action = new actions.SetVolume({ volume: 70 });
      const completion = new actions.SetVolumeSuccess({ volume: 70 });

      actions$.stream = hot('-a', { a: action });
      const response = cold('-a|', { a: { volume: 70 } });
      const expected = cold('--b', { b: completion });
      mockVolumeService.post.and.callFake(() => response);

      expect(effects.setVolume$).toBeObservable(expected);
      expect(mockVolumeService.post).toHaveBeenCalled();
    });

    it('should return a volumeAction.SetvolumeFail, with error, on fail', () => {
      const action = new actions.SetVolume({ volume: 70 });
      const error = { status: 500 };
      const completion = new actions.SetVolumeFail(error);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      mockVolumeService.post.and.callFake(() => response);

      expect(effects.setVolume$).toBeObservable(expected);
      expect(mockVolumeService.post).toHaveBeenCalled();
    });
  });
});
