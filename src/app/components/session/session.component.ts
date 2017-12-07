import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {
  @Input() routeData: Array<RouteData>;

  dataSource = null;
  displayedColumns = ['grade', 'setter', 'attempt', 'complete', 'rate'];
  currentSessionData: Array<SessionRouteData> = new Array<SessionRouteData>();

  ngOnInit() {
    this.dataSource = new MatTableDataSource<RouteData>(this.routeData);
  }

  completeSession() {

  }

  addAttempt(routeId: string) {

  }

  addComplete(routeId: string) {

  }

  constructor() { }
}

interface RouteData {
  id: string;
  zone: string;
  type: string;
  grade: string;
  color: String;
  likes: string;
  dislikes: string;
}

class SessionRouteData {
  routeId: string;
  attempts: number;
  completed: number;
  comments: string;

  constructor(routeData: RouteData) {
    this.routeId = routeData.id;
    this.attempts = 0;
    this.completed = 0;
    this.comments = null;
  }

  addAttempt() {
    this.attempts++;
  }

  removeAttempt() {
    if (this.attempts > 0) {
      this.attempts--;
    }
  }

  addCompleted() {
    this.completed++;
  }

  removeCompleted() {
    if (this.completed > 0) {
      this.completed--;
    }
  }

  setComments(comments: string) {
    this.comments = comments;
  }

  setAttempts(attempts: number) {
    this.attempts = attempts;
  }

  setCompleted(completed: number) {
    this.completed = completed;
  }

}
