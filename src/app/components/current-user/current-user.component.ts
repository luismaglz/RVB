import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.scss']
})
export class CurrentUserComponent implements OnInit {

  @Input() profile: any;

  constructor() { }

  ngOnInit() {
  }

}
