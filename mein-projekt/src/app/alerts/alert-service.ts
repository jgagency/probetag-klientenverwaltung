import {Injectable} from '@angular/core';

type AlertType = { type: string; msg: string; timeout: number; icon: string; style: string };

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alerts: AlertType[] = [];

  creationAlert(klient: string): void {
    this.alerts.push({
      type: 'success',
      msg: klient + ` wurde erstellt.`,
      timeout: 3000,
      icon: "fa-solid fa-info fa-xl me-2",
      style: "color: #115033"
    });
  }

  editingAlert(klient: string): void {
    this.alerts.push({
      type: 'info',
      msg: klient + ` wurde bearbeitet.`,
      timeout: 3000,
      icon: "fa-solid fa-info fa-xl me-2",
      style: "color: #7f2028"
    });
  }

  deletionAlert(klient: string): void{
    this.alerts.push({
      type: 'danger',
      msg: klient + ` wurde gelöscht!`,
      timeout: 5000,
      icon: "fa-solid fa-exclamation fa-xl me-2",
      style: "color: #0c5260"
    });
  }

  loginAlert(username: string): void{
    this.alerts.push({
      type: 'success',
      msg: 'Herzlich willkommen ' + username,
      timeout: 5000,
      icon: "fa-regular fa-circle-check fa-xl me-2",
      style: "color: #115033"
    });
  }

  onClosed(dismissedAlert: AlertType): void {
    this.alerts = this.alerts.filter((alert) => alert !== dismissedAlert);
  }

  protected readonly alert = alert;
}
