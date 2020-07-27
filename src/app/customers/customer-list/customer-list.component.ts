import { CustomerQuery } from "../state/customer.query";
import { CustomerService } from "../customer.service";
import { CustomerState } from "../state/customer.store";
import { switchMap, filter } from 'rxjs/operators';
import { Customer } from "../customer.model";
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit , OnDestroy {
  
  customerToBeUpdated: Customer;
  isUpdateActivated = false;
  listCustomersSub: Subscription;
  deleteCustomerSub: Subscription;
  updateCutomerSub: Subscription;
  cstate: CustomerState;
  isLoading = true 
  searchText = ""
  customers$: Observable<Customer[]> = this.customerQuery.selectAll();

  constructor(private customerService: CustomerService, private customerQuery: CustomerQuery) { }

  ngOnInit(): void {
    this.listCustomersSub = this.customerQuery.selectAreCustomersLoaded$.pipe(
      filter(areCustomersLoaded => !areCustomersLoaded  ),
      switchMap(areCustomersLoaded =>{
        if (!areCustomersLoaded ) {
          return this.customerService.getAllCustomers();
         
        }
      })
    ).subscribe(result => {
      setTimeout(() => {
        this.isLoading = false 
      }, 1000);
    });
  }
  filterCustomers(customer){
    if (customer != null ) {
      return customer.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
    }

    
  }
  deleteCustomer(customerId: string) {
    this.deleteCustomerSub = this.customerService.deleteCustomer(customerId).subscribe(result => {
      console.log(result);
    });
  }
  editCustomer(customer){
    this.customerService.populateCustomerForm(customer)
  }
  ngOnDestroy(): void {
    if (this.listCustomersSub) {
      this.listCustomersSub.unsubscribe();
    }
    if (this.deleteCustomerSub) {
      this.deleteCustomerSub.unsubscribe();
    }
  }
}
