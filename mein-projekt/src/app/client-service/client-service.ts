import {Component, Signal, signal} from '@angular/core';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Client} from '../clients/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private url = "http://localhost:3000"

  constructor(private http: HttpClient) {}

  clients = signal<Client[]>([]);

  getClients(): Observable<Client[]>{
    return this.http.get<Client[]>(this.url + "/klienten");
  }

  getClientsSelf(): void{
    this.http.get<Client[]>(this.url + "/klienten").subscribe((result) => {
      this.clients.set(result);
    })
  }

  getClientById(id: number): Observable<Client>{
    return this.http.get<Client>(this.url + "/klient/" + id);
  }

  saveClient(client: Client): void{
    this.http.post<Client>(this.url + "/klient", client).subscribe((result) => {
      this.clients.update(current => [...current, result]);
    });
  }

  editClient(client: Client): Observable<Client>{
    return this.http.put<Client>(this.url + "/klient/" + client.id, client);
  }
}
