import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessApprovals } from './business-approvals';

describe('BusinessApprovals', () => {
  let component: BusinessApprovals;
  let fixture: ComponentFixture<BusinessApprovals>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessApprovals],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessApprovals);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
