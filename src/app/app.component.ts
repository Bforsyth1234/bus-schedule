import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';

import { Route } from './core/routes/route';
import { RoutesState, RoutesStateModel } from './core/routes/routes.state';
import { GetRoutesAction } from './core/routes/routes.actions';

@Component({
  selector: 'bus-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @Select(RoutesState.getState) getRoutes$: Observable<RoutesStateModel>;
  public routes: Array<Route>;
  private routesSubsciption: Subscription;

  constructor(
    private store: Store,
  ) {
    this.store.dispatch(new GetRoutesAction());
  }

  ngOnInit() {
    this.loadRoutes();
  }

  async loadRoutes() {
    await this.getRoutes$.subscribe(routesState => {
      if (routesState.routes && routesState.routes.length > 0) {
        this.routes = routesState.routes.sort((a, b) => {
          if (a.title < b.title) { return -1; }
          if (a.title > b.title) { return 1; }
          return 0;
        });
      }
    });
  }

  ngOnDestroy() {
    this.routesSubsciption.unsubscribe();
  }
}
