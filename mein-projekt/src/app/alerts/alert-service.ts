import {Injectable, signal} from '@angular/core';

type AlertType = { type: string; msg: string; timeout: number; icon: string; style: string };

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alerts = signal<AlertType[]>([]);

  creationAlert(klient: string): void {
    this.alerts.update(current => [...current,{
      type: 'success',
      msg: klient + ` wurde erstellt.`,
      timeout: 3000,
      icon: "fa-solid fa-info fa-xl me-2",
      style: "color: #115033"
    }]);
  }

  editingAlert(klient: string): void {
    this.alerts.update(current => [...current,{
      type: 'info',
      msg: klient + ` wurde bearbeitet.`,
      timeout: 3000,
      icon: "fa-solid fa-info fa-xl me-2",
      style: "color: #0c5260"
    }]);
  }

  deletionAlert(klient: string): void{
    this.alerts.update(current => [...current,{
      type: 'danger',
      msg: klient + ` wurde gelöscht!`,
      timeout: 5000,
      icon: "fa-solid fa-exclamation fa-xl me-2",
      style: "color: #7f2028"
    }]);
  }

  loginAlert(username: string): void{
    this.alerts.update(current => [...current,{
      type: 'success',
      msg: 'Herzlich willkommen ' + username,
      timeout: 3000,
      icon: "fa-regular fa-circle-check fa-xl me-2",
      style: "color: #115033"
    }]);
  }

  loginFailedAlert(): void{
    this.alerts.update(current => [...current,
      {
        type: 'danger',
        msg: `Login fehlgeschlagen. Bitte prüfe deine Daten.`,
        timeout: 4000,
        icon: "fa-solid fa-exclamation fa-xl me-2",
        style: "color: #7f2028"
      }]);
  }

  onClosed(dismissedAlert: AlertType): void {
    this.alerts.set(this.alerts().filter((alert) => alert !== dismissedAlert));
  }
}
