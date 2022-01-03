import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  acno=""
  pswd=""
  amount=""

  acno1=""
  pswd1=""
  amount1=""
  user=this.ds.currentuserName

  depositeForm =this.fb.group ({
    acno:["",[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:["",[Validators.required,Validators.pattern('[a-zA-Z0-9 ]*')]],
    amount:["",[Validators.required,Validators.pattern('[0-9]*')]]
  })
  withdrawForm =this.fb.group  ({
    acno1:["",[Validators.required,Validators.pattern('[0-9]*')]],
    pswd1:["",[Validators.required,Validators.pattern('[a-zA-Z0-9 ]*')]],
    amount1:["",[Validators.required,Validators.pattern('[0-9]*')]]
  })

  constructor(private ds:DataService,private fb:FormBuilder) { }

  ngOnInit(): void {
  }
deposit(){
  var acno=this.depositeForm.value.acno
  var pswd =this.depositeForm.value.pswd
  var amt=this.depositeForm.value.amount
  let result=this.ds.deposite(acno,pswd,amt)
  if(this.depositeForm.valid){
    if(result){
    alert(amt+" is been credited. Your current Balance is "+result)
  }}else{alert("Invalide Form")}
}

withDraw(){
  var acno=this.withdrawForm.value.acno1
  var pswd =this.withdrawForm.value.pswd1
  var amt=this.withdrawForm.value.amount1
  let result=this.ds.withDraw(acno,pswd,amt)
  if(this.withdrawForm.valid){
    if(result){
    alert(amt+" is been debited. Your current Balance is "+result)
  }}else{alert("Invalide Form")}
  
}
}
