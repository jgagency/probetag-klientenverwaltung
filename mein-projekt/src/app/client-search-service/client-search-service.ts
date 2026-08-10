import {inject, Injectable} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ClientService} from '../client-service/client-service';
import {toSignal} from '@angular/core/rxjs-interop';
import {debounceTime, merge, startWith, Subject, switchMap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientSearchService {
  private formBuilder = inject(FormBuilder);
  private clientService = inject(ClientService);

  public searchForm = this.formBuilder.group({
    versicherungsname: '',
    vorname: '',
    nachname: '',
    versicherungsnummer: ''
  })

  private refreshTrigger = new Subject<void>();

  refresh(): void {
    this.refreshTrigger.next();
  }

  clients = toSignal(
    merge(this.searchForm.valueChanges, this.refreshTrigger).pipe(
      startWith(this.searchForm.getRawValue()),
      debounceTime(500),
      //distinctUntilChanged((a, b) => JSON.stringify(a) == JSON.stringify(b)),
      switchMap(() => this.clientService.getClientSearch(this.searchForm.getRawValue()))
    ),
    {initialValue: []}
  );
}
