import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanFailureComponent } from './loan-failure.component';

describe('LoanFailureComponent', () => {
  let component: LoanFailureComponent;
  let fixture: ComponentFixture<LoanFailureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanFailureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
