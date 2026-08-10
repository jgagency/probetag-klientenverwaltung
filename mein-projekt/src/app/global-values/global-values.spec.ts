import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalValues } from './global-values';

describe('GlobalValues', () => {
  let component: GlobalValues;
  let fixture: ComponentFixture<GlobalValues>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalValues],
    }).compileComponents();

    fixture = TestBed.createComponent(GlobalValues);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
