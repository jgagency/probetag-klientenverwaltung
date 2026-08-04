import {Component, inject, computed, signal, WritableSignal, Signal} from '@angular/core';
import { Client } from './client';
import { ClientService } from '../client-service/client-service';
import {SlicePipe} from '@angular/common';
import {RouterLink, ActivatedRoute} from '@angular/router';
import {CreateClient} from '../create-client/create-client';
import {ClientFormGroupService} from '../client-form-group-service/client-form-group-service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-clients',
  imports: [SlicePipe, RouterLink, CreateClient, PaginationModule, FormsModule],
  templateUrl: './clients.html',
  styleUrl: './clients.css',
})
export class Clients {

  constructor(private activatedRoute: ActivatedRoute, private clientFormGroupService: ClientFormGroupService) {}

  private clientService = inject(ClientService);

  showBoundaryLinks = true;

  sortedClients: Signal<Client[]> = this.clientService.clients;

  tempClients = this.sortedClients;

  range(i: number): number[] {
    return Array.from({length: i}, (_, i) => i);
  }

  visibleClients = computed(() =>
    this.sortedClients().slice(this.startNumber, this.endNumber)
  )

  currentPage = signal(1);

  ngOnInit(): void {
    this.clientFormGroupService.reset();
    this.clientService.getClientsSelf();
    let id= Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.visibleClientArea(id);
  }

  sortingNumber = 1;
  startNumber = 0;
  endNumber = 5;

  private visibleClientsSlicing(): void{
    this.visibleClients = computed(() =>
      this.sortedClients().slice(this.startNumber, this.endNumber)
    )
  }

  public visibleClientArea(area: number): void{
    this.startNumber = (area-1) * 5;
    this.endNumber = this.startNumber + 5;
    this.visibleClientsSlicing();
    this.currentPage.set(area);
  }

  private reverseSort(): void {
    this.tempClients = this.sortedClients;
    this.sortedClients = computed( () => {
      return [...this.tempClients()].reverse()
    });
    this.sortingNumber *= -1;
  }

  sortId(): void {
    if(this.sortingNumber != 1){
      this.sortedClients = computed(() => {
        return [...this.clientService.clients()].sort((a, b) => a.id! - b.id!)
      });
      this.sortingNumber = 1;
    }
    else{
      this.reverseSort();
    }

    this.visibleClientsSlicing();
  }

  sortVorname(): void {
    if(this.sortingNumber != 2){
      this.sortedClients = computed(() => {
        return [...this.clientService.clients()].sort((a, b) => a.vorname.localeCompare(b.vorname))
      })
      this.sortingNumber = 2;
    }
    else{
      this.reverseSort();
    }

    this.visibleClientsSlicing();
  }

  sortNachname(): void {
    if (this.sortingNumber != 3){
      this.sortedClients = computed(() => {
        return [...this.clientService.clients()].sort((a, b) => a.nachname.localeCompare(b.nachname))
      })
      this.sortingNumber = 3;
    }
    else{
      this.reverseSort();
    }

    this.visibleClientsSlicing();
  }

}
