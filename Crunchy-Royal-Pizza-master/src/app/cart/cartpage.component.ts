import { Component, OnInit } from '@angular/core';
import { ClassServiceAuth } from '../Shared/autorize.service';
import { IPizza } from '../Shared/data.model';
import { Router } from '@angular/router';

@Component({
  selector: 'cart',
  templateUrl: './cartpage.component.html',
  styleUrls: ['./cartpage.component.css']

})
export class ClaseCartComponent implements OnInit{

  public checkArray: any
  

  constructor(private service: ClassServiceAuth, private router: Router){}

  ngOnInit(){
    
    this.checkArray = this.service.getCheckOut();
  }

  fnDelete(pizzaD: IPizza){
    this.service.deletefromCart(pizzaD);
    this.router.navigate(['checkout']);
  }

}

