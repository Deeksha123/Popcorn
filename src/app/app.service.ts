import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

// import { movieStack } from './data/movie_list';
import { commentStack } from './data/user_comments';
import 'rxjs';

@Injectable()
export class MovieService{

  constructor(private http: Http) { }
  allMovies = [];
  currSelectedMovie = "";
  allCommentStack = commentStack;
  getCurrMovieObj = {};
  currSelectedClipId = "";
  currentLoggedInUser = "";

  getAllMovies( successHandler ) {
    this.http.get( "http://localhost:3000/dashboard" ).subscribe(
      (data) => {
        successHandler( data );
      },
      (error) => {
        console.log("Movie collection is empty.");
      }
    )
  }

  registerNewUser( newUser , successHandler) {
    this.http.post( "http://localhost:3000/register", newUser ).subscribe(
      (data) => {
        successHandler( data )
      },
      (error) => {
        console.log("Error in Api", error);
      }
    );
  }

  authenticateUser( user, successHandler ) {
    this.http.post( "http://localhost:3000/login", user ).subscribe(
      (data) => {
        this.currentLoggedInUser = JSON.parse(data["_body"])[0];
        successHandler( data );
      },
      (err) => {
        console.log("User does not exist. ", err);
      }
    )
  }

  updateOnloadData( successHandler ) {
    this.http.get( "http://localhost:3000/login_user" ).subscribe(
      (data) => {
        this.currentLoggedInUser = JSON.parse(data["_body"])[0];
        if(this.currentLoggedInUser["selectedMovie_Id"] != undefined) {
          this.currSelectedClipId = this.currentLoggedInUser["selectedMovie_Id"];
          successHandler( this.currSelectedClipId );
        }
      },
      (err) => {
        console.log("error in fetching logged in user id.", err);
      }
    )
  }

  getSelectedMovieData( clipId, successHandler ) {
    this.currSelectedClipId = clipId;
    this.http.get( "http://localhost:3000/player/:" + clipId + "_" + this.currentLoggedInUser['loggedInUser_Id'] ).subscribe(
      (data) => {
        this.currSelectedMovie = JSON.parse(data["_body"])[0];
        successHandler( this.currSelectedMovie );
      },
      (err) => {
        console.log("Error in URL.")
      }
    )
  }

  getcurrentMovieComments( clipId, newComment, successHandler ) {
    let currentMovieCommentsInfo : any;
    // for(let item in this.allCommentStack) {
    //   if( clipId == this.allCommentStack[item].id || this.currSelectedClipId == this.allCommentStack[item].id ) {
    //     if(newComment == undefined) {
    //       currentMovieCommentsInfo = this.allCommentStack[item].user_info;
    //       this.getCurrMovieObj = this.allCommentStack[item];
    //     }                                                              
    //     else {
    //       this.allCommentStack[item].user_info.unshift( newComment );
    //       currentMovieCommentsInfo = this.allCommentStack[item].user_info;
    //     }
    //   }
    // }
    // return currentMovieCommentsInfo;
    this.http.get("http://localhost:3000/movieplayer/:" + clipId ).subscribe(
      (data) => {
        currentMovieCommentsInfo = JSON.parse(data['_body'])[0];
        successHandler( currentMovieCommentsInfo );
      },
      (err) => {
        console.log("Wrong Movie ID.")
      }
    )

  }

}
