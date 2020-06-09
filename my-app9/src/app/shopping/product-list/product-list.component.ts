import { Component, OnInit } from '@angular/core';


import { environment } from 'src/environments/environment';
import { FormGroup,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonServiceService } from '../shoppingService/common-service.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: any=[];
  isUserLoggedIn: boolean=false;
  baseUrl: string=`${environment.baseUrl}/products`;
  selectedProduct: any;
  addCartForm: FormGroup;
  totalCartPrice: any;
  loggedInUserId: any=0;
  constructor(private dataService: CommonServiceService,private route: Router) { }

  


  ngOnInit(): void {
    this.getData();
    this.addCartForm = new FormGroup({
      productId: new FormControl(''),
      productName: new FormControl(''),
      price: new FormControl(''),
      productDesc: new FormControl(''),
      quantity: new FormControl(''),
      ratings: new FormControl('')
    })
  }

  trackByProductId=(index:number,product :any)=>{
  return product.id;
  }
  /**
   * when a particular item is added or removed, this function
   * will set the form data with required values
   */
  setFormdata=()=>{
    this.addCartForm.setValue({
      productId: this.selectedProduct.id,
      productName: this.selectedProduct.productName,
      price: this.selectedProduct.price,
      productDesc: this.selectedProduct.description,
      quantity: '1',
      ratings: this.selectedProduct.ratings
    })
    this.loggedInUserId=sessionStorage.getItem('userId');
  }

  /**
   * this function selects data i.e product list for the shopping cart
   * it will display list of products.
   */
  getData=()=>{
    this.dataService.getData(this.baseUrl).subscribe((response)=>{
      this.products=response;
      console.log(this.products);
    },(error)=>{
      console.log(error);
    },() => {
      
    }

    )
  }

  /**
   * this function selects the prodcut and display the product details
   * user can further enter the quanitities need and proceed to checkout
   *    
   * */
  addToCart=(product)=>{
    this.selectedProduct = product;
    console.log(this.selectedProduct);
    if(sessionStorage.getItem('userId')==='' || sessionStorage.getItem('userId')===null){
      alert('You are not logged in, Please login and proceed');
      this.route.navigate(['/login']);
    }
    else{
      this.setFormdata();
    }
  }

  /**
   * this function adds the selected product item to cart items.
   * it will claculate the total price based on total units selected.
   */
  submitAddToCart=()=>{

    console.log(this.addCartForm.value);
    console.log(this.addCartForm.value.productId);

    let cartItemObj = {productId: this.addCartForm.value.productId,
      productName: this.addCartForm.value.productName,
      productDesc: this.addCartForm.value.productDesc,
      quantity: this.addCartForm.value.quantity,
      price: this.addCartForm.value.price,
      totalCartPrice: (this.addCartForm.value.price*this.addCartForm.value.quantity),
      userId: parseInt(this.loggedInUserId)
    }
    console.log(this.addCartForm.value);
    console.log(this.addCartForm.value.productId);

    this.dataService.postData(`${environment.baseUrl}/cartitems`,cartItemObj).subscribe((response)=>{
      console.log(response);
      alert('Item added to your cart successfully');
      this.selectedProduct=null;
      this.route.navigate(['/products']);
    },(error)=>{
      console.log(error);
    },() => {

    }
    )
  }

}
