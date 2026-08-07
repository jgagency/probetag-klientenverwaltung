import {signal} from '@angular/core';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
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

  getClientSearch(values: Partial<{ vorname: string, nachname: string, versicherungsname: string, versicherungsnummer: string;}> |
    { vorname: string, nachname: string, versicherungsname: string, versicherungsnummer: string;}): Observable<Client[]>{
    let params = new HttpParams();

    Object.entries(values).forEach(([key, value]) => {
      if(value){
        params = params.set(key, value);
      }
    })

    return this.http.get<Client[]>(this.url + "/klienten/", {params});
  }

  getClientById(id: number): Observable<Client>{
    return this.http.get<Client>(this.url + "/klient/" + id);
  }

  saveClient(client: Client): Observable<Client>{
    return this.http.post<Client>(this.url + "/klient", client);
  }

  editClient(client: Client): Observable<Client>{
    return this.http.put<Client>(this.url + "/klient/" + client.id, client);
  }

  deleteClient(id: number): Observable<string> {
    return this.http.delete<string>(this.url + "/klient/" + id);
  }
}
