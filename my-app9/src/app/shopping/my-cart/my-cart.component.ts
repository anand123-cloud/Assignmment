import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Router } from '@angular/router';
import { FormGroup,FormControl } from '@angular/forms';
import { CommonServiceService } from '../shoppingService/common-service.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {

  baseUrl: string=`${environment.baseUrl}/cartitems?userId`
  cartItems: any=[];
  selectedCartItem: any;
  loggedInUserId: any;
  loggedInUserPhone: any;
  loggedInUserAddress: any;
  orderCost: number=0;
  cartLength: number;
  isCartListEmpty: boolean=false;
  orderForm: FormGroup;
  isUserLoggedIn: boolean=true;
  constructor(private dataService:CommonServiceService, private route: Router) { }

  ngOnInit(): void {
    this.getMyCartData();

    this.orderForm = new FormGroup({
      customerPhone: new FormControl(''),
      address: new FormControl(''),
      orderPrice: new FormControl('')
    })
  }

  /**
   * when a particular item is added or removed this function
   * will set the form data with required values
   */
  setFormdata=()=>{
    this.orderForm.setValue({
      customerPhone: this.loggedInUserPhone,
      address: this.loggedInUserAddress,
      orderPrice: this.orderCost
    })
  }

  /**
   * this function selects cart items for the logged in user id
   * it will display list of cart items, further you can remove cart item also.
   */
  getMyCartData=()=>{
    this.dataService.getData(`${this.baseUrl}=${parseInt(sessionStorage.getItem('userId'))}`).subscribe((response)=>{
      this.cartItems=response;
      console.log(this.cartItems);
      this.calculateTotalOrderCost();
      this.loggedInUserId=sessionStorage.getItem('userId');
      this.loggedInUserPhone=sessionStorage.getItem('userMobile');
      this.loggedInUserAddress=sessionStorage.getItem('userAddress');
      this.setFormdata();
    },(error)=>{
      console.log(error);
    },() => {

    }

    )
  }

  /**
   * iterate through the cart item list and get the total order value
   */
  calculateTotalOrderCost=()=>{
     this.cartLength = this.cartItems.length;
     if(this.cartLength===0){
       this.isCartListEmpty=true;
     }
     console.log(this.cartLength);
     if(this.cartLength>0){
      this.orderCost=0;
      for (let i = 0; i < this.cartLength; i++) {
        this.orderCost = this.orderCost+this.cartItems[i].totalCartPrice;
      }
     }
     console.log(this.orderCost);
  }

  /**
   * this function will load the order details and display in the Order page.
   * It will display details of all the items present in the selcted order
   */
  removeFromCart=(cartItem)=>{
    this.selectedCartItem=cartItem;
    console.log(this.selectedCartItem);
      if(confirm('Are you sure to remove selected item from your cart?')){
      this.dataService.deleteData(`${environment.baseUrl}/cartitems/${this.selectedCartItem.id}`).subscribe((response)=>{
        this.getMyCartData();
        alert('Items removed from your cart successfully');
      },(error)=>{
        console.log(error);
      },() => {

      }
      )
      }
  }

  /**
   * function created to place the final order. Once the order is placed successfully,
   * it will delete the cart items from the database.
   */
  placeOrder=()=>{
    console.log(this.orderForm.value);

    let orderObj = {
      userId: parseInt(this.loggedInUserId),
      orderDate: new Date(),
      orderPrice: this.orderForm.controls.orderPrice.value,
      address: this.orderForm.controls.address.value,
      customerPhone: this.orderForm.controls.customerPhone.value,
      products: this.cartItems
    }
    console.log('order object');
    console.log(orderObj);

    this.dataService.postData(`${environment.baseUrl}/orders`,orderObj).subscribe((response)=>{
      console.log(response);
      alert('Order placed successfully');
      this.deleteCartItems();
      this.route.navigate(['/orders']);
    },(error)=>{
      console.log(error);
    },() => {

    }
    )
  }

  /**
   * delete the cart items for the particular user once order is placed successfully
   */
  deleteCartItems=()=>{
    console.log(this.cartItems);
    if(this.cartItems.length>0){
      for(let i=0; i<this.cartLength;i++){
        console.log(this.cartItems[i].id);
         this.dataService.deleteData(`${environment.baseUrl}/cartitems/${this.cartItems[i].id}`).subscribe((response)=>{
        },(error)=>{
          console.log(error);
        },() => {
  
        }
        )
      }
    }
    
  }
  trackByMyCartId=(index:number,myCart :any)=>{
    return myCart.id;
    }

}
