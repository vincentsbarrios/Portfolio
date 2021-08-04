import { Component, OnInit } from '@angular/core';
import { ClassServiceAuth } from '../Shared/autorize.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IPizza } from '../Shared/data.model';

@Component({
  selector: 'pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.css']

})
export class ClasePizzaPage implements OnInit{

  public pizzaMenu: any
  public addPizza: IPizza
  constructor(private auth: ClassServiceAuth, private actro: ActivatedRoute, private router: Router){}

  ngOnInit (){
    this.pizzaMenu = this.auth.getPizzaList();
    //testing
  }

  fnAdd(obj: IPizza){
    this.auth.addToCart(obj);
    this.router.navigate(['checkout']);
    console.log(obj);
  }
}
