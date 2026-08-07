import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ClientFormGroupService} from '../client-form-group-service/client-form-group-service';
import {FormErrors} from '../form-errors/form-errors';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-create-client',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FormErrors,
    BsDatepickerModule
  ],
  templateUrl: './create-client.html',
  styleUrl: './create-client.css',
})
export class CreateClient {

  constructor(protected clientFormGroupService: ClientFormGroupService) {}

  ngOnInit() {
    this.clientFormGroupService.reset();
  }

  bsConfig = {
    dateInputFormat: 'DD.MM.YYYY'
  };
}
