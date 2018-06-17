import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromPlayerStore from '../player/store';
import * as fromUserStore from '../user/store';
import { SplashComponent } from './splash.component';
import { OAuthService } from '../auth';
import { queueItem } from '../../testing/mock-queue-item';

describe('SplashComponent', () => {
  let component: SplashComponent;
  let fixture: ComponentFixture<SplashComponent>;
  let mockStore: { dispatch: () => jasmine.Spy; select: () => jasmine.Spy };
  let mockRouter: { navigate: () => jasmine.Spy };
  let oauthService: OAuthService;

  beforeEach(async(() => {
    mockStore = {
      dispatch: jasmine.createSpy('dispatch'),
      select: jasmine
        .createSpy('select')
        .and.returnValues(
          Observable.of(true),
          Observable.of(true),
          Observable.of(queueItem.user)
        )
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: Router, useValue: mockRouter },
        OAuthService
      ],
      declarations: [SplashComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    oauthService = TestBed.get(OAuthService);
  });

  it('should subscribe to store data', async(() => {
    expect(mockStore.select).toHaveBeenCalledWith(
      fromUserStore.getUserAuthenticated
    );
    expect(mockStore.select).toHaveBeenCalledWith(
      fromPlayerStore.getLoadedState
    );
  }));

  it('should request authentication', async(() => {
    const spy = spyOn(oauthService, 'authenticate').and.callThrough();
    component.login();
    expect(spy).toHaveBeenCalledWith('google');
  }));

  it('should complete and unsubscribe from observable onDestroy', async(() => {
    const spyComplete = spyOn(component.ngUnsubscribe$, 'complete');
    const spyUnsubscribe = spyOn(component.ngUnsubscribe$, 'unsubscribe');
    component.ngOnDestroy();
    expect(spyComplete).toHaveBeenCalled();
    expect(spyUnsubscribe).toHaveBeenCalled();
  }));
});
