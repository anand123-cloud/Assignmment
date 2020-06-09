import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import { CommonServiceService } from '../shoppingService/common-service.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  selectedOrder: any;
  orders: any=[];
  loggedInAsId: string;
  baseUrl: string=`${environment.baseUrl}/orders?userId`
  isUserLoggedIn: boolean=true;
  orderItems: any=[];
  constructor(private dataService: CommonServiceService) { }

  ngOnInit(): void {
    this.getOrderData();
  }

  /**
   * this function selects product list for the logged in user id
   * it will display list of orders, further you can view the order details also.
   */
  getOrderData=()=>{
    this.dataService.getData(`${this.baseUrl}=${sessionStorage.getItem('userId')}`).subscribe((response)=>{
      this.orders=response;
      console.log(this.orders);
    },(error)=>{
      console.log(error);
    },() => {

    }

    )
  }

  /**
   * this function will load the order details and display in the Order page.
   * It will display details of all the items present in the selcted order
   */
  viewOrderDetails=(order)=>{
  this.selectedOrder=order;
  console.log(this.selectedOrder);

  this.orderItems = order.products;
  console.log(this.orderItems);

 

  }
  trackByOrderId=(index:number,order :any)=>{
    return order.id;
    }

}
