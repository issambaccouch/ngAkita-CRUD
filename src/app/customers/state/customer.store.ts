import { Injectable } from '@angular/core';
import { Customer } from "./../customer.model"
import { EntityStore, StoreConfig, EntityState } from '@datorama/akita';

export interface CustomerState extends EntityState<Customer, string> {
  areCustomerLoaded: boolean;
}

export function createInitialState(): CustomerState {
  return {
      areCustomerLoaded: false
  };
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'customers' })
export class CustomerStore extends EntityStore<CustomerState> {

    constructor() {
        super(createInitialState());
    }
    loadCustomers(customers: Customer[], areCustomerLoaded: boolean) {
      this.set(customers);
      this.update(state => ({
        ...state,
        areCustomerLoaded
      }));
    }
}