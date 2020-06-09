import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isUserLoggedIn: boolean=false;
  userId: any;
  constructor() { }

  ngOnInit(): void {
    this.userId =  sessionStorage.getItem('userId');
    console.log(this.userId);
    if(this.userId!=='' && this.userId!==null && this.userId!=='undefined'){
       this.isUserLoggedIn=true;
       
    }
  }

  logout=()=>{
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userMobile');
    sessionStorage.removeItem('userPassword');
    sessionStorage.removeItem('userAddress');
  }

}