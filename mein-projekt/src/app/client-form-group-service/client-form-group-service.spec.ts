import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFormGroupService } from './client-form-group-service';

describe('ClientFormGroupService', () => {
  let component: ClientFormGroupService;
  let fixture: ComponentFixture<ClientFormGroupService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientFormGroupService],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientFormGroupService);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
