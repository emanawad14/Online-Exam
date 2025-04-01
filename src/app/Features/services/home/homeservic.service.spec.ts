import { TestBed } from '@angular/core/testing';

import { HomeservicService } from './homeservic.service';

describe('HomeservicService', () => {
  let service: HomeservicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeservicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
