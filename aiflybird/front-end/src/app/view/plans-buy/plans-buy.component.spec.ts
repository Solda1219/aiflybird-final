import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansBuyComponent } from './plans-buy.component';

describe('PlansBuyComponent', () => {
  let component: PlansBuyComponent;
  let fixture: ComponentFixture<PlansBuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlansBuyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlansBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
