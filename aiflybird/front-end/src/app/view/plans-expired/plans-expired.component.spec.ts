import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansExpiredComponent } from './plans-expired.component';

describe('PlansExpiredComponent', () => {
  let component: PlansExpiredComponent;
  let fixture: ComponentFixture<PlansExpiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlansExpiredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlansExpiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
