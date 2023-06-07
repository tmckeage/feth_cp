import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransducerEquipmentLayoutComponent } from './transducer-equipment-layout.component';

describe('TransducerEquipmentLayoutComponent', () => {
  let component: TransducerEquipmentLayoutComponent;
  let fixture: ComponentFixture<TransducerEquipmentLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransducerEquipmentLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransducerEquipmentLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
