import { CustomerStore } from "./state/customer.store";
import { Customer } from "./customer.model";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';



@Injectable()
export class CustomerService {

customerForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('',Validators.required),
    phone: new FormControl('',Validators.required),
    address: new FormControl('',Validators.required),
    membership: new FormControl('',Validators.required),
})

http: HttpClient;
store: CustomerStore;
apiURL = "http://localhost:3000"

constructor(http: HttpClient, store: CustomerStore) {
this.http = http;
this.store = store;
}

getAllCustomers(): Observable<Customer[]> {
return this.http.get<Customer[]>(this.apiURL +'/customers').pipe(
    tap(customers => {
    this.store.loadCustomers(customers, true);
    })
);
}

createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiURL + '/customers', customer).pipe(
      tap(value => {
        this.store.add([value]);
      })
    );
  }

deleteCustomer(customerId: string): Observable<any> {
  return this.http.delete(this.apiURL +'/customers/' + customerId).pipe(
    tap(result => {
      this.store.remove(customerId);
    })
  );
}

updateCustomer(customerId: string, customer: Customer): Observable<any> {
    console.log(customerId, customer)
  return this.http.put(this.apiURL + '/customers/' + customerId, customer).pipe(
    tap(result => {
      this.store.update(customerId, customer);
    })
  );
}
populateCustomerForm(customer){
    this.customerForm.setValue(customer)
}
}