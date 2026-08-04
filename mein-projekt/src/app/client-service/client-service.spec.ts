import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientService } from './client-service';

describe('ClientService', () => {
  let component: ClientService;
  let fixture: ComponentFixture<ClientService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientService],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientService);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
