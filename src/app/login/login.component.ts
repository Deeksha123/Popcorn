import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { MovieService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = new FormGroup({
    email : new FormControl("", Validators.required),
    password : new FormControl("", Validators.required)
  });

  constructor( private route: Router, private movieService: MovieService) { }

  loginBtnClickHandler() {
    var self = this;
    var loginObj = this.loginForm.value;
    this.movieService.authenticateUser( loginObj, function( authUser ) {
      var validUserData = JSON.parse(authUser._body)[0];
      if( authUser._body == "Incorrect user ID." ) {
        alert("User Id is incorrect, Please enter registered user.");
      }
      if( authUser._body == "Incorrect password." ) {
        alert("Password is incorrect, Please try again.");
      }
      if( typeof( validUserData ) == "object" ) {
        self.route.navigate(['dashboard']);
      }
    });

  }

}
