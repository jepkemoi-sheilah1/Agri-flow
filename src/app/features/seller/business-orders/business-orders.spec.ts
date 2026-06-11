import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessOrders } from './business-orders';

describe('BusinessOrders', () => {
  let component: BusinessOrders;
  let fixture: ComponentFixture<BusinessOrders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessOrders],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessOrders);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
