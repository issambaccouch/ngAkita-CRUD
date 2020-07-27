import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer/customer.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { RouterModule , Routes } from "@angular/router";
import { CustomerService } from "./customer.service";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule ,ReactiveFormsModule}   from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


const customerRoutes: Routes = [
  { path: '', component: CustomerComponent },

]

@NgModule({
  declarations: [
    CustomerComponent,
    CustomerAddComponent,
    CustomerListComponent
  ],
  imports: [
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forChild(customerRoutes),

  ],
  providers: [CustomerService]
})
export class CustomersModule { }
