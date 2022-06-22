import { TestBed } from '@angular/core/testing';

import { PsychopedagogistService } from './psychopedagogist.service';

describe('PsychopedagogistService', () => {
  let service: PsychopedagogistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PsychopedagogistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
