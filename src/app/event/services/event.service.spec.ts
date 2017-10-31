import { TestBed, inject } from '@angular/core/testing';

import { EventService } from './event.service';
import { SocketIOService } from '../shared';

describe('EventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EventService,
        SocketIOService
      ]
    });
  });

  it('should be created', inject([EventService], (service: EventService) => {
    expect(service).toBeTruthy();
  }));
});
