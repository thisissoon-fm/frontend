import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { of as observableOf } from 'rxjs';

import { OAuthService } from '../auth';
import { NavComponent } from './nav.component';

class MockStore {
  select = selector => observableOf(null);
  dispatch = action => {};
}

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let oauthService: OAuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [{ provide: Store, useClass: MockStore }, OAuthService],
      declarations: [NavComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    oauthService = TestBed.get(OAuthService);
  });

  it('should request authentication', async(() => {
    const spy = spyOn(oauthService, 'authenticate').and.callThrough();
    component.login();
    expect(spy).toHaveBeenCalledWith('google');
  }));
});
