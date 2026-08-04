import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Clients } from './clients/clients';
import { RouterLink } from '@angular/router';
import {routes} from './app.routes';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('mein-projekt');
  protected readonly routes = routes;
}
