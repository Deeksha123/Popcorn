import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { MovieService } from '../app.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private movieService: MovieService,
    private router: Router
  ) { }

  ngOnInit() {

    this.registrationForm = this.formBuilder.group({

      firstName : [null, Validators.required],
      lastName : [null],
      email : [null, [Validators.required, Validators.email]],
      password : [null, Validators.required]

    });

  }

  successRegistration() {
    var self = this;
    var newUserObj = this.registrationForm.value;
    this.movieService.registerNewUser( newUserObj, function( data ) {
      self.registrationForm.reset();
      self.router.navigate(['login']);
    });

  }

}
