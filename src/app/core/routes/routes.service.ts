import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { parseString } from 'xml2js';

import { environment } from '../../../environments/environment';
import { Route } from './route';

@Injectable()
export class RoutesService {

  data: Subject<Array<Route>>;

  constructor(private http: HttpClient) {
    this.data = new Subject();
  }

  refresh(agency: string): void {
    this.http.get(environment.dataServiceUrl, {
      params: {
        command: 'routeList',
        a: agency
      },
      responseType: 'text'
    })
      .subscribe(res => {
        this.unpackXML(res.toString())
      });
  }

  private unpackXML(xml: string) {
    parseString(xml, { explicitArray: false, mergeAttrs: true }, (err, result) => {
      this.data.next(
        !result.body.route ? [] :
          Array.isArray(result.body.route) ? result.body.route : [result.body.route]
      );
    });
  }

}
