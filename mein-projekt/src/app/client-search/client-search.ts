import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ClientSearchService} from '../client-search-service/client-search-service';

@Component({
  selector: 'app-client-search',
    imports: [
        ReactiveFormsModule, FormsModule
    ],
  templateUrl: './client-search.html',
  styleUrl: './client-search.css',
})
export class ClientSearch {

  protected searchService = inject(ClientSearchService);

}
