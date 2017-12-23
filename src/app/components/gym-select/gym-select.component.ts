import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../data.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { IAppState, IBaseGym } from '../../models/all-models';
import * as  GymActions from '../../store/actions/gym.actions';
import * as  RoutesActions from '../../store/actions/routes.actions';

@Component({
  selector: 'app-gym-select',
  templateUrl: './gym-select.component.html',
  styleUrls: ['./gym-select.component.scss']
})
export class GymSelectComponent implements OnInit {

  gyms: Observable<Array<IBaseGym>>;

  ngOnInit() {
    this.gyms = this.store.select(state => state.gyms.gyms);
    this.store.dispatch(new GymActions.GetGyms());

  }

  gymSelected(gymId) {
    if (gymId) {
      this.store.dispatch(new GymActions.GetGymDetails(gymId));
      this.store.dispatch(new RoutesActions.GetRoutes(gymId));
      this.router.navigate(['session'], { skipLocationChange: true });
    }
  }

  constructor(private _dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<IAppState>) { }
}
