import { Component, OnInit } from '@angular/core'
import { ClassServiceAuth } from '../Shared/autorize.service'
import { ActivatedRoute, Router } from '@angular/router'
import { IPostre } from '../Shared/data.model';

@Component({
    selector: 'postres',
    templateUrl: './postres.component.html',
    styleUrls: ['./postres.component.css']
})

export class ClasePostrePage implements OnInit{
    public postreMenu: any
    constructor(private auth: ClassServiceAuth, private actro: ActivatedRoute, private router: Router){}

    ngOnInit(){
        this.postreMenu=this.auth.getPostreList();
    }

    fnAdd(obj: IPostre){
        this.auth.addToCart(obj);
        this.router.navigate(['checkout']);
        console.log(obj);
      }

}
