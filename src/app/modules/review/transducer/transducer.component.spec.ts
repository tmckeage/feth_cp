import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransducerComponent } from './transducer.component';

describe('TransducerComponent', () => {
  let component: TransducerComponent;
  let fixture: ComponentFixture<TransducerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransducerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransducerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
