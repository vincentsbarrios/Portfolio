import { Component, OnInit } from "@angular/core";
import { FormControl, Form, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ClassServiceAuth } from "../Shared/autorize.service";

@Component({
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class ClassSignUp implements OnInit {
  firstname: FormControl;
  lastname: FormControl;
  age: FormControl;
  username: FormControl;
  password: FormControl;
  perfilForm: FormGroup;

  constructor(private router: Router, private claseService: ClassServiceAuth) {
    //regex - regular expressions
    this.firstname = new FormControl("", [Validators.required]);
    this.lastname = new FormControl("", [Validators.required]);
    this.age = new FormControl("", [Validators.required]);
    this.username = new FormControl("", [Validators.required]);
    this.password = new FormControl("", [Validators.required]);
  }

  ngOnInit() {
    this.perfilForm = new FormGroup({
      firstname: this.firstname,
      lastname: this.lastname,
      age: this.age,
      username: this.username,
      password: this.password
    });
  }

  NoValidfirstname() {
    return this.firstname.invalid && this.firstname.touched;
  }

  NoValidlastname() {
    return this.lastname.invalid && this.lastname.touched;
  }

  NoValidage() {
    return this.age.invalid && this.age.touched;
  }

  NoValidusername() {
    return this.username.invalid && this.username.touched;
  }

  NoValidpassword() {
    return this.password.invalid && this.password.touched;
  }

  fnUpdate(formvalues) {
    this.claseService.addUser(
      formvalues.firstname,
      formvalues.lastname,
      formvalues.username,
      formvalues.password
    );
    this.router.navigate(["pizza"]);
  }

  fnCancel() {
    this.router.navigate(["home"]);
  }
}
