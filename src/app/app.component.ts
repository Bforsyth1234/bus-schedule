import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { RouteOptionsService } from './core/route-options/route-options.service';
import { Route } from './core/routes/route';
import { RoutesService } from './core/routes/routes.service';
import { Store, Select } from '@ngxs/store';
import { RoutesState, RoutesStateModel } from './core/routes/routes.state';
import { GetRoutesAction } from './core/routes/routes.actions';

@Component({
  selector: 'bus-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @Select(RoutesState.getState) getRoutes$: Observable<RoutesStateModel>;
  private routesSubsciption: Subscription;

  routes: Array<Route>;
  routes$: Observable<Route[]>

  constructor(
    private routeOptions: RouteOptionsService,
    private routesService: RoutesService,
    private store: Store,
  ) {
    this.store.dispatch(new GetRoutesAction());
  }

  ngOnInit() {
    this.loadRoutes();
    this.routesService.refresh('sf-muni');
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
      // this.routes.forEach(route => this.routeOptions.showRoute('sf-muni', route.tag));
    });
  }
  ngOnDestroy() {
    this.routesSubsciption.unsubscribe();
  }
}
