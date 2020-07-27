import { Injectable } from '@angular/core';
import { CustomerState,CustomerStore} from './customer.store';
import { QueryEntity } from '@datorama/akita';


@Injectable({
  providedIn: 'root'
})
export class CustomerQuery extends QueryEntity<CustomerState> {

  selectAreCustomersLoaded$ = this.select(state => {
    return state.areCustomersLoaded;
  });

  constructor(protected store: CustomerStore) {
    super(store);
  }
}