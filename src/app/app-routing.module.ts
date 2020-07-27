import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'customers', 
    loadChildren: () => import('src/app/customers/customers.module').then(m => m.CustomersModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
