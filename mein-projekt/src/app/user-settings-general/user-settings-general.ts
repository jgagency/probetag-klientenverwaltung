import {Component, inject} from '@angular/core';
import {AccordionComponent, AccordionPanelComponent} from "ngx-bootstrap/accordion";
import {ReactiveFormsModule} from "@angular/forms";
import {EditUserService} from '../user-settings-safety/edit-user-service';
import {FormErrors} from '../form-errors/form-errors';

@Component({
  selector: 'app-user-settings-general',
  imports: [
    AccordionComponent,
    AccordionPanelComponent,
    ReactiveFormsModule,
    FormErrors
  ],
  templateUrl: './user-settings-general.html',
  styleUrl: './user-settings-general.css',
})
export class UserSettingsGeneral {
  protected editUserService = inject(EditUserService);
}
