import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSettingsSafety } from './user-settings-safety';

describe('UserSettingsSafety', () => {
  let component: UserSettingsSafety;
  let fixture: ComponentFixture<UserSettingsSafety>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSettingsSafety],
    }).compileComponents();

    fixture = TestBed.createComponent(UserSettingsSafety);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
