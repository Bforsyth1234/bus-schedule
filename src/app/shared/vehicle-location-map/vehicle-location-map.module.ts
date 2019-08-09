import { NgModule } from '@angular/core';

import { VehicleLocationMapComponent } from './vehicle-location-map.component';
import { NgxsModule } from '@ngxs/store';
import { VehicleLocationState } from 'app/core/vehicle-locations/vehicle-location.state';

@NgModule({
  declarations: [VehicleLocationMapComponent],
  imports: [
    NgxsModule.forFeature([
      VehicleLocationState
    ])
  ],
  exports: [VehicleLocationMapComponent]
})
export class VehicleLocationMapModule { }
