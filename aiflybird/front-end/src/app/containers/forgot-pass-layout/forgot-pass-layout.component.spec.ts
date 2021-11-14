import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPassLayoutComponent } from './forgot-pass-layout.component';

describe('ForgotPassLayoutComponent', () => {
  let component: ForgotPassLayoutComponent;
  let fixture: ComponentFixture<ForgotPassLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPassLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPassLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
