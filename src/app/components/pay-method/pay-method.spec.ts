import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayMethod } from './pay-method';

describe('PayMethod', () => {
  let component: PayMethod;
  let fixture: ComponentFixture<PayMethod>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayMethod],
    }).compileComponents();

    fixture = TestBed.createComponent(PayMethod);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
