import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

import { MovieService } from '../app.service';

@Component({
  selector: 'gallery-component',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  allMovies : any;

  constructor(private movieService: MovieService, private router: Router) { }

  @Output() movieEventTriggered = new EventEmitter();

  ngOnInit() {
    // this.allMovies = this.movieService.getAllMovies();
    this.checkDomState();
  }

  checkDomState() {
    var self = this;
    var stopCheckingState = setInterval(function() {
      if(document.readyState.toLowerCase() == "complete") {
        self.showStarRatings();
        clearInterval( stopCheckingState );
      }
    }, 50);
  }

  showStarRatings() {
    let self = this;
    const starTotal = 10;
    let ratings = {}, idx = 0;
    // for(let i in this.allMovies) {
    //   ratings["movie_"+ idx] = this.allMovies[i].rating;
    //   idx++;
    // }

    // for(let rating in ratings) {  
    //   const starPercentage = (ratings[rating] / starTotal) * 100;
    //   var starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
    //   document.querySelector("."+ rating +" .stars-inner").setAttribute('style', 'width : '+starPercentageRounded+'');
    // }
    this.movieService.getAllMovies( function( movieCollection ) {
      self.allMovies = JSON.parse( movieCollection._body );
      for(let i of self.allMovies) {
        ratings[i._id] = i.IMDB;
        idx++;
      }
      for(let rating in ratings) {
        const starPercentage = (ratings[rating] / starTotal) * 100;
        //Below line is for if rating is out of 5.
        // var starPercentageRounded = `${(Math.round(starPercentage) / 10)}%`;
        setTimeout(function() {
          document.querySelector(".movie_"+ rating +" .stars-inner").setAttribute('style', 'width : '+starPercentage+'%');
        }, 0);
      }

    })
  }

  selectMovie(val: string) {
    // let movieSelectedFromGallery = this.movieService.getSelectedMovieData( val, function(){  } );
    // this.movieEventTriggered.emit( movieSelectedFromGallery,  );
  }

}
