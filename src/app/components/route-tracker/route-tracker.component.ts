import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-route-tracker',
  templateUrl: './route-tracker.component.html',
  styleUrls: ['./route-tracker.component.scss']
})
export class RouteTrackerComponent implements OnInit {
  @Input() token: string;
  @Input() routeData: any;

  dataSource = null;
  displayedColumns = ['grade', 'setter', 'likes', 'dislikes'];

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Element>(this.routeData);
  }
  constructor() { }
}
