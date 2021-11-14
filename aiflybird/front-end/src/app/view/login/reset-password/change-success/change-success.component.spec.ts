import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeSuccessComponent } from './change-success.component';

describe('ChangeSuccessComponent', () => {
  let component: ChangeSuccessComponent;
  let fixture: ComponentFixture<ChangeSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
