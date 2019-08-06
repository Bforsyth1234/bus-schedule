import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Subject } from 'rxjs';
import { parseString } from 'xml2js';

import { environment } from '../../../environments/environment';
import { VehicleLoctationsResponse } from './vehicle-locations-response';
import { map } from 'rxjs/operators';

@Injectable()
export class VehicleLocationsService {

  data: Subject<VehicleLoctationsResponse>;

  constructor(private http: HttpClient) {
    this.data = new Subject();
  }

  refresh(agency: string, since?: string): void {
    this.http.get(environment.dataServiceUrl, {
      params: {
        command: 'vehicleLocations',
        a: agency,
        t: since || '0'
      },
      responseType: 'text'
    })
      .subscribe(xml => {
        this.unpackXML(xml);
      });
  }

  private unpackXML(xml: string) {
    parseString(xml, { explicitArray: false, mergeAttrs: true }, (err, result) => {
      this.data.next({
        lastTime: parseInt(result.body.lastTime.time, 10),
        locations: !result.body.vehicle ? [] :
          Array.isArray(result.body.vehicle) ? result.body.vehicle : [result.body.vehicle]
      });
    });
  }

}
