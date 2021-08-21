import { TestBed } from '@angular/core/testing';

import { CustomAmplifyService } from './custom-amplify.service';

describe('CustomAmplifyService', () => {
  let service: CustomAmplifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomAmplifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
