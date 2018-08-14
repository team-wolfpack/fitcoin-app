/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
//import { By } from '@angular/platform-browser';
//import { DebugElement } from '@angular/core';
import 'jasmine';

import { RedeemFitcoinsFormComponent } from './redeem-fitcoins-form.component';

describe('RedeemFitcoinsFormComponent', () => {
  let component: RedeemFitcoinsFormComponent;
  let fixture: ComponentFixture<RedeemFitcoinsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedeemFitcoinsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedeemFitcoinsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
