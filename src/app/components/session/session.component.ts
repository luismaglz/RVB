import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { DataService } from '../../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionRouteData, SessionRouteDataDictionary, IRouteData } from '../../models/all-models';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {
  @Input() routeData: Array<IRouteData>;

  dataSource = null;
  displayedColumns = ['grade', 'attempt', 'complete', 'rate'];
  currentSessionData: SessionRouteDataDictionary = new SessionRouteDataDictionary();

  ngOnInit() {
    this.getRoutes();
  }

  completeSession() {
    this._dataService.completeSession(this.currentSessionData).subscribe(response => {
      this.router.navigate(['home']);
    });
  }

  getRoutes() {
    this._dataService.getRoutes().subscribe(routeData => {
      if (!routeData) { return null; }
      this.dataSource = new MatTableDataSource<IRouteData>(routeData);
    });
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

  removeAttempt(routeId: string): void {
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

  removeComplete(routeId: string): void {
    if (!this.currentSessionData[routeId]) {
      this.currentSessionData[routeId] = new SessionRouteData(routeId);
    }
    this.currentSessionData[routeId].removeCompleted();
  }

  constructor(private _dataService: DataService, private route: ActivatedRoute,
    private router: Router) { }
}
