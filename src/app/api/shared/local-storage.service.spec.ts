import { TestBed, inject } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService]
    });
  });

  it('should get local storage item', inject([LocalStorageService], (service: LocalStorageService) => {
    const result = service.getItem('bar');
    expect(result).toEqual('foo');
  }));

  it('should remove local storage item', inject([LocalStorageService], (service: LocalStorageService) => {
    const result = service.removeItem('bar');
    expect(result).toBeUndefined();
  }));
});
