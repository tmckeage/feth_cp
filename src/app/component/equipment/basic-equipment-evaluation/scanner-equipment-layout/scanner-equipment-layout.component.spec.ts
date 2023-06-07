import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannerEquipmentLayoutComponent } from './scanner-equipment-layout.component';

describe('ScannerEquipmentLayoutComponent', () => {
  let component: ScannerEquipmentLayoutComponent;
  let fixture: ComponentFixture<ScannerEquipmentLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScannerEquipmentLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScannerEquipmentLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
