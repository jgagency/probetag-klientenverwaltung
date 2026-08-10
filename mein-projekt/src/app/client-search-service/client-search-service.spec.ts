import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSearchService } from './client-search-service';

describe('ClientSearchService', () => {
  let component: ClientSearchService;
  let fixture: ComponentFixture<ClientSearchService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientSearchService],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientSearchService);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
