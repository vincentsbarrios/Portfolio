import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClassServiceAuth } from '../Shared/autorize.service';
import { Routes, Router } from '@angular/router';


@Component({
  templateUrl: './checkoutpage.component.html',
  styleUrls: ['./checkout.component.css']
})
export class ClassCheckout implements OnInit{

/*  
  creditcardnumber:FormControl
  //cvvnumber:FormControl
  //cardtype:FormControl
  //creditcardname:FormControl
  creditcardForm:FormGroup

  constructor(public auth: ClassServiceAuth){
    this.creditcardnumber = new FormControl([Validators.required]);
  }

  ngOnInit(){
    this.creditcardForm = new FormGroup({
        creditcardnumber: this.creditcardnumber,
        //cvvnumber: this.cvvnumber,
        //cardtype: this.cardtype,
        //creditcardname: this.creditcardname,

    });
  }

    fnUpdate(formvalue){

    }
    */

   constructor( private router: Router,private claseservice: ClassServiceAuth) {
    //regex - regular expressions 

  }
   
  ngOnInit()
  {
     
  }

}
