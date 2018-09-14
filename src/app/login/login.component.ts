import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    userName : new FormControl("", Validators.required),
    password : new FormControl("", Validators.required)
  });

  constructor() { }

  ngOnInit() {
    
  }

  success( loginForm ) {
    console.log(loginForm);

  }

}
