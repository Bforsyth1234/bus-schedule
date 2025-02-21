import { State, Action, Selector, StateContext } from '@ngxs/store';
import { RoutesAction, GetRoutesAction } from './routes.actions';
import { Route } from './route';
import { RoutesService } from './routes.service';
import { tap } from 'rxjs/operators';

export interface RoutesStateModel {
  routes: Route[];
}

@State<RoutesStateModel>({
  name: 'routes',
})
export class RoutesState {
  @Selector()
  public static getState(state: RoutesStateModel) {
    return state;
  }

  constructor(private routesService: RoutesService) {}

  @Action(GetRoutesAction, { cancelUncompleted: true })
  public getRoutes(ctx: StateContext<RoutesStateModel>) {
    this.routesService.refresh('sf-muni');
    return this.routesService.data.pipe(tap(newRouteData => {
      const state = ctx.getState();
        ctx.setState({
            ...state.routes,
            routes: newRouteData
        })
    }));
  }
}
