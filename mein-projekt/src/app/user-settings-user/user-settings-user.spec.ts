import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSettingsUser } from './user-settings-user';

describe('UserSettingsUser', () => {
  let component: UserSettingsUser;
  let fixture: ComponentFixture<UserSettingsUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSettingsUser],
    }).compileComponents();

    fixture = TestBed.createComponent(UserSettingsUser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
