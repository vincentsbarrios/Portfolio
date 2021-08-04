import { Component, OnInit } from '@angular/core';
import { DataService } from '../Core/data.service';
import { Users } from '../models/users';
import { FormGroup, FormControl } from '@angular/forms'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor( private service: DataService) { }

  newUser : Users = {
    id : 0,
    FirstName : "",
    LastName : "",
    Username : "",
    Password : "",
    Email : "",
  }

  ngOnInit(): void {
  
  }

  signUpForm = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
  });



  onSubmit(){    
    //console.log(this.signUpForm.value)
    this.newUser.FirstName = this.signUpForm.get("firstname").value;
    this.newUser.LastName = this.signUpForm.get("lastname").value;
    this.newUser.Username = this.signUpForm.get("username").value;
    this.newUser.Password = this.signUpForm.get("password").value;
    this.newUser.Email = this.signUpForm.get("email").value;
    console.log(this.newUser)
    this.service.addNewUser(this.newUser).subscribe();
  }

}
