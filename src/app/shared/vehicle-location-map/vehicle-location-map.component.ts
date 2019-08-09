import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { MarkerCollection } from './marker-collection';
import { RouteOptionsService } from '../../core/route-options/route-options.service';
import { Store, Select } from '@ngxs/store';
import { VehicleLocationStateModel, VehicleLocationState } from 'app/core/vehicle-locations/vehicle-location.state';
import { GetVehicleLocationAction } from '../../core/vehicle-locations/vehicle-location.action';
import { VehicleLocation } from '../../core/vehicle-locations/vehicle-location';

declare var google: any;

@Component({
  selector: 'bus-vehicle-location-map',
  templateUrl: './vehicle-location-map.component.html',
  styleUrls: ['./vehicle-location-map.component.scss']
})
export class VehicleLocationMapComponent implements OnDestroy, OnInit {
  @Select(VehicleLocationState.getState) getVehicleData$: Observable<VehicleLocationStateModel>;
  @ViewChild('vehicleLocationMap', {static: true}) vehicleLocationMapElement: ElementRef;

  private map;
  private markers: MarkerCollection;
  private vehicleSubscription: Subscription;
  private routeOptionsSubscription: Subscription;

  constructor(
    private routeOptions: RouteOptionsService,
    private store: Store,
    ) {
    this.store.dispatch(new GetVehicleLocationAction());
  }

  ngOnInit() {
    this.subscribeToVehicleData();
    this.createMap();
    this.subscribeToRouteOptionsChanges();
  }

  ngOnDestroy() {
    this.vehicleSubscription.unsubscribe();
    this.routeOptionsSubscription.unsubscribe();
  }

  private buildMarkers(locs: VehicleLocation[]) {
    locs.forEach(loc => {
      this.markers.merge(loc, this.routeOptions.shouldDisplayRoute('sf-muni', loc.routeTag));
    });
  }

  private createMap() {
    this.map = new google.maps.Map(this.vehicleLocationMapElement.nativeElement, {
      center: {lat: 37.7749, lng: -122.4194},
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    this.markers = new MarkerCollection(this.map);
  }

  private subscribeToRouteOptionsChanges() {
    this.routeOptionsSubscription = this.routeOptions.changedOptions.subscribe(changes =>
      changes.forEach(change =>
        this.routeOptions.shouldDisplayRoute(change.agency, change.route) ?
          this.markers.show(change.route) :
          this.markers.hide(change.route)));
  }

  async subscribeToVehicleData() {
    await this.getVehicleData$.subscribe(vehicleState => {
      if (vehicleState.vehicleLocation) {
        this.buildMarkers(vehicleState.vehicleLocation)
      }
    });
  }

}
