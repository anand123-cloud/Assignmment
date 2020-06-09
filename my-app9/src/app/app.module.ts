import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersComponent } from './shopping/orders/orders.component';
import { MyCartComponent } from './shopping/my-cart/my-cart.component';
import { HeaderComponent } from './shopping/header/header.component';
import { LoginComponent } from './shopping/login/login.component';
import { RegistrationComponent } from './shopping/registration/registration.component';
import { ProductListComponent } from './shopping/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    MyCartComponent,
    HeaderComponent,
    LoginComponent,
    RegistrationComponent,
    ProductListComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }