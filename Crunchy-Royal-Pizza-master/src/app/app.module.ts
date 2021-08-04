import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { ClassMainPageComponent } from "./mainpage.component";
import { ClassNavbarComponent } from "./nav/navbar.component";

import { RouterModule } from "@angular/router";
import { AppRoutes } from "./routes";
import { ClasePizzaPage } from "./pizza/pizza.component";
import { ClasePostrePage } from "./postres/postres.component";
import { ClaseMainContent } from "./mainpage/maincontent.component";
import { ClassLogin } from "./login/login.component";
import { ClassSignUp } from "./signup/signup.component";
import { ClassAddress } from "./address/address.component";
import { AgmCoreModule } from "@agm/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ClassCheckout } from "./chekout/checkout.component";
import { ClassServiceAuth } from "./Shared/autorize.service";
import { ClaseCartComponent } from "./cart/cartpage.component";
import { ClassAddPizza } from "./addpizzaAdmin/addpizza.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClasePizzaDetail } from "./pizzadetail/pizzadetail.component";
import { ClasePostreDetail } from "./postresDetail/postreDetail.component";
import { ClaseBebidasPage } from "./bebidas/bebidas.component";
import { ClaseBebidasDetail } from "./bebidasDetail/bebidasDetail.component";
import { ClaseComidasPage } from "./comidas/comidas.component";
import { ClaseComidasDetail } from "./comidasDetail/comidasDetail.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    ClassMainPageComponent,
    ClassNavbarComponent,
    ClasePizzaPage,
    ClaseMainContent,
    ClassLogin,
    ClassSignUp,
    ClassAddress,
    ClassCheckout,
    ClaseCartComponent,
    ClassAddPizza,
    ClasePizzaDetail,
    ClasePostrePage,
    ClasePostreDetail,
    ClaseBebidasPage,
    ClaseBebidasDetail,
    ClaseComidasPage,
    ClaseComidasDetail
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(AppRoutes),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAJGl5YlyWQwb3Zc-bOgmYt0tXdxzC_NsQ"
    }),
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [ClassServiceAuth],
  bootstrap: [ClaseMainContent]
})
export class AppModule {}
