import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { movieStack } from './data/movie_list';
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

  getAllMovies() {
    let i = 0;
    for (let movie in movieStack) {
      movieStack[movie].name = movie;
      this.allMovies[i] = movieStack[movie];
      i++;
    }
    return this.allMovies;
  }

  // Data from express
  // getSelectedMovieData( clipId ) {
  //   return this.http.get("http://10.240.0.77:3000/user/:" + clipId).subscribe(
  //     (data) => console.log(data["_body"]),
  //     (error) => {
  //       console.log("Error in Api");
  //     }
  //   )
  // }

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

  authenticateUser( user ) {
    this.http.post( "http://localhost:3000/login", user ).subscribe(
      (data) => {
        console.log("User is authenticated. ", data);
      },
      (err) => {
        console.log("User does not exist. ", err);
      }
    )
  }

  // static data
  getSelectedMovieData( clipId ) {
    this.currSelectedClipId = clipId;
    for(var id in this.allMovies) {
      if(this.currSelectedClipId == this.allMovies[id].id) {
        this.currSelectedMovie = this.allMovies[id];
      }
    }
    return this.currSelectedMovie;
  }

  getcurrentMovieComments( clipId, newComment ) {
    let currentMovieCommentsInfo : any;
    for(let item in this.allCommentStack) {
      if( clipId == this.allCommentStack[item].id || this.currSelectedClipId == this.allCommentStack[item].id ) {
        if(newComment == undefined) {
          currentMovieCommentsInfo = this.allCommentStack[item].user_info;
          this.getCurrMovieObj = this.allCommentStack[item];
        }                                                              
        else {
          this.allCommentStack[item].user_info.unshift( newComment );
          currentMovieCommentsInfo = this.allCommentStack[item].user_info;
        }
      }
    }
    return currentMovieCommentsInfo;
  }

}
