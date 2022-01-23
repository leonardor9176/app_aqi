import { TestBed } from '@angular/core/testing';

import { GetAqiService } from './get-aqi.service';

describe('GetAqiService', () => {
  let service: GetAqiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAqiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
