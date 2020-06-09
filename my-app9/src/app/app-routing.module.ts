import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './shopping/login/login.component';
import { ProductListComponent } from './shopping/product-list/product-list.component';
import { MyCartComponent } from './shopping/my-cart/my-cart.component';
import { OrdersComponent } from './shopping/orders/orders.component';
import { RegistrationComponent } from './shopping/registration/registration.component';


const routes: Routes = [
  {path: 'login' , component: LoginComponent },
  {path: 'registration' , component: RegistrationComponent },
  {path: 'products' , component: ProductListComponent},
  {path: 'myCart' , component: MyCartComponent},
  {path: 'orders' , component: OrdersComponent},
  { path: '', redirectTo: '/products', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }