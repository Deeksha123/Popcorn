import { Component , OnInit } from '@angular/core';
import { MovieService } from '../app.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit{

  currentSelection = this.movieService.getSelectedMovieData( this.movieService.currSelectedMovie );

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.getCurrentSelectedMovie();
  }

  getCurrentSelectedMovie() {
    var currentMovie;
  }

}
