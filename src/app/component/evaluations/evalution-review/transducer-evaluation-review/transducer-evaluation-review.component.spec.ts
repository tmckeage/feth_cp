import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransducerEvaluationReviewComponent } from './transducer-evaluation-review.component';

describe('TransducerEvaluationReviewComponent', () => {
  let component: TransducerEvaluationReviewComponent;
  let fixture: ComponentFixture<TransducerEvaluationReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransducerEvaluationReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransducerEvaluationReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
