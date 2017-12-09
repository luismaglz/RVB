import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {
  @Input() routeData: Array<RouteData>;

  dataSource = null;
  displayedColumns = ['grade', 'attempt', 'complete', 'rate'];
  currentSessionData: { [routeId: string]: SessionRouteData } = {};

  ngOnInit() {
    this.dataSource = new MatTableDataSource<RouteData>(this.routeData);
  }

  completeSession() {

  }

  getAttempts(routeId: string): number {
    if (this.currentSessionData[routeId]) {
      return this.currentSessionData[routeId].attempts;
    }
    return 0;
  }

  getCompleted(routeId: string): number {
    if (this.currentSessionData[routeId]) {
      return this.currentSessionData[routeId].completed;
    }
    return 0;
  }

  addAttempt(routeId: string): void {
    if (!this.currentSessionData[routeId]) {
      this.currentSessionData[routeId] = new SessionRouteData(routeId);
    }
    this.currentSessionData[routeId].addAttempt();
  }

  removeAttempt(routeId:string):void{
    if (!this.currentSessionData[routeId]) {
      this.currentSessionData[routeId] = new SessionRouteData(routeId);
    }
    this.currentSessionData[routeId].removeAttempt();
  }

  addComplete(routeId: string): void {
    if (!this.currentSessionData[routeId]) {
      this.currentSessionData[routeId] = new SessionRouteData(routeId);
    }
    this.currentSessionData[routeId].addCompleted();
  }

  removeComplete(routeId:string):void{
    if (!this.currentSessionData[routeId]) {
      this.currentSessionData[routeId] = new SessionRouteData(routeId);
    }
    this.currentSessionData[routeId].removeCompleted();
  }

  constructor(private _dataService: DataService) { }
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
