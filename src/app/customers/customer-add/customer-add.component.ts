import { CustomerService } from "../customer.service";
import { CustomerStore } from "../state/customer.store";
import { Customer } from "../customer.model";
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss']
})
export class CustomerAddComponent implements OnInit,OnDestroy {
  createCustomerSub: Subscription;
  updateCustomereSub: Subscription;
  customerToBeUpdated: Customer;
  memberships = ["Basic","Pro","Platinum"]

  constructor(public customerService: CustomerService , private store:CustomerStore) { }
  

  ngOnInit(): void {
   
  }

  onSubmit(){
    if (this.customerService.customerForm.get('id').value === null ) {
      console.log(this.customerService.customerForm.value);
      
      const customer: Customer = {
        name: this.customerService.customerForm.value.name,
        phone: this.customerService.customerForm.value.phone,
        address: this.customerService.customerForm.value.address,
        membership: this.customerService.customerForm.value.membership,
       };
     this.createCustomerSub = this.customerService.createCustomer(customer).subscribe();
     this.customerService.customerForm.reset()
     this.customerService.customerForm.get('membership').setValue("")

    } else {
      console.log(this.customerService.customerForm.value);
      this.customerToBeUpdated = {...this.customerService.customerForm.value as Customer};
      this.updateCustomereSub = this.customerService.updateCustomer(
        this.customerService.customerForm.get('id').value, this.customerService.customerForm.value).subscribe(result => console.log(result)
      );
     
      this.customerService.customerForm.reset()
      this.customerService.customerForm.get('membership').setValue("")
    }
  }
  resetform(){
    this.customerService.customerForm.reset();
    this.customerService.customerForm.get('membership').setValue("")

  }
  ngOnDestroy(): void {
    if (this.updateCustomereSub) {
     this.updateCustomereSub.unsubscribe();
    }  
  }
}