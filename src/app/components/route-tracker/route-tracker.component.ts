import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../data.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-route-tracker',
  templateUrl: './route-tracker.component.html',
  styleUrls: ['./route-tracker.component.scss']
})
export class RouteTrackerComponent implements OnInit {
  @Input() token: string;

  dataSource = null;
  displayedColumns = ['zone', 'color', 'grade', 'setter', 'attempts', 'sends', 'addAttempt'];

  ngOnInit() {
    this.getRoutes();
  }

  getRoutes() {
    this._dataService.getRoutes().subscribe(data => {
      if (!data) { return null; }
      this.dataSource = new MatTableDataSource<Element>(data);
    });
  }

  createRoutes() {
    this._dataService.createRoutes().subscribe(data => {
      debugger;
    });
  }

  constructor(private _dataService: DataService) { }
}
