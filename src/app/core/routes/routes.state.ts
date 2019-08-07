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

  @Selector()
  public static getRoutes(state: RoutesStateModel) {
    return state.routes;
  }

  constructor(private routesService: RoutesService) {
  }

  @Action(GetRoutesAction)
  public getRoutes(ctx: StateContext<RoutesStateModel>) {
    return this.routesService.data.pipe(tap(newRouteData => {
      const state = ctx.getState();
        ctx.setState({
            ...state.routes,
            routes: newRouteData
        })
    }));
  }

  @Action(RoutesAction)
  public add(ctx: StateContext<RoutesStateModel>, { payload }: RoutesAction) {
    const stateModel = ctx.getState();
    stateModel.routes = [...stateModel.routes, payload];
    ctx.setState(stateModel);
  }
}
