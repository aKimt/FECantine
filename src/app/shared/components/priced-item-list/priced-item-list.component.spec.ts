import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricedItemListComponent } from './priced-item-list.component';

describe('PricedItemListComponent', () => {
  let component: PricedItemListComponent;
  let fixture: ComponentFixture<PricedItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricedItemListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PricedItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
