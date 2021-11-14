import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansAllComponent } from './plans-all.component';

describe('PlansAllComponent', () => {
  let component: PlansAllComponent;
  let fixture: ComponentFixture<PlansAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlansAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlansAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
