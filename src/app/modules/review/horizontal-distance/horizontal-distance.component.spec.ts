import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalDistanceComponent } from './horizontal-distance.component';

describe('HorizontalDistanceComponent', () => {
  let component: HorizontalDistanceComponent;
  let fixture: ComponentFixture<HorizontalDistanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorizontalDistanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalDistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
