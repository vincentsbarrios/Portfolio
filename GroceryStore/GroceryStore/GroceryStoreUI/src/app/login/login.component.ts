import { Users } from './../models/users';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../Core/data.service';
import { FormGroup, FormControl } from '@angular/forms'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private service: DataService,
    private route: ActivatedRoute,
    private router: Router) {
    
   }

  list: Users[];

    profileForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });


  ngOnInit(): void {
    this.service.getAllUsers()
    .subscribe(
      (user : Users[]) => {
        this.list = user;
        console.log(this.list)
      },
      error => console.log(error)
    )
  }

  user : Users = {
    id : 0,
    FirstName : "",
    LastName : "",
    Username : "",
    Password : "",
    Email : "",
  }

  accessflag : Users = {
    id : -1,
    FirstName : "",
    LastName : "",
    Username : "",
    Password : "",
    Email : "",
  }

  onSubmitLogin(){
    var username = this.profileForm.get("username").value;
    var password = this.profileForm.get("password").value;
    this.user.Username = username
    this.user.Password = password
    
    
    this.service.verifiedAccount(this.user).subscribe( 
      x => this.accessflag.id = x.id
    );

    if(this.accessflag.id != -1)
    {
      this.service.setGlobalId(this.accessflag.id)
      this.router.navigate(['/home/'+ this.accessflag.id]);
    }
  }

}
