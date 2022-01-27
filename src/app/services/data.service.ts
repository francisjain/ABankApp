import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentuserName:any
  currentAcno:any


  users: any = {
    1000: { acno: 1000, uname: "Neer", password: "1000", balance: 5000,transaction:[] },
    1001: { acno: 1001, uname: "Laisha", password: "1001", balance: 5000,transaction:[]},
    1002: { acno: 1002, uname: "Vyom", password: "1002", balance: 5000,transaction:[] }
  }

  constructor(private http:HttpClient) {                                                                                                
    this.getDetails()
  }

//To store in local storage
  saveDetails(){
    if(this.users){localStorage.setItem("userDB",JSON.stringify(this.users))}
    if(this.currentuserName){localStorage.setItem("cUserName",JSON.stringify(this.currentuserName))}
    if(this.currentAcno){localStorage.setItem("currentAcnoLocal",JSON.stringify(this.currentAcno))}
  }

  
//To get values in local storage
getDetails(){
    if(localStorage.getItem("userDB")){this.users=JSON.parse(localStorage.getItem("userDB") || '')}
    if(localStorage.getItem("cUserName")){this.currentuserName=JSON.parse(localStorage.getItem("cUserName") || '')}
    if(localStorage.getItem("currentAcnoLocal")){this.currentAcno=JSON.parse(localStorage.getItem("currentAcnoLocal") || '')}
  }
  getTransaction(){
    return this.users[this.currentAcno].transaction
  }

  // -------------------register client--------------
  // register(acno: any, password: any, uname: any) {
  //   let db = this.users
  //   if (acno in db) {
  //     return false
  //   } else {
  //     db[acno] = {
  //       acno, uname, password, balance: 0,transaction:[]
  //     }
  //     console.log(db);
  //     this.saveDetails()
  //     return true
  //   }
  // }
  // -------------------register client--------------

  register(acno: any, password: any, uname: any) {
    const data ={
      acno,password,uname
    }
    return this.http.post("http://localhost:3000/register",data)
  }

  login(acno: any, password: any) {
    let database = this.users
    if (acno in database) {

      if (password == database[acno]["password"]) {
        this.currentuserName=database[acno]["uname"]
        this.currentAcno=acno
        // this.saveDetails()
        return true
      } else {
        alert("Incorrect Password")
        return false
      }
    } else {
      alert("Invalide Account Number")
      return false
    }
  }

  deposite(acno: any, password: any, amt: any) {
    var amount = parseInt(amt)

    let db = this.users
    if (acno in db) {
      if (password == db[acno]["password"]) {
        db[acno]["balance"] = db[acno]["balance"] + amount
        db[acno].transaction.push({
          amount:amount,
          type:"CREDIT"
        })
        this.saveDetails()
        return db[acno]["balance"]

      } else {
        alert("Incorrect Password")
        return false
      }
    } else {
      alert("Invalide Account Number")
      return false
    }

  }

  withDraw(acno: any, password: any, amt: any) {
    var amount = parseInt(amt)

    let db = this.users
    if (acno in db) {
      if (password == db[acno]["password"]) {

        if (db[acno]["balance"] >= amount) {
          db[acno]["balance"] = db[acno]["balance"] - amount
          db[acno].transaction.push({
            amount:amount,
            type:"DEBITED"
          })
          this.saveDetails()
          return db[acno]["balance"]
        } 
        else {
          alert("Insufficent balance")
          return false
        }
      } 
      else {
        alert("Incorrect Password")
        return false
      }
    }
     else {
      alert("Invalide Account Number ")
      return false
    }

  }
}
