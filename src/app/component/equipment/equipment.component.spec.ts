
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipmentComponent } from './equipment.component';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';

describe('EquipmentComponent', () => {
  let component: EquipmentComponent;
  let fixture: ComponentFixture<EquipmentComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EquipmentComponent],
      imports: [ToastrModule.forRoot(),RouterTestingModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component.closeResult).toBe('');
  });
});