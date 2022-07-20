import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniformityComponent } from './uniformity.component';

describe('UniformityComponent', () => {
  let component: UniformityComponent;
  let fixture: ComponentFixture<UniformityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniformityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UniformityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
