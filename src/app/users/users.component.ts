import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { MovieService } from '../app.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @Input()

  commentForm: FormGroup;

  userComment = { commentBox: '', rating: '' };

  currentClipCommentObj = {};
  currentMovieUserInfo = [];
  selectedMovie;
  newComment = "";
  movieId= "";
  currentMovieUserComments = [];

  currentLoggedInUser = this.movieService.currentLoggedInUser;
  // paramsSub;

  constructor(
      public movieService : MovieService, 
      builder: FormBuilder,
      private route: ActivatedRoute
    ) {
    this.commentForm = builder.group({
      commentBox: ['', Validators.required],
      rating: ''
    });

    // this.paramsSub = route.params.subscribe(params => {
    //   let id = params['id'];
      
    //   if(id != null) { 
    //     this.getCurrentMovieCommentsData( id )
    //   }
      
    // });
  }

  ngOnInit() {
    this.loadPage();
    this.getCurrentMovieCommentsData();
  }

  loadPage() {
    let self = this;
    this.movieService.updateOnloadData(function( movieID ) {
      self.movieId = movieID;
      self.movieService.getSelectedMovieData( movieID  ,function( movieData ){
        console.log("movieData", movieData)
        self.selectedMovie = movieData;
      });
    });
  }

  getCurrentMovieCommentsData () {
    let self = this;
    // let movieId = this.movieService.currSelectedClipId;
    // this.selectedMovie = this.movieService.currSelectedMovie;
    // if(id == undefined) {
    //   currClipId = this.movieService.currSelectedMovie["id"];
    // } else {
    //   currClipId = id;
    // }
    this.movieService.getcurrentMovieComments( this.movieId, undefined, function( commentObj ) {
      if(commentObj != undefined) 
        self.currentMovieUserInfo = commentObj.user_info;
      self.currentMovieUserInfo = [];

    });
    // this.currentClipCommentObj = this.movieService.getCurrMovieObj;
  }

  addNewComment() {
    let newCommentObj = {};

    if (this.commentForm.invalid) {
      console.log("Invalid form fields..!");
    }
    else {
      var dateObj = new Date();
      newCommentObj["user_id"] = this.currentLoggedInUser;
      newCommentObj["name"] = this.currentLoggedInUser;
      newCommentObj["comment"] = this.userComment.commentBox;
      newCommentObj["comment_date"] = dateObj.getMonth() + "/" + dateObj.getDate() + "/" + dateObj.getFullYear();
      newCommentObj["user_rating"] = this.userComment.rating;
      newCommentObj["loggedIn"] = true; //To do from Service
      // this.currentMovieUserInfo = this.movieService.getcurrentMovieComments( undefined, newCommentObj );
    }
    // this.commentForm.reset();
  }

}