import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-route-tracker',
  templateUrl: './route-tracker.component.html',
  styleUrls: ['./route-tracker.component.css']
})
export class RouteTrackerComponent implements OnInit {
  routes = null;

  ngOnInit() {
    this.getRoutes();
  }
  
  getRoutes(){
    this._dataService.getRoutes().subscribe(data => {
      if(!data) return null;
      this.routes = data;
    })
  }
  
  constructor(private _dataService: DataService) { }
}
