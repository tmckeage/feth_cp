import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalutionReviewComponent } from './evalution-review.component';

describe('EvalutionReviewComponent', () => {
  let component: EvalutionReviewComponent;
  let fixture: ComponentFixture<EvalutionReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvalutionReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvalutionReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
