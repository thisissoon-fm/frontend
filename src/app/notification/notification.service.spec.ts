import { TestBed, inject } from '@angular/core/testing';

import { NotificationService } from './notification.service';

function MockNotification() {
  this.permission = 'default';
  this.requestPermission = (callback: Function) => callback();
}

describe('NotificationService', () => {
  const notification = new MockNotification();
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationService]
    });
  });

  it('should get permission status', inject(
    [NotificationService],
    (service: NotificationService) => {
      service.nativeNotification = notification;
      const result = service.permission;
      expect(result).toEqual('default');
    }
  ));

  it('should request notification permission', inject(
    [NotificationService],
    (service: NotificationService) => {
      service.nativeNotification = notification;
      const spy = spyOn(notification, 'requestPermission');
      service.requestPermission();
      expect(spy).toHaveBeenCalled();
    }
  ));

  it('should send notification', inject(
    [NotificationService],
    (service: NotificationService) => {
      service.nativeNotification = jasmine.createSpy('nativeNotification');
      service.nativeNotification.permission = 'default';
      service.nativeNotification.requestPermission = (cb: Function) => cb();
      service.push('foo');
      expect(service.nativeNotification).toHaveBeenCalled();
    }
  ));

  it('should send notification', inject(
    [NotificationService],
    (service: NotificationService) => {
      service.nativeNotification = jasmine.createSpy('nativeNotification');
      service.nativeNotification.permission = 'granted';
      service.push('foo');
      expect(service.nativeNotification).toHaveBeenCalled();
    }
  ));
});
