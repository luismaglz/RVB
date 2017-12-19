import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionRouteData, SessionRouteDataDictionary, IRouteData } from '../../models/all-models';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {
  routeData: Array<IRouteData>;
  currentSessionData: SessionRouteDataDictionary = new SessionRouteDataDictionary();

  ngOnInit() {
    this.getRoutes();
  }

  completeSession() {
    for (const routeId in this.currentSessionData) {
      if (this.currentSessionData.hasOwnProperty(routeId)) {
        const route = this.currentSessionData[routeId];
        if (route.attempts === 0 && route.completed === 0) {
          delete route[routeId];
        }
      }
    }
    this._dataService.completeSession(this.currentSessionData).subscribe(response => {
      this.router.navigate(['home']);
    });
  }

  getRoutes() {
    this._dataService.getRoutes().subscribe(routeData => {
      if (!routeData) { return null; }
      this.routeData = routeData;
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

  addAttempt(routeId: string, type: number): void {
    if (!this.currentSessionData[routeId]) {
      this.currentSessionData[routeId] = new SessionRouteData(routeId, type);
    }
    this.currentSessionData[routeId].addAttempt();
  }

  removeAttempt(routeId: string, type: number): void {
    if (this.currentSessionData[routeId]) {
      this.currentSessionData[routeId].removeAttempt();
    }
  }

  addComplete(routeId: string, type: number): void {
    if (!this.currentSessionData[routeId]) {
      this.currentSessionData[routeId] = new SessionRouteData(routeId, type);
    }
    this.currentSessionData[routeId].addCompleted();
  }

  removeComplete(routeId: string): void {
    if (this.currentSessionData[routeId]) {
      this.currentSessionData[routeId].removeCompleted();
    }
  }

  constructor(private _dataService: DataService, private route: ActivatedRoute,
    private router: Router) { }
}
