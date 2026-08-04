import {Component, signal} from '@angular/core';
import {FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {ClientFormGroupService} from '../client-form-group-service/client-form-group-service';
import {FormErrors} from '../form-errors/form-errors';

@Component({
  selector: 'app-create-client',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FormErrors
  ],
  templateUrl: './create-client.html',
  styleUrl: './create-client.css',
})
export class CreateClient {

  constructor(protected clientFormGroupService: ClientFormGroupService) {}

  ngOnInit() {
    this.clientFormGroupService.reset();
  }
}
