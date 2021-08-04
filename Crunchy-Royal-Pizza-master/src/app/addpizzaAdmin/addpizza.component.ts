import { Component, OnInit } from '@angular/core';
import { ClassServiceAuth } from '../Shared/autorize.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'addpizza',
  templateUrl: './addpizza.component.html',
  styleUrls: ['./addpizza.component.css']
})
export class ClassAddPizza implements OnInit{

    
    idpizza:FormControl
    name:FormControl
    description:FormControl
    price:FormControl
    image:FormControl
    newPizzaForm:FormGroup

    public pizzaMenu: any
  
    constructor( private router: Router,private claseservice: ClassServiceAuth) {
    //regex - regular expressions 
    this.idpizza = new FormControl('',[Validators.required]);
    this.name = new FormControl('',[Validators.required]);
    this.description = new FormControl('',[Validators.required]);
    this.price =  new FormControl('',[Validators.required]);
    this.image =  new FormControl('',[Validators.required]);
  }

  ngOnInit()
  {
      this.newPizzaForm = new FormGroup({
          idpizza: this.idpizza,
          name: this.name,
          description: this.description,
          price: this.price,
          image: this.image
      });
      this.pizzaMenu = this.claseservice.getPizzaList();
  }


  NoValididId(){
    return this.idpizza.invalid && this.idpizza.touched;
  }


  NoValidNameProduct(){
    return this.name.invalid && this.name.touched;
  }

  

  NoValiddescription(){
    return this.description.invalid && this.description.touched;
  }

  NoValidprecio(){
    return this.price.invalid && this.price.touched;
  }

  NoValidimage(){
    return this.image.invalid && this.image.touched;
  }

  fnUpdate(formvalues){
    this.claseservice.getCreateProductValues(formvalues.idpizza, formvalues.name, formvalues.description, formvalues.price, formvalues.image);
    this.router.navigate(['pizza']);
  }

  fnCancel(){
    this.router.navigate(['home']);
  }

}