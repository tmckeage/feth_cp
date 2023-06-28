import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannerEvaluationReviewComponent } from './scanner-evaluation-review.component';

describe('ScannerEvaluationReviewComponent', () => {
  let component: ScannerEvaluationReviewComponent;
  let fixture: ComponentFixture<ScannerEvaluationReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScannerEvaluationReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScannerEvaluationReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
