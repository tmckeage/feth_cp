import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalDistanceComponent } from './vertical-distance.component';

describe('VerticalDistanceComponent', () => {
  let component: VerticalDistanceComponent;
  let fixture: ComponentFixture<VerticalDistanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerticalDistanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalDistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
