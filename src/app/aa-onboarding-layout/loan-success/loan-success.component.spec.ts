import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanSuccessComponent } from './loan-success.component';

describe('LoanSuccessComponent', () => {
  let component: LoanSuccessComponent;
  let fixture: ComponentFixture<LoanSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
