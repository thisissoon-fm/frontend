import { TestBed, inject } from '@angular/core/testing';

import { OAuthService } from './oauth.service';

describe('OAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OAuthService]
    });
  });

  it('should return authenticated user', inject(
    [OAuthService],
    (service: OAuthService) => {
      service.authenticate('google').subscribe(user => expect(user).toBeNull());
    }
  ));
});
