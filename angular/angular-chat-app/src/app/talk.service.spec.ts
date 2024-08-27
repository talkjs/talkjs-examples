import { TestBed } from '@angular/core/testing';

import { TalkService } from './talk.service';

describe('TalkService', () => {
  let service: TalkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TalkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
