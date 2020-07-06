import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsentRejectComponent } from './consent-reject.component';

describe('ConsentRejectComponent', () => {
  let component: ConsentRejectComponent;
  let fixture: ComponentFixture<ConsentRejectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsentRejectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsentRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
