/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MemberDetailService } from './member-detail.service';

describe('MemberDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemberDetailService]
    });
  });

  it('should ...', inject([MemberDetailService], (service: MemberDetailService) => {
    expect(service).toBeTruthy();
  }));
});
