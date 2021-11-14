import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedinLayoutComponent } from './loggedin-layout.component';

describe('LoggedinLayoutComponent', () => {
  let component: LoggedinLayoutComponent;
  let fixture: ComponentFixture<LoggedinLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoggedinLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedinLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
