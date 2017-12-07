import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {
  @Input() routeData: any;

  routeDataSource: MatTableDataSource<Element>;
  displayedColumns = ['grade', 'setter', 'rate', 'attempt', 'complete'];
  currentSessionData: SessionData = new SessionData();

  constructor() { }

  ngOnInit() {
    this.routeDataSource = new MatTableDataSource<Element>(this.routeData);
  }

  completeSession() {

  }
}

class SessionData {
  routes: Array<SessionRouteData>;

  constructor() {
    this.routes = new Array<SessionRouteData>();
  }
}

class SessionRouteData {
  routeId: string;
  attempts: number;
  completed: number;
  comments: string;

  constructor(routeId: string) {
    this.routeId = routeId;
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
