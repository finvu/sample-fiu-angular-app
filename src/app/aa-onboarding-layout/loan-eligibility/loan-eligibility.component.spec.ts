import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanEligibilityComponent } from './loan-eligibility.component';

describe('LoanEligibilityComponent', () => {
  let component: LoanEligibilityComponent;
  let fixture: ComponentFixture<LoanEligibilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanEligibilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanEligibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
