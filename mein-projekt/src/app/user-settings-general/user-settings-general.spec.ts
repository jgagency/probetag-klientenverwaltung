import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSettingsGeneral } from './user-settings-general';

describe('UserSettingsGeneral', () => {
  let component: UserSettingsGeneral;
  let fixture: ComponentFixture<UserSettingsGeneral>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSettingsGeneral],
    }).compileComponents();

    fixture = TestBed.createComponent(UserSettingsGeneral);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
