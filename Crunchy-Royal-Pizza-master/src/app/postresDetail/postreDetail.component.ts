import { Component, OnInit } from '@angular/core'
import { ClassServiceAuth } from '../Shared/autorize.service'
import { ActivatedRoute } from '@angular/router'

@Component({
    selector: 'postres',
    templateUrl: './postreDetail.component.html'
})

export class ClasePostreDetail implements OnInit{

    public postreMenu: any
    constructor(private auth: ClassServiceAuth, private actro: ActivatedRoute){}

    ngOnInit(){
        this.postreMenu=this.auth.getPostreById(+this.actro.snapshot.params["id"]);
    }

}
