import {Component, inject, computed, signal} from '@angular/core';
import {DatePipe, SlicePipe} from '@angular/common';
import {RouterLink, ActivatedRoute} from '@angular/router';
import {CreateClient} from '../create-client/create-client';
import {ClientFormGroupService} from '../client-form-group-service/client-form-group-service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import {FormsModule} from '@angular/forms';
import {CollapseDirective} from 'ngx-bootstrap/collapse';
import {ClientSearch} from '../client-search/client-search';
import {ClientSearchService} from '../client-search-service/client-search-service';
import {GlobalValues} from '../global-values/global-values';

@Component({
  selector: 'app-clients',
  imports: [SlicePipe, RouterLink, CreateClient, PaginationModule, FormsModule, CollapseDirective, ClientSearch, DatePipe],
  templateUrl: './clients.html',
  styleUrl: './clients.css',
})
export class Clients {

  constructor(private activatedRoute: ActivatedRoute, private clientFormGroupService: ClientFormGroupService) {}

  private clientSearchService = inject(ClientSearchService);
  private globalValues = inject(GlobalValues);

  showBoundaryLinks = true;

  isCollapsed = true;

  visibleClients = computed(() =>
    this.sortedClients().slice(this.startNumber(), this.startNumber()+5)
  )

  currentPage = signal(1);

  ngOnInit(): void {
    this.clientFormGroupService.reset();
    let id= Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.visibleClientArea(id);
    this.globalValues.pageName.set("Klienten");
  }

  startNumber = signal(0);

  public visibleClientArea(area: number): void{
    this.startNumber.set((area-1) * 5);
    this.currentPage.set(area);
  }

  sortField = signal<'id'|'vorname'|'nachname'>('id');
  sortDirection = signal<number>(1);

  sortedClients = computed(() =>{
    const clients = [...this.clientSearchService.clients()];
    const field = this.sortField();
    const dir = this.sortDirection();

    clients.sort((a, b) => {
      let result = 0;
      switch (field){
        case "id":
          result = a.id - b.id;
          break;
        case "vorname":
          result = a.vorname.localeCompare(b.vorname);
          break;
        case "nachname":
          result = a.nachname.localeCompare(b.nachname);
          break;
      }
      return result * dir;
    })

    return clients;
  })

  private toggleSort(field: 'id' | 'vorname' | 'nachname'){
    if(this.sortField() != field){
      this.sortField.set(field);
      this.sortDirection.set(1);
    }
    else{
      this.sortDirection.update(d => d * -1);
    }
  }

  sortId(): void {
    this.toggleSort('id');
  }

  sortVorname(): void {
    this.toggleSort('vorname');
  }

  sortNachname(): void {
    this.toggleSort('nachname');
  }

  protected readonly toString = toString;
}
