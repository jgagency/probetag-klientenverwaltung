import {Component, inject} from '@angular/core';
import {AccordionComponent, AccordionPanelComponent} from 'ngx-bootstrap/accordion';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EditUserService} from './edit-user-service';
import {FormErrors} from '../form-errors/form-errors';

@Component({
  selector: 'app-user-settings-safety',
  imports: [
    AccordionPanelComponent,
    AccordionComponent,
    FormsModule,
    ReactiveFormsModule,
    FormErrors
  ],
  templateUrl: './user-settings-safety.html',
  styleUrl: './user-settings-safety.css',
})
export class UserSettingsSafety {
  protected editUserService = inject(EditUserService);
}
