import { Component, OnInit } from '@angular/core'
import { ClassServiceAuth } from '../Shared/autorize.service'
import { ActivatedRoute } from '@angular/router'

@Component({
    selector: 'bebidas',
    templateUrl: './bebidasDetail.component.html'
})

export class ClaseBebidasDetail implements OnInit{

    public bebidasMenu: any
    constructor(private auth: ClassServiceAuth, private actro: ActivatedRoute){}

    ngOnInit(){
        this.bebidasMenu=this.auth.getBebidaById(+this.actro.snapshot.params["id"]);
    }

}
