import { TestBed, inject } from '@angular/core/testing';

import { EventService } from './event.service';
import { SocketIOService, events } from '../shared';

describe('EventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventService, SocketIOService]
    });
  });

  it('should attach event handler to socket events', inject(
    [EventService],
    (service: EventService) => {
      const spy = spyOn(service.socket, 'on');
      service.onConnect();
      expect(spy).toHaveBeenCalledTimes(events.length);
    }
  ));
});
