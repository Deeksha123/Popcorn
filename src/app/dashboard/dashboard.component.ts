import { Component, OnInit } from '@angular/core';
import { MovieService } from '../app.service';
import { BrowserModule, DomSanitizer } from "@angular/platform-browser";
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  constructor(private movieService: MovieService, private sanitizer: DomSanitizer, private router: Router) { }

  allMovies : any;
  allMoviesrc = [];
  currentSelectedMovie = "";

  ngOnInit() {
    this.checkDomState();
    // this.renderVideoInSafeState();
  }

  checkDomState() {
    let self = this;
    var stopCheckingState = setInterval(function() {
      if(document.readyState.toLowerCase() == "complete") {
        clearInterval( stopCheckingState );
        self.showMovieGrid();
        self.updateSignInDetails();
      }
    }, 50);
  }

  updateSignInDetails() {
    this.movieService.updateOnloadData(function(){ });
  }

  showMovieGrid() {
    let self = this;
    const starTotal = 10;
    let ratings = {}, idx = 0;
    
    this.movieService.getAllMovies( function( movieCollection ) {
      self.allMovies = JSON.parse( movieCollection._body );

      for(let i of self.allMovies) {
        ratings[i._id] = i.IMDB;
        idx++;
      }
      for(let rating in ratings) {
        const starPercentage = (ratings[rating] / starTotal) * 100;
        //Below line is for rating out of 5.
        // var starPercentageRounded = `${(Math.round(starPercentage) / 10)}%`;
        setTimeout(function() {
          document.querySelector(".movie_"+ rating +" .stars-inner").setAttribute('style', 'width : '+starPercentage+'%');
        }, 0);
      }

    })
  }

  /*renderVideoInSafeState() {
    for(let i in this.allMovies) {
      this.allMovies[i].src = this.sanitizer.bypassSecurityTrustUrl(this.allMovies[i].src)["changingThisBreaksApplicationSecurity"];
    }
  }*/

  selectMovie(idx : string) {

    let currentMovie;
    let self = this;
    this.currentSelectedMovie = idx;
    this.movieService.getSelectedMovieData( this.currentSelectedMovie, function( data ) {
      currentMovie = data;
      self.router.navigate(['player']);
    });

  }
 }
