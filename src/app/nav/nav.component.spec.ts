import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { OAuthService } from '../auth';
import { NavComponent } from './nav.component';

class MockStore {
  select = (selector) => Observable.of(null);
}

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: Store, useClass: MockStore },
        OAuthService
      ],
      declarations: [ NavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
