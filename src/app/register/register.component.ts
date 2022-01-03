import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  uname=""
  acno=""
  pswd=""
  registerForm = this.fb.group({
    uname:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]*')]]
  })
  constructor(private ds:DataService,private router:Router,private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  register(){
    // if(this.registerForm.get('uname')?.errors){alert("invalide username!!!!")}
    if(this.registerForm.valid){
    var uname=this.registerForm.value.uname
    var acno =this.registerForm.value.acno
    var pswd =this.registerForm.value.pswd
    let result =this.ds.register(acno,pswd,uname)
    if(result){
      alert("Account registered successfully...")
      this.router.navigateByUrl("")
    }else{
      alert("Account Already Exist!!!!")
    }
    }else{
      alert("invalide Form")
    }
  }
}
