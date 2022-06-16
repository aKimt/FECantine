import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricedItemComponent } from './priced-item.component';

describe('PricedItemComponent', () => {
  let component: PricedItemComponent;
  let fixture: ComponentFixture<PricedItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricedItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PricedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
