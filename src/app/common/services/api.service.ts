import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  listCustomerURL = environment.urlApi+'/listclientes';
  createCustomerURL = environment.urlApi+'/creacliente';
  kpiCustomerURL = environment.urlApi+'/kpideclientes';

  constructor(private httpClient: HttpClient) { }

  listCustomer(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.listCustomerURL)
  }

  createCustomer(customer: any) {
    return this.httpClient.post(this.createCustomerURL, customer)
  }

  kpiCustomer(): Observable<any> {
    return this.httpClient.get<any>(this.kpiCustomerURL)
  }
}
