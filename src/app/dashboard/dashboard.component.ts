import { Component, OnInit } from '@angular/core';
import { MovieService } from '../app.service';
import { BrowserModule, DomSanitizer } from "@angular/platform-browser";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  constructor(private movieService: MovieService, private sanitizer: DomSanitizer) { }

  allMovies : any;
  allMoviesrc = [];

  ngOnInit() {
    this.allMovies = this.movieService.getAllMovies();
    this.checkDomState();
    this.renderVideoInSafeState();
  }

  checkDomState() {
    var self = this;
    var stopCheckingState = setInterval(function() {
      if(document.readyState.toLowerCase() == "complete") {
        self.showMovieGrid();
        clearInterval( stopCheckingState );
      }
    }, 50);
  }

  showMovieGrid() {
    const starTotal = 5;
    let ratings = {}, idx = 0;
    for(let i in this.allMovies) {
      ratings["movie_"+ idx] = this.allMovies[i].rating;
      idx++;
    }

    for(let rating in ratings) {  
      const starPercentage = (ratings[rating] / starTotal) * 100;
      var starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
      document.querySelector("."+ rating +" .stars-inner").setAttribute('style', 'width : '+starPercentageRounded+'');
    }
  }

  renderVideoInSafeState() {
    
    for(let i in this.allMovies) {
      this.allMovies[i].src = this.sanitizer.bypassSecurityTrustUrl(this.allMovies[i].src)["changingThisBreaksApplicationSecurity"];
    }
    
  }

  selectMovie(idx : number) {
    console.log(idx);
  }
 }
