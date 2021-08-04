import { Component, OnInit } from '@angular/core'
import { ClassServiceAuth } from '../Shared/autorize.service'
import { ActivatedRoute } from '@angular/router'

@Component({
    selector: 'comidas',
    templateUrl: './comidasDetail.component.html'
})

export class ClaseComidasDetail implements OnInit{

    public comidasMenu: any
    constructor(private auth: ClassServiceAuth, private actro: ActivatedRoute){}

    ngOnInit(){
        this.comidasMenu=this.auth.getComidaById(+this.actro.snapshot.params["id"]);
    }

}
