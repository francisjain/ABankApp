import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  aim = "Your Perfect Banking Partner"

   accno = "Account number please"
  pswd = ""
  acno = "Account number please"
loginForm = this.fb.group({
  acno : ["",[Validators.required,Validators.pattern('[0-9]*')]],
  pswd : ["",[Validators.required,Validators.pattern('[a-zA-z0-9]*')]]
})


  constructor(private router:Router,private ds:DataService,private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  acnoChange(event: any) {
    this.acno = event.target.value
    console.log(this.acno);
  }
  pswdChange(event: any) {
    this.acno = event.target.value
    console.log(this.acno);
  }


  login() {
    // console.log(this.loginForm);
    var acno = this.loginForm.value.acno
    var password = this.loginForm.value.pswd
    let result = this.ds.login(acno,password)
    if(this.loginForm.valid){
      if (result) {
        alert("login successful")
        this.router.navigateByUrl(`dashboard`)
    }
    } else{alert("Invalide Form")}
    // alert("login Click")
  }







//--------------------------------------- 2nd Method
  // login() {
  //   var acno = this.acno
  //   var password = this.pswd
  //   let database = this.ds.users
  //   if (acno in database) {

  //     if (password == database[acno]["password"]) {
  //       alert("login successful")
  //       this.router.navigateByUrl(`dashboard`)
  //     } else {
  //       alert("Incorrect Password")
  //     }
  //   } else {
  //     alert("Invalide Account Number")
  //   }
  //   // alert("login Click")
  // }
//-------------------------------------- 1st Method
  // login(a:any,p:any) {
  //   console.log(a);
  //   var acno = a.value
  //   var password = p.value
  //   let database = this.users
  //   if (acno in database) {

  //     if (password == database[acno]["password"]) {
  //       alert("login successful")
  //     } else {
  //       alert("Incorrect Password")
  //     }
  //   } else {
  //     alert("Invalide Account Number")
  //   }
  //   alert("login Click")
  // }

}
