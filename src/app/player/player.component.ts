import { Component , OnInit, Input } from '@angular/core';
import { MovieService } from '../app.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit{

  @Input()

  currentSelection;
  
  constructor( private movieService: MovieService ) { }

  ngOnInit() {
    this.loadSelectedMovie();
  }

  loadSelectedMovie() {
    let self = this;
    this.movieService.updateOnloadData(function( movieID ) {
      self.movieService.getSelectedMovieData( movieID  ,function( movieData ){
        self.currentSelection = movieData;
      });
    });
  }

}