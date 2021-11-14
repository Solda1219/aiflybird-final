import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessContactsComponent } from './business-contacts.component';

describe('BusinessContactsComponent', () => {
  let component: BusinessContactsComponent;
  let fixture: ComponentFixture<BusinessContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessContactsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
