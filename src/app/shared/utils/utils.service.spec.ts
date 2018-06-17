import { TestBed, inject } from '@angular/core/testing';
import { queueItem } from '../../../testing/mock-queue-item';
import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilsService]
    });
  });

  it('should get optimal image', inject(
    [UtilsService],
    (service: UtilsService) => {
      const result = service.getOptimalImage(queueItem.track.album.images, 0);
      expect(result).toEqual(
        'https://i.scdn.co/image/a8573188b124111f25751ad91f9e8c02700f25e2'
      );
    }
  ));

  it('should get optimal image', inject(
    [UtilsService],
    (service: UtilsService) => {
      const result = service.getOptimalImage(queueItem.track.album.images, 1);
      expect(result).toEqual(
        'https://i.scdn.co/image/849ee9f54d49a12b4a45b60a6d310fb1ca8e5b0a'
      );
    }
  ));

  it('should get optimal image', inject(
    [UtilsService],
    (service: UtilsService) => {
      const result = service.getOptimalImage(queueItem.track.album.images, 5);
      expect(result).toEqual(
        'https://i.scdn.co/image/c589044d23c5801aaf82c75d106de0267e3ae75c'
      );
    }
  ));
});
