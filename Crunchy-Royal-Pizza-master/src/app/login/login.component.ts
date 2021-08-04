import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ClassServiceAuth } from '../Shared/autorize.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class ClassLogin implements OnInit{

  username:FormControl
  password:FormControl
  perfilForm:FormGroup

  constructor(public auth:ClassServiceAuth,  private router: Router) {
    //regex - regular expressions 
    this.username = new FormControl('',[Validators.required]);
    this.password = new FormControl('',[Validators.required]);
  }
  

  ngOnInit()
  {
      this.perfilForm = new FormGroup({
          username: this.username,
          password: this.password,
      });
  }


  
  NoValidUsername(){
    return this.username.invalid && this.username.touched;
  }

  NoValidpassword(){
    return this.password.invalid && this.password.touched;
  }
  
   fnUpdate(formvalue){
      //this.auth.ActualizarUsuario(formvalue.firstName, formvalue.lastName);

      this.auth.loginUser(formvalue.username, formvalue.password);
      this.router.navigate(['home']);
        /*
        if(this.perfilForm.valid){
          this.auth.ActualizarUsuario(formvalue.username, formvalue.password);
          this.router.navigate(['home']);
        }
        */
  }

  fnCancel(){
    this.router.navigate(['home']);
  }


/*

 firstName:FormControl
 lastName:FormControl
 perfilForm: FormGroup

 constructor(public auth:AuthService, private router: Router) {
   this.firstName = new FormControl('', Validators.required);
   this.lastName = new FormControl('', Validators.required);
 }

 ngOnInit()
 {
     this.perfilForm = new FormGroup({
         firstName: this.firstName,
         lastName: this.lastName
     });
 }

 NoValidUsername(){
  return this.firstName.invalid && this.firstName.touched;
}

NoValidpassword(){
  return this.lastName.invalid && this.lastName.touched;
}

 fnUpdate(formvalue){
   if(this.perfilForm.valid){
     this.auth.ActualizarUsuario(formvalue.firstName, formvalue.lastName);
     this.router.navigate(['home']);
   }
 }
*/

}
