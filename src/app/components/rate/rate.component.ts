import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})
export class RateComponent implements OnInit {

  @Input() routeId: string;
  @Output() rateRoute = new EventEmitter();

  selectedRating: Rating = Rating.unselected;

  constructor() { }

  ngOnInit() {
  }

  likeRoute() {
    if (this.selectedRating === Rating.like) {
      // If user already liked the route and would like to undo the action then the like is removed from the route rating
      this.selectedRating = Rating.unselected;
      this.rateRoute.emit(new RouteRating(this.routeId, Rating.dislike));
    } else {
      this.selectedRating = Rating.like;
      this.rateRoute.emit(new RouteRating(this.routeId, Rating.like));
    }
  }

  dislikeRoute() {
    if (this.selectedRating === Rating.dislike) {
      // If user already disliked the route and would like to undo the action then the dislike is removed from the route rating
      this.selectedRating = Rating.unselected;
      this.rateRoute.emit(new RouteRating(this.routeId, Rating.like));
    } else {
      this.selectedRating = Rating.like;
      this.rateRoute.emit(new RouteRating(this.routeId, Rating.dislike));
    }
  }

}

enum Rating {
  unselected,
  like,
  dislike
}

class RouteRating {
  routeId: string;
  routeRating: Rating;

  constructor(routeId: string, rating: Rating) {
    this.routeId = routeId;
    this.routeRating = rating;
  }
}
