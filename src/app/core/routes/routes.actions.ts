import { Route } from './route';

export class RoutesAction {
  public static readonly type = '[Routes] Add route';
  constructor(public payload: Route) {}
}

export class GetRoutesAction {
  public static readonly type = '[Routes] Get routes';
}

export class RefreshRoutes {
  public static readonly type = '[Routes] Refresh routes';
  constructor(public payload) {}
}
