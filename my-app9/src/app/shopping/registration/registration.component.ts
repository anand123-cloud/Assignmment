import { Component, OnInit } from '@angular/core';
import { FormControl,Validators,FormGroup } from '@angular/forms';

import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CommonServiceService } from '../shoppingService/common-service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  

  registrationForm: FormGroup;
  isSubmitted:boolean=false;
  baseUrl: string = `${environment.baseUrl}/users`;
  constructor(private route: Router, private dataService:CommonServiceService ) { }

  ngOnInit(): void {
    this.registrationForm= new FormGroup({
      firstName: new FormControl('',[Validators.required]),
      lastName: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required, Validators.pattern('[A-Za-z0-9._%+-]*(@dbs.com|@hcl.com)')]),
      mobile: new FormControl('',[Validators.required]),
      userPassword: new FormControl('', [Validators.required]),
  
      address: new FormControl('',[Validators.required, Validators.maxLength(150)]),
      gender: new FormControl('',[Validators.required])
    });
  }

  /**
   * this function initiates registration functionality
   * in the application 
   */
  submitRegistrationForm=()=>{
    this.isSubmitted=true;
    console.log('registration initiated');
    console.log(this.registrationForm);
    if(this.registrationForm.valid){
      console.log(this.registrationForm.value);
      // let userObj = {userName: this.registrationForm.value.email,
      //   firstName: this.registrationForm.value.firstName,
      //   lastName: this.registrationForm.value.lastName,
      //   userMobile: this.registrationForm.value.mobile,
      //   userAddress: this.registrationForm.value.address,
      //   userEmail: this.registrationForm.value.email,
      //   userPassword: this.registrationForm.value.userPassword
      // }
      let userObj: any= this.registrationForm.value;

      this.dataService.postData(`${this.baseUrl}`,userObj).subscribe((response)=>{
        console.log(response);
        alert('User registered successfully. Please login to continue');
        this.route.navigate(['/login']);
      },(error)=>{
        console.log(error);
      },() => {
  
      }
      )
    }
  }


}
