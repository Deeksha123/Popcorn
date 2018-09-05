import { Component, OnInit } from '@angular/core';
import { MovieService } from '../app.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(public movieService : MovieService) { }

  ngOnInit() {
      this.movieService.fetchData();
  }

}
