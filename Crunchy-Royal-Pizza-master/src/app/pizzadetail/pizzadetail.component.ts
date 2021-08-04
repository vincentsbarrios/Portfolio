import { Component, OnInit } from '@angular/core';
import { ClassServiceAuth } from '../Shared/autorize.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pizza',
  templateUrl: './pizzadetail.component.html',
  //styleUrls: ['./pizza.component.css']


})
export class ClasePizzaDetail implements OnInit{

  public pizzaMenu: any
  constructor(private auth: ClassServiceAuth, private actro: ActivatedRoute){}

  ngOnInit (){
    this.pizzaMenu = this.auth.getPizzaById(+this.actro.snapshot.params["id"]);
    console.log(this.pizzaMenu)
  }
}
