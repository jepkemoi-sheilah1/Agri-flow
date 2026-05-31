import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFeed } from './product-feed';

describe('ProductFeed', () => {
  let component: ProductFeed;
  let fixture: ComponentFixture<ProductFeed>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFeed],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFeed);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
