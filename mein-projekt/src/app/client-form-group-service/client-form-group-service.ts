import {inject, Injectable, signal} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ClientService} from '../client-service/client-service';
import {Client} from '../clients/client';
import {Observable, tap} from 'rxjs';
import {ClientSearchService} from '../client-search-service/client-search-service';

@Injectable({
  providedIn: 'root',
})
export class ClientFormGroupService {

  constructor (private clientService: ClientService) {}

  private formBuilder = inject(FormBuilder);
  private searchService = inject(ClientSearchService);

  clientForm = this.formBuilder.nonNullable.group({
    vorname: ['', Validators.required],
    nachname: ['', Validators.required],
    strasse: ['', [Validators.required, Validators.pattern(/^[a-zA-ZßÖöÄäÜü\s\-\.]+\s\d+[a-zA-Z]?$/)]], //, Validators.pattern(/^[A-Z]/)
    plz: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.minLength(5), Validators.maxLength(5)]],
    ort: ['', Validators.required],
    telefon: ['', Validators.pattern(/[0-9]$/)],
    email: ['', [Validators.required, Validators.email]],
    versicherungsnummer: ['', [Validators.minLength(10),Validators.maxLength(10)]],
    versicherungsname: [''],
    geburtsdatum: [null]
  })

  client = signal<Client>({
    id: 0,
    vorname: "",
    nachname: "",
    ort: "",
    plz: "",
    strasse: "",
    telefon: "",
    email: "",
    versicherungsname: "",
    versicherungsnummer: "",
    geburtsdatum: null
  })

  displayVorname = signal(this.clientForm.get('vorname')?.value);
  displayNachname = signal(this.clientForm.get('nachname')?.value);

  saveClient(): void{
    const savedClient = {...this.clientForm.getRawValue()};
    this.clientService.saveClient(savedClient).subscribe(() => {
      this.reset();
      this.searchService.searchForm.updateValueAndValidity({ emitEvent: true });
    });
  }

  reset(): void{
    this.clientForm.reset();
  }

  getClientToEdit(id: number): Observable<Client>{
    return this.clientService.getClientById(id).pipe(
      tap((result) => {
        this.clientForm.patchValue(result);
        this.client().id = id;
        this.displayVorname.set(this.clientForm.get('vorname')?.value);
        this.displayNachname.set(this.clientForm.get('nachname')?.value);
      })
    )
  }

  edit(): Observable<Client>{
    const editedClient = {...this.client(), ...this.clientForm.value};
    return this.clientService.editClient(editedClient);
  }

  resetClient(){
    this.clientService.getClientById(this.client().id!).subscribe((result) => {
      this.clientForm.patchValue(result);
    });
  }
}
