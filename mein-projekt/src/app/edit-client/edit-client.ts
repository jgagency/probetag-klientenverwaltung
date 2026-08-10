import {Component, inject} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {ClientService} from '../client-service/client-service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ClientFormGroupService} from '../client-form-group-service/client-form-group-service';
import {FormErrors} from '../form-errors/form-errors';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {GlobalValues} from '../global-values/global-values';
import {ClientSearchService} from '../client-search-service/client-search-service';

@Component({
  selector: 'app-edit-client',
    imports: [
        FormsModule, ReactiveFormsModule, FormErrors, BsDatepickerModule
    ],
  templateUrl: './edit-client.html',
  styleUrl: './edit-client.css',
})
export class EditClient {

  constructor(private router: Router, private clientService: ClientService, protected clientFormGroupService: ClientFormGroupService, private activatedRoute: ActivatedRoute) {}

  private globalValues = inject(GlobalValues);
  private clientSearchService = inject(ClientSearchService);

  ngOnInit(): void {
    let id= Number(this.activatedRoute.snapshot.paramMap.get('id'))
    this.clientFormGroupService.getClientToEdit(id).subscribe((result) => {
      const clientName = `${result.vorname} ${result.nachname}`;
      this.globalValues.pageName.set(clientName);
      this.globalValues.breadcrumbs.set([
        {label: 'Klienten', link: '/klienten'},
        {label: clientName}
      ]);
    })
  }

  edit(): void {
    this.clientFormGroupService.edit().subscribe(() => {
      this.router.navigate(['klienten']);
    });
  }

  delete(): void {
    this.clientService.deleteClient(this.clientFormGroupService.client().id).subscribe(() => {
      this.clientSearchService.refresh();
      this.router.navigate(['klienten']);
    });
  }

  getDate(): Date | null{
    if (this.clientFormGroupService.clientForm.get('geburtsdatum')?.value == null)
      return null
    return new Date(this.clientFormGroupService.clientForm.get('geburtsdatum')?.value);
  }

  bsConfig = {
    dateInputFormat: 'DD.MM.YYYY'
  };
}
