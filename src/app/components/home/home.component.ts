import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  sessions:any;

  getSessions() {
    this._dataService.getSessions().subscribe(sessions => {
      if (!sessions) { return null; }
      debugger;
      this.sessions = sessions;
    });
  }

  ngOnInit() {
    this.getSessions();
  }

  constructor(private _dataService: DataService) { }
}
