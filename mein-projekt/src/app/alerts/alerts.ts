import {Component, inject} from '@angular/core';
import {AlertComponent} from 'ngx-bootstrap/alert';
import {AlertService} from './alert-service';

@Component({
  selector: 'app-alerts',
  imports: [
    AlertComponent
  ],
  templateUrl: './alerts.html',
  styleUrl: './alerts.css',
})
export class Alerts {
  dismissible = true;

  alertService = inject(AlertService);
}
