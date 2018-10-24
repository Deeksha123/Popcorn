import { Component , OnInit, Input } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../app.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit{

  @Input()

  currentSelection;
  // paramsSub;
  
  constructor(
    private movieService: MovieService
    // private route: ActivatedRoute
  ) {
    // this.paramsSub = route.params.subscribe(params => {
    //   let id = params['id'];
      
    //   if(id == null) { 
    //     this.currentSelection = this.movieService.getSelectedMovieData( this.movieService.currSelectedClipId, function(){  } );
    //   } else { 
    //     this.currentSelection = this.movieService.getSelectedMovieData( id, function(){  } );
    //   }

    // });
  }

  ngOnInit() {
    this.loadSelectedMovie();
  }

  loadSelectedMovie() {

    this.currentSelection = this.movieService.currSelectedMovie;

  }


}
