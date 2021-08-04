import { ActivatedRoute } from '@angular/router';
import { Grocery } from './../models/grocery';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../Core/data.service';

@Component({
  selector: 'app-grocerylist',
  templateUrl: './grocerylist.component.html',
  styleUrls: ['./grocerylist.component.css']
})
export class GrocerylistComponent implements OnInit {

  constructor(private service : DataService, private route : ActivatedRoute) { }

  listG : Grocery[];

  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('id');
    this.service.setGlobalId(id)
    this.service.getGroceriesByUser(id)
    .subscribe(
      (list : Grocery[]) => {
        this.listG = list
      },
      error => console.log(error)
    )
  }

}
