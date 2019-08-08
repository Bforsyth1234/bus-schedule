
export class GetVehicleLocationAction {
  public static readonly type = '[VehicleLocation] Get VehicleLocation';
}

export class RefreshVehicleLocation {
  public static readonly type = '[VehicleLocation] Refresh VehicleLocation';
  constructor(public payload) {}
}
