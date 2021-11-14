import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansAboutExpireComponent } from './plans-about-expire.component';

describe('PlansAboutExpireComponent', () => {
  let component: PlansAboutExpireComponent;
  let fixture: ComponentFixture<PlansAboutExpireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlansAboutExpireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlansAboutExpireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
