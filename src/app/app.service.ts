import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { movieStack } from './data/movie_list';
import 'rxjs';

@Injectable()
export class MovieService {

  constructor(private http: Http) { }
  allMovies = [];

  getAllMovies() {
    let i = 0;
    for (let movie in movieStack) {
      movieStack[movie].name = movie;
      this.allMovies[i] = movieStack[movie];
      i++;
    }
    return this.allMovies;
  }

  fetchData() {
    return this.http.get("http://10.240.0.77:3000/user").subscribe(
      (data) => console.log(data["_body"]),
      (error) => {
        console.log("Error in Api");
      }
    )
  }

}
