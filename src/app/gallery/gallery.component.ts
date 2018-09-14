import { Component, OnInit } from '@angular/core';
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

  ngOnInit() {
    this.allMovies = this.movieService.getAllMovies();
    this.checkDomState()
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

  selectMovie(val: string) {
    let movieSelectedFromGallery = this.movieService.getSelectedMovieData( val );
    console.log("movieSelectedFromGallery_", movieSelectedFromGallery);
  }

}
