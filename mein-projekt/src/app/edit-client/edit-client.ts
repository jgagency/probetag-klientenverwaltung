import {Component, signal} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {ClientService} from '../client-service/client-service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ClientFormGroupService} from '../client-form-group-service/client-form-group-service';
import {FormErrors} from '../form-errors/form-errors';

@Component({
  selector: 'app-edit-client',
    imports: [
        FormsModule, ReactiveFormsModule, FormErrors
    ],
  templateUrl: './edit-client.html',
  styleUrl: './edit-client.css',
})
export class EditClient {

  constructor(private router: Router, private clientService: ClientService, protected clientFormGroupService: ClientFormGroupService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    let id= Number(this.activatedRoute.snapshot.paramMap.get('id'))
    this.clientFormGroupService.getClientToEdit(id);
  }

  edit(): void {
    this.clientFormGroupService.edit().subscribe((result) => {
      this.router.navigate(['klienten']);
    });
  }
}
