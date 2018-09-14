import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { MovieService } from '../app.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  commentForm: FormGroup;

  userComment = { commentBox: '', rating: '' };

  currentClipCommentObj = {};
  currentMovieUserInfo = [];
  selectedMovie;
  newComment = "";
  currentMovieUserComments = [];

  //To do from service
  currentLoggedInUser = "Deeksha";

  constructor(public movieService : MovieService, builder: FormBuilder) {
    this.commentForm = builder.group({
      commentBox: ['', Validators.required],
      rating: ''
    })
  }

  ngOnInit() {
      this.movieService.fetchData();
      this.getCurrentMovieCommentsData();
  }

  getCurrentMovieCommentsData () {
    let currClipId = this.movieService.currSelectedMovie["id"];
    this.currentMovieUserInfo = this.movieService.getcurrentMovieComments( currClipId, undefined );
    this.currentClipCommentObj = this.movieService.getCurrMovieObj;
    this.selectedMovie = this.movieService.getSelectedMovieData( currClipId );
  }

  addNewComment() {
    let newCommentObj = {};

    if (this.commentForm.invalid) {
      console.log("Invalid form fields..!");
    }
    else {
      var dateObj = new Date();

      newCommentObj["user_id"] = this.currentLoggedInUser;
      newCommentObj["comment"] = this.userComment.commentBox;
      newCommentObj["comment_date"] = dateObj.getMonth() + "/" + dateObj.getDate() + "/" + dateObj.getFullYear();
      newCommentObj["user_rating"] = this.userComment.rating;
      newCommentObj["loggedIn"] = true; //To do from Service
      this.currentMovieUserInfo = this.movieService.getcurrentMovieComments( undefined, newCommentObj );
    }
    this.commentForm.reset();
  }

}
