import { Component, OnInit } from '@angular/core'
import { ClassServiceAuth } from '../Shared/autorize.service'
import { ActivatedRoute, Router } from '@angular/router'
import { IPizza, IComida } from '../Shared/data.model';

@Component({
    selector: 'comidas',
    templateUrl: './comidas.component.html',
    styleUrls: ['./comidas.component.css']
})

export class ClaseComidasPage implements OnInit{
    public comidasMenu: any

    constructor(private auth: ClassServiceAuth, private actro: ActivatedRoute, private router: Router){}

    ngOnInit(){
        this.comidasMenu=this.auth.getComidaList();
    }

    fnAdd(obj: IComida){
        this.auth.addToCart(obj);
        this.router.navigate(['checkout']);
      }

}
