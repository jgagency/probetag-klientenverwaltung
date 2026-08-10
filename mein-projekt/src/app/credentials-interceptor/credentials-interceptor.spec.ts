import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialsInterceptor } from './credentials-interceptor';

describe('CredentialsInterceptor', () => {
  let component: CredentialsInterceptor;
  let fixture: ComponentFixture<CredentialsInterceptor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CredentialsInterceptor],
    }).compileComponents();

    fixture = TestBed.createComponent(CredentialsInterceptor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
