import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessRegister } from './business-register';

describe('BusinessRegister', () => {
  let component: BusinessRegister;
  let fixture: ComponentFixture<BusinessRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessRegister],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessRegister);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
