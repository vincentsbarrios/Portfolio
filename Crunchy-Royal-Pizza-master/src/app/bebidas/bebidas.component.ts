import { Component, OnInit } from '@angular/core'
import { ClassServiceAuth } from '../Shared/autorize.service'
import { ActivatedRoute, Router } from '@angular/router'
import { IBebida } from '../Shared/data.model';

@Component({
    selector: 'bebidas',
    templateUrl: './bebidas.component.html',
    styleUrls: ['./bebidas.component.css']
})

export class ClaseBebidasPage implements OnInit{
    public bebidasMenu: any
    constructor(private auth: ClassServiceAuth, private actro: ActivatedRoute, private router: Router){}

    ngOnInit(){
        this.bebidasMenu=this.auth.getBebidasList();
    }

    fnAdd(obj: IBebida){
        this.auth.addToCart(obj);
        this.router.navigate(['checkout']);
        console.log(obj);
      }

}
