import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicEquipmentEvaluationComponent } from './basic-equipment-evaluation.component';

describe('BasicEquipmentEvaluationComponent', () => {
  let component: BasicEquipmentEvaluationComponent;
  let fixture: ComponentFixture<BasicEquipmentEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicEquipmentEvaluationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicEquipmentEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
