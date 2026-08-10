import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbNavigation } from './breadcrumb-navigation';

describe('BreadcrumbNavigation', () => {
  let component: BreadcrumbNavigation;
  let fixture: ComponentFixture<BreadcrumbNavigation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbNavigation],
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbNavigation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
