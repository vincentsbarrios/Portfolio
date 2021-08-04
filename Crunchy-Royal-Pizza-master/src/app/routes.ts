import {Routes} from "@angular/router";
import { ClassMainPageComponent } from './mainpage.component';
import { ClasePizzaPage } from './pizza/pizza.component';
import { ClasePostrePage } from './postres/postres.component'
import { ClassLogin } from './login/login.component';
import { ClassSignUp } from './signup/signup.component';
import { ClassAddress } from './address/address.component';
import { ClassCheckout } from './chekout/checkout.component';
import { ClassAddPizza } from './addpizzaAdmin/addpizza.component';
import { ClasePizzaDetail } from './pizzadetail/pizzadetail.component';
import { ClasePostreDetail } from './postresDetail/postreDetail.component';
import { ClaseBebidasPage } from './bebidas/bebidas.component'
import { ClaseBebidasDetail } from './bebidasDetail/bebidasDetail.component';
import { ClaseComidasPage } from './comidas/comidas.component';
import { ClaseComidasDetail } from './comidasDetail/comidasDetail.component';

export const AppRoutes: Routes = [
    {path: 'pizzadetail', component:ClasePizzaDetail},
    {path: 'addpizza', component:ClassAddPizza},
    {path: 'checkout', component:ClassCheckout},
    {path: 'address', component:ClassAddress},
    {path: 'registro', component:ClassSignUp},
    {path: 'login', component:ClassLogin},
    {path: 'pizza', component:ClasePizzaPage},
    {path: 'home', component:ClassMainPageComponent},
    {path: '', redirectTo:'/home', pathMatch: 'full'},
    {path: 'pizza/:id', component: ClasePizzaDetail},
    {path: 'postres', component: ClasePostrePage},
    {path: 'postres/:id', component: ClasePostreDetail},
    {path: 'bebidas', component: ClaseBebidasPage},
    {path: 'bebidas/:id', component: ClaseBebidasDetail},
    {path: 'comidas', component: ClaseComidasPage},
    {path: 'comidas/:id', component: ClaseComidasDetail}

];