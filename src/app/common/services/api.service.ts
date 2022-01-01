import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  listCustomerURL = environment.urlApi+'/listclientes';
  createCustomerURL = environment.urlApi+'/creacliente';

  constructor(private httpClient: HttpClient) { }

  listCustomer() {
    return this.httpClient.get(this.listCustomerURL)
  }

  createCustomer(customer: any) {
    return this.httpClient.post(this.createCustomerURL, customer)
  }
}
