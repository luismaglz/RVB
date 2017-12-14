import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-session-header',
  templateUrl: './session-header.component.html',
  styleUrls: ['./session-header.component.scss']
})
export class SessionHeaderComponent implements OnInit {
  @Output() sessionCompleted = new EventEmitter<boolean>();

  completeSession(){
    this.sessionCompleted.emit(true);
  }
  constructor() { }

  ngOnInit() {
  }

}
