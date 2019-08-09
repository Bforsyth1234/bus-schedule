import { State, Action, Selector, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { VehicleLocation } from './vehicle-location';
import { GetVehicleLocationAction } from './vehicle-location.action';
import { VehicleLocationsService } from './vehicle-locations.service';

export interface VehicleLocationStateModel {
  vehicleLocation: VehicleLocation[];
}

@State<VehicleLocationStateModel>({
  name: 'VehicleLocation',
})
export class VehicleLocationState {
  @Selector()
  public static getState(state: VehicleLocationStateModel) {
    return state;
  }

  constructor(private vehicleLocationService: VehicleLocationsService) {}

  @Action(GetVehicleLocationAction, { cancelUncompleted: true })
  public getVehicleLocation(ctx: StateContext<VehicleLocationStateModel>) {
    this.vehicleLocationService.refresh('sf-muni');
    setInterval(() => this.vehicleLocationService.refresh('sf-muni'), 15000);
    return this.vehicleLocationService.data.pipe(tap(vehicleLocationData => {
      const state = ctx.getState();
        ctx.setState({
            ...state.vehicleLocation,
            vehicleLocation: vehicleLocationData.locations
        })
    }));
  }
}
